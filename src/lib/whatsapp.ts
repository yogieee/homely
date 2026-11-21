/**
 * WhatsApp alerts to the owner through GREEN-API (https://green-api.com/en/docs/api/sending/SendMessage/).
 *
 * A WhatsApp account is linked to a GREEN-API instance by scanning its QR code under
 * WhatsApp > Linked devices. Alerts are sent from that account to the owner's number.
 * Use a spare number for the sending account: WhatsApp doesn't notify you about
 * messages you send to yourself.
 *
 * Needs these environment variables, all shown in the GREEN-API console. Until they are
 * all set, alerts are skipped quietly and the emails still go out:
 *   GREENAPI_URL          the instance's apiUrl, e.g. https://7103.api.greenapi.com
 *   GREENAPI_INSTANCE_ID  idInstance
 *   GREENAPI_TOKEN        apiTokenInstance
 *   OWNER_WHATSAPP_TO     owner's number with country code, digits only, e.g. 447305154989
 */

export async function sendOwnerWhatsApp(message: string): Promise<void> {
  const apiUrl = process.env.GREENAPI_URL?.replace(/\/+$/, "");
  const instance = process.env.GREENAPI_INSTANCE_ID;
  const token = process.env.GREENAPI_TOKEN;
  const to = process.env.OWNER_WHATSAPP_TO?.replace(/\D/g, "");
  if (!apiUrl || !instance || !token || !to) {
    console.log("WhatsApp alert skipped: GREEN-API is not configured");
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/waInstance${instance}/sendMessage/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: `${to}@c.us`, message: message.slice(0, 4000), linkPreview: false }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => null)) as { idMessage?: string } | null;
    if (!res.ok || !data?.idMessage) console.error("WhatsApp alert failed", res.status, JSON.stringify(data));
    else console.log("WhatsApp alert sent", data.idMessage);
  } catch (err) {
    console.error("WhatsApp alert request failed", err);
  }
}
