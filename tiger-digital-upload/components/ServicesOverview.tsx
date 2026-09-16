import Link from "next/link";
import { services } from "@/lib/site";
import Icon, { type IconName } from "./Icon";

const icons: Record<string, IconName> = {
  "reputation-management": "star",
  "local-seo": "pin",
  "paid-advertising": "target",
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
            className="on-dark group bg-paper p-7 md:p-8 flex flex-col transition-colors hover:bg-tiger hover:text-white focus-visible:bg-tiger focus-visible:text-white"
          >
            <span className="text-tiger group-hover:text-tiger-light group-focus-visible:text-tiger-light transition-colors">
              <Icon name={icons[s.slug]} className="w-8 h-8" />
            </span>
            <h3 className="mt-6 font-display font-bold text-xl tracking-tight">{s.name}</h3>
            <p className="mt-3 text-muted leading-relaxed flex-1 group-hover:text-white/80 group-focus-visible:text-white/80 transition-colors">
              {s.short}
            </p>
            <p className="mt-6 text-sm font-semibold inline-flex items-center gap-1.5">
              Learn more <span aria-hidden>→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
