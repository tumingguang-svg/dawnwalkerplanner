import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { TIME_COST_ENTRIES } from "@/data/timeCostEntries";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { Spoiler } from "@/components/Spoiler";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/time-costs",
  title: "Dawnwalker Time Budget Costs (Estimated Catalog)",
  description:
    "Dawnwalker Time Budget costs: estimated activity catalog for The Blood of Dawnwalker with Estimated / Reported / Verified labels and source notes.",
  absoluteTitle: true,
});

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  reported: "text-dusk-100 border-dusk-500",
  verified: "text-dusk-50 border-ember-500/60 bg-ember-600/10",
};

const showVerifiedCol = TIME_COST_ENTRIES.some(
  (r) => r.lastVerified !== undefined
);
const showSourceCol = TIME_COST_ENTRIES.some((r) => r.sourceNote);
const showPlatformCol = TIME_COST_ENTRIES.some((r) => r.platform);
const showPatchCol = TIME_COST_ENTRIES.some((r) => r.patch);
const showYoutubeCol = TIME_COST_ENTRIES.some((r) => r.youtubeSource);

export default function TimeCostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Time Budget Costs (Estimated Catalog)
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Fan-estimated Time Budget spends for planning (model units). Prefer a
          complete catalog over perfect lore accuracy. Spoiler notes stay
          collapsed. After launch, update{" "}
          <code className="text-dusk-300">lastVerified</code>,{" "}
          <code className="text-dusk-300">sourceNote</code>, and optional{" "}
          <code className="text-dusk-300">platform</code> /{" "}
          <code className="text-dusk-300">patch</code> as you confirm costs
          in-game. We do not invent Verified retail numbers.
        </p>
        <p className="mt-2 text-sm text-dusk-500">
          Pair with the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>{" "}
          or read{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>
          .
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-dusk-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
            <tr>
              <th className="px-3 py-3">Activity</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Units</th>
              <th className="px-3 py-3">Phase</th>
              <th className="px-3 py-3">Status</th>
              {showVerifiedCol && (
                <th className="px-3 py-3">Last verified</th>
              )}
              {showSourceCol && <th className="px-3 py-3">Source note</th>}
              {showPlatformCol && <th className="px-3 py-3">Platform</th>}
              {showPatchCol && <th className="px-3 py-3">Patch</th>}
              {showYoutubeCol && <th className="px-3 py-3">YouTube source</th>}
              <th className="px-3 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {TIME_COST_ENTRIES.map((row) => (
              <tr
                key={row.id}
                className="border-t border-dusk-800/80 bg-night-950/40 align-top"
              >
                <td className="px-3 py-3 text-dusk-100">{row.name}</td>
                <td className="px-3 py-3 text-dusk-400">{row.category}</td>
                <td className="px-3 py-3 font-medium text-ember-400">
                  {row.apCost}
                </td>
                <td className="px-3 py-3 capitalize text-dusk-300">
                  {row.phase}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-xs ${statusColor[row.verificationStatus]}`}
                  >
                    {VERIFICATION_LABELS[row.verificationStatus]}
                  </span>
                </td>
                {showVerifiedCol && (
                  <td className="px-3 py-3 text-dusk-400 whitespace-nowrap">
                    {row.lastVerified ?? (
                      <span className="text-dusk-600">—</span>
                    )}
                  </td>
                )}
                {showSourceCol && (
                  <td className="px-3 py-3 text-dusk-400 max-w-[12rem]">
                    {row.sourceNote ?? (
                      <span className="text-dusk-600">—</span>
                    )}
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
                    <Spoiler label="Reveal notes (spoiler)">
                      {row.notes}
                    </Spoiler>
                  ) : (
                    row.notes
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-dusk-600">
        {TIME_COST_ENTRIES.length} entries. Values are Estimated or Reported fan
        model units unless later marked Verified against the released game.
        Unverified data is not confirmed fact.
      </p>
      <DataStatus />
      <RelatedLinks
        extra={[
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
          {
            href: "/quests",
            label: "Quest database",
            description: "Schema of fields we will store after observation.",
          },
        ]}
      />
    </div>
  );
}
