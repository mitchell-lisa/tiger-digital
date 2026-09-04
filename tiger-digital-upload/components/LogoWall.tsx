import Image from "next/image";
import { clients } from "@/lib/site";
import RunningTiger from "./RunningTiger";

export default function LogoWall({ compact = false }: { compact?: boolean }) {
  const list = compact ? clients.slice(0, 12) : clients;
  return (
    <section className="border-b border-line">
      <RunningTiger />
      <div className="container-x py-10 md:py-12">
        <p className="eyebrow text-muted text-center">Companies we work with</p>
        <ul className="mt-7 flex flex-wrap justify-center gap-3">
          {list.map((c) => {
            const tile = `flex h-20 w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(16.666%-0.625rem)] items-center justify-center rounded-md border border-line px-4 ${c.dark ? "bg-ink" : "bg-paper"}`;
            const img = (
              <Image
                src={c.logo}
                alt={c.name}
                width={160}
                height={80}
                className="max-h-10 w-auto max-w-[8rem] object-contain"
              />
            );
            return (
              <li key={c.name} className="contents">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${c.name} website`}
                    className={`${tile} transition hover:border-tiger hover:shadow-md`}
                  >
                    {img}
                  </a>
                ) : (
                  <div className={tile}>{img}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
