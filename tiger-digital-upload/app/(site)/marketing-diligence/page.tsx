import type { Metadata } from "next";
import Link from "next/link";
import DiligenceForm from "@/components/DiligenceForm";
import Icon from "@/components/Icon";
import { pricing, reportSections, smallPrint, stages } from "@/lib/diligence";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Marketing Diligence for Searchers | Next Set Digital" },
  description:
    "Just signed an LOI? Find out if “the owner does no marketing” is real upside. Free snapshot, full diligence report, and a day-one plan.",
  alternates: { canonical: "/marketing-diligence" },
};

/**
 * Top level rather than under /search-funds. Diligence is sold to brokers and
 * lenders as well as to searchers, and a page they are sent to directly reads
 * oddly as a child of a page about search fund structures.
 */

/** The proof figures already published on /services. Nothing new is claimed. */
const localSeo = services.find((s) => s.slug === "local-seo")!;

export default function MarketingDiligencePage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow text-first-light fade-up">Marketing diligence</p>
          <h1 className="display mt-5 text-[2.4rem] sm:text-5xl lg:text-6xl max-w-4xl fade-up fade-up-2">
            Marketing diligence for searchers, before you close.
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed fade-up fade-up-3">
            &ldquo;The owner does no marketing&rdquo; is in almost every listing. We tell you whether
            that is upside or a warning sign.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 fade-up fade-up-3">
            <a href="#request" className="btn btn-primary !min-h-[3.5rem] !px-8 text-base">
              Request a free snapshot
            </a>
            <a
              href="#report"
              className="text-sm font-semibold underline underline-offset-4 decoration-first-light/50 hover:decoration-first-light transition-colors"
            >
              See what is in the full report
            </a>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-swell">The problem</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Upside and a warning sign look the same on a listing.
          </h2>
        </div>
        <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-soft leading-relaxed">
          <p>
            Sometimes no marketing is real upside. People are searching, the business barely shows
            up, and the team has room for more work.
          </p>
          <p>
            Sometimes it means the business runs on the owner&rsquo;s relationships, and the demand
            leaves when he does.
          </p>
          <p>
            Most sellers have no call tracking, so nobody can say where the calls came from. The
            seller usually still controls the Google profile and the phone number. We tell you which
            business you are buying, before you close.
          </p>
        </div>
      </section>

      {/* The three stages, in deal order. */}
      <section id="report" className="border-y border-line bg-paper scroll-mt-20">
        <div className="container-x py-16 md:py-24">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-swell">How it works</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Three steps, timed to your deal.
            </h2>
          </div>

          <ol className="mt-12 grid gap-px bg-line border border-line lg:grid-cols-3">
            {stages.map((stage, i) => (
              <li key={stage.name} className="bg-paper p-7 md:p-8 flex flex-col">
                <div className="flex items-center gap-3 text-swell">
                  <span className="stat text-3xl">{`0${i + 1}`}</span>
                  <span className="eyebrow text-muted">{stage.when}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-xl tracking-tight">{stage.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{stage.timing}</p>
                <p className="mt-4 text-ink-soft leading-relaxed">{stage.summary}</p>

                {stage.items && (
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {stage.items.map((item) => (
                      <li key={item.label} className="flex gap-2.5 text-sm text-ink-soft leading-relaxed">
                        <span className="text-swell font-bold shrink-0" aria-hidden>
                          ✓
                        </span>
                        <span>
                          {item.label}
                          {item.note && <span className="block text-muted">{item.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* The report's own sections sit inside stage two. */}
                {stage.name === "Marketing Diligence Report" && (
                  <ul className="mt-6 space-y-4 border-t border-line pt-6">
                    {reportSections.map((r) => (
                      <li key={r.name} className="flex gap-3">
                        <span className="text-swell shrink-0">
                          <Icon name={r.icon} className="w-6 h-6" />
                        </span>
                        <span className="text-sm leading-relaxed">
                          <span className="font-semibold">{r.name}.</span>{" "}
                          <span className="text-ink-soft">{r.what}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {stage.closing && (
                  <p className="mt-6 border-t border-line pt-6 text-sm text-ink-soft leading-relaxed">
                    {stage.closing}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="rule max-w-xl">
            <p className="eyebrow text-swell">Why this is different</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Two things worth knowing.</h2>
          </div>
          <ul className="mt-8 space-y-6 max-w-xl">
            <li className="flex gap-4">
              <span className="text-swell shrink-0">
                <Icon name="gauge" className="w-8 h-8" />
              </span>
              <p className="text-lg text-ink-soft leading-relaxed">
                We will tell you when marketing will not help.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="text-swell shrink-0">
                <Icon name="tag" className="w-8 h-8" />
              </span>
              <p className="text-lg text-ink-soft leading-relaxed">
                If you close and hire us, the report counts as your first month.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <div className="rule max-w-xl">
            <p className="eyebrow text-swell">Pricing</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">What it costs.</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {pricing.map((p) => (
              <div key={p.name} className="border border-line rounded-lg p-7 bg-paper flex flex-col">
                <p className="eyebrow text-muted">{p.name}</p>
                <p className="stat mt-3 text-4xl text-swell">{p.price}</p>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.when}</p>
                {p.note && (
                  <p className="mt-3 border-t border-line pt-3 text-sm text-muted leading-relaxed">
                    {p.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <div className="rule rule-light max-w-2xl">
            <p className="eyebrow text-first-light">What the work looks like after close</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              One campaign, after the handover.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">{localSeo.resultsHeading}.</p>
          </div>

          <div className="mt-12 grid gap-px bg-white/10 border border-white/10 sm:grid-cols-3">
            {localSeo.results.map((r) => (
              <div key={r.label} className="bg-ink p-7">
                <p className="stat text-4xl text-first-light">{r.value}</p>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{r.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 text-xs text-white/50 leading-relaxed max-w-3xl">
            Results are from Next Set Digital client campaigns and reflect the specific clients and
            periods listed. Your results will depend on your market, budget, and starting point.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="container-x py-14 md:py-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="rule max-w-2xl">
            <p className="eyebrow text-swell">For brokers and lenders</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl">
              Have a buyer under LOI?
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Send the deal over and we will run a free snapshot.
            </p>
          </div>
          <a href="#request" className="btn btn-primary shrink-0">
            Send a deal over
          </a>
        </div>
      </section>

      <section id="request" className="container-x py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.3fr] scroll-mt-20">
        <div>
          <div className="rule">
            <p className="eyebrow text-swell">Request</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Request a free snapshot.</h2>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Tell us what you are buying and where. We will send a one-page read within about 48
              hours. There is no charge and no obligation to work with us afterwards.
            </p>
          </div>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="eyebrow text-muted">Call</dt>
              <dd className="mt-1.5">
                <a
                  href={site.phoneHref}
                  className="font-display font-bold text-2xl tracking-tight link-quiet transition-colors"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Email</dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-lg link-quiet transition-colors break-all"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <div className="bg-paper border border-line rounded-lg p-6 sm:p-8">
            <DiligenceForm />
          </div>
          <p className="mt-6 text-xs text-muted leading-relaxed">{smallPrint}</p>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="container-x py-14 md:py-20">
          <p className="text-muted">
            Still working out which structure fits your deal?{" "}
            <Link href="/search-funds" className="font-semibold text-swell hover:underline">
              Start with the search funds overview
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
