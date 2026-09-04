"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/#results", label: "Results" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-line">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label="Tiger Digital home">
          <Image src="/seal.png" alt="" width={1024} height={1024} priority className="h-11 md:h-14 w-auto" />
          <span className="font-display font-bold tracking-tight text-xl md:text-2xl leading-none">
            Tiger Digital
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={site.phoneHref} className="text-sm font-semibold text-ink hover:text-tiger transition-colors">
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
          onClick={() => setOpen((o) => !o)}
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
              <Link
                key={n.href}
                href={n.href}
                className="py-4 text-xl font-display font-bold tracking-tight border-b border-line"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className="btn btn-primary w-full">
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
