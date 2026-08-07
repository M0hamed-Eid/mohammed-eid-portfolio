import fs from "node:fs";
import path from "node:path";
import { certifications } from "@/lib/data/education";

export function checkProfilePhotoExists(): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public/images/profile/photo.jpg")
  );
}

export function checkCertificateImages(): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const cert of certifications) {
    result[cert.imageSlug] = fs.existsSync(
      path.join(process.cwd(), `public/images/certificates/${cert.imageSlug}.jpg`)
    );
  }
  return result;
}
