import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity serves uploaded images from its own CDN; next/image will only
    // optimise remote hosts that are listed here.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    // The Squarespace site used these paths. Keep them working after the cutover.
    return [
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/testimonials", destination: "/#results", permanent: true },
    ];
  },
};

export default nextConfig;
