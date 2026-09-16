import { defineField, defineType } from "sanity";

/**
 * STUB. Deliberately minimal.
 *
 * The full field set (headline, intro, service content, images and alt text,
 * testimonials, FAQs, CTAs, SEO title, meta description, and which of those
 * are page overrides of a site default) is not modelled yet, because it has to
 * match the real Google Sheet columns. Guessing the mapping now would mean
 * rebuilding the schema and re-importing once the sheet is reviewed.
 *
 * This exists so the Studio has a working document type to connect with.
 */
export const locationPage = defineType({
  name: "locationPage",
  title: "Location page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page name",
      description: "Internal name, shown in the Studio list. Not the SEO title.",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "The path segment for this page. Lowercase, hyphenated.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
