import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const base = new URL(process.env.PORTFOLIO_TEST_URL ?? "http://127.0.0.1:3001");
assert.ok(["127.0.0.1", "localhost"].includes(base.hostname), "Smoke checks must target a local server");
const canonical = "https://mohammed-eid-portfolio.vercel.app";
const routes = ["/", "/adas", "/resume", "/projects/ai-compass", "/projects/palestinian-cultural-knowledge-platform", "/projects/aynvqa-msa", "/projects/fitness-activity-tracker", "/projects/sprints-digital-twin"];
const htmlByRoute = new Map();

for (const route of routes) {
  test(`rendered content, metadata and assets: ${route}`, async () => {
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.equal(response.headers.get("x-powered-by"), null);
    const html = await response.text();
    htmlByRoute.set(route, html);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "Exactly one primary heading");
    assert.match(html, /<html[^>]*lang="en"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll(".", "\\.")}${route === "/" ? "/?" : route}"`));
    assert.match(html, /<meta property="og:image"/);
    assert.match(html, /<meta name="twitter:image"/);
    assert.match(html, /Skip to content/);
    assert.match(html, /class="splash-screen"/);
    assert.match(html, /<canvas\b/);
    const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.ok(structured.length > 0);
    for (const [, raw] of structured) assert.ok(JSON.parse(raw)["@graph"]);
    for (const [, tag] of html.matchAll(/<(img\b[^>]+)>/g)) assert.match(tag, /alt="[^"]+"/);
    const localImages = new Set([...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(([, src]) => {
      const url = new URL(src.replaceAll("&amp;", "&"), base);
      return url.pathname === "/_next/image" ? url.searchParams.get("url") : url.pathname;
    }).filter((src) => src?.startsWith("/images/")));
    for (const image of localImages) assert.ok((await stat(path.join(process.cwd(), "public", image))).isFile(), image);
  });
}

test("restored homepage preserves sections, new work and publication", async () => {
  const html = htmlByRoute.get("/") ?? await (await fetch(base)).text();
  const sections = [...html.matchAll(/<section id="([^"]+)"/g)].map(([, id]) => id);
  assert.deepEqual(sections.slice(0, 3), ["top", "about", "education"]);
  assert.ok(sections.includes("publications"));
  for (const [, id] of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `Missing anchor: ${id}`);
  assert.match(html, /65\.6/);
  assert.match(html, /Digilians at ImageEval 2026/);
  assert.match(html, /SprintFlow/);
  assert.doesNotMatch(html, /AI\/ML Projects Shipped|Best Benchmark Accuracy|Every claim on this site/);
});

test("case studies include published evaluation and private internship scope", async () => {
  const ai = await (await fetch(new URL("/projects/ai-compass", base))).text();
  assert.match(ai, /Frontend preview/);
  assert.match(ai, /backend is currently paused/);
  const vqa = await (await fetch(new URL("/projects/aynvqa-msa", base))).text();
  assert.match(vqa, /1,000-example blind test/);
  assert.ok(vqa.indexOf('id="project-results"') < vqa.indexOf("The Problem"));
  const fitness = await (await fetch(new URL("/projects/fitness-activity-tracker", base))).text();
  assert.match(fitness, /unseen participants/);
  const twin = await (await fetch(new URL("/projects/sprints-digital-twin", base))).text();
  assert.match(twin, /4 Oct — 15 Nov 2026/);
  assert.match(twin, /proxy mode/);
  assert.match(twin, /Repository Private/);
  assert.doesNotMatch(twin, /href="https:\/\/github.com\/[^"]*sprints-digital-twin/);
  const adas = await (await fetch(new URL("/adas", base))).text();
  assert.doesNotMatch(adas, /Value competition/);
  assert.match(adas, /Valeo competition/);
});

test("legacy ADAS URL redirects and missing project returns 404", async () => {
  const redirected = await fetch(new URL("/projects/adas-graduation-project", base), { redirect: "manual" });
  assert.equal(redirected.status, 308);
  assert.equal(redirected.headers.get("location"), "/adas");
  const followed = await fetch(new URL("/projects/adas-graduation-project?from=legacy", base));
  assert.equal(followed.status, 200);
  assert.equal(new URL(followed.url).pathname, "/adas");
  assert.equal(new URL(followed.url).searchParams.get("from"), "legacy");
  assert.equal((await fetch(new URL("/projects/not-a-project", base))).status, 404);
});

test("PDF, optimized image, share image and crawl endpoints respond", async () => {
  for (const [url, mime] of [
    ["/Mohammed-Eid-Abdelmeguid-Resume.pdf", "application/pdf"],
    ["/_next/image?url=%2Fimages%2Fprofile%2Fphoto.jpg&w=640&q=75", "image/"],
    ["/opengraph-image", "image/png"],
    ["/icon", "image/png"],
    ["/apple-icon", "image/png"],
    ["/sitemap.xml", "application/xml"],
    ["/robots.txt", "text/plain"],
  ]) {
    const response = await fetch(new URL(url, base));
    assert.equal(response.status, 200, url);
    assert.ok(response.headers.get("content-type")?.includes(mime), url);
    await response.arrayBuffer();
  }
  const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 8);
  assert.doesNotMatch(sitemap, /projects\/adas-graduation-project/);
});

// All requests below either fail validation or fill the honeypot, before any
// provider call. They are safe even if the local environment has a real API key.
let ipSuffix = 1;
const runId = Date.now().toString(36);
const bot = { name: "Smoke Test", email: "smoke@example.com", message: "Automated local validation only.", company: "honeypot" };
const post = (body, extra = {}) => fetch(new URL("/api/contact", base), {
  method: "POST",
  headers: { "content-type": "application/json", "x-forwarded-for": `local-smoke-${runId}-${ipSuffix++}`, ...extra },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

test("contact rejects malformed, blank and excessive input", async () => {
  for (const payload of ["{", {}, { ...bot, name: "  " }, { ...bot, message: "short" }, { ...bot, email: "invalid" }, { ...bot, name: "a".repeat(201) }, { ...bot, message: "a".repeat(5001) }]) {
    assert.equal((await post(payload)).status, 400);
  }
  assert.equal((await post(bot, { "content-type": "text/plain" })).status, 415);
  assert.equal((await post(bot, { "content-type": "application/json-invalid" })).status, 415);
});

test("contact enforces byte limit including streamed bodies", async () => {
  const oversized = JSON.stringify({ ...bot, message: "a".repeat(40_000) });
  assert.equal((await post(oversized)).status, 413);
  const response = await fetch(new URL("/api/contact", base), {
    method: "POST", duplex: "half",
    headers: { "content-type": "application/json", "x-forwarded-for": `local-stream-${runId}` },
    body: new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(oversized)); controller.close(); } }),
  });
  assert.equal(response.status, 413);
});

test("honeypot succeeds silently; sixth same-client request throttles", async () => {
  const headers = { "x-forwarded-for": `local-limit-${runId}, proxy` };
  for (let i = 0; i < 5; i++) {
    const response = await post(bot, headers);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
  }
  const blocked = await post(bot, headers);
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("retry-after"), "600");
});

test("all source-referenced local content assets exist", async () => {
  for (const file of ["src/lib/data/projects.ts", "src/lib/data/education.ts", "src/lib/data/site-config.ts"]) {
    const source = await readFile(file, "utf8");
    for (const [, asset] of source.matchAll(/"(\/(?:images\/[^"\n]+|[^"\n]+\.pdf))"/g)) {
      assert.ok((await stat(path.join(process.cwd(), "public", asset))).isFile(), asset);
    }
  }
});
