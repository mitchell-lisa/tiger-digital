import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * Renders a section body in the site's own typography.
 *
 * The CMS decides structure; this file decides how structure looks. That split
 * is why editors cannot make a landing page stop matching the rest of the
 * site: there is no style choice available to them here.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-lg text-ink-soft leading-relaxed first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h3 className="display mt-10 text-2xl sm:text-3xl first:mt-0">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-8 font-display font-bold text-lg tracking-tight first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-tiger pl-5 text-lg text-ink-soft leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 space-y-3 list-decimal pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-ink-soft leading-relaxed">
        <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-tiger shrink-0" aria-hidden />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-ink-soft leading-relaxed pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      // Internal links get client-side navigation; external ones are marked up
      // as external and not followed, since they are references, not
      // endorsements.
      return href.startsWith("/") ? (
        <Link href={href} className="link-quiet underline underline-offset-4 decoration-line">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="link-quiet underline underline-offset-4 decoration-line"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: { value?: PortableTextBlock[] | null }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}

/** Word count of a rich text body, for content-depth reporting. */
export function richTextWords(value?: PortableTextBlock[] | null): number {
  if (!value?.length) return 0;
  let n = 0;
  for (const block of value) {
    const children = (block as { children?: { text?: string }[] }).children ?? [];
    for (const child of children) n += (child.text ?? "").trim().split(/\s+/).filter(Boolean).length;
  }
  return n;
}
