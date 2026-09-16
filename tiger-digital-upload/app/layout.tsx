import type { Metadata } from "next";
import { Libre_Baskerville, Almarai } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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

/**
 * Root layout: document shell and fonts only.
 *
 * The marketing site's chrome lives in app/(site)/layout.tsx so that /studio,
 * which also sits under this root, renders as a full-height application
 * without the site header, footer or analytics.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
