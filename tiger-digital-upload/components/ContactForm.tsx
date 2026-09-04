"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Builds a mailto: link carrying everything the visitor typed.
 * This is the fallback when the server cannot send the message itself,
 * so a lead is never lost to an outage or a missing RESEND_API_KEY.
 */
function mailtoDraft(data: Record<string, string>) {
  const subject = `Consultation request from ${data.name || "the website"}${
    data.business ? ` (${data.business})` : ""
  }`;
  const body = [
    `Name: ${data.name || ""}`,
    `Business: ${data.business || ""}`,
    `Email: ${data.email || ""}`,
    `Phone: ${data.phone || ""}`,
    `Looking to improve: ${data.interest || ""}`,
    "",
    data.message || "",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setDraft(mailtoDraft(data as Record<string, string>));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-line bg-paper p-8">
        <p className="font-display font-bold text-2xl tracking-tight">Got it, thanks.</p>
        <p className="mt-2 text-muted">
          Joe will be in touch shortly. If it's urgent, call{" "}
          <a href={site.phoneHref} className="font-semibold text-ink">{site.phone}</a>.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-md border border-line bg-paper px-3.5 py-3 text-base outline-none focus:border-tiger focus:ring-2 focus:ring-tiger/25";

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
          <span className="text-sm font-medium">Business</span>
          <input name="business" required autoComplete="organization" className={`${field} mt-1.5`} />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className={`${field} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={`${field} mt-1.5`} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium">What are you looking to improve?</span>
        <select name="interest" className={`${field} mt-1.5`} defaultValue="">
          <option value="" disabled>Choose one</option>
          <option>Local search and map rankings</option>
          <option>Paid advertising</option>
          <option>Reviews and reputation</option>
          <option>Not sure, help me figure it out</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Anything else we should know?</span>
        <textarea name="message" rows={4} className={`${field} mt-1.5`} />
      </label>

      {status === "error" && (
        <div className="rounded-md border border-line bg-cream p-5">
          <p className="text-sm text-ink-soft">
            That did not go through from the website. Nothing you typed is lost: send it straight
            from your own email instead, or call{" "}
            <a href={site.phoneHref} className="font-semibold text-ink underline">{site.phone}</a>.
          </p>
          <a href={draft} className="btn btn-outline mt-4 w-full sm:w-auto">
            Send from your email app
          </a>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Request a consultation"}
      </button>
    </form>
  );
}
