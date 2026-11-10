import { siteConfig } from "@/lib/data/site-config";
import { projects, getProjectHref } from "@/lib/data/projects";
import { education } from "@/lib/data/education";

export function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/profile/photo.jpg`,
    jobTitle: siteConfig.roles,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alexandria",
      addressCountry: "EG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "Computer Vision",
      "Data Science",
      "Python",
      "PostgreSQL",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Arabic" },
      { "@type": "Language", name: "English" },
    ],
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.huggingface,
      siteConfig.links.kaggle,
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} — Portfolio`,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#person` },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [person, website, {
      "@type": "ItemList",
      name: "Selected engineering projects",
      itemListElement: projects.filter((project) => project.featured).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "CreativeWork", name: project.title, url: `${siteConfig.url}${getProjectHref(project)}`, description: project.summary },
      })),
    }],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
