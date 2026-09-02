import type { Metadata } from "next";

/** Keep SERP snippets roughly in the 140–160 character band audit tools expect. */
export function clipDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 100 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Dawnwalker Planner — unofficial 30-day Time Budget fan tool",
} as const;

export function pageMetadata(opts: {
  title: string;
  description: string;
  /** Path starting with /, or "/" for home. */
  path: string;
  absoluteTitle?: boolean;
  /** Open Graph type: home/tools use website; guides & articles use article. */
  ogType?: "website" | "article";
}): Metadata {
  const path = opts.path === "/" ? "/" : opts.path;
  const description = clipDescription(opts.description);
  const ogType =
    opts.ogType ??
    (path === "/" ||
    path === "/planner" ||
    path === "/time-costs" ||
    path === "/quests" ||
    path === "/missables" ||
    path === "/faq" ||
    path === "/privacy" ||
    path === "/terms" ||
    path === "/disclaimer"
      ? "website"
      : "article");

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url: path,
      title: opts.title,
      description,
      siteName: "Dawnwalker Planner",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: ["/og.png"],
    },
  };
}
