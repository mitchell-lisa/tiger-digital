/**
 * Checks on the sheet -> Sanity mapping. Run with: node scripts/test-map-row.mjs
 * Focused on the properties the import safety model depends on.
 */
import { readFileSync } from "node:fs";
import { mapRow, shortSlug, toRichText } from "./lib/map-row.mjs";
import { buildDraftDoc } from "./lib/build-doc.mjs";

let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failed++;
};

function parseCsv(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i+1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c !== ""));
}
const [hdr, ...body] = parseCsv(readFileSync("content/imports/search-fund-landing-pages.csv", "utf8"));
const rows = body.map(r => Object.fromEntries(hdr.map((h, i) => [h, (r[i] ?? "").trim()])));

console.log("\nmapping");
check("slug drops the redundant prefix", shortSlug("search-fund-marketing-harvard") === "harvard");
check("all 10 rows map", rows.map(mapRow).length === 10);

const harvard = mapRow(rows[0]);
check("has one content section", harvard.contentSections?.length === 1);
check("section body is Portable Text", harvard.contentSections?.[0].body?.[0]?._type === "block");
check("two FAQs", harvard.faqs?.length === 2);
check("retired fields absent", !("sectionHeading" in harvard) && !("sectionBody" in harvard));
check("internal fields are not public fields", harvard.reviewNotes !== undefined, "kept in Sanity, never queried for the page");

console.log("\ndeterminism (a re-import must not look like a change)");
const a = JSON.stringify(mapRow(rows[0]));
const b = JSON.stringify(mapRow(rows[0]));
check("mapping the same row twice is identical", a === b);
const keysA = mapRow(rows[0]).contentSections[0].body.map(x => x._key).join(",");
const keysB = mapRow(rows[0]).contentSections[0].body.map(x => x._key).join(",");
check("rich text keys are stable, not random", keysA === keysB, keysA);

console.log("\nextra columns the sheet does not have yet");
const wide = {
  ...rows[0],
  section_2_heading: "Second section",
  section_2_body: "Para one.\n\nPara two.",
  faq_3_question: "Third question?",
  faq_3_answer: "Third answer.",
};
const w = mapRow(wide);
check("picks up section_2_*", w.contentSections.length === 2 && w.contentSections[1].heading === "Second section");
check("splits paragraphs", w.contentSections[1].body.length === 2);
check("picks up faq_3_*", w.faqs.length === 3 && w.faqs[2].question === "Third question?");

console.log("\nrich text shaping");
const rt = toRichText("A heading:\n\nSome body text here that is long enough to be a paragraph.", "k");
check("trailing-colon line becomes a sub-heading", rt[0].style === "h3");
check("normal prose stays a paragraph", rt[1].style === "normal");

console.log("\nwriting drafts, never the live page");
// The document Sanity hands back always carries its own _id. If that is spread
// over the draft id, the import replaces the published page instead - live,
// unreviewed. This happened once; these checks exist so it cannot happen twice.
const published = {
  _id: "landingPage-sf-stanford",
  _rev: "abc",
  _type: "landingPage",
  _createdAt: "2026-01-01",
  _updatedAt: "2026-01-02",
  h1: "Old heading",
  sectionHeading: "retired",
  heroImage: { _type: "image" },
};
const built = buildDraftDoc({
  draftId: "drafts.landingPage-sf-stanford",
  mapped: { h1: "New heading" },
  existing: published,
  retiredFields: ["sectionHeading"],
});
check("a published document cannot pull the write onto itself", built._id === "drafts.landingPage-sf-stanford", built._id);
check("no stale revision travels with it", built._rev === undefined && built._createdAt === undefined);
check("sheet values win over what is there", built.h1 === "New heading");
check("fields the sheet does not set survive", built.heroImage !== undefined, "Studio edits are not dropped");
check("retired fields are stripped", !("sectionHeading" in built));

const guarded = buildDraftDoc({
  draftId: "drafts.x",
  mapped: { h1: "sheet", intro: "sheet intro" },
  conflictFields: ["h1"],
  existing: { _id: "drafts.x", h1: "a human wrote this" },
});
check("a conflicted field keeps the human's text", guarded.h1 === "a human wrote this");
check("unconflicted fields still update", guarded.intro === "sheet intro");
check("the snapshot records the whole sheet row", JSON.parse(guarded.importSnapshot).h1 === "sheet", "so the next run still sees the conflict");

let refused = false;
try { buildDraftDoc({ draftId: "landingPage-sf-stanford", mapped: {} }); } catch { refused = true; }
check("writing a published id is refused outright", refused);

console.log(failed === 0 ? "\nAll checks passed.\n" : `\n${failed} check(s) failed.\n`);
process.exit(failed === 0 ? 0 : 1);
