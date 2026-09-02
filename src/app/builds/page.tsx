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
    "Dawnwalker Builds Hub: unofficial vampire and human playstyle sketches with Estimated Time Budget tips. Not skill-tree dumps or official builds.",
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
              "Dawnwalker Builds Hub: unofficial vampire and human playstyle sketches with Estimated Time Budget tips. Not skill-tree dumps or official builds.",
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
          Lightweight playstyle sketches split by vampire-leaning and
          human-leaning routes. Every template is Estimated and meant to pair
          with the Time Budget planner—not a Verified skill-tree dump.
        </p>
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
