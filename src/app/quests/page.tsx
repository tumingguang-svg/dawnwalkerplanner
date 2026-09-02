import type { Metadata } from "next";
import Link from "next/link";
import { QUEST_ENTRIES } from "@/data/quests";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Quest Database — Estimated Time Budget Shell",
  description:
    "Unofficial Blood of Dawnwalker quest database shell. Placeholder rows stay Estimated until observed. No invented Verified Time Budget costs.",
};

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  reported: "text-dusk-100 border-dusk-500",
  verified: "text-dusk-50 border-ember-500/60 bg-ember-600/10",
};

export default function QuestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Quest database
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Shell table for quest Time Budget notes. Rows below are clearly
          pending Estimated placeholders—not Verified retail data. Fill costs
          only after observation; keep{" "}
          <code className="text-dusk-300">lastVerified</code> null until then.
        </p>
        <p className="mt-2 text-sm text-dusk-500">
          Use the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>{" "}
          for campaign ledgers and{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            time costs
          </Link>{" "}
          for activity-level estimates.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-dusk-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
            <tr>
              <th className="px-3 py-3">Quest</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Est. units</th>
              <th className="px-3 py-3">Phase</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Missable risk</th>
              <th className="px-3 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {QUEST_ENTRIES.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-8 text-center text-dusk-500"
                >
                  No quest rows yet. Placeholders will appear here as Estimated
                  entries.
                </td>
              </tr>
            ) : (
              QUEST_ENTRIES.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-dusk-800/80 bg-night-950/40 align-top"
                >
                  <td className="px-3 py-3 text-dusk-100">{row.name}</td>
                  <td className="px-3 py-3 capitalize text-dusk-400">
                    {row.type}
                  </td>
                  <td className="px-3 py-3 font-medium text-ember-400">
                    {row.estimatedAp ?? (
                      <span className="text-dusk-500">Pending</span>
                    )}
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
                  <td className="px-3 py-3 capitalize text-dusk-400">
                    {row.missableRisk}
                  </td>
                  <td className="px-3 py-3 text-dusk-400 max-w-sm">
                    {row.notes}
                    {row.sourceNote && (
                      <span className="mt-1 block text-xs text-dusk-600">
                        {row.sourceNote}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-dusk-600">
        {QUEST_ENTRIES.length} shell row(s). Pending costs are intentional—do
        not treat blank units as zero.
      </p>
      <RelatedLinks
        extra={[
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "How to flag timer-sensitive beats.",
          },
          {
            href: "/missables",
            label: "Missables index",
            description: "Empty shell until Estimated rows exist.",
          },
        ]}
      />
    </div>
  );
}
