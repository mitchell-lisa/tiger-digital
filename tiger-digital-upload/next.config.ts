import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
