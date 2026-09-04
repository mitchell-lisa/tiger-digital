import Link from "next/link";
import { site } from "@/lib/site";
import LocalProof from "./LocalProof";

export default function Hero() {
  return (
    <section className="bg-ink text-white overflow-hidden">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] items-center py-16 md:py-24">
        <div>
          <p className="eyebrow text-tiger-light fade-up">Marketing for acquisition entrepreneurs</p>
          <h1 className="display mt-5 text-[2.6rem] sm:text-5xl lg:text-6xl fade-up fade-up-2">
            Real growth.
            <br />
            <span className="text-tiger-light">No fluff.</span>
          </h1>
          <p className="mt-6 text-xl text-white/80 leading-snug fade-up fade-up-3">
            Self-funded or traditional searcher, we help you dominate local search
            after the acquisition.
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
        <div className="lg:pl-6">
          <LocalProof />
          <p className="mt-3 text-xs text-white/45 text-center">
            One tracked campaign on a single local search term. Individual results vary.
          </p>
        </div>
      </div>
    </section>
  );
}
