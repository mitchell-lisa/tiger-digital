/**
 * Value comparison for the three-way merge.
 *
 * The naive version was `JSON.stringify(a) === JSON.stringify(b)`, which is
 * key-order sensitive. Sanity returns a document's object keys in its own
 * order, the mapper builds them in the sheet's order, and the two rarely
 * agree - so any field holding objects (faqs, contentSections, relatedLinks)
 * compared unequal no matter what it contained.
 *
 * That lay hidden because the importer only asks "did a human edit this?"
 * once the sheet has changed the same field, and until the rebrand the sheet
 * had never changed one. The moment it did, all ten pages reported a conflict
 * on `faqs` that nobody had touched. False conflicts are worse than no
 * conflict detection: the fix is to re-run with --accept-sheet, which turns
 * off the protection entirely.
 *
 * Object key order carries no meaning, so it is normalised away. Array order
 * does carry meaning - FAQ one is not FAQ two - so it is preserved.
 */

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, canonical(value[k])]),
    );
  }
  return value;
}

/** True when two values hold the same content, whatever order the keys are in. */
export function same(a, b) {
  return JSON.stringify(canonical(a ?? null)) === JSON.stringify(canonical(b ?? null));
}

export { canonical };
