import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: `Talk to Tiger Digital about reviews, local search, and paid ads. Call ${site.phone} or send a note and Joe will be in touch.`,
};

export default function ContactPage() {
  return (
    <section className="container-x py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <div className="rule">
          <p className="eyebrow text-tiger">Consultation</p>
          <h1 className="display mt-3 text-3xl sm:text-4xl">Let's work together.</h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Tell us a little about your business and what you want to improve. We'll take a look at your
            reviews, map coverage, and ad spend before we talk, so the call is useful from minute one.
          </p>
        </div>
        <dl className="mt-10 space-y-6">
          <div>
            <dt className="eyebrow text-muted">Call</dt>
            <dd className="mt-1.5">
              <a href={site.phoneHref} className="font-display font-bold text-2xl tracking-tight hover:text-tiger transition-colors">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Email</dt>
            <dd className="mt-1.5">
              <a href={`mailto:${site.email}`} className="font-semibold text-lg hover:text-tiger transition-colors break-all">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Based in</dt>
            <dd className="mt-1.5 text-lg">{site.city}, {site.stateLong} · working with clients nationwide</dd>
          </div>
        </dl>
      </div>
      <div className="bg-paper border border-line rounded-lg p-6 sm:p-8">
        <ContactForm />
      </div>
    </section>
  );
}
