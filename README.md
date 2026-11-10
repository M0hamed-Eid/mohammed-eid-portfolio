# Mohammed Eid — Portfolio

AI/ML engineering portfolio built with Next.js 16.4 App Router, React 19, strict
TypeScript, Tailwind CSS 4, Base UI and Framer Motion. The deployment target is
Vercel. Compatible security updates are tracked in the lockfile; unused next-themes and
simple-icons dependencies were removed. No new runtime dependencies were added.

## Local development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The homepage, project case studies, ADAS page, CV preview and PDF work without
email credentials. The contact form needs `RESEND_API_KEY` to deliver messages.
Set `CONTACT_FROM_EMAIL` to a verified sender and `CONTACT_TO_EMAIL` to the
intended inbox. Resend's default sandbox sender can only deliver to the account
owner. Empty optional values should be omitted from the environment.

Without a working email provider, the form reports failure and preserves the
message for an email-app fallback. Direct email and LinkedIn links remain visible.
The local verification script never sends an email.

## Content and assets

- `src/lib/data/site-config.ts`: identity, roles, summary, public URL and links.
- `src/lib/data/projects.ts`: case studies, ownership, scoped homepage outcomes,
  deployment notes and evaluation limitations. Update these together.
- `skills.ts`, `experience.ts`, `education.ts`: skills, work, degree and credentials.
- `publications.ts`: the ArabicNLP 2026 paper citation, authors and published results.
- `adas.ts`, `diagrams.ts`: detailed system content and architecture stages.
- `public/images/`: portrait, certificates, project visuals and CV previews.
- `cv/main.tex`: résumé source; the existing CV workflow compiles the PDF and
  previews. Edit the source and regenerate rather than editing the PDF directly.

Project pages are prebuilt. The legacy ADAS project slug redirects to `/adas`.
AI Compass's frontend preview is linked with a paused-backend notice. The dataset
card is public but file access is gated. Keep these statuses accurate when hosting
or access changes. No test-set accuracy, deployment uptime or client metrics should
be inferred from development evaluations.

## Checks

```sh
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3001
node --test scripts/verify-portfolio.mjs
```

The verification script targets `http://127.0.0.1:3001` by default. Override
`PORTFOLIO_TEST_URL` only for another local port. It checks rendered routes,
metadata, assets, canonical redirect, missing-page handling, and non-delivering
contact cases (invalid input, oversized JSON, honeypot and throttling).

Next's Google font loader needs outbound access at build time. If Turbopack cannot
bind its internal worker port in a restricted environment, use
`npm run build -- --webpack` (the same production application with Webpack).
Do not run a build while editing source or reuse a stale build for acceptance.

CI runs lint and the production build on pushes and pull requests; the separate
CV workflow retains its existing responsibilities.

## Deployment readiness

1. Run lint, build and local smoke checks against the finished build.
2. Verify `siteConfig.url` matches the intended canonical production domain.
3. Configure Resend with a verified sender and confirm delivery manually. A valid
   submission is intentionally excluded from automated smoke checks.
4. Check desktop/tablet/mobile views, keyboard menu and lightbox focus, zoom,
   reduced motion, and form success/failure in an available browser.
5. Measure Lighthouse and field Core Web Vitals after deployment. No numerical
   performance or accessibility conformance claim follows from a build passing.

The in-memory contact limiter is bounded and expires entries but applies per
server instance and resets on cold starts. For persistent distributed throttling,
configure the hosting provider's edge controls. Forwarding headers must be
normalized by the trusted proxy.

See [the audit](docs/portfolio-audit.md) for the initial score, issue register,
priorities, missing evidence and verification limitations.

The original animated UI is retained. Sprints is listed as an AI internship
(4 October–15 November 2026) focused on proxy mode and multi-format RAG ingestion; its
private repository URL is intentionally omitted. The CV is limited to two pages
and the CV workflow enforces that limit before updating the public PDF/previews.

For delivered contact mail appearing in Gmail Spam, see
[contact email troubleshooting](docs/contact-email.md). The current shared
test sender can be allowed with a narrowly scoped Gmail filter; a verified
owned domain is the long-term sending setup. Inbox placement is not guaranteed.
