import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * Called by a Sanity webhook when a landing page is published, unpublished or
 * deleted, so the live site picks the change up in seconds instead of waiting
 * for the hourly revalidation or the next deploy.
 *
 * Why this exists: the pages are prerendered and cached, which is what keeps
 * them online when the CMS is not. The cost of that is that publishing alone
 * does not change what visitors are served. This endpoint is the missing link.
 *
 * Auth is a shared secret, compared in constant time. Without a matching
 * secret the request is refused and nothing is revalidated, so the endpoint
 * cannot be used by anyone else to churn the cache.
 *
 * Required env var on Vercel:
 *   SANITY_REVALIDATE_SECRET   any long random string, same value in the
 *                              Sanity webhook's secret field
 */
export const runtime = "nodejs";

function secretMatches(provided: string | null): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, which would itself leak length.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const provided =
    req.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret");

  if (!secretMatches(provided)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: string } = {};
  try {
    body = await req.json();
  } catch {
    // A webhook with no body still means "something changed": fall through and
    // refresh the index rather than failing.
  }

  const revalidated: string[] = [];

  if (body.slug) {
    revalidatePath(`/search-funds/${body.slug}`);
    revalidated.push(`/search-funds/${body.slug}`);
  }

  // Shared defaults appear on every landing page, so a change there has to
  // refresh all of them, not one.
  if (body._type === "siteDefaults") {
    revalidatePath("/search-funds/[slug]", "page");
    revalidated.push("/search-funds/[slug]");
  }

  // The sitemap lists published pages, so it changes whenever one does.
  revalidatePath("/sitemap.xml");
  revalidated.push("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated, at: new Date().toISOString() });
}

/** A GET is useful for checking the route is deployed. It reveals nothing. */
export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST with the shared secret to revalidate." });
}
