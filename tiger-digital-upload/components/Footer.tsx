import Link from "next/link";
import Image from "next/image";
import { site, builtBy } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-14 md:py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Deep Water banner on the Deep Water footer, so the artwork's own
              ground matches the band it sits on and reads as one surface. */}
          <Link href="/" className="inline-flex" aria-label="Next Set Digital home">
            <Image
              src="/brand/banner-deep-water.png"
              alt="Next Set Digital"
              width={1600}
              height={579}
              className="w-[220px] h-auto"
            />
          </Link>
          <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
            {site.legalName} · {site.city}, {site.stateLong}. Marketing for the next
            generation of owners: reviews, Google rankings, and ads.
          </p>
          <p className="mt-2 text-white/50 text-xs">Formerly {site.formerName}.</p>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Services</Link></li>
            <li><Link href="/search-funds" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Search Funds</Link></li>
            <li><Link href="/search-funds/self-funded" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Self-funded search</Link></li>
            <li><Link href="/search-funds/traditional" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Traditional search funds</Link></li>
            <li><Link href="/#results" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Results</Link></li>
            <li><Link href="/team" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Team</Link></li>
            <li><Link href="/contact" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.phoneHref} className="font-semibold hover:text-first-light hover:underline underline-offset-4 transition-colors">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-first-light hover:underline underline-offset-4 transition-colors break-all">
                {site.email}
              </a>
            </li>
            <li className="text-white/70">{site.city}, {site.stateLong}</li>
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-first-light hover:underline underline-offset-4 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/50 space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
            <div className="flex gap-x-5">
              <Link href="/privacy" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Privacy Statement</Link>
              <Link href="/terms" className="hover:text-first-light hover:underline underline-offset-4 transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between border-t border-white/[0.07] pt-2.5">
            <span>Results shown are from {site.name} client campaigns; individual results vary.</span>
            <span className="whitespace-nowrap">
              Website by{" "}
              {/* rel omits noreferrer on purpose so the referral shows up in MJL's analytics */}
              <a
                href={builtBy.url}
                target="_blank"
                rel="noopener"
                className="font-semibold text-white/70 hover:text-first-light transition-colors"
              >
                {builtBy.name}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
