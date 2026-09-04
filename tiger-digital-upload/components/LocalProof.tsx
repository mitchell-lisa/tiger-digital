/**
 * Hero proof card. Every number comes from the local-seo figures in lib/site.ts,
 * which are Tiger Digital's own published results for one tracked campaign.
 * Nothing here is invented and nothing is attributed to a named client.
 *
 * components/ReviewProof.tsx is the reputation version of this card, kept in
 * case reputation management ever leads again.
 */
import { services } from "@/lib/site";

const localSeo = services.find((s) => s.slug === "local-seo")!;
const find = (label: string) => localSeo.results.find((r) => r.label === label)?.value ?? "";

const HEADLINE = find("Improvement in local visibility");
const [RANK_FROM, RANK_TO] = find("Average map ranking").split(" to ").map(Number);
const TOP3 = find("Share of top-3 placements");

/** Position 1 sits at the left of the track, position 12 at the right. */
const SCALE_MAX = 12;
const pct = (pos: number) => ((pos - 1) / (SCALE_MAX - 1)) * 100;

export default function LocalProof() {
  return (
    <figure className="bg-paper text-ink rounded-md shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-line">
        <p className="eyebrow text-muted text-[0.7rem]">Local SEO &amp; AI visibility</p>
        <p className="mt-2 font-display text-[0.95rem] leading-snug">{localSeo.resultsHeading}</p>
      </div>

      <div className="px-6 sm:px-8 py-7">
        <div className="flex items-baseline gap-3.5 flex-wrap">
          <p className="stat text-[3.4rem] text-tiger">{HEADLINE}</p>
          <p className="text-sm text-muted leading-snug">
            improvement in
            <br className="hidden sm:block" /> local visibility
          </p>
        </div>

        <div className="mt-8" aria-hidden="true">
          <div className="relative h-1 rounded-full bg-line">
            <span
              className="absolute inset-y-0 rounded-full bg-tiger/25"
              style={{ left: `${pct(RANK_TO)}%`, right: `${100 - pct(RANK_FROM)}%` }}
            />
            <span
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line ring-2 ring-paper"
              style={{ left: `${pct(RANK_FROM)}%` }}
            />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tiger ring-2 ring-paper"
              style={{ left: `${pct(RANK_TO)}%` }}
            />
          </div>
          <div className="relative mt-2.5 h-4 text-[0.7rem] font-semibold uppercase tracking-[0.08em]">
            <span
              className="absolute -translate-x-1/2 whitespace-nowrap text-tiger"
              style={{ left: `${pct(RANK_TO)}%` }}
            >
              Now {RANK_TO}
            </span>
            <span
              className="absolute -translate-x-1/2 whitespace-nowrap text-muted"
              style={{ left: `${pct(RANK_FROM)}%` }}
            >
              Was {RANK_FROM}
            </span>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 border-t border-line">
        {[
          { v: find("Average map ranking"), k: "Map ranking" },
          { v: TOP3, k: "Top-3 placements" },
        ].map((item) => (
          <div key={item.k} className="px-4 sm:px-5 py-5 border-r border-line last:border-r-0">
            <dt className="sr-only">{item.k}</dt>
            <dd>
              <span className="stat block text-[1.6rem] sm:text-[1.75rem] text-ink">{item.v}</span>
              <span className="mt-1.5 block text-[0.7rem] leading-tight text-muted uppercase tracking-[0.1em] font-semibold">
                {item.k}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
