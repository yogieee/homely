/**
 * Cloudflare worker. The site itself is the static export in ./out, served by
 * Cloudflare as plain files. Only the two form endpoints run code here; they
 * are the same handlers that ran as Next.js route handlers on Vercel.
 *
 * Secrets (RESEND_API_KEY, GREENAPI_*, OWNER_WHATSAPP_TO) are set in Cloudflare
 * with `npx wrangler secret put NAME` and reach the handlers as process.env.
 */
import { POST as tableBooking } from "./table-booking";
import { POST as eventEnquiry } from "./event-enquiry";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const APEX = "homelydining.co.uk";

const ROUTES: Record<string, (request: Request) => Promise<Response>> = {
  "/api/table-booking": tableBooking,
  "/api/event-enquiry": eventEnquiry,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // One canonical address, as on Vercel: https://www.homelydining.co.uk
    if (url.hostname === APEX || url.protocol === "http:") {
      if (url.hostname === APEX) url.hostname = `www.${APEX}`;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    const handler = ROUTES[url.pathname];
    if (!handler) return env.ASSETS.fetch(request);
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
    }
    return handler(request);
  },
};
