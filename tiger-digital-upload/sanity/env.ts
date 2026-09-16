/**
 * Sanity connection settings.
 *
 * projectId and dataset are public by design: they appear in every client-side
 * request the Studio makes, so committing them is not a leak. They are
 * defaulted here rather than left to env vars so the Studio works on any
 * deploy without per-environment setup; an env var still overrides, which is
 * how you would point a branch at a different dataset.
 *
 * Tokens are a different matter and are never read here.
 *
 * Everything is optional so the site still builds without Sanity configured,
 * which keeps CI green and keeps the marketing pages independent of the CMS.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7yf56y02";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned, not "latest": an API date is part of the contract. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-16";

export const isSanityConfigured = projectId.length > 0;
