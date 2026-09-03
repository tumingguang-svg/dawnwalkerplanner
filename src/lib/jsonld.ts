/** Schema.org JSON-LD builders for Dawnwalker Planner (unofficial fan site). */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnwalkerplanner.org";

export const SITE_NAME = "Dawnwalker Planner";
export const CONTACT_EMAIL = "contact@dawnwalkerplanner.org";
export const DEFAULT_DATE_MODIFIED = "2026-09-03";

export type BreadcrumbItem = {
  name: string;
  /** Path starting with /, or absolute URL. Home is "/". */
  path: string;
};

function absUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Sitewide Organization — unofficial fan project. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      "Unofficial fan site and planner for The Blood of Dawnwalker. Not affiliated with Rebel Wolves or Bandai Namco.",
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer support",
    },
  };
}

/** Home WebSite node. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Unofficial Blood of Dawnwalker fan planner for an estimated 30-day Time Budget (480 model units).",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: `${SITE_NAME} (unofficial fan project)`,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
  };
}

/** Interactive planner as SoftwareApplication / GameApplication (free). */
export function softwareApplicationJsonLd(opts?: {
  url?: string;
  name?: string;
  description?: string;
}) {
  const url = absUrl(opts?.url ?? "/planner");
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts?.name ?? SITE_NAME,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    url,
    description:
      opts?.description ??
      "Unofficial fan tool to budget an estimated 30-day Time Budget across a Blood of Dawnwalker campaign. Model units only—not official Action Points. Not affiliated with Rebel Wolves or Bandai Namco.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} (unofficial fan project)`,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
  };
}

/** FAQPage from visible Q&A pairs (must match h3+p text). */
export function faqPageJsonLd(
  faqs: ReadonlyArray<{ q: string; a: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/** ItemList of catalog entries (name + position); honesty in description. */
export function itemListJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  items: ReadonlyArray<{ name: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
    })),
  };
}

/** Article for guides and build hubs. */
export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const dateModified = opts.dateModified ?? DEFAULT_DATE_MODIFIED;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    dateModified,
    datePublished: dateModified,
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} (unofficial fan project)`,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
    publisher: {
      "@type": "Organization",
      name: `${SITE_NAME} (unofficial fan project)`,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absUrl(opts.path),
    },
  };
}

/** BreadcrumbList: Home → section → page. */
export function breadcrumbJsonLd(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

/** Home @graph: WebSite + SoftwareApplication (Organization lives sitewide). */
export function homeGraphJsonLd() {
  const website = websiteJsonLd();
  const app = softwareApplicationJsonLd();
  // Strip per-node @context when nesting under @graph
  const { "@context": _w, ...websiteNode } = website;
  const { "@context": _a, ...appNode } = app;
  return {
    "@context": "https://schema.org",
    "@graph": [websiteNode, appNode],
  };
}
