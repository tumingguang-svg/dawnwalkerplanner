import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
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
    default:
      "Dawnwalker Planner — Unofficial 30-Day Time Budget Fan Tool",
    template: "%s | Dawnwalker Planner",
  },
  description:
    "Unofficial Blood of Dawnwalker planner for an estimated 30-day Time Budget. Presets, time costs, and guides. Fan model—not official.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Dawnwalker Planner",
    description:
      "Plan your unofficial 30-day Time Budget for Blood of Dawnwalker (fan model units).",
    url: siteUrl,
    siteName: "Dawnwalker Planner",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dawnwalker Planner — unofficial 30-day Time Budget fan tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawnwalker Planner",
    description:
      "Unofficial 30-day Time Budget planner for Blood of Dawnwalker (fan model).",
    images: ["/og.png"],
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
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
