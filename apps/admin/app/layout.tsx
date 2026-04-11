import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "신한Q&A 관리자",
  description: "신한대학교 캠퍼스 커뮤니티 관리자",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
