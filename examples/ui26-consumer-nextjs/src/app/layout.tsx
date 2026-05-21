import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ui26 Next.js consumer",
  description: "ui26 design system — Next.js App Router example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
