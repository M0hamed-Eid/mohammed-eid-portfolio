# Mohammed Eid — Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
shadcn/ui (Base UI primitives), and Framer Motion.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Animation:** Framer Motion
- **Icons:** lucide-react + simple-icons (for brand marks lucide dropped: GitHub, Hugging Face, Kaggle) + a hand-maintained LinkedIn path
- **Forms:** react-hook-form + zod
- **Email:** Resend (contact form)
- **Deployment target:** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | For the contact form to send email | Get one free at [resend.com](https://resend.com/api-keys) |

Locally: put it in `.env.local` (already gitignored). On Vercel: add it under
**Project Settings → Environment Variables** before the contact form will work in production.
Without it, the form fails gracefully with a "not configured yet" message — the rest of the site is unaffected.

## Content model

All content lives in `src/lib/data/*.ts` — edit these files to update copy, projects, skills,
experience, certifications, and achievements without touching component code:

- `site-config.ts` — name, roles, links, summary
- `projects.ts` — the 5 featured projects (problem/architecture/tech/challenges/results/links/images)
- `skills.ts` — skills grouped by category with a 3-tier proficiency signal (Core/Proficient/Familiar)
- `education.ts` — degree, grad project, certifications, achievements
- `experience.ts` — work history
- `diagrams.ts` — the stage labels used by the animated pipeline diagram on each project page

## Assets still needed

The site works and looks complete without these — it falls back gracefully — but these are the
things only you can provide:

1. **Profile photo** → `public/images/profile/photo.jpg`
   Until this exists, the hero shows a gradient-ring initials placeholder ("ME") instead.
2. **Certificate images** → `public/images/certificates/{slug}.jpg`, where slug is one of
   `digilians`, `ibm`, `andrew-ng`, `depi`, `aws` (see `imageSlug` in `src/lib/data/education.ts`).
   Until each exists, that certificate card shows an "image coming soon" placeholder instead of
   being clickable.
3. **AI Compass / AynVQA-MSA repos are private.** Their project pages already link to the right
   URL but show a disabled "Repository Private" badge instead of a working button. Once you flip
   either repo to public on GitHub (Settings → General → Danger Zone → Change visibility), update
   `githubPending: false` for that project in `src/lib/data/projects.ts` and the button goes live.
4. **ADAS project detail is thinner than the other four** — no repo exists to verify tech stack or
   specific engineering challenges, so `src/lib/data/projects.ts` only includes what's verified
   (grade, ranking, mentorship, feature list). Add real detail there if you want it as rich as the
   other four project pages.
5. **This repo isn't pushed to GitHub yet.** The Contact section links to
   `https://github.com/M0hamed-Eid/mohammed-eid-portfolio` as the "Portfolio Source Code" link —
   create that repo and push this code (see below) to make the link real.

## Deploying

**Why Vercel over GitHub Pages:** GitHub Pages only serves static files — it can't run the
`/api/contact` route (a real server function), and it can't use `next/image`'s on-demand
optimization, both of which this site relies on. Making it work on GitHub Pages would mean
`output: "export"` (a fully static export), which drops the contact form's backend and image
optimization entirely. Vercel is Next.js's own platform: zero-config deploys straight from GitHub,
free tier is generous enough for a portfolio, and every feature used here (API routes, image
optimization, `next/og` for the dynamic favicon/OG image, ISR if ever needed) works out of the box.

```bash
# 1. Push this repo to GitHub (create the repo on GitHub first, then:)
git remote add origin https://github.com/M0hamed-Eid/mohammed-eid-portfolio.git
git push -u origin main

# 2. Go to vercel.com → New Project → import the GitHub repo → Deploy
#    (Next.js is auto-detected, no config needed)

# 3. Before or right after the first deploy, add the RESEND_API_KEY env var in
#    Vercel's Project Settings → Environment Variables, then redeploy.

# 4. Once you have a real vercel.app URL (or a custom domain), update
#    `siteConfig.url` in src/lib/data/site-config.ts to match — it feeds
#    the sitemap, robots.txt, and Open Graph metadata.
```

## Scripts

```bash
npm run dev     # local dev server (Turbopack)
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```
