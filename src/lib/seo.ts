import type { Metadata } from "next";

/** Keep SERP snippets roughly in the 140–160 character band audit tools expect. */
export function clipDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 100 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  /** Path starting with /, or "/" for home. */
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const path = opts.path === "/" ? "/" : opts.path;
  const description = clipDescription(opts.description);
  return {
    title: opts.absoluteTitle
      ? { absolute: opts.title }
      : opts.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: opts.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
    },
  };
}
