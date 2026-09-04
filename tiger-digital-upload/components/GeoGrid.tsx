import Image from "next/image";

/**
 * Real client geo-grid report (“calibration services near me”), presented
 * as a before/after pair with our own labels so it sits inside the design.
 */
const panels = [
  { src: "/results/map-before.jpg", label: "Before", date: "Dec 2025", rank: "10.6", top3: "11%" },
  { src: "/results/map-after.jpg", label: "After", date: "Jan 2026", rank: "5.2", top3: "43%" },
];

export default function GeoGrid({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="rounded-xl bg-paper text-ink p-3 sm:p-4 shadow-2xl shadow-black/40">
      <div className="flex items-baseline justify-between gap-4 px-1 pb-3">
        <p className="text-sm font-semibold">
          Google Maps rank · <span className="text-muted font-normal">“calibration services near me”</span>
        </p>
        <p className="stat text-tiger text-lg sm:text-xl whitespace-nowrap">+155% visibility</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {panels.map((p) => (
          <div key={p.label}>
            <div className="rounded-lg overflow-hidden border border-line">
              <Image
                src={p.src}
                alt={`${p.label}: local map rankings across the service area, ${p.date}`}
                width={766}
                height={770}
                priority={priority}
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="w-full h-auto"
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between px-0.5">
              <p className="text-xs">
                <span className={`font-semibold ${p.label === "After" ? "text-tiger" : ""}`}>{p.label}</span>
                <span className="text-muted"> · {p.date}</span>
              </p>
              <p className="text-xs text-muted">
                avg <span className="font-semibold text-ink">{p.rank}</span> · top-3 <span className="font-semibold text-ink">{p.top3}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="sr-only">
        Actual client report: average map ranking 10.64 to 5.15, top-3 placements 11.24% to 42.6%, a 155.63% improvement in local visibility between December 1, 2025 and January 26, 2026.
      </figcaption>
    </figure>
  );
}
