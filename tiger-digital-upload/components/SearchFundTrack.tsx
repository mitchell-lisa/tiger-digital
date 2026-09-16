import Link from "next/link";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import AdsResult from "@/components/AdsResult";
import { site } from "@/lib/site";
import { pillars, tracks, type Track } from "@/lib/search-funds";

/**
 * Body of a search-fund track page (/search-funds/self-funded and
 * /search-funds/traditional). Both tracks share this structure on purpose: a
 * searcher comparing the two should be reading different arguments, not
 * hunting for the same section in a different place.
 *
 * Every stat rendered here comes from `services` in lib/site.ts, so the
 * campaign numbers stay in one file.
 */
export default function SearchFundTrack({ track }: { track: Track }) {
  const other = tracks.find((t) => t.slug !== track.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: track.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow text-tiger-light fade-up">
            <Link href="/search-funds" className="hover:text-white transition-colors">
              Search funds
            </Link>
            <span className="text-white/30"> / </span>
            {track.eyebrow}
          </p>
          <h1 className="display mt-5 text-[2.3rem] sm:text-5xl max-w-4xl fade-up fade-up-2">
            {track.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed fade-up fade-up-3">
            {track.lede}
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
          {other && (
            <p className="mt-6 text-sm text-white/50 fade-up fade-up-3">
              Running a different structure?{" "}
              <Link
                href={`/search-funds/${other.slug}`}
                className="font-semibold text-tiger-light hover:text-white transition-colors"
              >
                See the {other.name.toLowerCase()} page
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Where the searcher actually is when they land here. */}
      <section className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div className="rule">
          <p className="eyebrow text-tiger">{track.eyebrow}</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">{track.situation.heading}</h2>
          <p className="mt-5 text-muted leading-relaxed">
            None of this is a marketing problem yet. It becomes one the first month the seller is
            gone and the phone is quieter than the model said it would be.
          </p>
        </div>
        <ul className="space-y-4 self-center">
          {track.situation.points.map((p) => (
            <li key={p} className="flex gap-3 text-lg text-ink-soft leading-relaxed">
              <span className="mt-[0.6rem] h-2 w-2 rounded-full bg-tiger shrink-0" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* The three services, each with the angle specific to this track. */}
      <section className="border-y border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-tiger">How we do it</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Three channels, run as one system.
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Rankings, answer engines, and paid search feed each other. The reviews that lift your
              map rank are the same reviews an AI answer quotes, and the zones where both are weak
              are the only zones that should be costing you ad spend.
            </p>
          </div>

          <div className="mt-12 space-y-px bg-line border border-line">
            {pillars.map((p, i) => (
              <div
                key={p.slug}
                id={p.slug}
                className="scroll-mt-20 bg-paper p-7 md:p-10 grid gap-8 lg:grid-cols-[1fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-4 text-tiger">
                    <Icon name={p.icon} className="w-8 h-8 shrink-0" />
                    <span className="stat text-3xl">{`0${i + 1}`}</span>
                    <h3 className="display text-2xl sm:text-3xl text-ink">{p.name}</h3>
                  </div>
                  <p className="mt-5 text-lg text-ink-soft leading-relaxed">{p.what}</p>
                  <p className="mt-5 text-muted leading-relaxed border-l-2 border-tiger pl-4">
                    {track.pillarNotes[p.slug]}
                  </p>
                </div>
                <div className="lg:pt-2">
                  <p className="eyebrow text-muted">What the work is</p>
                  <ul className="mt-5 space-y-3">
                    {p.steps.map((s) => (
                      <li key={s} className="flex gap-3 text-ink-soft leading-relaxed">
                        <span className="text-tiger font-bold shrink-0" aria-hidden>
                          ✓
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified campaign results. Numbers live in lib/site.ts. */}
      <section className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Proof</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">What that looks like in practice.</h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            A campaign from our own client base. Not a search-fund portfolio company, but the same
            work on the same kind of local business.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <AdsResult />
        </div>
        <p className="mt-6 text-sm text-muted">
          Results shown are from Tiger Digital client campaigns. Individual results vary.
        </p>
      </section>

      {/* Sequencing. */}
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="rule rule-light">
            <p className="eyebrow text-tiger-light">Sequencing</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">{track.plan.heading}</h2>
            <p className="mt-5 text-white/70 leading-relaxed">{track.plan.intro}</p>
          </div>
          <ol className="border-t border-white/10">
            {track.plan.steps.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-white/10"
              >
                <span className="stat text-3xl text-tiger-light">{i + 1}</span>
                <div>
                  <h3 className="font-display font-bold text-lg tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reporting. */}
      <section className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="rule">
          <p className="eyebrow text-tiger">Reporting</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">{track.reporting.heading}</h2>
          <p className="mt-5 text-muted leading-relaxed">{track.reporting.intro}</p>
        </div>
        <ul className="space-y-3 self-center">
          {track.reporting.items.map((r) => (
            <li key={r} className="flex gap-3 text-ink-soft leading-relaxed">
              <span className="text-tiger font-bold shrink-0" aria-hidden>
                ✓
              </span>
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ. Mirrored in the FAQPage schema above. */}
      <section className="border-t border-line bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-tiger">Questions searchers ask</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              The ones that come up on every first call.
            </h2>
          </div>
          <dl className="mt-12 border-t border-line max-w-3xl">
            {track.faqs.map((f) => (
              <div key={f.q} className="py-7 border-b border-line">
                <dt className="font-display font-bold text-lg tracking-tight">{f.q}</dt>
                <dd className="mt-3 text-ink-soft leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-muted">
            Still deciding which structure fits?{" "}
            <Link href="/search-funds" className="font-semibold text-tiger hover:underline">
              Start with the overview
            </Link>
            {other && (
              <>
                {", or read the "}
                <Link
                  href={`/search-funds/${other.slug}`}
                  className="font-semibold text-tiger hover:underline"
                >
                  {other.name.toLowerCase()} page
                </Link>
              </>
            )}
            .
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
