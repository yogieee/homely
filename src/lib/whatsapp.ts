/**
 * WhatsApp alerts to the owner through the Meta WhatsApp Cloud API.
 *
 * Messages the business starts must use a template that Meta has approved, so each alert
 * names a template and fills its {{1}}, {{2}}, ... placeholders in order.
 *
 * Needs these environment variables. Until they are all set, alerts are skipped quietly
 * and the emails still go out:
 *   WHATSAPP_TOKEN            permanent access token for the WhatsApp Business account
 *   WHATSAPP_PHONE_NUMBER_ID  id of the sending number in Meta's WhatsApp Manager
 *   OWNER_WHATSAPP_TO         owner's number in international format, digits only (e.g. 447305154989)
 */

const GRAPH_URL = "https://graph.facebook.com/v21.0";

/** Template text can't hold new lines, tabs or long runs of spaces. */
const clean = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, "   ").trim().slice(0, 900) || "-";

export async function sendOwnerWhatsApp(template: string, params: string[]): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.OWNER_WHATSAPP_TO;
  if (!token || !phoneNumberId || !to) {
    console.log(`WhatsApp alert skipped (${template}): WhatsApp is not configured`);
    return;
  }

  try {
    const res = await fetch(`${GRAPH_URL}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en_GB" },
          components: [{ type: "body", parameters: params.map((text) => ({ type: "text", text: clean(text) })) }],
        },
      }),
    });
    if (!res.ok) console.error("WhatsApp error", res.status, await res.text().catch(() => ""));
    else console.log(`WhatsApp alert sent (${template})`);
  } catch (err) {
    console.error("WhatsApp request failed", err);
  }
}
