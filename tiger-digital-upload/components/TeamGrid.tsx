import Image from "next/image";
import { team } from "@/lib/site";

/**
 * Headshots are deliberately small: roughly a quarter of the footprint they
 * used to take, which puts the emphasis on the names and the bios rather than
 * on five large portraits. Every photo is rendered into the same circle at the
 * same crop, which also trims the arched top the source portraits were cut to,
 * so the row reads evenly however each one was originally framed.
 */
export default function TeamGrid({ limit }: { limit?: number }) {
  const list = limit ? team.slice(0, limit) : team;
  return (
    <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((m) => (
        <li key={m.name}>
          <Image
            src={m.photo}
            alt={`${m.name}, ${m.role} at Tiger Digital`}
            width={480}
            height={480}
            sizes="192px"
            className="h-48 w-48 rounded-full border border-line bg-cream object-cover object-top"
          />
          <h3 className="mt-6 font-display font-bold text-lg tracking-tight">{m.name}</h3>
          <p className="mt-1.5 text-sm text-tiger font-semibold">{m.role}</p>
          <p className="mt-4 text-muted leading-relaxed text-sm">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}
