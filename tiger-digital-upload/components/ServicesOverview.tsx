import Link from "next/link";
import { services } from "@/lib/site";

const icons: Record<string, React.ReactNode> = {
  "reputation-management": (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    </svg>
  ),
  "local-seo": (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  "paid-advertising": (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
};

export default function ServicesOverview() {
  return (
    <section className="container-x py-16 md:py-24" id="services">
      <div className="md:flex md:items-end md:justify-between gap-8">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">What we do</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Rankings, ads, and reviews.
          </h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            Three services that feed each other. Your ads go only where the business you bought
            is still invisible, and a stronger rating lifts the rankings underneath them.
          </p>
        </div>
        <Link href="/services" className="btn btn-outline mt-6 md:mt-0 self-start shrink-0">
          See all services
        </Link>
      </div>

      <div className="mt-12 grid gap-px bg-line border border-line md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services#${s.slug}`}
            className="group bg-paper p-7 md:p-8 flex flex-col hover:bg-cream transition-colors"
          >
            <span className="text-tiger">{icons[s.slug]}</span>
            <h3 className="mt-6 font-display font-bold text-xl tracking-tight">{s.name}</h3>
            <p className="mt-3 text-muted leading-relaxed flex-1">{s.short}</p>
            <p className="mt-6 text-sm font-semibold inline-flex items-center gap-1.5 group-hover:text-tiger transition-colors">
              Learn more <span aria-hidden>→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
