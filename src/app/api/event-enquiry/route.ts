import { EVENTS_INBOX, customerEmail, parseEnquiry, teamEmail } from "@/lib/enquiry-emails";

const FROM_WEBSITE = "Homely Website <website@homelydining.co.uk>";
const FROM_EVENTS = `Homely Events <${EVENTS_INBOX}>`;

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

  const parsed = parseEnquiry(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
  const enquiry = parsed.enquiry;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Enquiries are unavailable right now. Please call us instead." }, { status: 500 });
  }

  const team = teamEmail(enquiry);
  const customer = customerEmail(enquiry);

  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      { from: FROM_WEBSITE, to: [EVENTS_INBOX], reply_to: enquiry.email, ...team },
      { from: FROM_EVENTS, to: [enquiry.email], reply_to: EVENTS_INBOX, ...customer },
    ]),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json(
      { error: "We couldn't send your enquiry. Please try again or email events@homelydining.co.uk." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
