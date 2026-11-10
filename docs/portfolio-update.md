# Owner-requested update

## Visual restoration

Restored the original animated UI from commit `141272f`: hero portrait/orbits,
rotating roles, animated counters, particle canvas, brand splash, reveal/page
animations, original section order, cards, typography/colors, and certificates.
Retained dependency security updates, shared contact validation/API safeguards,
metadata improvements, and the canonical ADAS redirect. The certificate link fix
keeps its original appearance with native navigation and optional clipboard copy.

## Content corrections

- Corrected `Value competition` to **Valeo competition** in the ADAS content,
  education component and CV. Programming identifiers named `value` are unchanged.
- Added the published AynVQA paper to Publications and the project page with its
  ACL link, DOI, venue, authors and October 2026 publication date. The paper reports
  65.6% blind-test accuracy on 1,000 human-recorded examples versus 79% on the
  500-example development split. Removed the previous attribution of all the
  development improvement to repair alone; the paper attributes most of it to
  changing the answer-selection model.
- Source: https://aclanthology.org/2026.arabicnlp-sharedtasks.96/
  The linked five-page PDF was also read to check the results.
- Added Sprints experience as **AI Intern, 4 October–15 November 2026**, as supplied by the
  owner. Focus: proxy mode and multi-format file ingestion for RAG. Supporting
  implementation was reviewed read-only in the local project. No private
  repository URL is included in the website, CV or public source content.
- Added a Digital Twin case study, architecture stages, homepage project card,
  résumé entry and relevant summary. No team-wide ownership, deployment metrics,
  customer counts or broad claim of universal file-format support was invented.

## CV

Updated `cv/main.tex` while preserving the existing blue/white CV identity.
Condensed project bullets and certifications, added the internship, Digital Twin,
publication and published test results, and corrected Valeo. Kept the text at 11pt
and used an intentional page break. Compiled with Tectonic/XeTeX and verified
**two pages** with pypdf. Rendered both pages through PDFium and visually inspected
both PNGs: readable, no overlap/clipping, and all sections complete.

The local public PDF and both `/resume` preview JPEGs were regenerated, with
build timestamp and source hash in `cv/build-info.json`. The CV workflow now
fails before publishing a document with more than two pages. The private repo
URL is absent from the final PDF annotations.

## Verification

Final build, lint and local HTTP smoke results are recorded below. Browser and
native-app preview remain unavailable, so no website screenshot, motion playback,
keyboard or mobile viewport test is claimed. PDF rendering was available and was
visually checked separately. No remote push or deployment was performed.

Final checks: `npm run lint` passed without warnings; production build
`npm run build -- --webpack` passed with TypeScript and 17 static outputs;
`node --test scripts/verify-portfolio.mjs` passed **16/16** against that build.
The smoke checks include the restored animated markup, eight content pages,
paper and internship content, private-link omission, Valeo correction, metadata,
CV/images, canonical redirects, sitemap and non-delivering contact validation.
`git diff --check` passed. The final PDF is **2 pages**, with updated local public
PDF and two preview images. The owned local production server was stopped after
verification.

Owner date correction: the Sprints internship ends **15 November 2026**, not
15 October. Updated experience, project dates, CV source/PDF/previews and related
references. Recompiled and visually checked both PDF pages; still exactly two.
