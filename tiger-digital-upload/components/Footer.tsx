import Link from "next/link";
import Image from "next/image";
import { site, builtBy } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-14 md:py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4" aria-label="Tiger Digital home">
            <Image src="/seal-light.png" alt="" width={1024} height={1024} className="h-20 w-auto" />
            <span className="font-display font-bold tracking-tight text-2xl leading-none">
              Tiger Digital
            </span>
          </Link>
          <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
            {site.legalName} · {site.city}, {site.stateLong}. Marketing for acquisition
            entrepreneurs: reviews, Google rankings, and ads.
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services" className="hover:text-tiger-light transition-colors">Services</Link></li>
            <li><Link href="/#results" className="hover:text-tiger-light transition-colors">Results</Link></li>
            <li><Link href="/team" className="hover:text-tiger-light transition-colors">Team</Link></li>
            <li><Link href="/contact" className="hover:text-tiger-light transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.phoneHref} className="font-semibold hover:text-tiger-light transition-colors">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-tiger-light transition-colors break-all">
                {site.email}
              </a>
            </li>
            <li className="text-white/70">{site.city}, {site.stateLong}</li>
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-tiger-light transition-colors">
              Instagram
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-tiger-light transition-colors">
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
              <Link href="/privacy" className="hover:text-tiger-light transition-colors">Privacy Statement</Link>
              <Link href="/terms" className="hover:text-tiger-light transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between border-t border-white/[0.07] pt-2.5">
            <span>Results shown are from Tiger Digital client campaigns; individual results vary.</span>
            <span className="whitespace-nowrap">
              Website by{" "}
              {/* rel omits noreferrer on purpose so the referral shows up in MJL's analytics */}
              <a
                href={builtBy.url}
                target="_blank"
                rel="noopener"
                className="font-semibold text-white/70 hover:text-tiger-light transition-colors"
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
