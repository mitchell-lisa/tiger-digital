import type { Metadata } from "next";
import { isSanityConfigured, projectId } from "@/sanity/env";
import StudioClient from "./StudioClient";

/**
 * Sanity Studio, embedded in this app so the CMS ships with the site: one
 * repo, one deploy, no extra hosting. Sanity handles the login, so editing and
 * publishing are behind its authentication rather than anything custom.
 *
 * Kept out of search: noindex here, disallowed in robots.ts, and absent from
 * the sitemap.
 */
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

// The Studio is a client-side app and manages its own routing under /studio.
export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <section className="container-x py-20 md:py-28">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Studio</p>
          <h1 className="display mt-3 text-3xl sm:text-4xl">Sanity is not connected yet.</h1>
          <p className="mt-5 text-muted leading-relaxed">
            Set <code className="text-ink">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="text-ink">NEXT_PUBLIC_SANITY_DATASET</code> in the Vercel project
            environment variables, then redeploy. Until then the rest of the site runs exactly as
            it does now: no page on this site reads from the CMS yet.
          </p>
        </div>
      </section>
    );
  }
  return <StudioClient key={projectId} />;
}
