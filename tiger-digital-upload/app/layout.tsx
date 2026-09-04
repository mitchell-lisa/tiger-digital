import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Baskerville, Almarai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { publishedReviews, site } from "@/lib/site";

// Same two faces the live tigerdigital.marketing site uses.
const display = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sans = Almarai({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Marketing for Acquisition Entrepreneurs`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

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
  sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
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
      </body>
    </html>
  );
}
