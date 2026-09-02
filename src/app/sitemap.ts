import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnwalkerplanner.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/planner",
    "/time-costs",
    "/quests",
    "/missables",
    "/beginner",
    "/builds",
    "/builds/vampire",
    "/builds/human",
    "/guides/how-time-works",
    "/guides/how-to-plan-your-time",
    "/guides/choices-and-consequences",
    "/guides/30-day-deadline",
    "/guides/day-vs-night",
    "/guides/can-you-do-everything",
    "/guides/missable-content",
    "/faq",
    "/disclaimer",
    "/privacy",
    "/terms",
  ];
  const now = new Date();
  const high = new Set([
    "",
    "/planner",
    "/guides/how-time-works",
    "/guides/how-to-plan-your-time",
    "/guides/choices-and-consequences",
  ]);
  const weekly = new Set([
    "/planner",
    "/time-costs",
    "/quests",
    "/missables",
  ]);
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: weekly.has(path) ? "weekly" : "monthly",
    priority: high.has(path) ? 1 : path.startsWith("/guides") ? 0.8 : 0.7,
  }));
}
