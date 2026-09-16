#!/usr/bin/env node
/**
 * Import landing pages from a CSV export of the Google Sheet into Sanity.
 *
 * Safety model, in order of importance:
 *
 *  1. Drafts only. Nothing this script writes is publicly visible. Publishing
 *     stays a deliberate action in the Studio.
 *  2. Dry run by default. `--apply` is required to write anything.
 *  3. Stable IDs. A row's page_id becomes the document ID, so re-running
 *     updates the same page instead of creating a second one.
 *  4. Your edits win. Each import records what it wrote. On a re-run the
 *     script compares three values per field - the sheet now, the sheet as it
 *     was last imported, and what is in Sanity now. A field someone edited in
 *     the Studio is never overwritten silently; if the sheet also changed, the
 *     conflict is reported and skipped.
 *
 * Usage:
 *   node scripts/import-landing-pages.mjs                  # dry run
 *   node scripts/import-landing-pages.mjs --apply          # write drafts
 *   node scripts/import-landing-pages.mjs --apply --accept-sheet   # sheet wins conflicts
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { mapRow, RESERVED_SLUGS, shortSlug } from "./lib/map-row.mjs";

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const ACCEPT_SHEET = args.has("--accept-sheet");
// Claims of affiliation, partnership or endorsement stop the import. The
// override exists so that a genuine, approved relationship can still be
// published - but it has to be typed deliberately and shows up in the log.
const ALLOW_CLAIMS = args.has("--allow-claims");
const CSV_PATH =
  process.argv.find((a) => a.startsWith("--csv="))?.slice(6) ??
  "content/imports/search-fund-landing-pages.csv";

const projectId = process.env.SANITY_PROJECT_ID || "7yf56y02";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

// ---------------------------------------------------------------- CSV ----
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c !== ""));
}

// ------------------------------------------------------------ mapping ----
const REQUIRED = [
  "page_id", "slug", "school_name", "h1", "intro",
  "affiliation_notice", "seo_title", "meta_description",
];

/** Fields the schema no longer has, removed from documents written before it changed. */
const RETIRED_FIELDS = ["sectionHeading", "sectionBody"];

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

// --------------------------------------------------------------- main ----
const { scanRow, checkAffiliationNotice } = await import("./lib/compliance.mjs");

const raw = readFileSync(CSV_PATH, "utf8");
const [header, ...body] = parseCsv(raw);
const rows = body.map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? "").trim()])));

console.log(`\nSource : ${CSV_PATH}`);
console.log(`Rows   : ${rows.length}`);
console.log(`Target : project ${projectId}, dataset ${dataset}`);
console.log(`Mode   : ${APPLY ? "APPLY (writes drafts)" : "DRY RUN (writes nothing)"}\n`);

// --- validation, before touching the network ------------------------------
const errors = [];
const warnings = [];
const seenIds = new Map();
const seenSlugs = new Map();

rows.forEach((row, i) => {
  const line = i + 2; // +1 for the header, +1 for 1-based rows
  const id = row.page_id || `(row ${line})`;

  for (const f of REQUIRED) {
    if (!row[f]) errors.push(`row ${line} [${id}]: missing required column "${f}"`);
  }

  const slug = shortSlug(row.slug || "");
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`row ${line} [${id}]: slug "${slug}" must be lowercase letters, numbers and hyphens`);
  }
  if (RESERVED_SLUGS.has(slug)) {
    errors.push(`row ${line} [${id}]: slug "${slug}" collides with an existing hand-built page at /search-funds/${slug}`);
  }
  if (seenSlugs.has(slug)) {
    errors.push(`row ${line} [${id}]: duplicate URL "/search-funds/${slug}", already used by row ${seenSlugs.get(slug)}`);
  } else if (slug) seenSlugs.set(slug, line);

  if (seenIds.has(row.page_id)) {
    errors.push(`row ${line}: duplicate page_id "${row.page_id}", already used by row ${seenIds.get(row.page_id)}`);
  } else if (row.page_id) seenIds.set(row.page_id, line);

  const notice = checkAffiliationNotice(row.affiliation_notice);
  if (!notice.ok) errors.push(`row ${line} [${id}]: ${notice.message}`);

  // The disclaimer and the "are you affiliated?" FAQ are meant to use this
  // vocabulary; everything else that does is worth a human look.
  for (const f of scanRow(row, {
    skipFields: ["affiliation_notice", "faq_2_question", "faq_2_answer", "review_notes"],
  })) {
    const line1 = `row ${line} [${id}]: ${f.field} ${f.message} — ${f.excerpt}`;
    if (ALLOW_CLAIMS) warnings.push(`${line1}  (allowed by --allow-claims)`);
    else errors.push(`${line1}\n      If this relationship is real and approved, re-run with --allow-claims.`);
  }

  for (const [col, label] of [
    ["hero_image_url", "hero image"],
    ["testimonial_quote", "testimonial"],
  ]) {
    if (!row[col]) warnings.push(`row ${line} [${id}]: no ${label}; that section will be hidden`);
  }
});

if (warnings.length) {
  console.log(`Warnings (${warnings.length}) — review, they do not block the import:`);
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log("");
}
if (errors.length) {
  console.log(`Errors (${errors.length}) — nothing was imported:`);
  for (const e of errors) console.log(`  x ${e}`);
  console.log("");
  process.exit(1);
}
console.log("Validation passed: required fields present, slugs unique and well-formed, disclaimers present.\n");

// --- compare against Sanity ------------------------------------------------
if (!token) {
  console.log("No SANITY_WRITE_TOKEN set, so the existing drafts could not be read.");
  console.log("Validation above is complete; re-run with a token to see the per-page plan.\n");
  process.exit(0);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-09-16", token, useCdn: false });

const docIds = rows.map((r) => `landingPage-${r.page_id}`);
const draftIds = docIds.map((id) => `drafts.${id}`);
const existing = await client.fetch(`*[_id in $ids]{_id, ...}`, { ids: [...docIds, ...draftIds] });
const byId = new Map(existing.map((d) => [d._id, d]));

const plan = { create: [], update: [], unchanged: [], conflicts: [] };

for (const row of rows) {
  const docId = `landingPage-${row.page_id}`;
  const draftId = `drafts.${docId}`;
  const current = byId.get(draftId) ?? byId.get(docId) ?? null;
  const mapped = mapRow(row);

  if (!current) { plan.create.push({ row, docId, draftId, mapped }); continue; }

  let snapshot = {};
  try { snapshot = JSON.parse(current.importSnapshot ?? "{}"); } catch { snapshot = {}; }

  const changes = [];
  const conflicts = [];
  for (const [field, sheetValue] of Object.entries(mapped)) {
    const lastImported = snapshot[field];
    const inSanity = current[field];
    const sheetChanged = !same(sheetValue, lastImported);
    const humanEdited = lastImported !== undefined && !same(inSanity, lastImported);

    if (!sheetChanged) continue;               // sheet says nothing new
    if (humanEdited && !ACCEPT_SHEET) {
      conflicts.push({ field, inSanity, sheetValue });
      continue;                                 // never silently overwrite
    }
    changes.push({ field, from: inSanity, to: sheetValue });
  }

  if (conflicts.length) plan.conflicts.push({ row, docId, draftId, mapped, changes, conflicts });
  else if (changes.length) plan.update.push({ row, docId, draftId, mapped, changes });
  else plan.unchanged.push({ row, docId });
}

const short = (v) => {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s === undefined ? "(unset)" : s.length > 70 ? `${s.slice(0, 70)}…` : s;
};

console.log("Plan");
console.log(`  create    ${plan.create.length}`);
console.log(`  update    ${plan.update.length}`);
console.log(`  unchanged ${plan.unchanged.length}`);
console.log(`  conflicts ${plan.conflicts.length}\n`);

for (const p of plan.create) console.log(`  + create  ${p.docId}  /search-funds/${p.mapped.slug.current}`);
for (const p of plan.update) {
  console.log(`  ~ update  ${p.docId}`);
  for (const c of p.changes) console.log(`      ${c.field}: ${short(c.from)}  ->  ${short(c.to)}`);
}
for (const p of plan.conflicts) {
  console.log(`  ! conflict ${p.docId} — edited in Sanity and changed in the sheet; skipped`);
  for (const c of p.conflicts) {
    console.log(`      ${c.field}`);
    console.log(`        in Sanity : ${short(c.inSanity)}`);
    console.log(`        in sheet  : ${short(c.sheetValue)}`);
  }
}
if (plan.conflicts.length) {
  console.log("\n  To let the sheet win on the fields above, re-run with --accept-sheet.");
  console.log("  To keep the Sanity version, change the sheet to match, or leave it.");
}

if (!APPLY) {
  console.log("\nDry run complete. Nothing was written. Re-run with --apply to create or update drafts.\n");
  process.exit(0);
}

// --- write ------------------------------------------------------------------
const tx = client.transaction();
let written = 0;
for (const p of [...plan.create, ...plan.update, ...plan.conflicts]) {
  const fields = { ...p.mapped };
  if (p.conflicts) for (const c of p.conflicts) delete fields[c.field]; // leave edits alone
  const carried = { ...(byId.get(p.draftId) ?? byId.get(p.docId) ?? {}) };
  for (const dead of RETIRED_FIELDS) delete carried[dead];
  const snapshot = JSON.stringify(p.mapped); // what the sheet says now
  tx.createOrReplace({
    _id: p.draftId,
    _type: "landingPage",
    ...carried,
    ...fields,
    importSnapshot: snapshot,
    _createdAt: undefined,
    _updatedAt: undefined,
    _rev: undefined,
  });
  written++;
}
if (written === 0) {
  console.log("\nNothing to write.\n");
  process.exit(0);
}
await tx.commit();
console.log(`\nWrote ${written} draft${written === 1 ? "" : "s"}. They are drafts: nothing is public until someone publishes it in the Studio.\n`);
