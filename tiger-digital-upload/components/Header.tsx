"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const nav: { href: string; label: string; children?: { href: string; label: string }[] }[] = [
  { href: "/services", label: "Services" },
  {
    href: "/search-funds",
    label: "Search Funds",
    children: [
      { href: "/search-funds/marketing-diligence", label: "Marketing Diligence" },
      { href: "/search-funds/self-funded", label: "Self-funded search" },
      { href: "/search-funds/traditional", label: "Traditional search funds" },
    ],
  },
  { href: "/#results", label: "Results" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  // The menu records the route it was opened on, so a navigation closes it by
  // derivation. Closing it from an effect on `pathname` instead would be a
  // setState during render-commit, which cascades an extra render.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const close = () => setOpenedOn(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-line">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        {/* The logo is artwork: the brand book forbids retyping NEXT SET or
            DIGITAL in a font, so the wordmark is part of the image and there is
            no text beside it. Width, not height, is set because the brand book
            specifies a 180px minimum display width. */}
        <Link href="/" className="flex items-center" aria-label="Next Set Digital home">
          <Image
            src="/brand/logo-primary-sand.png"
            alt="Next Set Digital"
            width={800}
            height={207}
            priority
            className="w-[180px] md:w-[210px] h-auto"
          />
        </Link>

        {/* The submenu opens on hover and on focus-within. It is hidden with
            opacity rather than `hidden` or `invisible` on purpose: both of
            those take the links out of the tab order, which would mean the
            panel could never be reached by keyboard to open in the first
            place. Tabbing into a child reveals it. */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {nav.map((n) => (
            <div key={n.href} className="relative group">
              <Link
                href={n.href}
                className="text-sm font-medium text-ink-soft hover:text-swell hover:underline underline-offset-8 decoration-2 transition-colors"
              >
                {n.label}
              </Link>
              {n.children && (
                <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-4 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                  <ul
                    className="min-w-[15rem] rounded-md border border-line bg-paper p-2 shadow-[0_18px_50px_-24px_rgba(18,32,58,0.55)]"
                    aria-label={n.label}
                  >
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded px-3 py-2.5 text-sm text-ink-soft hover:bg-cream hover:text-swell transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={site.phoneHref} className="text-sm font-semibold text-ink hover:text-swell hover:underline underline-offset-4 transition-colors">
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary !min-h-[2.6rem] !py-2 !px-4 text-sm">
            Book a consultation
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-md"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenedOn(open ? null : pathname)}
        >
          <span className="relative block w-6 h-4">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-cream border-t border-line">
          <nav className="container-x py-6 flex flex-col" aria-label="Mobile">
            {nav.map((n) => (
              <div key={n.href} className="border-b border-line">
                <Link
                  href={n.href}
                  onClick={close}
                  className="block py-4 text-xl font-display font-bold tracking-tight hover:text-swell"
                >
                  {n.label}
                </Link>
                {n.children && (
                  <ul className="pb-3 pl-4" aria-label={n.label}>
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={close}
                          className="block py-2 text-base text-ink-soft hover:text-swell"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" onClick={close} className="btn btn-primary w-full">
                Book a consultation
              </Link>
              <a href={site.phoneHref} className="btn btn-outline w-full">
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
