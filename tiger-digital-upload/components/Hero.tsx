import Link from "next/link";
import { site } from "@/lib/site";

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
      </div>
    </section>
  );
}
