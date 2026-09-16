import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/**
 * Read-only client for the public site.
 *
 * `useCdn` is on: published content is served from Sanity's edge cache. Note
 * this is not what keeps pages up during an outage - the pages themselves are
 * prerendered at build time and revalidated on demand, so a CMS outage affects
 * the next rebuild, not what visitors are already being served.
 *
 * Null when Sanity is not configured, so callers must handle its absence and
 * the site keeps building without a CMS.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
