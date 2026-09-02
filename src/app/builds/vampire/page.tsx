import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { buildsForPath } from "@/data/buildTemplates";
import { BuildCard } from "@/components/BuildCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/builds/vampire",
  title: "Dawnwalker Vampire Builds",
  description:
    "Dawnwalker Vampire Builds: unofficial night and occult playstyle sketches with Estimated Time Budget tips for The Blood of Dawnwalker.",
  absoluteTitle: true,
});

export default function VampireBuildsPage() {
  const builds = buildsForPath("vampire");
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-ember-400">
          <Link href="/builds" className="hover:underline">
            Builds
          </Link>{" "}
          / Vampire
        </p>
        <h1 className="mt-2 font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Vampire Builds
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Estimated night-forward sketches. Pair with the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            Time Budget planner
          </Link>{" "}
          and keep a contingency for failed infiltrations. Not official class
          data.
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
            href: "/builds/human",
            label: "Human builds",
            description: "Diplomacy and ward-focused sketches.",
          },
          {
            href: "/planner",
            label: "Time Budget planner",
            description: "Budget night units explicitly.",
          },
          {
            href: "/guides/day-vs-night",
            label: "Day vs night",
            description: "Keep the day wallet from going idle.",
          },
          {
            href: "/time-costs",
            label: "Time costs",
            description: "Estimated night activities.",
          },
        ]}
      />
      <DataStatus />
    </div>
  );
}
