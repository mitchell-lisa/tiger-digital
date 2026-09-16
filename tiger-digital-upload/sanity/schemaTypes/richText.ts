import { defineArrayMember, defineType } from "sanity";

/**
 * The rich text allowed inside a section body.
 *
 * Deliberately narrow. Editors get sub-headings, bullets, bold, italic and
 * links - enough to structure a long passage so it can be read - but no
 * colours, fonts, sizes or embeds. The page keeps looking like the rest of the
 * site because there is no way to make it look like anything else.
 *
 * H1 is absent on purpose: the page already has one, and a second would be an
 * SEO mistake an editor should not be able to make by accident.
 */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Sub-heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                description:
                  "A page on this site (start with /) or a full external address.",
                validation: (rule) =>
                  rule.required().uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    }),
  ],
});
