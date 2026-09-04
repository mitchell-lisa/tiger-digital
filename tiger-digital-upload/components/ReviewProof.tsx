/**
 * Hero proof card. Every number below comes from the reputation-management
 * figures in lib/site.ts, which are Tiger Digital's own published averages.
 * Nothing here is invented and nothing is attributed to a named client.
 */
import { services } from "@/lib/site";

const reputation = services.find((s) => s.slug === "reputation-management")!;
const find = (label: string) => reputation.results.find((r) => r.label === label)?.value ?? "";

const RATING_FROM = 3.4;
const RATING_TO = 4.7;

function Stars({ filled, size }: { filled: number; size: number }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const pct = Math.max(0, Math.min(1, filled - i)) * 100;
        return (
          <span key={i} className="relative block" style={{ height: size, width: size }}>
            <Star className="absolute inset-0 h-full w-full text-line" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
              <Star className="text-tiger" style={{ height: size, width: size }} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} style={style}>
      <path d="M10 1.4l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.6 7.5l5.8-.8L10 1.4z" />
    </svg>
  );
}

export default function ReviewProof() {
  return (
    <figure className="bg-paper text-ink rounded-md shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-line">
        <p className="eyebrow text-muted text-[0.7rem]">Reputation management</p>
        <p className="mt-2 font-display text-[0.95rem] leading-snug">
          {reputation.resultsHeading}
        </p>
      </div>

      <div className="px-6 sm:px-8 py-7">
        <div className="flex items-baseline gap-3.5 flex-wrap">
          <p className="stat text-[3.4rem] text-tiger">{RATING_TO.toFixed(1)}</p>
          <p className="text-sm text-muted leading-snug">
            average rating,
            <br className="hidden sm:block" /> up from{" "}
            <span className="font-semibold text-ink-soft">{RATING_FROM.toFixed(1)}</span>
          </p>
        </div>
        <div className="mt-4">
          <Stars filled={RATING_TO} size={20} />
        </div>
      </div>

      <dl className="grid grid-cols-3 border-t border-line">
        {[
          { v: find("Average positive review growth"), k: "Review growth" },
          { v: find("Positive reviews added"), k: "Reviews added" },
          { v: find("Average time to results"), k: "To results" },
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
