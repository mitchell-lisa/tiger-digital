import type { NextConfig } from "next";

/**
 * The one address the site answers on. Every other domain the project serves
 * is redirected here, and lib/site.ts must agree with it: that value drives
 * canonical tags, the sitemap, robots.txt and the structured data, so a
 * mismatch tells Google the real page lives somewhere it does not.
 */
const CANONICAL_ORIGIN = "https://nextset.digital";

const nextConfig: NextConfig = {
  images: {
    // Sanity serves uploaded images from its own CDN; next/image will only
    // optimise remote hosts that are listed here.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // The Squarespace site used these paths. Keep them working after the cutover.
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/testimonials", destination: "/#results", permanent: true },

      // Old and alternate domains, sent to the canonical one.
      //
      // `:path*` is the whole point: every one of these keeps the path, so
      // /search-funds/harvard-business-school lands on the same page rather
      // than the homepage. A registrar's "domain forwarding" usually drops
      // the path and sends everything to the root, which would retire ten
      // indexed pages in one move.
      //
      // These fire only for the hosts named below, so preview deployments
      // and localhost are untouched.
      ...["www.tigerdigital.marketing", "tigerdigital.marketing", "www.nextsetdigital.com", "nextsetdigital.com", "www.nextset.digital"].map(
        (host) => ({
          source: "/:path*",
          has: [{ type: "host" as const, value: host }],
          destination: `${CANONICAL_ORIGIN}/:path*`,
          permanent: true,
        }),
      ),
    ];
  },
};

export default nextConfig;
