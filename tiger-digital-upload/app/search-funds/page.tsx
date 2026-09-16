import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import LogoWall from "@/components/LogoWall";
import { pillars, tracks, transitionRisks } from "@/lib/search-funds";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing for Search Funds: SEO, AI Search & Paid Ads",
  description:
    "Tiger Digital runs local SEO, AI search visibility, and Google Ads for search funds. Self-funded or investor-backed, we take custody of the seller's digital assets, baseline what you bought, and grow it without breaking the rankings.",
  alternates: { canonical: "/search-funds" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital marketing for search fund acquisitions",
  serviceType: ["Local SEO", "AI search visibility", "Paid search advertising"],
  provider: { "@id": `${site.url}/#business` },
  areaServed: "United States",
  audience: {
    "@type": "BusinessAudience",
    name: "Search funds and acquisition entrepreneurs",
  },
  description:
    "Local SEO, AI search visibility, and Google Ads for self-funded searchers and traditional investor-backed search funds acquiring local service businesses.",
};

export default function SearchFundsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow text-tiger-light fade-up">Search funds</p>
          <h1 className="display mt-5 text-[2.4rem] sm:text-5xl lg:text-6xl max-w-4xl fade-up fade-up-2">
            The growth plan for the business you just bought.
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed fade-up fade-up-3">
            Most searchers buy a business with thirty years of goodwill and almost no digital
            footprint. We run the three channels that close that gap: local SEO, AI search
            visibility, and paid search. Self-funded or investor-backed, the work is the same
            shape. The sequencing and the reporting are not.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 fade-up fade-up-3">
            <Link href="/contact" className="btn btn-primary !min-h-[3.5rem] !px-8 text-base">
              Book a consultation
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-outline btn-outline-light text-white !min-h-[3.5rem] !px-8 text-base"
            >
              Call {site.phone}
            </a>
          </div>
          <p className="mt-4 text-sm text-white/50 fade-up fade-up-3">
            Free consultation. Works pre-LOI, at close, or on a business you already own.
          </p>
        </div>
      </section>

      <LogoWall />

      {/* Pick a track. This is the main job of the hub page. */}
      <section className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Two structures, two plans</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Which one are you running?</h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            A searcher with an SBA note and a personal guarantee has a different first ninety days
            than a fund with committed capital and a board. Pick the one that matches your deal.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-line border border-line md:grid-cols-2">
          {tracks.map((t) => (
            <Link
              key={t.slug}
              href={`/search-funds/${t.slug}`}
              className="group bg-paper p-8 md:p-10 flex flex-col hover:bg-cream transition-colors"
            >
              <h3 className="display text-2xl sm:text-3xl">{t.name}</h3>
              <p className="mt-3 text-sm font-semibold text-tiger">{t.subtitle}</p>
              <p className="mt-5 text-muted leading-relaxed flex-1">{t.lede}</p>
              <p className="mt-7 text-sm font-semibold inline-flex items-center gap-1.5 group-hover:text-tiger transition-colors">
                See the plan <span aria-hidden>→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* The three channels. */}
      <section className="border-y border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-tiger">What we run</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              SEO, AI search, and paid ads, in that order of patience.
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Paid search produces calls in week one. Local SEO and AI visibility compound over
              months and then cost almost nothing to hold. Running all three lets the fast channel
              carry the note while the slow ones build the asset.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-line border border-line lg:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.slug} className="bg-paper p-7 md:p-8 flex flex-col">
                <span className="stat text-3xl text-tiger">{`0${i + 1}`}</span>
                <h3 className="mt-5 font-display font-bold text-xl tracking-tight">{p.name}</h3>
                <p className="mt-3 text-muted leading-relaxed">{p.what}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6 flex-1">
                  {p.steps.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm text-ink-soft leading-relaxed">
                      <span className="text-tiger font-bold shrink-0" aria-hidden>
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The handover problems. This is the section searchers actually need. */}
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <div className="rule rule-light max-w-2xl">
            <p className="eyebrow text-tiger-light">Before you optimize anything</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Six things that break at close.
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Almost every recovery project we take on started with a well-meant change made before
              anyone checked what it was holding up. Handle these in order and the transition costs
              you nothing.
            </p>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {transitionRisks.map((r) => (
              <div key={r.title} className="border-t border-white/15 pt-5">
                <h3 className="font-display font-bold text-lg tracking-tight">{r.title}</h3>
                <p className="mt-2.5 text-white/70 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified numbers, pulled from lib/site.ts. */}
      <section className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Results</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Real numbers from real campaigns.</h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            The same work, on the same kind of local service business a searcher buys.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="bg-paper border border-line rounded-lg p-7">
              <p className="eyebrow text-muted">{s.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{s.resultsHeading}</p>
              <dl className="mt-6 space-y-5">
                {s.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className="stat text-2xl sm:text-3xl text-ink whitespace-nowrap">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Results shown are from Tiger Digital client campaigns. Individual results vary.
        </p>
      </section>

      {/* Second pass at the track choice, for anyone who read the whole page. */}
      <section className="border-t border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-tiger">Next</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Read the plan for your deal.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tracks.map((t) => (
              <Link
                key={t.slug}
                href={`/search-funds/${t.slug}`}
                className="group border border-line rounded-lg p-7 hover:border-tiger transition-colors"
              >
                <h3 className="font-display font-bold text-xl tracking-tight">{t.name}</h3>
                <p className="mt-2 text-sm text-muted">{t.subtitle}</p>
                <p className="mt-5 text-sm font-semibold inline-flex items-center gap-1.5 group-hover:text-tiger transition-colors">
                  {t.plan.heading} <span aria-hidden>→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
