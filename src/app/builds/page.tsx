import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DataStatus } from "@/components/DataStatus";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  path: "/builds",
  title: "Dawnwalker Builds Hub",
  description:
    "Dawnwalker Builds Hub (stub): Estimated playstyle sketches only. Not a skill-tree dump—use the Time Segment planner for launch-week decisions.",
  absoluteTitle: true,
});

export default function BuildsHubPage() {
  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          articleJsonLd({
            headline: "Dawnwalker Builds Hub",
            description:
              "Dawnwalker Builds Hub (stub): Estimated playstyle sketches only. Not a skill-tree dump—use the Time Segment planner for launch-week decisions.",
            path: "/builds",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Builds", path: "/builds" },
          ]),
        ]}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Builds Hub
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Lightweight playstyle sketches. This hub is a{" "}
          <strong className="text-dusk-200">stub</strong>—not a full skill-tree
          wiki. Focus stays on Time Budget planning; detailed builds come later
          when we have Reported perk costs.
        </p>
      </div>

      <div className="rounded-xl border border-ember-600/40 bg-ember-600/10 px-4 py-3 text-sm text-ember-400">
        Stub status: vampire/human cards are Estimated placeholders. Prefer{" "}
        <Link href="/planner" className="underline hover:text-ember-300">
          Time Segment planner
        </Link>
        ,{" "}
        <Link href="/guides/quest-order" className="underline hover:text-ember-300">
          quest order
        </Link>
        , and{" "}
        <Link href="/missables" className="underline hover:text-ember-300">
          missables
        </Link>{" "}
        for launch-week play.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/builds/vampire"
          className="card-surface group rounded-2xl p-6 transition-colors hover:border-ember-500/50"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ember-400">
            Path
          </p>
          <h2 className="mt-2 font-display text-2xl text-dusk-50 group-hover:text-ember-400">
            Vampire builds
          </h2>
          <p className="mt-2 text-sm text-dusk-400">
            Night-forward predation, occult rites, and stealth-heavy Time Budget
            spends.
          </p>
        </Link>
        <Link
          href="/builds/human"
          className="card-surface group rounded-2xl p-6 transition-colors hover:border-ember-500/50"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ember-400">
            Path
          </p>
          <h2 className="mt-2 font-display text-2xl text-dusk-50 group-hover:text-ember-400">
            Human builds
          </h2>
          <p className="mt-2 text-sm text-dusk-400">
            Diplomacy, ward defense, and daylight-leaning campaign plans.
          </p>
        </Link>
      </div>

      <RelatedLinks
        extra={[
          {
            href: "/guides/day-vs-night",
            label: "Day vs night",
            description: "Phase wallets for either path.",
          },
          {
            href: "/guides/how-to-plan-your-time",
            label: "How to plan your time",
            description: "Time Budget planner workflow.",
          },
          {
            href: "/beginner",
            label: "Beginner guide",
            description: "First-week Time Budget habits.",
          },
        ]}
      />
      <DataStatus />
    </div>
  );
}
