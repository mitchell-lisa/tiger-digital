import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Shared content, edited once and reused by every landing page.
 *
 * The import guide calls for the two service blocks to live in one place
 * rather than being copied onto all ten rows, so a wording change is one edit
 * instead of ten. Pages may override the intro line; the service blocks
 * themselves are shared only.
 */
export const siteDefaults = defineType({
  name: "siteDefaults",
  title: "Shared defaults",
  type: "document",
  groups: [
    { name: "services", title: "Service blocks", default: true },
    { name: "proof", title: "Proof & checklist" },
    { name: "cta", title: "Call to action" },
  ],
  fields: [
    defineField({
      name: "serviceBlocks",
      title: "Service blocks",
      description:
        "Shown on every landing page. Edit here and every page updates. Wording is based on the current services page.",
      type: "array",
      group: "services",
      validation: (rule) => rule.min(1).max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceBlock",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(400),
            }),
            defineField({
              name: "steps",
              title: "What the work is",
              description:
                "The concrete steps under this service. Short lines, not paragraphs - this is what turns a one-sentence service claim into something a reader can judge.",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "proofPoints",
      title: "Verified results",
      description:
        "Figures we can stand behind. Each carries the basis it came from, because a number without its period and client count is not evidence.",
      type: "array",
      group: "proof",
      of: [
        defineArrayMember({
          type: "object",
          name: "proofPoint",
          fields: [
            defineField({ name: "value", title: "Figure", type: "string", validation: (r) => r.required().max(20) }),
            defineField({ name: "label", title: "What it measures", type: "text", rows: 2, validation: (r) => r.required() }),
            defineField({
              name: "basis",
              title: "Basis",
              description: "Period, client count, and where it was measured. Leave blank only when the figure needs no qualifier.",
              type: "string",
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "proofDisclaimer",
      title: "Results disclaimer",
      description: "Shown under the figures. Required whenever any figure is shown.",
      type: "text",
      rows: 2,
      group: "proof",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const doc = ctx.document as { proofPoints?: unknown[] } | undefined;
          if (doc?.proofPoints?.length && !value) return "A disclaimer is required when figures are shown.";
          return true;
        }),
    }),
    defineField({
      name: "transitionChecklist",
      title: "What breaks at close (checklist)",
      description:
        "Headings only, linking to the full explanation elsewhere on the site. Deliberately not the full prose: repeating several hundred words on every landing page would make each page proportionally less distinctive, not more useful.",
      type: "object",
      group: "proof",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "linkLabel", title: "Link label", type: "string" }),
        defineField({ name: "linkHref", title: "Link path", type: "string" }),
      ],
    }),
    defineField({
      name: "relatedLinks",
      title: "Related pages (shown on every landing page)",
      description:
        "Internal links to deeper material elsewhere on the site. A page can override these with its own.",
      type: "array",
      group: "services",
      of: [
        defineArrayMember({
          type: "object",
          name: "relatedLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required().max(90) }),
            defineField({ name: "href", title: "Path", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "defaultCtaText",
      title: "Default button text",
      description: "Used when a page leaves its own call-to-action text blank.",
      type: "string",
      group: "cta",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "defaultCtaUrl",
      title: "Default button link",
      type: "url",
      group: "cta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Shared defaults" }),
  },
});
