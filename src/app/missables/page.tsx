import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { MISSABLE_ENTRIES } from "@/data/missables";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  path: "/missables",
  title: "Dawnwalker Missables – Reported Prologue Timer Risks",
  description:
    "Dawnwalker missables: Reported prologue lock windows (Esme, Lazar, Gremla, Blood Mass, half-quest fail) from launch-week guides and YouTube narration.",
  absoluteTitle: true,
});

const statusColor: Record<string, string> = {
  estimated: "text-ember-400 border-ember-600/40",
  reported: "text-dusk-100 border-dusk-500",
  verified: "text-dusk-50 border-ember-500/60 bg-ember-600/10",
};

const SCHEMA_FIELDS = [
  {
    field: "name",
    meaning: "Working label for a timer-sensitive beat.",
  },
  {
    field: "window",
    meaning:
      "When the beat can lock out (campaign phase, clock, or branch).",
  },
  {
    field: "risk",
    meaning: "low, medium, high, or unknown.",
  },
  {
    field: "verificationStatus",
    meaning:
      "These rows are Reported from guides and tip videos—not Verified in-house play.",
  },
  {
    field: "lastVerified / source",
    meaning:
      "Date plus source note. YouTube-derived rows keep URL, timestamp, platform, and game version.",
  },
];

export default function MissablesPage() {
  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Missables", path: "/missables" },
          ])}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Missables – Reported Prologue Timer Risks
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Launch-week <strong className="text-dusk-200">Reported</strong>{" "}
          prologue lock windows from guides and YouTube narration (2026-09-03).
          Soft spoilers in the notes. Not a Verified retail checklist.
        </p>
      </div>

      <article className="prose-invert max-w-3xl space-y-6 text-dusk-300">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            What “missable risk” means here
          </h2>
          <p>
            Missable risk means you might lock a beat by advancing the campaign
            clock, skipping a conversation window, or committing to a conflicting
            branch. Public marketing already sold limited time. Launch-week
            guides now name a few prologue windows: Mass cuts unfinished sides;
            Lazar’s Deep Down search has a segment deadline; Esme’s brew must be
            hot water + three spoonfuls before the ceremony (PC Gamer / PowerPyx).
          </p>
          <p>
            Pair this index with the{" "}
            <Link href="/quests" className="text-ember-400 hover:underline">
              prologue quest catalog
            </Link>{" "}
            (8-segment tips) and the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              Time Budget planner
            </Link>
            . Brew steps also live on{" "}
            <Link
              href="/guides/choices-and-consequences"
              className="text-ember-400 hover:underline"
            >
              choices
            </Link>
            . Still keep contingency in the ledger—Reported is not Verified.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            Fields this index stores
          </h2>
          <p>
            Each row holds a working name, a window (phase, clock, or branch), a
            risk band, verification status, and citation metadata. YouTube rows
            require URL, timestamp, platform, game version, and verification
            date. Incomplete timestamps use “full-video narration” and stay
            Reported.
          </p>
        </section>
      </article>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Field meanings
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
          Prologue missables (Reported)
        </h2>
        <p className="text-sm text-dusk-500">
          {MISSABLE_ENTRIES.length} rows. Notes include story-adjacent timer
          outcomes from cited guides.
        </p>
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
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 text-xs ${statusColor[row.verificationStatus]}`}
                    >
                      {VERIFICATION_LABELS[row.verificationStatus]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-dusk-400 max-w-md">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DataStatus
        status="reported"
        lastReviewed="2026-09-03"
        source="IGN YT, GameSpot, Polygon, PowerPyx, LunarGaming narration"
      />
      <RelatedLinks
        extra={[
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "Spoiler-light planning framework.",
          },
          {
            href: "/quests",
            label: "Quest catalog",
            description: "Reported prologue costs + 8-segment tips.",
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
