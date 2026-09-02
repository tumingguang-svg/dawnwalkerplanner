import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { buildsForPath } from "@/data/buildTemplates";
import { BuildCard } from "@/components/BuildCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/builds/human",
  title: "Human Builds — Diplomat & Guardian Playstyles",
  description:
    "Unofficial Blood of Dawnwalker human build sketches: Blade Diplomat, Ward Guardian, and flexible romance paths with Estimated Time Budget tips.",
});

export default function HumanBuildsPage() {
  const builds = buildsForPath("human");
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-ember-400">
          <Link href="/builds" className="hover:underline">
            Builds
          </Link>{" "}
          / Human
        </p>
        <h1 className="mt-2 font-display text-3xl text-dusk-50 md:text-4xl">
          Human builds
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Estimated daylight- and reputation-leaning sketches. Use the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            Time Budget planner
          </Link>{" "}
          to protect personal leads without emptying contingency. Not official
          class data.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {builds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
      <RelatedLinks
        links={[
          {
            href: "/builds/vampire",
            label: "Vampire builds",
            description: "Night and occult sketches.",
          },
          {
            href: "/planner",
            label: "Time Budget planner",
            description: "Budget day units and contingency.",
          },
          {
            href: "/guides/30-day-deadline",
            label: "30-day deadline",
            description: "Pacing for story-first runs.",
          },
          {
            href: "/time-costs",
            label: "Time costs",
            description: "Estimated social and travel costs.",
          },
        ]}
      />
      <DataStatus />
    </div>
  );
}
