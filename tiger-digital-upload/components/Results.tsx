import { services } from "@/lib/site";

export default function Results() {
  return (
    <section id="results" className="border-y border-line scroll-mt-20">
      <div className="container-x py-16 md:py-24">
        <div className="rule max-w-2xl">
          <p className="eyebrow text-tiger">Results</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Real numbers from real campaigns.</h2>
          <p className="mt-4 text-muted text-lg leading-relaxed">
            Map rankings, cost per conversion, rating, review count. Here is what that has looked like.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="bg-paper border border-line rounded-lg p-7">
              <p className="eyebrow text-muted">{s.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{s.resultsHeading}</p>
              <dl className="mt-6 space-y-5">
                {s.results.map((r) => (
                  <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className="stat text-2xl sm:text-3xl text-ink whitespace-nowrap">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <blockquote className="lg:col-span-3 bg-ink text-white rounded-lg p-7 md:p-9 md:flex md:items-center md:gap-10">
            <p className="stat text-4xl md:text-5xl text-tiger-light shrink-0">317</p>
            <div className="mt-3 md:mt-0">
              <p className="text-lg md:text-xl leading-relaxed">
                “Tiger Digital helped us achieve 317 five-star reviews in under six months. This kind of
                growth exceeded our expectations and has been key to reaching more people. Their work
                speaks for itself!”
              </p>
              <footer className="mt-3 text-sm text-white/60">DKP Gastro Associates</footer>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
