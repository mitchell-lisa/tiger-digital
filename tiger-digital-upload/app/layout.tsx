import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/**
 * Archivo carries the whole site, per the brand book: 800 for headlines, 600
 * for labels, 400 for body. Newsreader italic is loaded for pull quotes and
 * testimonials only.
 *
 * Both are self-hosted by next/font rather than fetched from Google at
 * runtime, which is why the brand tokens' @import is not used: it would block
 * rendering on a third-party request and shift the layout when it lands.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Marketing for the Next Generation of Owners`,
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

/**
 * Root layout: document shell and fonts only.
 *
 * The marketing site's chrome lives in app/(site)/layout.tsx so that /studio,
 * which also sits under this root, renders as a full-height application
 * without the site header, footer or analytics.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
