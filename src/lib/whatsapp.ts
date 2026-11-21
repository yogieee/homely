/**
 * WhatsApp alerts to the owner through CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 *
 * The owner activates it once from their own WhatsApp and receives an API key. The alert then
 * arrives from the CallMeBot number. No Meta approval or templates needed.
 *
 * Needs these environment variables. Until both are set, alerts are skipped quietly and the
 * emails still go out:
 *   CALLMEBOT_PHONE   owner's WhatsApp number with country code, e.g. +447305154989
 *   CALLMEBOT_APIKEY  key sent by the CallMeBot bot during activation
 */

export async function sendOwnerWhatsApp(message: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) {
    console.log("WhatsApp alert skipped: CallMeBot is not configured");
    return;
  }

  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("text", message.slice(0, 1500));
  url.searchParams.set("apikey", apikey);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const body = await res.text().catch(() => "");
    if (!res.ok || /error|invalid/i.test(body)) console.error("WhatsApp alert failed", res.status, body.slice(0, 300));
    else console.log("WhatsApp alert sent");
  } catch (err) {
    console.error("WhatsApp alert request failed", err);
  }
}
