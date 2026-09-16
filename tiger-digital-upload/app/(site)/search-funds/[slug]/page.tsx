import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import { getLandingPage, getLandingPageSlugs, getSiteDefaults } from "@/lib/landing-pages";
import { site } from "@/lib/site";

/**
 * CMS-driven landing pages, one per published document.
 *
 * Availability: every published page is prerendered at build time and then
 * revalidated in the background on the interval below. Visitors are served the
 * cached HTML, so if Sanity is unreachable the published pages stay up - what
 * stops is the next refresh, not the page. A page published while Sanity is
 * down simply does not appear until it can be fetched.
 *
 * Static routes at this level (self-funded, traditional) take precedence over
 * this dynamic segment, so a CMS slug can never take one of them over.
 */
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getLandingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return {};
  return {
    // `absolute` bypasses the site-wide "%s | Tiger Digital" template. The
    // sheet's seo_title column already carries the brand, and without this the
    // tab reads "... | Tiger Digital | Tiger Digital".
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    alternates: { canonical: `/search-funds/${page.slug}` },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `${site.url}/search-funds/${page.slug}`,
      type: "article",
    },
  };
}

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, defaults] = await Promise.all([getLandingPage(slug), getSiteDefaults()]);
  if (!page) notFound();

  // FAQ structured data is generated only from the questions actually rendered
  // on the page, so the markup can never describe content a visitor cannot see.
  const faqSchema =
    page.faqs && page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <LandingPageTemplate page={page} defaults={defaults} />
    </>
  );
}
