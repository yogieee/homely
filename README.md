This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy (Cloudflare)

The live site, www.homelydining.co.uk, runs on Cloudflare Workers in the restaurant owner's Cloudflare account (set as `account_id` in `wrangler.jsonc`).

- `next build` makes a static export in `./out`, which Cloudflare serves as plain files.
- `src/server/worker.ts` handles the only server code: `/api/table-booking` and `/api/event-enquiry` (emails through Resend, owner alerts on WhatsApp through GREEN-API). It also redirects `homelydining.co.uk` and plain http to `https://www.homelydining.co.uk`.
- Images are served as uploaded (no resizing), so resize photos before adding them.

Deploy with Node 22 or newer (see `.nvmrc`):

```bash
npm run deploy
```

Secrets are set in the Cloudflare dashboard (Workers & Pages → homely → Settings → Variables and Secrets) or with `npx wrangler secret put NAME`:
`RESEND_API_KEY`, `GREENAPI_URL`, `GREENAPI_INSTANCE_ID`, `GREENAPI_TOKEN`, `OWNER_WHATSAPP_TO`.
