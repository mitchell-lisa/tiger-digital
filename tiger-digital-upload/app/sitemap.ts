import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tracks } from "@/lib/search-funds";
import { getLandingPageSlugs } from "@/lib/landing-pages";

/**
 * Revalidated hourly as a safety net. The Sanity webhook refreshes this within
 * seconds of a publish; this interval means the sitemap still self-heals if a
 * webhook is ever missed, rather than staying stale until the next deploy.
 */
export const revalidate = 3600;

/**
 * Only published landing pages reach the sitemap: the slug query runs against
 * Sanity's published perspective, so drafts have no entry here and no route to
 * be crawled through.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const landingSlugs = await getLandingPageSlugs();
  const paths = [
    "",
    "/services",
    "/search-funds",
    ...tracks.map((t) => `/search-funds/${t.slug}`),
    ...landingSlugs.map((slug) => `/search-funds/${slug}`),
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
