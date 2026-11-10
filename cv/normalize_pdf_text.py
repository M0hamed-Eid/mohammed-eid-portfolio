"""Expand Unicode ligature mappings in a local TeX PDF without changing layout.

Usage: python normalize_pdf_text.py input.pdf output.pdf
Requires pypdf. CI's pdfLaTeX build disables ligatures directly; this helper
normalizes Tectonic/XeTeX output for the same plain-text extraction behavior.
"""

import argparse
import re
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, NameObject

LIGATURES = {
    "FB00": "00660066", "FB01": "00660069", "FB02": "0066006C",
    "FB03": "006600660069", "FB04": "00660066006C",
    "FB05": "00730074", "FB06": "00730074",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    if args.input.resolve() == args.output.resolve():
        parser.error("Use a separate output path to preserve the source PDF.")

    writer = PdfWriter()
    writer.clone_document_from_reader(PdfReader(args.input))
    seen = set()
    changed = 0
    for page in writer.pages:
        for ref in page.get("/Resources", {}).get("/Font", {}).values():
            font = ref.get_object()
            if id(font) in seen or "/ToUnicode" not in font:
                continue
            seen.add(id(font))
            original = font["/ToUnicode"].get_data()
            normalized = re.sub(
                rb"(?<=>)\s*<(FB0[0-6])>",
                lambda match: b" <" + LIGATURES[match[1].decode().upper()].encode() + b">",
                original,
                flags=re.IGNORECASE,
            )
            if normalized != original:
                stream = DecodedStreamObject()
                stream.set_data(normalized)
                font[NameObject("/ToUnicode")] = writer._add_object(stream)
                changed += 1
    with args.output.open("wb") as output:
        writer.write(output)
    print(f"Normalized {changed} font mapping(s); layout unchanged.")


if __name__ == "__main__":
    main()
