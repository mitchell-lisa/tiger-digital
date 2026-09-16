import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One landing page. One row of the Google Sheet becomes one of these.
 *
 * Field names follow the sheet's columns so the mapping stays obvious to
 * anyone comparing the two. Two rules from the sheet's import guide are
 * enforced here rather than left to convention:
 *
 *  - `reviewNotes` is internal and is never rendered on the public page.
 *  - `editorialStatus` is an editorial state, separate from publishing.
 *    Approved means approved to publish, not published. Publishing stays a
 *    deliberate action in the Studio.
 *
 * Image and testimonial fields are intentionally optional. They arrived blank
 * in the sheet, and their sections hide rather than render empty.
 */
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  groups: [
    { name: "content", title: "Page content", default: true },
    { name: "faq", title: "FAQs" },
    { name: "extras", title: "Image, quote & resource" },
    { name: "seo", title: "SEO" },
    { name: "admin", title: "Internal" },
  ],
  fields: [
    // --- identity -----------------------------------------------------
    defineField({
      name: "pageId",
      title: "Page ID",
      description:
        "Stable identifier from the sheet, e.g. sf-harvard. This is what links a row to this page on re-import. Do not change it.",
      type: "string",
      group: "admin",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Page name",
      description: "Internal name, used in lists. Not shown on the page.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "The last part of the web address. Lowercase and hyphens only.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "audienceName",
      title: "Audience / school name",
      description:
        "Who the page is written for. This names an intended reader, not a client, partner or endorsement.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "audienceLocation",
      title: "Audience location",
      description:
        "Where that audience is based. This is not a Tiger Digital office and not the acquired company's location.",
      type: "string",
      group: "content",
    }),

    // --- hero and body ------------------------------------------------
    defineField({
      name: "h1",
      title: "Headline (H1)",
      description: "The main heading. One per page.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroSubheading",
      title: "Sub-heading",
      type: "string",
      group: "content",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 5,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionHeading",
      title: "Section heading",
      type: "string",
      group: "content",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "sectionBody",
      title: "Section body",
      type: "text",
      rows: 6,
      group: "content",
    }),
    defineField({
      name: "affiliationNotice",
      title: "Affiliation notice",
      description:
        "Shown prominently on the page. States that Tiger Digital is independent and not affiliated with or endorsed by the named institution. Required.",
      type: "text",
      rows: 2,
      group: "content",
      // A disclaimer that does not deny anything is not a disclaimer. This
      // stops the notice being edited down to a sentence that merely mentions
      // the institution, and it blocks publishing if someone tries.
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" &&
            /not affiliated|no affiliation|independent|not endorsed/i.test(value)
              ? true
              : 'Must state the relationship plainly, e.g. "Independent service provider; not affiliated with or endorsed by ...".',
          ),
    }),

    // --- sections the editor can hide or reorder -----------------------
    defineField({
      name: "sectionOrder",
      title: "Section order",
      description:
        "Drag to reorder. Remove one to hide it. Only these sections exist; this is not a freeform page builder.",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Introduction", value: "intro" },
          { title: "Services", value: "services" },
          { title: "Section", value: "section" },
          { title: "Testimonial", value: "testimonial" },
          { title: "FAQs", value: "faq" },
          { title: "Further reading", value: "resource" },
          { title: "Call to action", value: "cta" },
        ],
      },
    }),

    // --- FAQs ----------------------------------------------------------
    defineField({
      name: "faqs",
      title: "FAQs",
      description:
        "Rendered visibly on the page and published as FAQ structured data. Because the structured data has to match what a visitor sees, do not add questions here that are not shown.",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    // --- optional extras -----------------------------------------------
    defineField({
      name: "heroImage",
      title: "Hero image",
      description:
        "Optional. The section hides if this is empty. Do not upload university logos or campus photography without rights to use them.",
      type: "image",
      group: "extras",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          description: "Describe the actual image. Write this after choosing the image, not before.",
          type: "string",
          validation: (rule) =>
            rule.custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) return "Alt text is required once an image is set.";
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "testimonialQuote",
      title: "Testimonial quote",
      description:
        "Optional. Only verified, approved quotations. Must not imply a relationship with the named institution. The section hides if empty.",
      type: "text",
      rows: 3,
      group: "extras",
    }),
    defineField({
      name: "testimonialAttribution",
      title: "Testimonial attribution",
      description: "Who said it. Required if there is a quote.",
      type: "string",
      group: "extras",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const doc = ctx.document as { testimonialQuote?: string } | undefined;
          if (doc?.testimonialQuote && !value) return "Attribution is required when there is a quote.";
          return true;
        }),
    }),
    defineField({
      name: "resourceLabel",
      title: "Further reading: label",
      type: "string",
      group: "extras",
    }),
    defineField({
      name: "resourceUrl",
      title: "Further reading: link",
      description: "An external page. Opens in a new tab and is marked as external.",
      type: "url",
      group: "extras",
    }),
    defineField({
      name: "resourceContext",
      title: "Further reading: context",
      description: "One factual sentence about the linked resource.",
      type: "text",
      rows: 2,
      group: "extras",
    }),

    // --- call to action -------------------------------------------------
    defineField({
      name: "ctaText",
      title: "Button text",
      description: "Leave blank to use the shared default.",
      type: "string",
      group: "content",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "ctaUrl",
      title: "Button link",
      description: "Leave blank to use the shared default.",
      type: "url",
      group: "content",
    }),

    // --- SEO -------------------------------------------------------------
    defineField({
      name: "seoTitle",
      title: "SEO title",
      description:
        "Shown in the browser tab and in search results. Length is a preview consideration, not a ranking threshold.",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "The summary under the title in search results.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "primaryKeyword",
      title: "Primary keyword",
      description:
        "Editorial hypothesis for internal reference. Volume and competition have not been validated. Not rendered on the page.",
      type: "string",
      group: "seo",
    }),

    // --- internal ---------------------------------------------------------
    defineField({
      name: "editorialStatus",
      title: "Editorial status",
      description:
        "Your team's review state. Approved means approved to publish - it does not publish the page. Publishing is a separate action.",
      type: "string",
      group: "admin",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Needs revision", value: "needs-revision" },
          { title: "Approved", value: "approved" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewNotes",
      title: "Review notes (internal only)",
      description: "Never shown on the public page. Notes for your team.",
      type: "text",
      rows: 4,
      group: "admin",
    }),
    defineField({
      name: "importSnapshot",
      title: "Last imported values",
      description:
        "Written by the importer. It is how a re-import can tell your edits apart from sheet changes, so your edits are never silently overwritten. Do not edit by hand.",
      type: "text",
      group: "admin",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", status: "editorialStatus" },
    prepare: ({ title, slug, status }) => ({
      title: title ?? "(untitled)",
      subtitle: `${status ?? "draft"} · /${slug ?? "no-slug"}`,
    }),
  },
});
