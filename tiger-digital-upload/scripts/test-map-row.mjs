/**
 * Checks on the sheet -> Sanity mapping. Run with: node scripts/test-map-row.mjs
 * Focused on the properties the import safety model depends on.
 */
import { readFileSync } from "node:fs";
import { mapRow, shortSlug, toRichText } from "./lib/map-row.mjs";

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

console.log(failed === 0 ? "\nAll checks passed.\n" : `\n${failed} check(s) failed.\n`);
process.exit(failed === 0 ? 0 : 1);
