# CV — source of truth

`main.tex` is the **only** thing you edit. The PDF and the preview images on
`/resume` are build output and are regenerated automatically.

```
cv/main.tex                                  ← you edit this
   │
   │  push to GitHub
   ▼
.github/workflows/build-cv.yml               ← compiles with pdfLaTeX
   │
   ├─→ public/Mohammed-Eid-Abdelmeguid-Resume.pdf   (linearised for web)
   ├─→ public/images/resume/page-*.jpg              (/resume previews)
   └─→ cv/build-info.json                           ("last updated" date)
   │
   │  commit triggers Vercel
   ▼
live site — Download CV + /resume both current
```

Nothing in `src/` refers to a page count or a version number, so a CV that grows
or loses a page needs no code change. `src/lib/resume.ts` reads whatever the
build produced.

## Keeping Overleaf in sync

Overleaf's Git and GitHub integrations are **premium-only** — they are not
available on the free plan. Which path applies depends on your subscription.

### If you have Overleaf Premium — full automation

1. In the Overleaf project: **Menu → Sync → GitHub**.
2. Link it to this repository.
3. Move the project so its `main.tex` lands at `cv/main.tex`.

From then on, *Push Overleaf changes to GitHub* is the only action you take. CI
compiles, commits the PDF, and Vercel redeploys. Zero portfolio edits.

### If you're on the free plan — one manual step

Overleaf cannot push anywhere on the free tier, so a fully automated
Overleaf → GitHub link is not possible. The reliable alternative:

- **Edit `cv/main.tex` directly in this repo** (VS Code, or GitHub's web editor)
  and let CI compile it. Overleaf then becomes optional — paste the file in when
  you want its editor or preview.
- Or keep authoring in Overleaf and, when you're done,
  **Menu → Download → Source** and drop the `.tex` back into `cv/`.

Either way you commit *source*, never a PDF, and everything downstream is
automatic.

### What not to do

Do not point the site at an Overleaf share/read-only PDF URL. Those URLs are
undocumented, tied to project session state, change without notice, and would
leave the Download CV button silently broken. A one-second commit is worth more
than an automation that fails quietly on the one link recruiters actually click.

## Building locally (optional)

You do not need LaTeX installed — CI handles it. If you want a local preview:

```bash
docker run --rm -v "$PWD/cv:/cv" -w /cv texlive/texlive:latest pdflatex -interaction=nonstopmode main.tex
```
