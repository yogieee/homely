import { CATERING_STYLES, OCCASION_TYPES } from "@/lib/data";

export type Enquiry = {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  occasion: string;
  cateringStyle: string;
  notes: string;
};

const SITE_URL = "https://www.homelydining.co.uk";
export const EVENTS_INBOX = "events@homelydining.co.uk";

const C = {
  mahogany: "#432B26",
  ivory: "#FAF3E8",
  parchment: "#F5E4CD",
  bronze: "#B08A5E",
  rust: "#9A4E36",
  ink: "#2E1C18",
};

/** Checks and tidies the posted form. Returns an error message or the clean enquiry. */
export function parseEnquiry(body: unknown): { error: string } | { enquiry: Enquiry } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const enquiry: Enquiry = {
    fullName: str(b.fullName, 120),
    email: str(b.email, 200),
    phone: str(b.phone, 40),
    eventDate: str(b.eventDate, 10),
    guestCount: Math.round(Number(b.guestCount)),
    occasion: str(b.occasion, 60),
    cateringStyle: str(b.cateringStyle, 60),
    notes: str(b.notes, 2000),
  };

  if (!enquiry.fullName) return { error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return { error: "Enter a valid email address." };
  if (!/^[0-9+\s()-]{7,}$/.test(enquiry.phone)) return { error: "Enter a valid phone number." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(enquiry.eventDate)) return { error: "Please select a preferred date." };
  if (!Number.isFinite(enquiry.guestCount) || enquiry.guestCount < 1 || enquiry.guestCount > 200)
    return { error: "Please choose the number of guests." };
  if (!(OCCASION_TYPES as readonly string[]).includes(enquiry.occasion)) enquiry.occasion = "Other";
  if (!(CATERING_STYLES as readonly string[]).includes(enquiry.cateringStyle))
    enquiry.cateringStyle = CATERING_STYLES[0];

  return { enquiry };
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function detailRows(e: Enquiry, withContact: boolean) {
  const rows: [string, string][] = [
    ...(withContact
      ? ([
          ["Name", e.fullName],
          ["Email", e.email],
          ["Phone", e.phone],
        ] as [string, string][])
      : []),
    ["Date", formatDate(e.eventDate)],
    ["Occasion", e.occasion],
    ["Guests", String(e.guestCount)],
    ["Catering", e.cateringStyle],
    ["Notes", e.notes || "None"],
  ];
  return rows
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #EADBC6;width:110px;vertical-align:top;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${C.bronze}">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid #EADBC6;vertical-align:top;font-size:15px;color:${C.ink};white-space:pre-wrap">${escape(v)}</td>
      </tr>`,
    )
    .join("");
}

function layout(preheader: string, inner: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${C.parchment};font-family:Helvetica,Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.parchment}">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.ivory};border:1px solid #E2CDB0;border-radius:6px;overflow:hidden">
      <tr><td align="center" style="background:${C.mahogany};padding:28px 24px 22px">
        <img src="${SITE_URL}/brand/email-emblem.png" width="56" height="81" alt="" style="display:block;border:0">
        <div style="margin-top:14px;font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:0.18em;color:${C.parchment}">HOMELY</div>
        <div style="margin-top:6px;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#D1B088">South Indian Fine Dining</div>
      </td></tr>
      <tr><td style="padding:32px 32px 28px">${inner}</td></tr>
      <tr><td align="center" style="padding:20px 24px;border-top:1px solid #EADBC6;font-size:12px;line-height:1.6;color:#7C4C40">
        Homely, 135 Walsgrave Road, Coventry CV2 4HG<br>
        <a href="${SITE_URL}" style="color:${C.rust}">homelydining.co.uk</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Email to the events team. */
export function teamEmail(e: Enquiry) {
  const subject = `Event enquiry: ${e.occasion}, ${e.guestCount} guests, ${formatDate(e.eventDate)}`;
  const html = layout(
    `${e.fullName} sent an event enquiry`,
    `<h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;color:${C.mahogany}">New event hall enquiry</h1>
     <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${C.ink}">${escape(e.fullName)} has asked about the upstairs event hall. Reply to this email to answer them directly.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(e, true)}</table>`,
  );
  const text = [
    "New event hall enquiry",
    "",
    `Name: ${e.fullName}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone}`,
    `Date: ${formatDate(e.eventDate)}`,
    `Occasion: ${e.occasion}`,
    `Guests: ${e.guestCount}`,
    `Catering: ${e.cateringStyle}`,
    `Notes: ${e.notes || "None"}`,
  ].join("\n");
  return { subject, html, text };
}

/** Confirmation sent to the customer. */
export function customerEmail(e: Enquiry) {
  const first = e.fullName.split(/\s+/)[0];
  const subject = "We've received your event enquiry";
  const html = layout(
    "Thanks for your enquiry. We'll be in touch within 24 hours.",
    `<h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;color:${C.mahogany}">Thank you, ${escape(first)}</h1>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${C.ink}">We've received your enquiry for our upstairs event hall. Someone from our team will be in touch within 24 hours to talk through your ${escape(e.occasion.toLowerCase())} and plan the menu with you.</p>
     <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${C.ink}">Here's what you sent us:</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(e, false)}</table>
     <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${C.ink}">Need to change something? Just reply to this email.</p>
     <p style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${C.mahogany}">The Homely team</p>`,
  );
  const text = [
    `Thank you, ${first}`,
    "",
    `We've received your enquiry for our upstairs event hall. Someone from our team will be in touch within 24 hours to talk through your ${e.occasion.toLowerCase()} and plan the menu with you.`,
    "",
    `Date: ${formatDate(e.eventDate)}`,
    `Occasion: ${e.occasion}`,
    `Guests: ${e.guestCount}`,
    `Catering: ${e.cateringStyle}`,
    `Notes: ${e.notes || "None"}`,
    "",
    "Need to change something? Just reply to this email.",
    "",
    "The Homely team",
    "Homely, 135 Walsgrave Road, Coventry CV2 4HG",
  ].join("\n");
  return { subject, html, text };
}
