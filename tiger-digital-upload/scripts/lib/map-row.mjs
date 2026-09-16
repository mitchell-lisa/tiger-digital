/**
 * Sheet row -> Sanity document shape.
 *
 * Split out from the importer so the mapping can be tested on its own. The
 * property that matters most here is determinism: mapping the same row twice
 * must produce an identical object, keys included, or every re-import would
 * look like a change and the three-way compare would raise conflicts that are
 * not real.
 */
/** The sheet's slug repeats the section name; the URL does not need to. */
const shortSlug = (slug) => slug.replace(/^search-fund-marketing-/, "").trim();

/** Slugs that already belong to hand-built pages under /search-funds. */
const RESERVED_SLUGS = new Set(["self-funded", "traditional"]);

const STATUS = { draft: "draft", "needs revision": "needs-revision", approved: "approved" };

/**
 * Plain sheet text becomes Portable Text: blank lines split paragraphs, and a
 * line ending in a colon becomes a sub-heading. Keys are derived from the
 * content rather than random, so re-importing unchanged text produces an
 * identical value and the three-way compare sees no change.
 */
function toRichText(text, keyPrefix) {
  const paras = String(text ?? "")
    .split(/\n\s*\n|\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.map((p, i) => ({
    _type: "block",
    _key: `${keyPrefix}-${i}`,
    style: p.length < 80 && p.endsWith(":") ? "h3" : "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${keyPrefix}-${i}-0`, text: p, marks: [] }],
  }));
}

/** Collect numbered column families: faq_1_*, faq_2_*, section_2_*, ... */
function numbered(row, test) {
  const found = [];
  for (const key of Object.keys(row)) {
    const n = test(key);
    if (n !== null && !found.includes(n)) found.push(n);
  }
  return found.sort((a, b) => a - b);
}

/** Fields the importer owns, in Sanity's shape. Anything not here is never touched. */
function mapRow(row) {
  // FAQs: any number of faq_<n>_question / faq_<n>_answer pairs.
  const faqs = [];
  for (const n of numbered(row, (k) => {
    const m = /^faq_(\d+)_question$/.exec(k);
    return m ? Number(m[1]) : null;
  })) {
    const q = row[`faq_${n}_question`];
    const a = row[`faq_${n}_answer`];
    if (q && a) faqs.push({ _key: `faq${n}`, question: q, answer: a });
  }

  // Sections: the original section_heading/section_body is section 1, then any
  // section_<n>_heading / section_<n>_body for further ones.
  const contentSections = [];
  if (row.section_heading && row.section_body) {
    contentSections.push({
      _type: "contentSection",
      _key: "section1",
      heading: row.section_heading,
      body: toRichText(row.section_body, "section1"),
    });
  }
  for (const n of numbered(row, (k) => {
    const m = /^section_(\d+)_heading$/.exec(k);
    return m ? Number(m[1]) : null;
  })) {
    const h = row[`section_${n}_heading`];
    const b = row[`section_${n}_body`];
    if (h && b) {
      contentSections.push({
        _type: "contentSection",
        _key: `section${n}`,
        heading: h,
        body: toRichText(b, `section${n}`),
      });
    }
  }

  const doc = {
    pageId: row.page_id,
    title: row.school_name,
    slug: { _type: "slug", current: shortSlug(row.slug) },
    audienceName: row.school_name,
    audienceLocation: row.school_location || undefined,
    h1: row.h1,
    heroSubheading: row.hero_subheading || undefined,
    intro: row.intro,
    clientExperience: row.client_experience || undefined,
    contentSections: contentSections.length ? contentSections : undefined,
    affiliationNotice: row.affiliation_notice,
    faqs: faqs.length ? faqs : undefined,
    resourceLabel: row.resource_label || undefined,
    resourceUrl: row.resource_url || undefined,
    resourceContext: row.resource_context || undefined,
    ctaText: row.cta_text || undefined,
    ctaUrl: row.cta_url || undefined,
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    primaryKeyword: row.primary_keyword || undefined,
    editorialStatus: STATUS[(row.status || "").toLowerCase()] ?? "draft",
    reviewNotes: row.review_notes || undefined,
  };
  // Testimonials only if both halves are present; a quote with no attribution
  // is worse than no quote.
  if (row.testimonial_quote && row.testimonial_attribution) {
    doc.testimonialQuote = row.testimonial_quote;
    doc.testimonialAttribution = row.testimonial_attribution;
  }
  for (const k of Object.keys(doc)) if (doc[k] === undefined) delete doc[k];
  return doc;
}


export { shortSlug, RESERVED_SLUGS, mapRow, toRichText };
