import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnwalkerplanner.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/planner",
    "/time-costs",
    "/beginner",
    "/builds",
    "/faq",
    "/disclaimer",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/planner" ? "weekly" : "monthly",
    priority: path === "" || path === "/planner" ? 1 : 0.7,
  }));
}
