import { testimonials } from "@/lib/site";

export default function Testimonials({ exclude }: { exclude?: string }) {
  const list = testimonials.filter((t) => t.name !== exclude);
  return (
    <section className="bg-ink text-white">
      <div className="container-x py-16 md:py-24">
        <div className="rule rule-light">
          <p className="eyebrow text-tiger-light">Clients</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">In their words.</h2>
        </div>
        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
          {list.map((t) => (
            <figure key={t.name} className="bg-ink p-7 md:p-8 flex flex-col">
              <span className="text-tiger-light text-5xl font-display leading-none" aria-hidden>“</span>
              <blockquote className="mt-2 text-lg leading-relaxed flex-1">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-white/50"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
