import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { CERTIFICATIONS } from "@/data/certifications";
import { EXPERIENCE } from "@/data/experience";

const BASE_URL = "https://arslanasadqazi.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/experience", "/certifications"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const experienceRoutes = EXPERIENCE.map((e) => ({
    url: `${BASE_URL}/experience/${e.slug}`,
    lastModified: new Date(),
  }));

  const certificationRoutes = CERTIFICATIONS.map((c) => ({
    url: `${BASE_URL}/certifications/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...experienceRoutes, ...certificationRoutes];
}
