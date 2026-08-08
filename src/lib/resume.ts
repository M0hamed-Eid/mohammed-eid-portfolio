import fs from "node:fs";
import path from "node:path";

export interface ResumeMeta {
  /** Preview image paths, in page order. Empty if the CV hasn't been built yet. */
  pages: string[];
  /** ISO timestamp of the last CI build of the PDF, if recorded. */
  builtAt: string | null;
}

const PREVIEW_DIR = "public/images/resume";

/**
 * Reads whatever the CV build produced, rather than hard-coding a page count —
 * so a CV that grows or shrinks a page needs no change here. See
 * .github/workflows/build-cv.yml, which regenerates both of these on every push
 * to cv/main.tex.
 */
export function getResumeMeta(): ResumeMeta {
  const dir = path.join(process.cwd(), PREVIEW_DIR);

  let pages: string[] = [];
  try {
    pages = fs
      .readdirSync(dir)
      .filter((f) => /^page-\d+\.jpg$/.test(f))
      .sort(
        (a, b) =>
          Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0])
      )
      .map((f) => `/images/resume/${f}`);
  } catch {
    // Directory absent — the CV hasn't been compiled yet.
  }

  let builtAt: string | null = null;
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "cv/build-info.json"),
      "utf8"
    );
    const parsed = JSON.parse(raw) as { builtAt?: string };
    builtAt = parsed.builtAt ?? null;
  } catch {
    // No build metadata yet.
  }

  return { pages, builtAt };
}
