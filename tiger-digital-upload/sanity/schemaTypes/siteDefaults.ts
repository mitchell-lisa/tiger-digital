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
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        }),
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
