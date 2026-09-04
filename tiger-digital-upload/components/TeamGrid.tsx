import Image from "next/image";
import { team } from "@/lib/site";

export default function TeamGrid({ limit }: { limit?: number }) {
  const list = limit ? team.slice(0, limit) : team;
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((m) => (
        <li key={m.name}>
          <Image
            src={m.photo}
            alt={`${m.name}, ${m.role} at Tiger Digital`}
            width={480}
            height={800}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-auto max-w-[19rem]"
          />
          <h3 className="mt-5 font-display font-bold text-lg tracking-tight">{m.name}</h3>
          <p className="text-sm text-tiger font-semibold">{m.role}</p>
          <p className="mt-2 text-muted leading-relaxed text-sm">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}
