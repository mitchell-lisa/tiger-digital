import Image from "next/image";
import { team } from "@/lib/site";

/**
 * Headshots are deliberately small: roughly a quarter of the footprint they
 * used to take, which puts the emphasis on the names and the bios rather than
 * on five large portraits.
 *
 * The files in public/team are 4:5 portrait crops, cut from inside the oval
 * portraits the originals were framed in (the originals are in git history at
 * fab8934). A square crop was tried first and read as cramped: the oval leaves
 * no room for a square wide enough to hold a head with any air around it, so
 * faces ended up filling the frame edge to edge. A portrait rectangle fits the
 * way these were actually shot, head and shoulders, and it is cut to stay clear
 * of the navy ring baked into the oval.
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
            height={600}
            sizes="176px"
            className="h-[13.75rem] w-44 rounded-lg border border-line bg-cream object-cover"
          />
          <h3 className="mt-6 font-display font-bold text-lg tracking-tight">{m.name}</h3>
          <p className="mt-1.5 text-sm text-tiger font-semibold">{m.role}</p>
          <p className="mt-4 text-muted leading-relaxed text-sm">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}
