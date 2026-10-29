import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TeamGrid from "@/components/TeamGrid";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the Next Set Digital team, founded in Moorestown, NJ by Joe DiMarino, with specialists in paid media, SEO, web, and operations.",
};

export default function TeamPage() {
  return (
    <>
      <section className="container-x pt-16 md:pt-24 pb-12">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-swell">Our team</p>
          <h1 className="display mt-3 text-3xl sm:text-5xl">The people doing the work.</h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Next Set Digital was founded in Moorestown, New Jersey by Joe DiMarino. It&rsquo;s a small team on
            purpose: every client works directly with the people running their campaigns.
          </p>
        </div>
      </section>
      <section className="container-x pb-20 md:pb-28">
        <TeamGrid />
      </section>

      {/* Joe's note on the rename, in his own words. The surf language runs
          longer here than the brand book's "one reference per page" because
          this is the page where the name is explained - the metaphor is the
          subject, not decoration. */}
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-first-light">A note from Joe</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              Tiger Digital is now Next Set Digital. <span aria-hidden>🌊</span>
            </h2>

            <div className="mt-7 space-y-5 text-lg text-white/80 leading-relaxed">
              <p>
                Every surfer knows the moment. You’re sitting outside, watching the horizon,
                and you see it building. The next set.
              </p>
              <p>
                You don’t get to pick when it comes. You only get to decide whether you
                paddle.
              </p>
              <p>
                I grew up in the water, and it taught me most of what I know about business.
                Read the conditions. Commit when it’s time. Don’t hesitate.
              </p>
              <p>
                Right now a generation of founders is handing over the businesses they spent
                decades building. Some go to searchers who buy them. Some go to sons and
                daughters who grew up in them. Either way, someone new is paddling into a
                wave they didn’t build, carrying a reputation they now have to protect and
                grow.
              </p>
              <p>That’s who we work for. The next generation of owners.</p>
              <p>So we changed our name to say it plainly.</p>
              <p>
                Same team. Same work: local search, Google Ads and landing pages that turn
                searches into customers. A name that finally says who we’re here for.
              </p>
              <p>
                If you just bought a business or are taking over the family one,{" "}
                <Link href="/contact" className="underline underline-offset-4 decoration-first-light/50 hover:decoration-first-light transition-colors">
                  my inbox is open
                </Link>
                .
              </p>
            </div>

            <p className="pull-quote mt-9 text-2xl sm:text-3xl text-first-light leading-snug">
              The first set built it. The next set takes it further.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/team/joe.webp"
                alt="Joe DiMarino"
                width={200}
                height={250}
                className="h-16 w-[3.2rem] rounded-md border border-white/15 object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">Joe DiMarino</p>
                <p className="text-white/60">Founder, Next Set Digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
