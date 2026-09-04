import { Fragment } from "react";

/**
 * Renders the legal documents in lib/legal.ts. The source text is plain prose
 * with "## " / "### " headings and "- " list items. Nothing here rewrites the
 * copy; it only decides how each line is set.
 */

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "p"; text: string };

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];

  const flush = () => {
    if (list.length) {
      blocks.push({ kind: "ul", items: list });
      list = [];
    }
  };

  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }
    flush();
    if (line.startsWith("### ")) blocks.push({ kind: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ kind: "h2", text: line.slice(3) });
    else blocks.push({ kind: "p", text: line });
  }
  flush();
  return blocks;
}

/** Turns bare URLs and email addresses into links, leaving the text untouched. */
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s,;)"']+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,]$/, "");
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tiger underline underline-offset-2 decoration-line hover:decoration-tiger break-words"
        >
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-tiger underline underline-offset-2 decoration-line hover:decoration-tiger break-words"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function LegalDoc({ source }: { source: string }) {
  return (
    <div className="max-w-[46rem]">
      {parse(source).map((block, i) => {
        if (block.kind === "h2")
          return (
            <h2
              key={i}
              className="display text-2xl sm:text-[1.75rem] mt-14 mb-4 pt-8 border-t border-line first:mt-0 first:pt-0 first:border-0"
            >
              {block.text}
            </h2>
          );
        if (block.kind === "h3")
          return (
            <h3 key={i} className="font-display font-bold text-lg mt-9 mb-3">
              {block.text}
            </h3>
          );
        if (block.kind === "ul")
          return (
            <ul key={i} className="my-5 space-y-2.5 pl-5">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="relative text-[0.98rem] leading-relaxed text-ink-soft before:absolute before:-left-5 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-tiger-light"
                >
                  {linkify(item)}
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="my-4 text-[0.98rem] leading-relaxed text-ink-soft">
            {linkify(block.text)}
          </p>
        );
      })}
    </div>
  );
}
