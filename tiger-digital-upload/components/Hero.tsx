import Link from "next/link";
import { homeResults, site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="bg-ink text-white overflow-hidden">
      <div className="container-x py-20 md:py-28">
        <div className="max-w-4xl">
          <p className="eyebrow text-tiger-light fade-up">Marketing for acquisition entrepreneurs</p>
          <h1 className="display mt-5 text-[2.9rem] sm:text-6xl lg:text-7xl fade-up fade-up-2">
            Real growth.
            <br />
            <span className="text-tiger-light">No fluff.</span>
          </h1>
          <p className="mt-7 text-xl sm:text-2xl text-white/80 leading-snug fade-up fade-up-3">
            <Link
              href="/search-funds"
              className="underline decoration-tiger-light/40 underline-offset-4 hover:decoration-tiger-light transition-colors"
            >
              Self-funded or traditional searcher
            </Link>
            , we help you dominate local search after the acquisition.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 fade-up fade-up-3">
            <Link href={site.cta.primary.href} className="btn btn-primary !min-h-[3.5rem] !px-8 text-base">
              {site.cta.primary.label}
            </Link>
            <a
              href={site.cta.secondary.href}
              className="btn btn-outline btn-outline-light text-white !min-h-[3.5rem] !px-8 text-base"
            >
              {site.cta.secondary.label}
            </a>
          </div>
          <p className="mt-4 text-sm text-white/50 fade-up fade-up-3">
            Free consultation. No commitment.
          </p>
        </div>

        {/* Sneak peek at the results section further down the page. Values come
            from the same homeResults data, so the two can never disagree. */}
        <div className="mt-14 border-t border-white/15 pt-7 fade-up fade-up-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <p className="eyebrow text-white/40">A few recent numbers</p>
            <a
              href="#results"
              className="text-sm font-semibold text-tiger-light hover:text-white transition-colors"
            >
              See what is behind them <span aria-hidden>↓</span>
            </a>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
            {homeResults.map((r) => (
              <div key={r.value}>
                <dt className="sr-only">{r.teaser}</dt>
                <dd>
                  <span className="stat block text-2xl sm:text-3xl text-tiger-light">
                    {r.value}
                  </span>
                  <span className="mt-2 block text-xs text-white/50 leading-snug">{r.teaser}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
