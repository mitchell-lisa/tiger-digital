import Image from "next/image";
import { team } from "@/lib/site";

/**
 * Headshots are deliberately small: roughly a quarter of the footprint they
 * used to take, which puts the emphasis on the names and the bios rather than
 * on five large portraits.
 *
 * The files in public/team are square face crops, cut from inside the oval
 * portraits the originals were framed in. Cropping here instead would slice a
 * square off the top of an 800px-tall oval, which cut chins off and let the
 * oval's navy ring show as an arc inside the circle.
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
            className="h-48 w-48 rounded-full border border-line bg-cream object-cover"
          />
          <h3 className="mt-6 font-display font-bold text-lg tracking-tight">{m.name}</h3>
          <p className="mt-1.5 text-sm text-tiger font-semibold">{m.role}</p>
          <p className="mt-4 text-muted leading-relaxed text-sm">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}
