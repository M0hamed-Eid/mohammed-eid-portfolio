import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { Publications } from "@/components/sections/publications";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { checkProfilePhotoExists, checkCertificateImages } from "@/lib/check-assets";

export default function Home() {
  const hasPhoto = checkProfilePhotoExists();
  const certImages = checkCertificateImages();

  return (
    <>
      <Hero hasPhoto={hasPhoto} />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Certifications availableImages={certImages} />
      <Publications />
      <Achievements />
      <Contact />
    </>
  );
}
