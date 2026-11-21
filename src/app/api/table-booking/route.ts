import {
  BOOKINGS_INBOX,
  customerBookingEmail,
  ownerBookingEmail,
  parseBooking,
  partyLabel,
} from "@/lib/booking-emails";
import { formatDate } from "@/lib/enquiry-emails";
import { sendOwnerWhatsApp } from "@/lib/whatsapp";

const FROM_WEBSITE = "Homely Website <website@homelydining.co.uk>";
const FROM_HOMELY = `Homely <${BOOKINGS_INBOX}>`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field that people never fill in. Bots that do get a quiet "success".
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return Response.json({ ok: true });
  }

  const parsed = parseBooking(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
  const b = parsed.booking;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Online booking is unavailable right now. Please call us on 07305 154989." }, { status: 500 });
  }

  const owner = ownerBookingEmail(b);
  const customer = customerBookingEmail(b);

  const [emailRes] = await Promise.all([
    fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        { from: FROM_WEBSITE, to: [BOOKINGS_INBOX], reply_to: b.email, ...owner },
        { from: FROM_HOMELY, to: [b.email], reply_to: BOOKINGS_INBOX, ...customer },
      ]),
    }),
    sendOwnerWhatsApp(
      [
        "*New table booking*",
        `${b.fullName}, ${partyLabel(b.partySize)} guests`,
        `${formatDate(b.date)} at ${b.time}`,
        `Phone: ${b.phone}`,
        `Requests: ${b.requests || "None"}`,
      ].join("\n"),
    ),
  ]);

  const result = (await emailRes.json().catch(() => null)) as { data?: { id: string }[] } | null;
  const ids = result?.data?.map((d) => d.id) ?? [];
  if (!emailRes.ok || ids.length !== 2) {
    console.error("Resend error", emailRes.status, JSON.stringify(result));
    return Response.json(
      { error: "We couldn't send your booking. Please try again or call us on 07305 154989." },
      { status: 502 },
    );
  }

  console.log("Table booking sent", ids.join(", "));
  return Response.json({ ok: true });
}
