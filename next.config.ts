import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://tile.openstreetmap.org https://*.supabase.co;
  connect-src 'self' https://*.supabase.co;
  font-src 'self';
  frame-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\n/g, "")
  .trim();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
