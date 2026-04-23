import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self'${isDev ? " 'unsafe-eval'" : ""} 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://tile.openstreetmap.org https://*.supabase.co https://upload.wikimedia.org https://jozankei.jp https://lh3.googleusercontent.com${isDev ? " https://www.j-bussankan.co.jp https://imgfp.hotp.jp http://127.0.0.1:* http://localhost:*" : ""};
  connect-src 'self' https://*.supabase.co https://tile.openstreetmap.org${isDev ? " http://127.0.0.1:* http://localhost:*" : ""};
  font-src 'self' https://fonts.gstatic.com;
  frame-src 'none';
  frame-ancestors 'none';
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
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async headers() {
    return [
      {
        // /images/ フォルダの画像にキャッシュの有効期限を設定する
        // これにより、2回目以降のアクセスはサーバーへの確認なしに手元のキャッシュを使うため高速化される
        //
        // PoC段階では画像ファイルを同じ名前のまま差し替える可能性があるため
        // immutable にすると古い画像がブラウザに残り続けてしまう
        // 本番リリース時はファイル名にバージョン番号を付けて immutable に切り替えることを推奨
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), camera=(), microphone=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
