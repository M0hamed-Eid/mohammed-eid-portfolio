import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Projects with a bespoke page are listed at that page's URL instead, so the
  // redirecting /projects/<slug> URL never enters the index.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => !project.href)
    .map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/adas`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/resume`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projectRoutes,
  ];
}
