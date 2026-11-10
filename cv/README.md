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

The CV must stay within two pages. CI checks the compiled page count before
publishing build output. `src/lib/resume.ts` discovers the rendered preview
pages automatically.

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

## Application-friendly structure

See [ATS notes](ATS-NOTES.md) for the current section order and checks.
Digital Twin work belongs under the Sprints internship only. Keep independent
projects in Projects and preserve the two-page limit.

For a local Tectonic build, normalise the font Unicode mappings before copying
the PDF to public/ (requires pypdf):

```sh
tectonic cv/main.tex --outdir tmp/pdfs
python3 cv/normalize_pdf_text.py tmp/pdfs/main.pdf tmp/pdfs/normalized.pdf
```

This changes text mappings only. CI uses pdfLaTeX, with Unicode mapping enabled
and font ligatures disabled directly in the source. Both routes should be
visually checked and have extracted text reviewed before delivery.
