import Link from "next/link";
import { site } from "@/lib/site";

// Sky is the brand's light-blue ground; First Light is for bars and for text
// on navy. Type on Sky is always Deep Water, never white.
export default function CTABand() {
  return (
    <section className="bg-sky text-ink">
      <div className="container-x py-14 md:py-20 grid gap-8 md:grid-cols-[1fr_auto] items-center">
        <div>
          <div>
            <h2 className="display text-2xl sm:text-3xl lg:text-4xl">
              Let&rsquo;s find out what&rsquo;s holding your business back.
            </h2>
            <p className="mt-3 text-ink-soft text-lg max-w-xl">
              Schedule a short call with our team to discuss what&rsquo;s holding your business back
              and how we can help.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-3">
          <Link href="/contact" className="btn btn-primary">
            Book a consultation
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
