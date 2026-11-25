"use client";

import { useState } from "react";
import { dealStages, roles } from "@/lib/diligence";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Snapshot request form. Posts to the same /api/contact route as the
 * consultation form, so there is one place where a lead can go missing rather
 * than two, and the same mailto fallback applies when the server cannot send.
 */
function mailtoDraft(data: Record<string, string>) {
  const subject = `Marketing diligence snapshot request from ${data.name || "the website"}${
    data.business ? ` (${data.business})` : ""
  }`;
  const body = [
    `Name: ${data.name || ""}`,
    `Email: ${data.email || ""}`,
    `Phone: ${data.phone || ""}`,
    `Role: ${data.role || ""}`,
    `Business or website: ${data.business || ""}`,
    `City and state: ${data.location || ""}`,
    `Deal stage: ${data.stage || ""}`,
    "",
    data.message || "",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Tells GTM a request went through, so the submit can be counted as a
 * conversion without a tag having to guess from a thank-you page that does
 * not exist. Guarded because dataLayer is absent until GTM loads, and an ad
 * blocker can stop it loading at all.
 */
function trackSubmit(data: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "diligence_snapshot_request",
    form_name: "marketing_diligence_snapshot",
    // No name, email or phone: this goes to a third party, and the lead
    // itself arrives by email anyway.
    lead_role: data.role ?? "",
    deal_stage: data.stage ?? "",
  });
}

export default function DiligenceForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formName: "Marketing diligence snapshot" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackSubmit(data);
      setStatus("sent");
      form.reset();
    } catch {
      setDraft(mailtoDraft(data));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-line bg-paper p-8">
        <p className="font-display font-bold text-2xl tracking-tight">Got it, thanks.</p>
        <p className="mt-2 text-muted leading-relaxed">
          We will send the snapshot within about 48 hours. If the deal is moving faster than
          that, call{" "}
          <a href={site.phoneHref} className="font-semibold text-ink">
            {site.phone}
          </a>{" "}
          and say it is under LOI.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-md border border-line bg-paper px-3.5 py-3 text-base outline-none focus:border-swell focus:ring-2 focus:ring-swell/25";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input name="name" required autoComplete="name" className={`${field} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className={`${field} mt-1.5`} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium">
            Phone <span className="text-muted font-normal">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={`${field} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Your role</span>
          <select name="role" required className={`${field} mt-1.5`} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">Business name or website</span>
        <input name="business" required className={`${field} mt-1.5`} />
      </label>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium">City and state</span>
          <input name="location" required className={`${field} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Deal stage</span>
          <select name="stage" required className={`${field} mt-1.5`} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {dealStages.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">
          Notes <span className="text-muted font-normal">(optional)</span>
        </span>
        <textarea name="message" rows={4} className={`${field} mt-1.5`} />
      </label>

      {status === "error" && (
        <div className="rounded-md border border-line bg-cream p-5">
          <p className="text-sm text-ink-soft leading-relaxed">
            That did not go through from the website. Nothing you typed is lost: send it straight
            from your own email instead, or call{" "}
            <a href={site.phoneHref} className="font-semibold text-ink underline">
              {site.phone}
            </a>
            .
          </p>
          <a href={draft} className="btn btn-outline mt-4 w-full sm:w-auto">
            Send from your email app
          </a>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Request a free snapshot"}
      </button>
    </form>
  );
}
