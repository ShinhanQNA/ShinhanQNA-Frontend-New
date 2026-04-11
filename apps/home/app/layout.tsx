import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "신한Q&A",
  description: "신한대학교 캠퍼스 커뮤니티",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-gray-100 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
