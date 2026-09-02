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
  title: "Dawnwalker Missables – Planning for Timer Risks",
  description:
    "Dawnwalker missables: plan for timer risks in The Blood of Dawnwalker using public marketing time pressure—no fake verified deadlines. Empty table until observed.",
  absoluteTitle: true,
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
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Missables", path: "/missables" },
          ])}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Missables – Planning for Timer Risks
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          A spoiler-light planning page for timer-sensitive content in The Blood
          of Dawnwalker. We summarize the risk concept from public marketing and
          explain how to use the Time Budget tools—without inventing Verified
          missable lists or fake quest deadlines.
        </p>
      </div>

      <article className="prose-invert max-w-3xl space-y-6 text-dusk-300">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            What “missable risk” means before retail data
          </h2>
          <p>
            Missable risk, on this site, means you might lock yourself out of a
            beat by advancing the campaign clock, skipping a conversation
            window, or committing to a conflicting branch. Public marketing for
            Blood of Dawnwalker has leaned hard on limited time—the sense that
            nights are numbered and dawns keep arriving whether you are ready or
            not. That tone is currently known information. Specific named
            missables with hard day counts are not.
          </p>
          <p>
            Players often want a checklist the week a gothic RPG launches. Checklists
            feel safe. Invented checklists are worse than none: they train people
            to rush the wrong scenes and to treat fan fiction as patch notes.
            Dawnwalker Missables therefore stays useful by teaching habits—front-load
            personal leads that feel urgent, keep contingency in the ledger, delay
            pure tourism until after the first major gate—while the verified table
            remains empty.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            How to plan with the Dawnwalker Planner until rows exist
          </h2>
          <p>
            Use the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              interactive Time Budget planner
            </Link>{" "}
            as your risk surface. Add a custom line called “timer-sensitive
            personal lead (unknown)” with an Estimated cost and a note to revisit
            after you see the in-game journal. Protect sixteen to twenty-four
            model units as contingency so a surprise window does not bankrupt the
            month. Pair that with the{" "}
            <Link
              href="/guides/missable-content"
              className="text-ember-400 hover:underline"
            >
              missable content guide
            </Link>{" "}
            and{" "}
            <Link
              href="/guides/can-you-do-everything"
              className="text-ember-400 hover:underline"
            >
              can you do everything?
            </Link>{" "}
            so expectations stay realistic.
          </p>
          <p>
            When a streamer mentions a soft lock, do not paste the rumor into this
            index as Verified. Capture it in your personal plan notes, wait for a
            citeable source with platform and version, then promote it through
            Estimated → Reported → Verified. The{" "}
            <Link href="/quests" className="text-ember-400 hover:underline">
              quests page
            </Link>{" "}
            follows the same honesty rule. Empty catalogs are indexable on purpose:
            search engines and players both deserve a clear “not yet observed”
            answer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            Fields the future missables database will store
          </h2>
          <p>
            Future rows will hold a working name, a window description (phase,
            clock, or branch), a risk band, verification status, and citation
            metadata. We refuse to invent windows such as “must finish by night
            12” without observation. Unknown risk is the default because guessing
            high or low both mislead: high creates fake panic; low creates false
            calm. When footage is used, we require URL, timestamp, platform, game
            version, and verification date—the same bar as elsewhere on
            Dawnwalker Planner.
          </p>
          <p>
            A blank table means “not yet observed.” It does not mean “nothing is
            missable,” and it does not mean “this content does not exist.” After
            launch, expect this page to grow slowly and cite carefully rather than
            flood with unverified names.
          </p>
        </section>
      </article>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Fields this index stores
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
        <div className="space-y-3">
          <h2 className="font-display text-xl text-dusk-50">
            Missables table — no verified rows yet
          </h2>
          <p className="rounded-xl border border-dashed border-dusk-800 px-4 py-6 text-sm text-dusk-500">
            No observed missable rows yet. This index fills after retail
            observation or YouTube verification with a complete source citation.
            Until then, plan for timer risk with the guides and planner—not with
            invented deadlines.
          </p>
        </div>
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
