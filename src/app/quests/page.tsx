import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { QUEST_ENTRIES } from "@/data/quests";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata: Metadata = pageMetadata({
  path: "/quests",
  title: "Dawnwalker Quests – What We Track (Known Info)",
  description:
    "Dawnwalker quests: currently known information for The Blood of Dawnwalker. Time pressure from public marketing, planner use, and fields we will store after retail data.",
  absoluteTitle: true,
});

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
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Quests – What We Track (Known Info)
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          An honest summary of what is currently known about quest-shaped
          content in The Blood of Dawnwalker from public marketing—and what
          this unofficial catalog will store once retail observation exists. Not
          a finished quest list. Not Verified retail costs.
        </p>
      </div>

      <article className="prose-invert max-w-3xl space-y-6 text-dusk-300">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            Time pressure is the known premise—not a spoiler checklist
          </h2>
          <p>
            Public materials for Blood of Dawnwalker have framed the campaign
            around a scarce window of nights and days. That marketing premise is
            enough to justify planning tools. It is not enough to invent named
            quests, hard deadlines, or Verified Action Point costs. Players keep
            asking for quest databases because RPG communities expect sortable
            tables. Until someone can cite retail play or fully sourced footage,
            the honest answer is thinner: the game sells time pressure; the
            concrete quest roster is still pending observation.
          </p>
          <p>
            Treat “currently known information” as a category that includes
            tone, structure, and planning advice—not fake row counts. We know
            fans will want to distinguish main-path beats, side explorations,
            personal leads, and faction work. We know day and night matter as
            separate planning wallets in our estimated Time Budget model. We do
            not know the official names, order, or unit costs of every chain.
            Publishing invented titles would help SEO briefly and hurt trust
            forever. Dawnwalker Planner chooses trust.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            How to use the planner and guides until retail data exists
          </h2>
          <p>
            Until this table fills with Observed rows, plan with mechanisms
            instead of spoilers. Open the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              Dawnwalker Planner
            </Link>{" "}
            and budget an estimated 30-day Time Budget with presets and custom
            lines. Pull activity-level guesses from the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>
            —still Estimated, still labeled. Read{" "}
            <Link
              href="/guides/choices-and-consequences"
              className="text-ember-400 hover:underline"
            >
              choices and consequences
            </Link>{" "}
            for the choice → consequence → time cost loop, and{" "}
            <Link
              href="/guides/how-to-plan-your-time"
              className="text-ember-400 hover:underline"
            >
              how to plan your time
            </Link>{" "}
            for a practical workflow.
          </p>
          <p>
            A useful pre-release habit: reserve ledger space for “unknown main
            beats,” “unknown personal leads,” and a contingency buffer instead of
            pretending you already know every side chain. When a friend shares a
            rumor, log it as a custom Estimated line with a note—not as Verified.
            When retail launches, swap rumors for cited rows. That workflow is
            why this page stays indexable even while the data table is almost
            empty: it explains the gap instead of hiding behind noindex.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            What the future quest database will store
          </h2>
          <p>
            Each future row is meant to answer planning questions, not to dump
            story. We store a working name and type bucket; an estimated Time
            Budget cost (or null when pending); a phase tag for day, night,
            either, or unknown; a verification status; a missable-risk hint; and
            citation fields so Reported or Verified claims can be audited.
            YouTube-derived values need URL, timestamp, platform, game version,
            and verification date before they can climb past Estimated.
          </p>
          <p>
            Null estimated cost means “not yet measured,” never “free.” Unknown
            missable risk means we refuse to guess a timer. Schema example rows
            exist only so the columns are readable in the UI. They are not real
            quests. When real observations arrive, example scaffolding will give
            way to cited entries—or stay empty longer if sources remain thin.
          </p>
        </section>
      </article>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Fields this database stores
        </h2>
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

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Quest table — no verified retail rows yet
        </h2>
        <p className="text-sm text-dusk-500">
          Honest empty-ish state: only a schema illustration appears below. No
          verified Blood of Dawnwalker quest costs are published here.
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
            description: "Timer-risk planning summary—empty until observed.",
          },
        ]}
      />
    </div>
  );
}
