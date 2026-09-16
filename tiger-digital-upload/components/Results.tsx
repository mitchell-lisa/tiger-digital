import { homeResults, reviewThreshold } from "@/lib/site";

/**
 * Home-page results. Each card states the basis for its own number, so the
 * section can carry specific claims without one vague disclaimer covering
 * everything. The BrightLocal figure is third-party research rather than our
 * own result, so it sits apart in the navy band with its citation.
 */
export default function Results() {
  return (
    <section id="results" className="border-y border-line scroll-mt-20">
      <div className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Results</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Numbers we can back up.</h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            Every client result below comes straight from the reporting tools we use with clients.
            Each one tells you how many clients it covers and when, so you know exactly what you are
            looking at.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeResults.map((r) => (
            <div
              key={r.label}
              className="bg-paper border border-line border-t-4 border-t-tiger rounded-lg p-6 flex flex-col"
            >
              <p className="stat text-[2.15rem] sm:text-[2.5rem] text-ink">{r.value}</p>
              <p className="mt-3 leading-snug flex-1">{r.label}</p>
              {r.basis && <p className="mt-4 text-[0.8rem] text-muted leading-relaxed">{r.basis}</p>}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-ink text-white rounded-lg p-7 md:p-8 flex flex-wrap items-center gap-6 md:gap-10">
          <p className="stat text-4xl md:text-5xl text-tiger-light shrink-0">
            {reviewThreshold.value}
          </p>
          <div className="flex-1 min-w-[15rem]">
            <p className="text-lg leading-relaxed">{reviewThreshold.claim}</p>
            <p className="mt-2.5 text-xs text-white/50 leading-relaxed">{reviewThreshold.source}</p>
          </div>
        </div>

        <p className="mt-7 text-xs text-muted leading-relaxed max-w-3xl">
          Results are from Tiger Digital client campaigns and reflect the specific clients and
          periods listed. Your results will depend on your market, budget, and starting point.
        </p>
      </div>
    </section>
  );
}
