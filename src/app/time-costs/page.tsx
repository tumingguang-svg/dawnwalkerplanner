import type { Metadata } from "next";
import { TIME_COST_ENTRIES } from "@/data/timeCostEntries";
import { Spoiler } from "@/components/Spoiler";

export const metadata: Metadata = {
  title: "Time Costs Catalog — Estimated AP Activities",
  description:
    "Browse estimated Action Point costs for Blood of Dawnwalker activities, with verification status, last-verified dates, and source notes. Unofficial fan data.",
};

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  unverified: "text-dusk-300 border-dusk-600",
  community: "text-dusk-100 border-dusk-500",
};

const showVerifiedCol = TIME_COST_ENTRIES.some(
  (r) => r.lastVerified !== undefined
);
const showSourceCol = TIME_COST_ENTRIES.some((r) => r.sourceNote);

export default function TimeCostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Time costs
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Fan-estimated AP spends for planning. Prefer a complete catalog over
          perfect lore accuracy. Spoiler notes stay collapsed. After launch,
          update{" "}
          <code className="text-dusk-300">lastVerified</code> and{" "}
          <code className="text-dusk-300">sourceNote</code> in the data file as
          you confirm costs in-game.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-dusk-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
            <tr>
              <th className="px-3 py-3">Activity</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">AP</th>
              <th className="px-3 py-3">Phase</th>
              <th className="px-3 py-3">Status</th>
              {showVerifiedCol && (
                <th className="px-3 py-3">Last verified</th>
              )}
              {showSourceCol && <th className="px-3 py-3">Source note</th>}
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
                    {row.verificationStatus}
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
        {TIME_COST_ENTRIES.length} entries. All values are fan estimates unless
        later verified against the released game.
      </p>
    </div>
  );
}
