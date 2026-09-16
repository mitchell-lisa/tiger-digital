import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import RichText from "@/components/RichText";
import { site } from "@/lib/site";
import {
  visibleSections,
  type LandingPage,
  type SiteDefaults,
} from "@/lib/landing-pages";

/**
 * The one template every landing page renders through.
 *
 * Purely presentational: it takes a page and the shared defaults and draws
 * them with the site's existing design system, so these pages look like the
 * rest of tigerdigital.marketing rather than like a CMS theme. Editors change
 * content and section order in the Studio; the layout itself is not editable,
 * which is the point.
 *
 * Sections come from `visibleSections`, so an empty testimonial or a missing
 * image removes its section instead of leaving a gap.
 */
export default function LandingPageTemplate({
  page,
  defaults,
}: {
  page: LandingPage;
  defaults: SiteDefaults | null;
}) {
  const sections = visibleSections(page, defaults);
  const ctaText = page.ctaText || defaults?.defaultCtaText || "Book a consultation";
  const ctaUrl = page.ctaUrl || defaults?.defaultCtaUrl || "/contact";

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-24">
          <p className="eyebrow text-tiger-light">
            {page.audienceName}
            {page.audienceLocation ? ` · ${page.audienceLocation}` : ""}
          </p>
          <h1 className="display mt-5 text-[2.3rem] sm:text-5xl max-w-4xl">{page.h1}</h1>
          {page.heroSubheading && (
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed">
              {page.heroSubheading}
            </p>
          )}
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <CtaLink href={ctaUrl} className="btn btn-primary !min-h-[3.5rem] !px-8 text-base">
              {ctaText}
            </CtaLink>
            <a
              href={site.phoneHref}
              className="btn btn-outline btn-outline-light text-white !min-h-[3.5rem] !px-8 text-base"
            >
              Call {site.phone}
            </a>
          </div>

          {/* Kept in the hero, not the footer: a reader should meet the
              affiliation notice before the marketing copy, not after it. */}
          <p className="mt-9 max-w-2xl border-l-2 border-tiger-light/50 pl-4 text-sm text-white/60 leading-relaxed">
            {page.affiliationNotice}
          </p>
        </div>
      </section>

      {page.heroImage?.url && (
        <div className="container-x pt-12 md:pt-16">
          <Image
            src={page.heroImage.url}
            alt={page.heroImage.alt}
            width={1600}
            height={900}
            className="w-full h-auto rounded-lg border border-line"
            sizes="(min-width: 1024px) 76rem, 100vw"
          />
        </div>
      )}

      {sections.map((key) => {
        switch (key) {
          case "intro":
            return (
              <section key={key} className="container-x py-16 md:py-20">
                <div className="rule max-w-3xl">
                  <p className="eyebrow text-tiger">Overview</p>
                  <p className="mt-5 text-lg text-ink-soft leading-relaxed whitespace-pre-line">
                    {page.intro}
                  </p>
                </div>
              </section>
            );

          case "experience":
            return (
              <section key={key} className="container-x pb-4">
                <div className="max-w-3xl rounded-lg border border-line bg-paper p-6 md:p-7">
                  <p className="eyebrow text-tiger">Our experience</p>
                  <p className="mt-3 text-lg text-ink-soft leading-relaxed">
                    {page.clientExperience}
                  </p>
                </div>
              </section>
            );

          case "services":
            return (
              <section key={key} className="border-y border-line bg-paper">
                <div className="container-x py-16 md:py-20">
                  <div className="rule max-w-2xl">
                    <p className="eyebrow text-tiger">What we run</p>
                    <h2 className="display mt-3 text-3xl sm:text-4xl">How we would help.</h2>
                  </div>
                  <div className="mt-10 grid gap-px bg-line border border-line md:grid-cols-2">
                    {defaults!.serviceBlocks.map((b, i) => (
                      <div key={b.heading} className="bg-paper p-7 md:p-8">
                        <span className="text-tiger">
                          <Icon name={i === 0 ? "pin" : "target"} className="w-8 h-8" />
                        </span>
                        <h3 className="mt-5 font-display font-bold text-xl tracking-tight">
                          {b.heading}
                        </h3>
                        <p className="mt-3 text-muted leading-relaxed">{b.body}</p>
                        {b.steps?.length ? (
                          <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                            {b.steps.map((step) => (
                              <li key={step} className="flex gap-2.5 text-sm text-ink-soft leading-relaxed">
                                <span className="text-tiger font-bold shrink-0" aria-hidden>
                                  ✓
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "section":
            return (
              <section key={key} className="container-x py-16 md:py-20">
                <div className="max-w-3xl space-y-14">
                  {page.contentSections!.map((s) => (
                    <div key={s.heading} className="rule">
                      <h2 className="display mt-3 text-3xl sm:text-4xl">{s.heading}</h2>
                      <div className="mt-5">
                        <RichText value={s.body} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "proof":
            return (
              <section key={key} className="container-x py-14 md:py-16">
                <div className="rule max-w-2xl">
                  <p className="eyebrow text-tiger">Results</p>
                  <h2 className="display mt-3 text-2xl sm:text-3xl">Figures we can stand behind.</h2>
                </div>
                <dl className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {defaults!.proofPoints!.map((pt) => (
                    <div
                      key={pt.value + pt.label}
                      className="border border-line border-t-4 border-t-tiger rounded-lg bg-paper p-5"
                    >
                      <dd className="stat text-[2rem] text-ink">{pt.value}</dd>
                      <dt className="mt-2 text-sm leading-snug">{pt.label}</dt>
                      {pt.basis && (
                        <p className="mt-3 text-[0.78rem] text-muted leading-relaxed">{pt.basis}</p>
                      )}
                    </div>
                  ))}
                </dl>
                {defaults!.proofDisclaimer && (
                  <p className="mt-5 text-xs text-muted leading-relaxed max-w-3xl">
                    {defaults!.proofDisclaimer}
                  </p>
                )}
              </section>
            );

          case "checklist": {
            const cl = defaults!.transitionChecklist!;
            return (
              <section key={key} className="bg-ink text-white">
                <div className="container-x py-14 md:py-16">
                  <div className="rule rule-light max-w-2xl">
                    <p className="eyebrow text-tiger-light">Before you optimise anything</p>
                    <h2 className="display mt-3 text-2xl sm:text-3xl">
                      {cl.heading ?? "What breaks at close"}
                    </h2>
                  </div>
                  <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                    {cl.items!.map((item) => (
                      <li key={item} className="flex gap-3 text-white/80">
                        <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-tiger-light shrink-0" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {cl.linkHref && cl.linkLabel && (
                    <Link
                      href={cl.linkHref}
                      className="mt-8 inline-block text-sm font-semibold text-tiger-light hover:text-white transition-colors"
                    >
                      {cl.linkLabel} <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </section>
            );
          }

          case "related": {
            const links = page.relatedLinks?.length
              ? page.relatedLinks
              : (defaults?.relatedLinks ?? []);
            return (
              <section key={key} className="border-t border-line bg-paper">
                <div className="container-x py-14 md:py-16">
                  <div className="rule max-w-2xl">
                    <p className="eyebrow text-tiger">Keep reading</p>
                    <h2 className="display mt-3 text-2xl sm:text-3xl">More on this site.</h2>
                  </div>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                    {links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="card-link block border border-line rounded-lg p-5 font-display font-bold tracking-tight"
                        >
                          {l.label} <span aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          }

          case "testimonial":
            return (
              <section key={key} className="container-x py-12">
                <blockquote className="bg-ink text-white rounded-lg p-7 md:p-9 max-w-3xl">
                  <p className="text-lg md:text-xl leading-relaxed">“{page.testimonialQuote}”</p>
                  <footer className="mt-4 text-sm text-white/60">
                    {page.testimonialAttribution}
                  </footer>
                </blockquote>
              </section>
            );

          case "faq":
            return (
              <section key={key} className="border-t border-line bg-paper">
                <div className="container-x py-16 md:py-20">
                  <div className="rule max-w-2xl">
                    <p className="eyebrow text-tiger">Questions</p>
                    <h2 className="display mt-3 text-3xl sm:text-4xl">Common questions.</h2>
                  </div>
                  <dl className="mt-10 border-t border-line max-w-3xl">
                    {page.faqs!.map((f) => (
                      <div key={f.question} className="py-7 border-b border-line">
                        <dt className="font-display font-bold text-lg tracking-tight">
                          {f.question}
                        </dt>
                        <dd className="mt-3 text-ink-soft leading-relaxed">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            );

          case "resource":
            return (
              <section key={key} className="container-x py-12 md:py-16">
                <div className="border border-line rounded-lg p-6 md:p-7 max-w-3xl">
                  <p className="eyebrow text-muted">Further reading</p>
                  <a
                    href={page.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-3 inline-block font-display font-bold text-lg tracking-tight link-quiet"
                  >
                    {page.resourceLabel} <span aria-hidden>↗</span>
                  </a>
                  {page.resourceContext && (
                    <p className="mt-2 text-muted leading-relaxed">{page.resourceContext}</p>
                  )}
                </div>
              </section>
            );

          case "cta":
            return (
              <section key={key} className="bg-tiger-light text-ink">
                <div className="container-x py-14 md:py-20 grid gap-8 md:grid-cols-[1fr_auto] items-center">
                  <div>
                    <h2 className="display text-2xl sm:text-3xl lg:text-4xl">
                      Talk it through with our team.
                    </h2>
                    <p className="mt-3 text-ink-soft text-lg max-w-xl">
                      A short call to discuss the business you are buying and what we would do
                      first.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                    <CtaLink href={ctaUrl} className="btn btn-primary">
                      {ctaText}
                    </CtaLink>
                    <a href={site.phoneHref} className="btn btn-outline">
                      Call {site.phone}
                    </a>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

/** Internal links get client-side navigation; external ones stay plain anchors. */
function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const internal = href.startsWith("/") || href.startsWith(site.url);
  const path = href.startsWith(site.url) ? href.slice(site.url.length) || "/" : href;
  return internal ? (
    <Link href={path} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
