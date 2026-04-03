import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D2 — Engenharia de Software",
  description:
    "Construímos sistemas, aplicações web, automações e soluções blockchain com critério técnico e visão de produto.",
  keywords: [
    "desenvolvimento de software",
    "engenharia de software",
    "aplicações web",
    "blockchain",
    "web3",
    "Next.js",
    "React",
    "automação",
  ],
  openGraph: {
    title: "D2 — Engenharia de Software",
    description:
      "Construímos sistemas, aplicações web, automações e soluções blockchain com critério técnico e visão de produto.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`} data-nonce={nonce}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
