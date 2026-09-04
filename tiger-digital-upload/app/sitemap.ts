import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/services", "/team", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.2 : 0.7,
  }));
}
