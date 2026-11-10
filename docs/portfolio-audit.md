# Portfolio audit — 10 November 2026

## Scope and scoring

Reviewed the App Router pages (home, four generic project pages, ADAS, résumé, metadata routes, contact API), all section/layout/shared components, UI primitives, typed content, public asset inventory, dependencies/configuration, LaTeX résumé source, and CV workflow. Existing stack: Next.js 16.3, React 19, strict TypeScript, Tailwind 4, Base UI, Framer Motion, React Hook Form/Zod, Resend; Vercel deployment target. Local Next.js guides were consulted before implementation.

Initial overall score: **65/100** (rounded mean of the six categories). These are editorial/engineering review scores, not Lighthouse scores or verified WCAG conformance.

| Category | Initial | Evidence |
|---|---:|---|
| Design | 66 | Consistent dark/serif identity, but portrait-first mobile order, splash, orbiting chips, moving canvas and repeated card grids compete with work. |
| Content | 73 | Substantial architecture/challenges/results; generic copy, repeated achievements and unsupported breadth of several claims. |
| Recruiter impact | 61 | Projects fifth in reading order; results absent from cards; rotating specialization; no immediate GitHub/LinkedIn/email links. |
| Technical quality | 56 | Typed content, reusable components, prebuilt project routes, server validation, passing baseline lint; namespace icon imports, incomplete API safeguards, stale README and critical dependency advisories found by npm audit. |
| Performance | 62 | next/image and mostly static routes; continuous canvas pair comparisons, client-heavy sections and opacity-zero initial markup. Field CWV and lab metrics unavailable. |
| Accessibility | 70 | Skip link, labels, descriptive image text, Base UI dialogs, reduced-motion CSS; hidden content before JS, incomplete motion control, small targets, primary button contrast and long unbroken text need work. |

## Recruiter review: 15–30 seconds

The AI direction exists but rotates between titles and competes with decoration. Strong differentiators are the multi-service AI Compass architecture, Arabic NLP and published corpus, and AynVQA's scoped development-split result. Backend client delivery supplies practical engineering evidence. The first screen and project cards underuse that evidence. Rejection risks include generic claims of production readiness, an apparently broken demo with no adjacent caveat, an undifferentiated skills wall, and benchmark numbers without evaluation context. Lead with a stable AI/ML title, projects, personal contribution, scoped outcomes, visible source links and a usable CV/contact path.

The initial source-only estimate was 68/100. The registry audit found six production dependency findings (one critical, five high), lowering the technical baseline from 76 to 56 and the overall baseline to 65. This is a risk-based revision, not a measured UX change.

## Existing strengths to preserve

- Problem/architecture/challenges/results content model; substantial project pages rather than repository links alone.
- AI Compass service boundaries, queues, retrieval/ranking evaluation and deployment history.
- Arabic-specific data engineering and NLP work, published dataset and documented limitations.
- AynVQA's explicit 395/500 development result and before/after repair comparison.
- Client backend work, team ownership, degree and credential evidence.
- Responsive grids, image optimization, skip link, validated form, mail fallback, canonical metadata, sitemap, structured data and CV build pipeline.

## Issue register and roadmap

| Phase / priority | Problem and reference | Why it matters / recommended action | Expected impact |
|---|---|---|---|
| 1 / Critical | Next.js 16.3.0 and transitive dependencies have known advisories; npm audit reports 1 critical and 5 high production findings. | Update compatible Next.js/ESLint and Zod versions, refresh compatible transitive fixes, re-audit and rebuild. | Addresses known framework and dependency exposure before deployment. |
| 1 / High | AI Compass demo link says Live Demo despite stopped backend (`projects.ts`, project page). | Put the deployment state immediately beside links and on the card; label preview accurately. | Prevents a recruiter interpreting paused infrastructure as broken engineering. |
| 1 / High | Credential verification awaits clipboard then calls window.open; reports copied even on failure (`certifications.tsx`). | Preserve native link navigation; copy independently and show code for manual use. | Reliable verification across popup/clipboard restrictions. |
| 1 / High | API accepts unbounded JSON, retains rate-limit entries, exposes provider error text (`api/contact/route.ts`). | Bound request bytes, trim/limit fields, expire/cap limiter entries, return generic provider failures. | Better abuse resilience and reduced implementation disclosure. Limiter remains per instance. |
| 2 / High | Portrait is first on mobile, title rotates, first-visit splash obscures content (`hero.tsx`, layout). | Text-first hero with stable role, direct contact links and linked evidence. Remove splash and decorative canvas from layout. | Faster comprehension and less motion/work on every page. |
| 2 / High | Projects fifth; experience after lengthy skills (`page.tsx`). | Hero → projects → experience → about/skills → education/credentials → dataset → contact. | More useful evidence in a short review. |
| 2 / Medium | Repetitive uniform grids and large gaps across ten sections. | Distinguish featured work with numbered editorial cards and concise outcome blocks; condense secondary credentials; remove duplicate achievement section from home. | Shorter page with clearer hierarchy while retaining evidence elsewhere. |
| 3 / High | "5 AI/ML projects shipped" includes embedded work; "best benchmark accuracy" lacks task/split (`hero.tsx`). | Replace with project-specific linked evidence, including 395/500 development result. | More credible measurement and fewer ambiguous claims. |
| 3 / High | Generic, defensive copy (`site-config.ts`, about, skills, publications, experience). | Short first-person summary grounded in projects/client work. Avoid universal claims such as every claim being verifiable. | Clearer specialization and more natural voice. |
| 3 / High | Cards omit role, results, status; detail pages put results late. | Add typed card outcome and scope, personal contribution, status and evaluation caveats. Put summary/results near detail header. | Recruiters can assess substance without reading every page. |
| 3 / Medium | Dataset described as openly released without access caveat. | State that public card is viewable and file access is gated; use dataset terminology instead of implying papers. | Accurate expectations. |
| 3 / Medium | Skills categories prioritize languages over LLM/RAG; duplicates and generic proficiency language. | Lead with LLM/RAG/ML/NLP and connect to case studies; keep familiarity tiers without invented percentages. | Better alignment with target roles. |
| 4 / High | Template and Reveal wrappers emit opacity-zero markup (`template.tsx`, `reveal.tsx`); individual sections do likewise. | Render meaningful content visible immediately; use optional CSS hover/transition feedback only. | No hydration-dependent access to core content; improved perceived loading. |
| 4 / High | Dynamic lookup through entire lucide namespace in skills, diagrams, achievements and ADAS. | Use explicit named icon registry and server-render static sections. | Better tree shaking and smaller client boundaries. |
| 4 / High | White primary text on bright pink; no global keyboard focus rule; controls below comfortable target size (`globals.css`, button). | Dark primary foreground, strong focus ring, 44px standard controls and 16px form text. | More readable actions and easier keyboard/touch use. Contrast still needs browser tooling verification. |
| 4 / Medium | Contact strings can overflow, success feedback not announced; client/API limits differ (`contact.tsx`). | min-width:0 / break-words, autocomplete, shared schema, maxlengths, persistent live status. | Better mobile forms and assistive feedback. |
| 4 / Medium | Image priority prop deprecated in local Next 16 docs (`hero.tsx`, résumé). | Use current image loading/preload options; preserve responsive sizes. | Removes deprecated API use. |
| 4 / Medium | Child Open Graph objects can omit shared site fields; no explicit Twitter image; JSON-LD lacks project links. | Set complete share metadata, OG alt text and explicit image, escape JSON-LD and add project ItemList. | More consistent social previews and crawlable work. |
| 4 / Low | Sitemap lastModified always current build time. | Omit fabricated freshness until reliable per-content modification dates exist. | More accurate crawl signals. |
| 5 / Medium | README claims photo/certificates/repos/ADAS missing despite current assets/content. | Replace stale setup/status instructions with current configuration and verification procedure. | Easier maintenance and fewer misleading deployment assumptions. |
| 5 / Medium | No application CI for lint/build; CV workflow only. | Add checks on PR/push; retain lockfile and current stack. | Regressions caught before deployment. |
| 5 / Low | Unused starter SVGs/UI/dependencies. | Remove confirmed-unused next-themes and simple-icons; retain unused UI primitives/assets rather than churn the scaffold. | Smaller dependency surface without adding runtime packages. |

## Missing evidence — owner input needed

1. Fitness model: participant counts, exact split, whether subjects are held out, and whether windows/feature fitting can leak across splits. Do not promote ~99% as generalization evidence without this.
2. Retrieval: number of evaluation questions, annotation method, relevance definition and dataset/split version for Recall@5 0.93; NER evaluation set and averaging for F1 0.47.
3. AI Compass: actual NDCG@10/MAP values, baseline, evaluation sample size, reproducible commands and representative failure cases. An implemented harness is not a measured quality gain.
4. AynVQA: repository evidence for official scorer run/config and any official test/leaderboard result. Development accuracy is not test accuracy or competition placement.
5. Work history: scope/team size, deployment responsibilities, representative deliverables, and any substantiated client outcome. Confirm "full unit-test coverage" before retaining an absolute coverage claim.
6. Availability: start date, remote/hybrid/on-site preference and relocation/work authorization if relevant. Do not infer from location.
7. Current project statuses and whether AI Compass backend will be resumed. Never invent live uptime or user counts.
8. Optional: short recorded walkthroughs/screenshots of AI Compass and Arabic platform; no synthetic product screenshots or testimonials.

## Recommended design direction

An editorial engineering portfolio: near-black indigo background, warm white text, restrained violet accents, existing serif display identity paired with Geist body text and monospace labels. Text first on mobile; a quiet framed portrait on desktop; featured work uses ownership and evidence rather than floating buzzwords. Responsive two-column desktop / single-column mobile cards. No loading theatre, continuous particles, rotating job titles, skill percentages or gratuitous new dependencies. Retain dark-only design rather than introduce an untested theme switch.

## Verification record

- Baseline `npm run lint`: passed.
- First baseline build: blocked by sandbox Google Fonts network access; retry with approved network access recorded separately.
- Browser preview: unavailable (`The browser access host is unavailable`); no visual, keyboard, screen-reader, console or viewport result claimed.
- Public dataset card was opened on 10 November 2026: confirms 882 documents/~890K words and gated file access. Source: https://huggingface.co/datasets/palestinian-kg/palestinian-cultural-knowledge
- Web fetches of AI Compass demo and two GitHub repos were inconclusive; do not treat tool fetch failures as proven broken links.
- Final checks and remaining limitations are recorded below after implementation.

## Implemented changes

- Phase 1: explicit AI Compass deployment notice beside preview link and on card; native credential verification navigation with honest clipboard status and manually selectable code; shared form/API limits, byte-bounded JSON reads, expiring/capped rate-limit storage, generic provider errors and environment fallback for blank optional sender values.
- Phase 2: text-first, server-rendered hero with stable specialization, direct GitHub/LinkedIn/email/CV links, quiet portrait and scoped evidence links; projects immediately after hero, then work experience; numbered project cards with ownership/outcomes/status; expandable secondary skills and credentials; duplicate achievements removed from homepage but evidence retained in projects/education.
- Phase 3: shorter personal summary, role-specific positioning, scoped outcomes, case-study results near the top, evaluation limitations, gated dataset description, and removal of unsupported absolute unit-test coverage wording. No new projects, scores, certifications, user counts or work arrangements were invented.
- Phase 4: removed splash/canvas/counters and their dead components; static reveal wrappers and static sections render visible HTML; named icon registry replaces namespace lookup; fixed the self-referencing body-font token to use Geist; lighter restrained accent with dark button text, global focus outlines, larger controls, 16px form inputs, wrapped contact text, readable image fitting, stronger dialog backdrop and viewport-constrained dialogs. Added text summary to CV preview, explicit share images/OG alt and project ItemList JSON-LD; removed synthetic sitemap freshness dates.
- Phase 5: Next.js and matching ESLint configuration updated to 16.4.6, Zod to 4.6.7, compatible transitive security updates applied, two unused dependencies removed, setup/deployment documentation refreshed, CI lint/build workflow and dependency-free local smoke script added. Production output remains Next.js/Vercel; no new runtime dependencies or external deployment were introduced.
- Runtime regression found during verification: first rendering of the legacy ADAS slug returned duplicate Location values. Added a permanent pre-render configuration redirect to `/adas`; smoke check also verifies followed URL and query preservation.

## Final verification and limits

- Final `npm run lint`: see final completion record below.
- Production build uses `npm run build -- --webpack`: Next.js 16.4.6. The default Turbopack path failed on restricted internal worker-port binding in this environment; the existing build script remains unchanged.
- `npm audit --omit=dev --json`: **0 production vulnerabilities** after updates. Full audit retains **12 development-tooling findings (2 low, 10 moderate)**, in shadcn/deepmerge and minimatch/TypeScript ESLint dependencies. No forced downgrades or major overrides applied. This audit result is time-specific, not a guarantee against undiscovered vulnerabilities.
- Advisory sources consulted: [Next.js upstream advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw), [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
- All 25 distinct public URLs extracted from content were checked: 24 returned HTTP 200 to HEAD. Kaggle returned 404 to HEAD but **200 to GET**, with title `Mohammed Eid | Kaggle`, the expected handle and no not-found marker. Retained the link. HTTP status checks do not verify authentication-gated credential flows, product backend functionality or every third-party page's contents.
- Base-token contrast calculation (OKLCH → linear sRGB): body 18.25:1, secondary text 9.92:1, primary button 10.85:1, accent on card 10.51:1. These calculations do not establish rendered WCAG conformance; opacity, overlays, states and all elements still need browser QA.
- Browser availability checked twice: no apps or browsers are exposed; browser host unavailable and native service startup failed. **No screenshots, viewport/device checks, keyboard/lightbox interaction tests, screen-reader tests, console inspection, Lighthouse score or Core Web Vitals measurement were possible.** Responsive behavior is implemented in CSS and reviewed in source, not visually certified.
- Actual email delivery and provider failure UI were not exercised; automated contact checks only use invalid bodies and honeypots and cannot send mail. Confirm delivery with a verified sender on the intended deployment.
- No remote code was pushed and no website deployment was performed. Remaining owner evidence is listed above; current project claims deliberately state evaluation limits.

### Completion record

- `npm run lint`: **passed, no warnings** on final source.
- `npm run build -- --webpack`: **passed**, including TypeScript and generation of all 16 static outputs, with no build warnings on final source.
- `node --test scripts/verify-portfolio.mjs`: **15/15 passed** against the rebuilt local production server. Covers seven rendered pages, canonical/OG/Twitter metadata, visible initial markup, source assets, homepage anchor/order, scoped evidence, permanent redirect/query preservation, 404, PDF/optimized image/share icons/sitemap/robots, malformed and oversized input including streamed requests, honeypot behavior and throttling.
- `git diff --check`: **passed**.
- Owned local preview and production servers stopped after verification.

Acceptance still pending outside this environment: browser visual/responsive and interaction QA, actual email delivery, field performance measurements, and owner-supplied evaluation details. No post-redesign visual/performance score is assigned without those checks.
