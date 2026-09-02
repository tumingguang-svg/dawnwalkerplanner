import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { MISSABLE_ENTRIES } from "@/data/missables";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata: Metadata = pageMetadata({
  path: "/missables",
  title: "Missables Index — What This Catalog Tracks",
  description:
    "Unofficial Blood of Dawnwalker missables schema: timer windows and risk fields we will store after retail observation or cited footage. Not a confirmed missable list.",
});

const SCHEMA_FIELDS = [
  {
    field: "name",
    meaning:
      "Working label for a timer-sensitive beat. Generic until an observation exists.",
  },
  {
    field: "window",
    meaning:
      "When the beat can lock out (campaign phase, clock, or branch). Unknown until cited.",
  },
  {
    field: "risk",
    meaning: "low, medium, high, or unknown. Unknown is the honest default.",
  },
  {
    field: "verificationStatus",
    meaning:
      "Estimated until gameplay, official notes, or fully cited footage exist.",
  },
  {
    field: "lastVerified / source",
    meaning:
      "Date plus source note. YouTube-derived rows keep URL, timestamp, platform, and game version.",
  },
];

export default function MissablesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Missables index
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          This page documents <strong className="text-dusk-200">what the catalog tracks</strong>
          {" "}for timer-sensitive content. It is not a spoiler checklist and not a
          claim that specific beats are missable. Rows will appear after retail
          observation or fully cited player footage—not before.
        </p>
        <p className="mt-2 text-sm text-dusk-500">
          For planning habits (without invented lists), read the{" "}
          <Link
            href="/guides/missable-content"
            className="text-ember-400 hover:underline"
          >
            missable content guide
          </Link>
          . Pair with the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            Time Budget planner
          </Link>
          .
        </p>
      </div>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">Fields this index stores</h2>
        <p className="text-dusk-400">
          Empty is intentional. A blank catalog means “not yet observed,” not
          “nothing is missable” and not “this content does not exist.”
        </p>
        <dl className="space-y-2">
          {SCHEMA_FIELDS.map((item) => (
            <div
              key={item.field}
              className="sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-3"
            >
              <dt className="font-mono text-xs text-ember-400">{item.field}</dt>
              <dd className="text-dusk-400">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      {MISSABLE_ENTRIES.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-dusk-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
              <tr>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Window</th>
                <th className="px-3 py-3">Risk</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {MISSABLE_ENTRIES.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-dusk-800/80 bg-night-950/40 align-top"
                >
                  <td className="px-3 py-3 text-dusk-100">{row.name}</td>
                  <td className="px-3 py-3 text-dusk-400">{row.window}</td>
                  <td className="px-3 py-3 capitalize text-dusk-300">
                    {row.risk}
                  </td>
                  <td className="px-3 py-3 capitalize text-ember-400">
                    {VERIFICATION_LABELS[row.verificationStatus]}
                  </td>
                  <td className="px-3 py-3 text-dusk-400">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-dusk-800 px-4 py-6 text-sm text-dusk-500">
          No observed missable rows yet. This index fills after retail
          observation or YouTube verification with a complete source citation.
        </p>
      )}

      <DataStatus />
      <RelatedLinks
        extra={[
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "Spoiler-light planning framework.",
          },
          {
            href: "/guides/choices-and-consequences",
            label: "Choices and consequences",
            description: "Limited time makes every yes a trade-off.",
          },
          {
            href: "/guides/can-you-do-everything",
            label: "Can you do everything?",
            description: "Why completionism collides with the clock.",
          },
        ]}
      />
    </div>
  );
}
