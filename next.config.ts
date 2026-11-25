import type { NextConfig } from "next";

/**
 * Static export for Cloudflare: `next build` writes plain files to ./out.
 * The two form endpoints live in src/server (see wrangler.jsonc).
 * next/image can't resize without a server, so images are served as uploaded.
 */
const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
