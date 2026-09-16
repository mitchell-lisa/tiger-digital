/**
 * Editorial guardrails for pages that name third-party institutions.
 *
 * These are lint rules, not legal advice. They catch the drift that happens
 * when copy gets edited months later by someone who was not in the original
 * conversation: a disclaimer quietly deleted, or a line that turns "written
 * for people at X" into "we work with X".
 *
 * The distinction that matters is assertion versus denial. "Not affiliated
 * with Harvard" is the disclaimer working; "affiliated with Harvard" is a
 * claim. A naive keyword scan flags both, so every pattern here checks for a
 * nearby negation first.
 */

/** Words that turn a claim into a denial when they appear just before it. */
const NEGATORS =
  /\b(not|no|never|isn'?t|aren'?t|does ?n'?t|do ?n'?t|without|independent of|unaffiliated)\b/i;

/** True if the 60 characters before `index` negate whatever follows. */
function isNegated(text, index) {
  return NEGATORS.test(text.slice(Math.max(0, index - 60), index));
}

const CLAIM_PATTERNS = [
  { id: "affiliation", re: /\baffiliat(ed|ion)\b/gi, message: "asserts an affiliation" },
  { id: "partnership", re: /\b(partner|partnership|partnered)\b/gi, message: "asserts a partnership" },
  { id: "endorsement", re: /\bendorse(d|ment|s)?\b/gi, message: "asserts an endorsement" },
  { id: "official", re: /\bofficial\b/gi, message: 'claims to be "official"' },
  { id: "sponsorship", re: /\bsponsor(ed|ship)?\b/gi, message: "asserts a sponsorship" },
  { id: "accreditation", re: /\b(accredited|certified by|approved by)\b/gi, message: "asserts accreditation or approval" },
  { id: "agency-of", re: /\b(on behalf of|representing)\b/gi, message: "claims to act for another party" },
];

/** Trademark symbols should not appear in our own body copy. */
const TM_SYMBOL = /[®™]/g;

/**
 * A disclaimer only works if it actually denies something. This checks the
 * notice says so rather than merely mentioning the institution.
 */
export function checkAffiliationNotice(notice) {
  if (!notice || !notice.trim()) {
    return { ok: false, message: "affiliation notice is empty" };
  }
  const denies = /\bnot affiliated\b|\bno affiliation\b|\bindependent\b|\bnot endorsed\b/i.test(notice);
  return denies
    ? { ok: true }
    : { ok: false, message: 'affiliation notice does not actually deny affiliation (expected wording like "independent" or "not affiliated with")' };
}

/**
 * Scan one row's public-facing fields. `skipFields` exists because the
 * disclaimer and the "Is Tiger Digital affiliated with...?" FAQ are supposed
 * to use this vocabulary.
 */
export function scanRow(row, { skipFields = [] } = {}) {
  const findings = [];
  for (const [field, raw] of Object.entries(row)) {
    if (skipFields.includes(field)) continue;
    const value = String(raw ?? "");
    if (!value) continue;

    for (const { id, re, message } of CLAIM_PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(value)) !== null) {
        if (isNegated(value, m.index)) continue;
        findings.push({
          level: "warn",
          rule: id,
          field,
          message,
          excerpt: excerpt(value, m.index),
        });
      }
    }

    TM_SYMBOL.lastIndex = 0;
    let t;
    while ((t = TM_SYMBOL.exec(value)) !== null) {
      findings.push({
        level: "warn",
        rule: "tm-symbol",
        field,
        message: "contains a trademark symbol; do not reproduce another party's marks",
        excerpt: excerpt(value, t.index),
      });
    }
  }
  return findings;
}

function excerpt(value, index) {
  return `…${value.slice(Math.max(0, index - 40), index + 50).replace(/\s+/g, " ")}…`;
}
