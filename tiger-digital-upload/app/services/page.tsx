import type { Metadata } from "next";
import Link from "next/link";
import { services, site } from "@/lib/site";
import CTABand from "@/components/CTABand";
import GeoGrid from "@/components/GeoGrid";
import AdsResult from "@/components/AdsResult";

export const metadata: Metadata = {
  title: "Services: Local SEO, Paid Ads & Reputation Management",
  description:
    "Tiger Digital's services for local businesses: local SEO and AI search visibility, paid advertising guided by real local visibility data, and reputation management.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow text-tiger-light">Services</p>
          <h1 className="display mt-4 text-3xl sm:text-5xl max-w-3xl">
            Smarter coverage. Better spend. Real local results.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            We combine local search visibility tracking, paid advertising, and reputation management into
            a single system, so your business shows up in the right places, wastes less, and converts
            more consistently.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Services">
            {services.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="btn btn-outline btn-outline-light text-white !min-h-[2.6rem] !py-2 !px-4 text-sm">
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className="scroll-mt-20 border-b border-line"
        >
          <div className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="display text-3xl sm:text-4xl">{s.name}</h2>
              <p className="mt-5 text-lg text-ink-soft leading-relaxed">{s.intro}</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-ink-soft">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-tiger shrink-0" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary">Book a consultation</Link>
                <a href={site.phoneHref} className="btn btn-outline">Call {site.phone}</a>
              </div>
            </div>
            <aside className="bg-ink text-white rounded-lg p-7 md:p-8 self-start">
              <p className="eyebrow text-tiger-light">{s.resultsHeading}</p>
              <dl className="mt-6 space-y-5">
                {s.results.map((r) => (
                  <div key={r.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <dd className="stat text-3xl text-tiger-light">{r.value}</dd>
                    <dt className="mt-1 text-sm text-white/60">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
          {s.slug === "local-seo" && (
            <div className="container-x pb-16 md:pb-24">
              <div className="bg-ink rounded-xl p-4 sm:p-6"><GeoGrid /></div>
            </div>
          )}
          {s.slug === "paid-advertising" && (
            <div className="container-x pb-16 md:pb-24">
              <AdsResult />
            </div>
          )}
        </section>
      ))}

      <section className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Why this works</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Paid ads perform best when guided by real local visibility.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-lg text-ink-soft leading-relaxed">
            Instead of running ads everywhere, we use visibility data to decide where ads are actually
            needed, where organic rankings already carry weight, where competitors are gaining ground,
            and where budget creates the most impact.
          </p>
          <ul className="space-y-3 text-ink-soft">
            {[
              "Consistent local visibility across your service area",
              "Better ad efficiency and fewer wasted impressions",
              "Higher-intent traffic",
              "Clear, visual reporting that makes sense",
            ].map((g) => (
              <li key={g} className="flex gap-3">
                <span className="text-tiger font-bold" aria-hidden>✓</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Searchers land on /services from ads and organic; this is the hand-off
          to the acquisition-specific version of the same three services. */}
      <section className="border-t border-line bg-paper">
        <div className="container-x py-14 md:py-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-tiger">Buying a business?</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl">
              The same three services, sequenced for an acquisition.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              A searcher has a very different first ninety days than an owner who has been running
              the place for twenty years. We wrote the plan out for both structures.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link href="/search-funds/self-funded" className="btn btn-outline">
              Self-funded search
            </Link>
            <Link href="/search-funds/traditional" className="btn btn-outline">
              Traditional search funds
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
