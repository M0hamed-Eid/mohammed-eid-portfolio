import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/data/site-config";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email(),
  message: z.string().min(10).max(5000),
  // Honeypot. Accepts any string so a bot's filled value passes validation and
  // is caught by the check below — `.max(0)` here would reject it as a 400 and
  // tell the bot exactly which field tripped it.
  company: z.string().max(200).optional(),
});

// Basic in-memory rate limit per server instance: 5 submissions / 10 minutes / IP.
// Resets on redeploy/cold start — good enough to blunt casual spam without a DB.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
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
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

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
          reason: error.message,
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
