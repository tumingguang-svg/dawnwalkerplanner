import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { QUEST_ENTRIES } from "@/data/quests";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { AddToPlannerButton } from "@/components/AddToPlannerButton";
import { QUEST_TO_COST_ID } from "@/lib/plannerLinks";

export const metadata: Metadata = pageMetadata({
  path: "/quests",
  title: "Dawnwalker Quests – Reported Prologue Catalog",
  description:
    "Dawnwalker prologue quests with Reported time-segment costs from launch-week guides and YouTube narration. Not Verified in-house play.",
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
      "Working title and bucket: main, side, personal, or faction.",
  },
  {
    field: "estimatedAp",
    meaning:
      "Time Budget model units (one unit ≈ one time-bar segment). Null means pending—not zero. Zero is an observed free quest.",
  },
  {
    field: "phase",
    meaning: "day, night, either, or unknown. Prologue rows are day (before Mass).",
  },
  {
    field: "verificationStatus",
    meaning:
      "Estimated, Reported, or Verified. These prologue rows are Reported—not Verified.",
  },
  {
    field: "missableRisk",
    meaning: "low, medium, high, or unknown.",
  },
  {
    field: "lastChecked / source",
    meaning:
      "Date last checked against guides (UI label; not in-house Verified) plus source note. YouTube-derived rows store URL, timestamp (full-video narration is allowed), platform, and game version.",
  },
];

export default function QuestsPage() {
  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Quests", path: "/quests" },
          ])}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Quests – Reported Prologue Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Launch-week <strong className="text-dusk-200">Reported</strong>{" "}
          prologue rows from written guides and YouTube tip narration (reviewed
          2026-09-03). Planner defaults use conservative segment costs. Nothing
          here is in-house <strong className="text-dusk-200">Verified</strong>.
        </p>
      </div>

      <article className="prose-invert max-w-3xl space-y-6 text-dusk-300">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            Prologue 8-segment tips
          </h2>
          <p>
            Guides and tip videos Report that the day time bar has{" "}
            <strong className="text-dusk-100">8 segments</strong> before Mass
            (IGN, PC Gamer, Polygon, Falcon). There are about{" "}
            <strong className="text-dusk-100">13 named prologue quests</strong>{" "}
            plus extras (bandit camp / treasure). You cannot finish every
            hourglass chain on one day bar.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Do not start a multi-step quest with 1 segment left—it can fail
              with no rewards (Polygon).
            </li>
            <li>
              Grab zero-cost XP first: Enter Not, Dead Drop, If a Tree Falls
              (IGN / PC Gamer, 0 segments).
            </li>
            <li>
              <strong className="text-dusk-100">Deep Down / Lazar:</strong> if
              the search resolves after 5 segments have already passed, Lazar is
              reported dead; ≤4 passed → alive (IGN).
            </li>
            <li>
              <strong className="text-dusk-100">Withering Away:</strong> finish
              before Mass; brew{" "}
              <strong className="text-dusk-100">hot water + three spoonfuls</strong>{" "}
              (PC Gamer / PowerPyx / GameSpot).
            </li>
            <li>
              Unfinished clock-icon sides fail when Blood Mass begins
              (GameSpot / PowerPyx).
            </li>
          </ul>
          <p className="text-sm text-dusk-500">
            RageGaming spoken “10 notches” conflicts with the 8-segment default.
            This site follows 8. See{" "}
            <Link
              href="/guides/how-time-works"
              className="text-ember-400 hover:underline"
            >
              how time works
            </Link>{" "}
            and the{" "}
            <Link href="/missables" className="text-ember-400 hover:underline">
              missables index
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            How to use these rows in the planner
          </h2>
          <p>
            Quick-add matching Prologue / Mechanics rows in the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              Dawnwalker Planner
            </Link>{" "}
            or browse{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs
            </Link>
            . Interactive units stay an Estimated 8+8 model. Quest segment
            numbers below are Reported. Workflow:{" "}
            <Link
              href="/guides/how-to-plan-your-time"
              className="text-ember-400 hover:underline"
            >
              how to plan your time
            </Link>
            .
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
          Prologue quest table (Reported)
        </h2>
        <p className="text-sm text-dusk-500">
          {QUEST_ENTRIES.length} rows. Status is Reported for every row. Zero
          means a cited free quest, not “pending.”
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
                <th className="px-3 py-3">Planner</th>
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
                      <span className="mt-1 block text-xs text-dusk-600 break-all">
                        {row.sourceNote}
                      </span>
                    )}
                    {row.youtubeSource && (
                      <span className="mt-1 block text-xs text-dusk-600">
                        <a
                          href={row.youtubeSource.url}
                          className="text-ember-400 hover:underline break-all"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {row.youtubeSource.url}
                        </a>
                        {" · "}
                        {row.youtubeSource.timestamp}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <AddToPlannerButton
                      entryId={QUEST_TO_COST_ID[row.id]}
                      name={row.name}
                      cost={row.estimatedAp ?? 0}
                      phase={row.phase}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DataStatus
        status="reported"
        lastReviewed="2026-09-03"
        source="IGN YT, PC Gamer, Polygon, GameSpot, Falcon YT"
      />
      <RelatedLinks
        extra={[
          {
            href: "/guides/how-time-works",
            label: "How time works",
            description: "8-segment Reported mechanics + Estimated planner model.",
          },
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "How to flag timer-sensitive beats.",
          },
          {
            href: "/missables",
            label: "Missables index",
            description: "Reported prologue lock windows.",
          },
        ]}
      />
    </div>
  );
}
