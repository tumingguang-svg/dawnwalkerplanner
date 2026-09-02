import type { Metadata } from "next";
import Link from "next/link";
import { QUEST_ENTRIES } from "@/data/quests";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Quest Database — What This Catalog Tracks",
  description:
    "Unofficial Blood of Dawnwalker quest catalog schema: fields we will store after retail observation or cited player footage. Not a confirmed quest list. Estimated until verified.",
};

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  reported: "text-dusk-100 border-dusk-500",
  verified: "text-dusk-50 border-ember-500/60 bg-ember-600/10",
};

const SCHEMA_FIELDS = [
  {
    field: "name / type",
    meaning:
      "Working title and bucket: main, side, personal, or faction. Titles stay generic until observed.",
  },
  {
    field: "estimatedAp",
    meaning:
      "Time Budget model units, or null. Null means pending—not zero cost.",
  },
  {
    field: "phase",
    meaning: "day, night, either, or unknown until the lock is observed.",
  },
  {
    field: "verificationStatus",
    meaning:
      "Estimated (default), Reported, or Verified. Pre-release values stay Estimated.",
  },
  {
    field: "missableRisk",
    meaning: "low, medium, high, or unknown. Unknown until a window is cited.",
  },
  {
    field: "lastVerified / source",
    meaning:
      "Date plus source note. YouTube-derived rows also store URL, timestamp, platform, and game version.",
  },
];

export default function QuestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Quest database
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          This page documents <strong className="text-dusk-200">what the catalog tracks</strong>
          —the fields we will fill after retail gameplay or fully cited player
          footage. It is not a finished quest list. Until those checks exist,
          nothing here is confirmed fact.
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
          for activity-level estimates. Mechanism notes live in{" "}
          <Link
            href="/guides/choices-and-consequences"
            className="text-ember-400 hover:underline"
          >
            choices and consequences
          </Link>
          .
        </p>
      </div>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">Fields this database stores</h2>
        <p className="text-dusk-400">
          Rows appear only after observation. The catalog grows from retail
          playthrough notes or YouTube (and similar) footage that includes
          source URL, timestamp, platform, game version, and verification date.
        </p>
        <dl className="space-y-2">
          {SCHEMA_FIELDS.map((item) => (
            <div key={item.field} className="sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-3">
              <dt className="font-mono text-xs text-ember-400">{item.field}</dt>
              <dd className="text-dusk-400">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Pending verification — schema example
        </h2>
        <p className="text-sm text-dusk-500">
          One illustrative row so the columns are readable. It is not a real
          quest. Additional names will wait for observation.
        </p>
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
              {QUEST_ENTRIES.map((row) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DataStatus />
      <RelatedLinks
        extra={[
          {
            href: "/guides/choices-and-consequences",
            label: "Choices and consequences",
            description: "Choice → consequence → time cost → planner.",
          },
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "How to flag timer-sensitive beats.",
          },
          {
            href: "/missables",
            label: "Missables index",
            description: "Schema for windows and risk—empty until observed.",
          },
        ]}
      />
    </div>
  );
}
