/**
 * Sanity connection settings.
 *
 * projectId and dataset are public by design: they appear in client-side
 * requests and are safe in the repo's env example. Tokens are not, and are
 * never read here.
 *
 * Everything is optional so the site still builds without Sanity configured,
 * which keeps CI green and keeps the marketing pages independent of the CMS.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned, not "latest": an API date is part of the contract. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-16";

export const isSanityConfigured = projectId.length > 0;
