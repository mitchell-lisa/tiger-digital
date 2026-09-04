import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Sends the consultation request to Joe via Resend.
 * Required env vars on Vercel:
 *   RESEND_API_KEY   from resend.com
 *   CONTACT_TO       destination inbox (defaults to site.email)
 *   CONTACT_FROM     a verified sender, e.g. "Tiger Digital <hello@tigerdigital.marketing>"
 * Without RESEND_API_KEY the route returns 503 and the form shows the email/phone fallback.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // honeypot filled, pretend success
  if (body.company_website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 200);
  const business = (body.business ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 50);
  const interest = (body.interest ?? "").trim().slice(0, 100);
  const message = (body.message ?? "").trim().slice(0, 4000);

  if (!name || !business || !email.includes("@")) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Email not configured" }, { status: 503 });

  const text = [
    `Name: ${name}`,
    `Business: ${business}`,
    `Email: ${email}`,
    `Phone: ${phone || "n/a"}`,
    `Interest: ${interest || "n/a"}`,
    "",
    message || "(no message)",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Tiger Digital <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: email,
      subject: `Consultation request: ${business} (${name})`,
      text,
    }),
  });

  if (!res.ok) {
    // Log why, so a failure is diagnosable from the Vercel runtime logs.
    // The provider's message never goes back to the visitor.
    const detail = await res.text().catch(() => "");
    console.error("resend send failed", res.status, detail.slice(0, 500));
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
