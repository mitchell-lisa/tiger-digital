import type { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the Tiger Digital team, founded in Moorestown, NJ by Joe DiMarino, with specialists in paid media, SEO, web, and operations.",
};

export default function TeamPage() {
  return (
    <>
      <section className="container-x pt-16 md:pt-24 pb-12">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Our team</p>
          <h1 className="display mt-3 text-3xl sm:text-5xl">The people doing the work.</h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Tiger Digital was founded in Moorestown, New Jersey by Joe DiMarino. It's a small team on
            purpose: every client works directly with the people running their campaigns.
          </p>
        </div>
      </section>
      <section className="container-x pb-16 md:pb-24">
        <TeamGrid />
      </section>
      <CTABand />
    </>
  );
}
