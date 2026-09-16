import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio is the CMS; it is behind a Sanity login and has no business
    // in an index. It also carries a noindex of its own.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
