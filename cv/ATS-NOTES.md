# Resume structure and application-system checks

The industry resume follows this order:

1. Professional Summary
2. Technical Skills
3. Professional Experience
4. Projects
5. Publications
6. Education
7. Certifications

Skills and recent AI engineering experience are prominent for AI/ML applications.
Sprints' Digital Twin appears only under its AI Intern position. The Projects
section contains independent/research/coursework projects. Work entries and
projects are ordered by recency; the ongoing AI Compass project leads Projects.
The Digilians diploma belongs under Education; receiving its certificate image
later does not create a new qualification or change its completion date.

Formatting uses one text column, conventional headings, visible professional
URLs, embedded fonts, normal text contact details, readable 11pt body text and
consistent month/year date ranges (the explicitly supplied internship dates
retain their day values). There are no tables, graphic icons, skill bars,
photos, or contact details hidden in page headers/footers. Font ligatures are
disabled in pdfLaTeX builds. Local Tectonic outputs use
`normalize_pdf_text.py` to map ligature glyphs back to ordinary characters
without changing their visible appearance.

Checks on the PDF should include:

- No more than two pages; no clipped or overlapping content in rendered pages.
- Selectable/extractable text with the name, email, phone, employers, roles,
  dates, headings and technologies in reading order.
- A single Digital Twin entry located in Professional Experience.
- Correct development vs. blind-test scope on the published research result.
- No private repository links or unverified achievements.

Text extraction checks are not equivalent to uploading to Workday, Greenhouse,
or every third-party ATS. No ATS score, interview probability or universal
parsing guarantee is claimed. Tailor the summary, relevant skill order and
project emphasis to each actual job description using only supported experience.
Use the format requested by the employer and review parsed application fields
before submission.

References consulted:
- https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse
- https://careerdevelopment.princeton.edu/resume-guide/helpful-headings
- https://mitcommlab.mit.edu/broad/commkit/cvresume/

## Verified on the current output

- Two-page PDF, 11pt body, both pages rendered and visually inspected.
- pypdf and PDFium both preserve the seven-section reading order, name, email,
  phone, employers, dates, core technology names and scoped blind-test result.
- Digital Twin occurs once, inside Professional Experience, before Projects.
- No replacement characters or Unicode presentation ligatures remain in the
  extracted text. The file has selectable text, no image-based text and is not
  encrypted. Size is approximately 36KB.
- The font-map normalization produces pixel-identical rendered pages.
- Website PDF and both preview images were regenerated from the checked output.

These are document/extraction checks, not a commercial ATS evaluation.
