import { challenges } from "@/lib/site";

const steps = [
  {
    title: "Map your real coverage",
    body: "We track where you actually show up, neighborhood by neighborhood, on Google Maps, search, and AI answers.",
  },
  {
    title: "Fix the reputation gap",
    body: "Genuine reviews from happy customers, plus winbacks on the negative ones. Rating moves first, rankings follow.",
  },
  {
    title: "Spend only where it counts",
    body: "Ads go into the zones where you're invisible. Where you already rank, we pull the spend back.",
  },
  {
    title: "Report so it makes sense",
    body: "Rating, review count, grid rankings, cost per conversion. You always know what the budget is buying.",
  },
];

export default function HowWeWork() {
  return (
    <section className="container-x py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <div className="rule">
          <p className="eyebrow text-tiger">Sound familiar?</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">The problems we inherit most.</h2>
        </div>
        <ul className="mt-8 space-y-4">
          {challenges.map((c) => (
            <li key={c} className="flex gap-3 text-lg text-ink-soft">
              <span className="mt-[0.6rem] h-2 w-2 rounded-full bg-tiger shrink-0" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted leading-relaxed">
          If that sounds like the business you just bought, we can usually show what's broken in the
          first conversation.
        </p>
      </div>

      <div>
        <p className="eyebrow text-muted mb-6">How we work</p>
        <ol className="space-y-0 border-t border-line">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-line">
              <span className="stat text-3xl text-tiger">{i + 1}</span>
              <div>
                <h3 className="font-display font-bold text-lg tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
