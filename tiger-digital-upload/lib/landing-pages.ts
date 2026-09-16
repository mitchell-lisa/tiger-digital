import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "@/lib/sanity/client";

/** Sections an editor may show, hide or reorder. Nothing else is renderable. */
export const SECTION_KEYS = [
  "intro",
  "services",
  "section",
  "testimonial",
  "faq",
  "related",
  "resource",
  "cta",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

/** Used when a page has no explicit order set. */
export const DEFAULT_SECTION_ORDER: SectionKey[] = [...SECTION_KEYS];

export type LandingPage = {
  pageId: string;
  title: string;
  slug: string;
  audienceName: string;
  audienceLocation?: string;
  h1: string;
  heroSubheading?: string;
  intro: string;
  contentSections?: { heading: string; body: PortableTextBlock[] }[];
  relatedLinks?: { label: string; href: string }[];
  affiliationNotice: string;
  sectionOrder?: SectionKey[];
  faqs?: { question: string; answer: string }[];
  heroImage?: { url: string; alt: string } | null;
  testimonialQuote?: string;
  testimonialAttribution?: string;
  resourceLabel?: string;
  resourceUrl?: string;
  resourceContext?: string;
  ctaText?: string;
  ctaUrl?: string;
  seoTitle: string;
  metaDescription: string;
};

export type SiteDefaults = {
  serviceBlocks: { heading: string; body: string }[];
  relatedLinks?: { label: string; href: string }[];
  defaultCtaText?: string;
  defaultCtaUrl?: string;
};

/**
 * Published pages only. Drafts live in Sanity's drafts perspective, which this
 * client never reads, so an unpublished page has no route, no sitemap entry
 * and nothing for a crawler to find.
 *
 * reviewNotes and primaryKeyword are deliberately not selected: they are
 * internal, and the surest way to keep them off the page is to never fetch
 * them.
 */
const PAGE_FIELDS = /* groq */ `
  pageId,
  title,
  "slug": slug.current,
  audienceName,
  audienceLocation,
  h1,
  heroSubheading,
  intro,
  contentSections[]{heading, body},
  relatedLinks[]{label, href},
  affiliationNotice,
  sectionOrder,
  faqs[]{question, answer},
  "heroImage": select(
    defined(heroImage.asset) => {"url": heroImage.asset->url, "alt": coalesce(heroImage.alt, "")},
    null
  ),
  testimonialQuote,
  testimonialAttribution,
  resourceLabel,
  resourceUrl,
  resourceContext,
  ctaText,
  ctaUrl,
  seoTitle,
  metaDescription
`;

/**
 * Every read is wrapped so a CMS outage degrades instead of failing.
 *
 * Without this, an unreachable Sanity during `next build` fails the whole
 * build and no page deploys - the marketing site would be taken down by a CMS
 * problem it does not otherwise depend on. Failing soft means a build during
 * an outage produces a site whose landing pages are missing from that build,
 * while everything already deployed keeps serving.
 */
async function safeFetch<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (err) {
    console.error(`[landing-pages] ${label} failed; continuing without CMS data.`, err);
    return fallback;
  }
}

export async function getLandingPageSlugs(): Promise<string[]> {
  const client = sanityClient;
  if (!client) return [];
  return safeFetch(
    "slug list",
    () =>
      client.fetch<string[]>(
        /* groq */ `*[_type == "landingPage" && defined(slug.current)].slug.current`,
      ),
    [],
  );
}

export async function getLandingPage(slug: string): Promise<LandingPage | null> {
  const client = sanityClient;
  if (!client) return null;
  return safeFetch(
    `page ${slug}`,
    () =>
      client.fetch<LandingPage | null>(
        /* groq */ `*[_type == "landingPage" && slug.current == $slug][0]{${PAGE_FIELDS}}`,
        { slug },
      ),
    null,
  );
}

export async function getSiteDefaults(): Promise<SiteDefaults | null> {
  const client = sanityClient;
  if (!client) return null;
  return safeFetch(
    "site defaults",
    () =>
      client.fetch<SiteDefaults | null>(
        /* groq */ `*[_type == "siteDefaults"][0]{serviceBlocks[]{heading, body}, relatedLinks[]{label, href}, defaultCtaText, defaultCtaUrl}`,
      ),
    null,
  );
}

/** Sections to render, in order, with anything the page has no content for removed. */
export function visibleSections(page: LandingPage, defaults: SiteDefaults | null): SectionKey[] {
  const order = page.sectionOrder?.length ? page.sectionOrder : DEFAULT_SECTION_ORDER;
  return order.filter((key) => {
    switch (key) {
      case "intro":
        return Boolean(page.intro);
      case "services":
        return Boolean(defaults?.serviceBlocks?.length);
      case "section":
        return Boolean(page.contentSections?.length);
      case "testimonial":
        return Boolean(page.testimonialQuote && page.testimonialAttribution);
      case "faq":
        return Boolean(page.faqs?.length);
      case "related":
        return Boolean((page.relatedLinks ?? defaults?.relatedLinks ?? []).length);
      case "resource":
        return Boolean(page.resourceUrl && page.resourceLabel);
      case "cta":
        return Boolean(page.ctaText ?? defaults?.defaultCtaText);
      default:
        return false;
    }
  });
}
