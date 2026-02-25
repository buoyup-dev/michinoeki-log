import type { Metadata } from "next";
import { Header } from "@/components/layouts/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "北海道 道の駅コレクション",
    template: "%s | 北海道 道の駅コレクション",
  },
  description:
    "北海道の道の駅を地図で探して、訪問記録をスタンプラリー形式で残せるWebアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
