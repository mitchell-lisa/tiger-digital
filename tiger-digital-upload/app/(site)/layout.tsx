import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { publishedReviews, site } from "@/lib/site";

/**
 * Layout for the public marketing site.
 *
 * Analytics, the business structured data, the header and the footer live here
 * rather than in the root layout so that /studio - which shares the root - gets
 * a clean full-height page with no site chrome and no tracking on internal CMS
 * usage.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/logo.png`,
  telephone: "+1-856-924-9880",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.streetAddress,
    addressLocality: site.city,
    addressRegion: site.state,
    postalCode: site.postalCode,
    addressCountry: "US",
  },
  areaServed: "United States",
  sameAs: [site.social.linkedin, site.social.facebook],
  founder: { "@type": "Person", name: "Joe DiMarino" },
  knowsAbout: ["Local SEO", "Google Ads", "AI search visibility", "Reputation management"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: publishedReviews.ratingValue,
    reviewCount: publishedReviews.reviewCount,
  },
  review: publishedReviews.items.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    datePublished: r.datePublished,
    name: r.name,
    reviewBody: r.body,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  })),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Tag Manager, for visitors with JavaScript disabled. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
