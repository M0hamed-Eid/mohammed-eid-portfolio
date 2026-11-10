import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/data/site-config";

// Basic in-memory rate limit per server instance: 5 submissions / 10 minutes / IP.
// Resets on redeploy/cold start — good enough to blunt casual spam without a DB.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_TRACKED_IPS = 2000;
const MAX_BODY_BYTES = 32_768;
const hits = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (entry.expiresAt <= now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (entry) {
    entry.count = Math.min(entry.count + 1, RATE_LIMIT_MAX + 1);
    return entry.count > RATE_LIMIT_MAX;
  }
  // Fail closed when full rather than evicting active limits. No raw IP logs.
  if (hits.size >= MAX_TRACKED_IPS) return true;
  hits.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
  return false;
}

async function readBody(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return text + decoder.decode();
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  // The hosting proxy must overwrite forwarding headers. This is a per-instance
  // guard, not a distributed limit; production-wide abuse control belongs at edge.
  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 128);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }
  if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Send a JSON submission." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  }
  let body: unknown;
  try {
    const raw = await readBody(request);
    if (raw === null) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet — please email me directly." },
      { status: 503 }
    );
  }

  // Resend's shared sandbox sender (onboarding@resend.dev) will only deliver to
  // the address that owns the Resend account. Both are overridable by env so the
  // deployment can be pointed at a verified domain without a code change.
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio Contact <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      // Surface the provider's reason in logs — "Failed to send" alone is undebuggable.
      console.error("Resend rejected the send:", {
        name: error.name,
        message: error.message,
        from,
        to,
      });
      return NextResponse.json(
        {
          error: "Couldn't send that message — please email me directly instead.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Couldn't send that message — please email me directly instead." },
      { status: 500 }
    );
  }
}
