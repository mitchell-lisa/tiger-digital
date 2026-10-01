/**
 * Does every published landing page actually load?
 *
 * The import can only report what is in Sanity. Whether a visitor gets the
 * page is a different question - it also depends on the deploy, the route and
 * the slug matching - and nothing was checking it. This asks the live site
 * directly.
 *
 * Reads the published perspective over the public API, so it needs no token.
 * Run with: node scripts/check-live-pages.mjs [--site=https://…]
 */
const arg = (name, fallback) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? fallback;

const site = arg("site", "https://www.tigerdigital.marketing").replace(/\/$/, "");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7yf56y02";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const query = `*[_type == "landingPage" && defined(slug.current)]{"slug": slug.current} | order(slug asc)`;
const url = `https://${projectId}.apicdn.sanity.io/v2026-09-16/data/query/${dataset}?query=${encodeURIComponent(query)}`;

const res = await fetch(url);
if (!res.ok) {
  console.error(`Could not read published pages from Sanity: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const { result } = await res.json();
const slugs = result.map((r) => r.slug);

if (slugs.length === 0) {
  console.error("Sanity reports no published landing pages. Nothing to check.");
  process.exit(1);
}

console.log(`Checking ${slugs.length} published page(s) against ${site}\n`);
let bad = 0;
for (const slug of slugs) {
  const target = `${site}/search-funds/${slug}`;
  let status = "ERR";
  try {
    // Follow redirects so a 301 to a 404 page is reported as the 404 it is.
    const r = await fetch(target, { redirect: "follow" });
    status = String(r.status);
    if (!r.ok) bad++;
  } catch (err) {
    bad++;
    status = `ERR ${err.message}`;
  }
  console.log(`  ${status === "200" ? "ok  " : "FAIL"} ${status.padEnd(4)} ${target}`);
}

console.log(
  bad === 0
    ? `\nAll ${slugs.length} published pages load.\n`
    : `\n${bad} of ${slugs.length} published pages do not load.\n`,
);
process.exit(bad === 0 ? 0 : 1);
