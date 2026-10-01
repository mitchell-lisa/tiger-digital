/**
 * Assemble the document the importer writes.
 *
 * Split out from the importer because it is the last line of defence on the
 * one promise this system makes: an import writes drafts, never the published
 * document. That promise was broken once by spreading the fetched document
 * over the id - Sanity returns `_id` on every document, so `{_id: draftId,
 * ...existing}` silently resolves to the published id and the import goes
 * live unreviewed. Every system field is stripped here for that reason, and
 * the id is asserted rather than assumed.
 */

/** Sanity's own fields. Carrying any of them forward corrupts the write. */
const SYSTEM_FIELDS = ["_id", "_rev", "_type", "_createdAt", "_updatedAt"];

/**
 * @param draftId      the id to write, which must be a draft
 * @param mapped       what the sheet says now
 * @param conflictFields fields a human edited; left as they are in Sanity
 * @param existing     the document currently in Sanity, draft or published
 * @param retiredFields fields the schema no longer has
 */
export function buildDraftDoc({
  draftId,
  mapped,
  conflictFields = [],
  existing = {},
  retiredFields = [],
}) {
  if (!draftId?.startsWith("drafts.")) {
    throw new Error(`refusing to write "${draftId}": imports write drafts only`);
  }

  const carried = { ...existing };
  for (const dead of [...SYSTEM_FIELDS, ...retiredFields]) delete carried[dead];

  const fields = { ...mapped };
  for (const field of conflictFields) delete fields[field];

  return {
    ...carried,
    ...fields,
    importSnapshot: JSON.stringify(mapped), // what the sheet says now
    _type: "landingPage",
    _id: draftId, // last, so nothing can overwrite it
  };
}
