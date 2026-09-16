import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/LegalDoc";
import { privacyStatement } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: `How ${site.name} collects, uses, shares, and protects the information you provide.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-14 md:py-20">
          <div className="rule rule-light max-w-2xl">
            <p className="eyebrow text-tiger-light">Legal</p>
            <h1 className="display mt-3 text-3xl sm:text-5xl">Privacy Statement</h1>
            <p className="mt-5 text-white/70 leading-relaxed">
              How we collect, use, share, and protect the information you provide. This statement
              works alongside our{" "}
              <Link href="/terms" className="text-tiger-light underline underline-offset-4">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <LegalDoc source={privacyStatement} />
      </section>
    </>
  );
}
