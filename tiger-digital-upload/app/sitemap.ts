import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tracks } from "@/lib/search-funds";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/services",
    "/search-funds",
    ...tracks.map((t) => `/search-funds/${t.slug}`),
    "/team",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.2 : p.startsWith("/search-funds") ? 0.9 : 0.7,
  }));
}
