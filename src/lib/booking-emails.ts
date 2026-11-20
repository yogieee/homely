import { RESERVATION_TIMES } from "@/lib/data";
import { C, SITE_URL, escape, formatDate, layout } from "@/lib/enquiry-emails";

export type Booking = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  requests: string;
};

export const BOOKINGS_INBOX = "hello@homelydining.co.uk";

/** The largest button in the booking form is "12+". */
export const partyLabel = (n: number) => (n >= 12 ? "12+" : String(n));

/** Today's date in the UK, as YYYY-MM-DD. */
const ukToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });

/** Checks and tidies the posted booking. Returns an error message or the clean booking. */
export function parseBooking(body: unknown): { error: string } | { booking: Booking } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const booking: Booking = {
    fullName: str(b.fullName, 120),
    email: str(b.email, 200),
    phone: str(b.phone, 40),
    date: str(b.date, 10),
    time: str(b.time, 5),
    partySize: Math.round(Number(b.partySize)),
    requests: str(b.requests, 1000),
  };

  if (!Number.isFinite(booking.partySize) || booking.partySize < 1 || booking.partySize > 12)
    return { error: "Please choose the number of guests." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date) || booking.date < ukToday())
    return { error: "Please choose a date from today onwards." };
  if (new Date(`${booking.date}T12:00:00Z`).getUTCDay() === 1)
    return { error: "We're closed on Mondays. Please pick another day." };
  if (!(RESERVATION_TIMES as readonly string[]).includes(booking.time)) return { error: "Please choose a time." };
  if (!booking.fullName) return { error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) return { error: "Enter a valid email address." };
  if (!/^[0-9+\s()-]{7,}$/.test(booking.phone)) return { error: "Enter a valid phone number." };

  return { booking };
}

function rows(b: Booking, withContact: boolean) {
  const list: [string, string][] = [
    ...(withContact
      ? ([
          ["Name", b.fullName],
          ["Phone", b.phone],
          ["Email", b.email],
        ] as [string, string][])
      : []),
    ["Date", formatDate(b.date)],
    ["Time", b.time],
    ["Guests", partyLabel(b.partySize)],
    ["Requests", b.requests || "None"],
  ];
  return list;
}

const htmlRows = (list: [string, string][]) =>
  list
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #EADBC6;width:110px;vertical-align:top;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${C.bronze}">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid #EADBC6;vertical-align:top;font-size:15px;color:${C.ink};white-space:pre-wrap">${escape(v)}</td>
      </tr>`,
    )
    .join("");

const textRows = (list: [string, string][]) => list.map(([k, v]) => `${k}: ${v}`);

/** Email to the owner. */
export function ownerBookingEmail(b: Booking) {
  const subject = `Table booking: ${partyLabel(b.partySize)} guests, ${formatDate(b.date)} at ${b.time}`;
  const html = layout(
    `${b.fullName} booked a table for ${partyLabel(b.partySize)}`,
    `<h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;color:${C.mahogany}">New table booking</h1>
     <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${C.ink}">${escape(b.fullName)} has booked a table on the website. Reply to this email to answer them directly.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${htmlRows(rows(b, true))}</table>`,
  );
  const text = ["New table booking", "", ...textRows(rows(b, true))].join("\n");
  return { subject, html, text };
}

/** Thank-you email to the customer. */
export function customerBookingEmail(b: Booking) {
  const first = b.fullName.split(/\s+/)[0];
  const subject = `Thanks for booking with Homely: ${formatDate(b.date)} at ${b.time}`;
  const html = layout(
    `Your table for ${partyLabel(b.partySize)} on ${formatDate(b.date)} at ${b.time}.`,
    `<h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;color:${C.mahogany}">Thanks for booking, ${escape(first)}</h1>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${C.ink}">We've got your table and we're looking forward to seeing you. If anything on our side needs to change, we'll call you on ${escape(b.phone)}.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${htmlRows(rows(b, false))}</table>
     <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${C.ink}">Running late or need to change your booking? Reply to this email or call us on <a href="tel:+447305154989" style="color:${C.rust}">07305 154989</a>.</p>
     <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:${C.ink}">Find us at 135 Walsgrave Road, Coventry CV2 4HG. <a href="${SITE_URL}/#visit-us" style="color:${C.rust}">Get directions</a></p>
     <p style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${C.mahogany}">The Homely team</p>`,
  );
  const text = [
    `Thanks for booking, ${first}`,
    "",
    "We've got your table and we're looking forward to seeing you. If anything on our side needs to change, we'll call you.",
    "",
    ...textRows(rows(b, false)),
    "",
    "Running late or need to change your booking? Reply to this email or call us on 07305 154989.",
    "",
    "The Homely team",
    "Homely, 135 Walsgrave Road, Coventry CV2 4HG",
  ].join("\n");
  return { subject, html, text };
}
