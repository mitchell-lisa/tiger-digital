import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/LegalDoc";
import { termsOfService } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms of service that govern use of ${site.name}'s website and services.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-14 md:py-20">
          <div className="rule rule-light max-w-2xl">
            <p className="eyebrow text-tiger-light">Legal</p>
            <h1 className="display mt-3 text-3xl sm:text-5xl">Terms of Service</h1>
            <p className="mt-5 text-white/70 leading-relaxed">
              These terms govern your access to and use of the {site.name} website and services.
              Please also read our{" "}
              <Link href="/privacy" className="text-tiger-light underline underline-offset-4">
                Privacy Statement
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <LegalDoc source={termsOfService} />
      </section>
    </>
  );
}
