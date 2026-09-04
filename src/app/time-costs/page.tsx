import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ESTIMATED_PLACEHOLDER_TIME_COSTS,
  REPORTED_PROLOGUE_TIME_COSTS,
  TIME_COST_ENTRIES,
  type TimeCostEntry,
} from "@/data/timeCostEntries";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { Spoiler } from "@/components/Spoiler";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DataStatus } from "@/components/DataStatus";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  path: "/time-costs",
  title: "Blood of Dawnwalker Time Costs – Time Segment Catalog",
  description:
    "Dawnwalker Time Budget costs: launch-week Reported prologue/mechanics rows plus Estimated fan-model placeholders. Estimated / Reported / Verified labels.",
  absoluteTitle: true,
});

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  reported: "text-dusk-100 border-dusk-500",
  verified: "text-dusk-50 border-ember-500/60 bg-ember-600/10",
};

function TimeCostTable({ rows }: { rows: TimeCostEntry[] }) {
  const showVerifiedCol = rows.some((r) => r.lastVerified !== undefined);
  const showSourceCol = rows.some((r) => r.sourceNote);
  const showPlatformCol = rows.some((r) => r.platform);
  const showPatchCol = rows.some((r) => r.patch);
  const showYoutubeCol = rows.some((r) => r.youtubeSource);

  return (
    <div className="overflow-x-auto rounded-xl border border-dusk-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
          <tr>
            <th className="px-3 py-3">Activity</th>
            <th className="px-3 py-3">Category</th>
            <th className="px-3 py-3">Segments</th>
            <th className="px-3 py-3">Phase</th>
            <th className="px-3 py-3">Status</th>
            {showVerifiedCol && <th className="px-3 py-3">Last checked</th>}
            {showSourceCol && <th className="px-3 py-3">Source note</th>}
            {showPlatformCol && <th className="px-3 py-3">Platform</th>}
            {showPatchCol && <th className="px-3 py-3">Patch</th>}
            {showYoutubeCol && <th className="px-3 py-3">YouTube source</th>}
            <th className="px-3 py-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-dusk-800/80 bg-night-950/40 align-top"
            >
              <td className="px-3 py-3 text-dusk-100">{row.name}</td>
              <td className="px-3 py-3 text-dusk-400">{row.category}</td>
              <td className="px-3 py-3 font-medium text-ember-400">
                {row.apCost}
              </td>
              <td className="px-3 py-3 capitalize text-dusk-300">{row.phase}</td>
              <td className="px-3 py-3">
                <span
                  className={`inline-block rounded border px-2 py-0.5 text-xs ${statusColor[row.verificationStatus]}`}
                >
                  {VERIFICATION_LABELS[row.verificationStatus]}
                </span>
              </td>
              {showVerifiedCol && (
                <td className="px-3 py-3 text-dusk-400 whitespace-nowrap">
                  {row.lastVerified ?? <span className="text-dusk-600">—</span>}
                </td>
              )}
              {showSourceCol && (
                <td className="px-3 py-3 text-dusk-400 max-w-[12rem]">
                  {row.sourceNote ?? <span className="text-dusk-600">—</span>}
                </td>
              )}
              {showPlatformCol && (
                <td className="px-3 py-3 text-dusk-400">
                  {row.platform ?? <span className="text-dusk-600">—</span>}
                </td>
              )}
              {showPatchCol && (
                <td className="px-3 py-3 text-dusk-400">
                  {row.patch ?? <span className="text-dusk-600">—</span>}
                </td>
              )}
              {showYoutubeCol && (
                <td className="px-3 py-3 text-dusk-400 max-w-[14rem]">
                  {row.youtubeSource ? (
                    <span className="block text-xs">
                      <a
                        href={row.youtubeSource.url}
                        className="text-ember-400 hover:underline break-all"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {row.youtubeSource.url}
                      </a>
                      <span className="mt-0.5 block text-dusk-600">
                        {row.youtubeSource.timestamp} ·{" "}
                        {row.youtubeSource.platform} ·{" "}
                        {row.youtubeSource.gameVersion} ·{" "}
                        {row.youtubeSource.verificationDate}
                      </span>
                    </span>
                  ) : (
                    <span className="text-dusk-600">—</span>
                  )}
                </td>
              )}
              <td className="px-3 py-3 text-dusk-400 max-w-xs">
                {row.spoiler ? (
                  <Spoiler label="Reveal notes (spoiler)">{row.notes}</Spoiler>
                ) : (
                  row.notes
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TimeCostsPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={[
          itemListJsonLd({
            name: "Dawnwalker Time Budget Costs (Reported Prologue + Estimated Catalog)",
            description:
              "ItemList of Time Budget activity costs for The Blood of Dawnwalker. Launch-week Reported prologue/mechanics rows plus Estimated fan-model placeholders. Unverified data is not confirmed fact; we do not invent Verified retail numbers.",
            path: "/time-costs",
            items: TIME_COST_ENTRIES.map((e) => ({ name: e.name })),
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Time costs", path: "/time-costs" },
          ]),
        ]}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Blood of Dawnwalker Time Costs
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Two catalogs on one page: launch-week{" "}
          <strong className="text-dusk-200">Reported</strong> prologue and
          mechanics rows (guides + YouTube narration, 2026-09-03), then the
          older <strong className="text-dusk-200">Estimated</strong> fan-model
          placeholders kept for planner structure. We do not invent Verified
          retail numbers.
        </p>
        <p className="mt-2 text-sm text-dusk-500">
          Day/night <strong className="text-dusk-300">8 segments Reported</strong>{" "}
          (IGN, PC Gamer, Polygon, Falcon YT). Site default stays 8+8 (=480).
          RageGaming spoken “10 notches” is a footnote only. Shrine Wait can
          burn large chunks (Rage)—cost unknown, so no invented row. Pair with
          the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>{" "}
          or{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>
          .
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Reported prologue &amp; mechanics
        </h2>
        <p className="text-sm text-dusk-500">
          {REPORTED_PROLOGUE_TIME_COSTS.length} rows. Units = time-bar
          segments. YouTube rows use timestamp “full-video narration.”
        </p>
        <TimeCostTable rows={REPORTED_PROLOGUE_TIME_COSTS} />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Legacy estimates (do not treat as retail costs)
        </h2>
        <p className="text-sm text-dusk-500">
          {ESTIMATED_PLACEHOLDER_TIME_COSTS.length} pre-launch generic placeholders (Travel / Romance / Main scene, etc.). Demoted so they are not mistaken for retail quest costs. Prefer Reported rows and /quests.
        </p>
        <TimeCostTable rows={ESTIMATED_PLACEHOLDER_TIME_COSTS} />
      </section>

      <p className="text-xs text-dusk-600">
        {TIME_COST_ENTRIES.length} entries total. Values are Estimated or
        Reported Time Segments unless later marked Verified against the
        released game. Unverified data is not confirmed fact.
      </p>
      <DataStatus
        status="reported"
        lastReviewed="2026-09-03"
        source="IGN, PC Gamer, Polygon, Falcon YT, RageGaming YT"
      />
      <RelatedLinks
        extra={[
          {
            href: "/guides/quest-order",
            label: "Quest order",
            description: "Prologue spend order by Time Segments.",
          },
          {
            href: "/quests",
            label: "Quest catalog",
            description: "Reported prologue quest table + 8-segment tips.",
          },
          {
            href: "/guides/how-to-plan-your-time",
            label: "How to plan your time",
            description: "Turn catalog rows into a ledger.",
          },
          {
            href: "/guides/day-vs-night",
            label: "Day vs night guide",
            description: "How phase tags affect spending.",
          },
        ]}
      />
    </div>
  );
}
