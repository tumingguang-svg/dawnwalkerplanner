import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnwalkerplanner.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dawnwalker Planner — Unofficial 30-Day / 480 AP Fan Tool",
    template: "%s | Dawnwalker Planner",
  },
  description:
    "Unofficial Blood of Dawnwalker fan planner for a 30-day / 480 AP campaign budget. Estimated time costs, presets, and beginner tips. Not affiliated with Rebel Wolves or Bandai Namco.",
  keywords: [
    "Blood of Dawnwalker",
    "Dawnwalker planner",
    "480 AP",
    "30 day planner",
    "fan guide",
  ],
  openGraph: {
    title: "Dawnwalker Planner",
    description:
      "Plan your unofficial 30-day / 480 AP Blood of Dawnwalker campaign budget.",
    url: siteUrl,
    siteName: "Dawnwalker Planner",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
