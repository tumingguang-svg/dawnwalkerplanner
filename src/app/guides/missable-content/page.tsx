import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { Spoiler } from "@/components/Spoiler";

export const metadata: Metadata = pageMetadata({
  path: "/guides/missable-content",
  title: "Blood of Dawnwalker Missable Content — Planning Guide",
  description:
    "Unofficial Blood of Dawnwalker missable content guide: how to flag timer-sensitive quests, relationships, and endings using Estimated planning habits—no invented Verified lists.",
});

export default function MissableContentGuidePage() {
  return (
    <GuideLayout
      title="Missable content: plan before it vanishes"
      intro="A spoiler-light framework for spotting timer-sensitive content in a 30-day campaign. The missables index stays a shell until Estimated or Reported rows exist—we will not invent Verified checklists."
      keywordNote="Primary focus: missable content (Dawnwalker)."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          What “missable” means here
        </h2>
        <p>
          Missable means you can lock yourself out of a beat by advancing the
          campaign clock, skipping a conversation window, or committing to a
          conflicting branch. It does not mean every side activity is secretly
          on a hard timer. Until retail notes exist, treat high-stakes personal
          leads as higher risk than tourist exploration.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Planning habits that reduce soft locks
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Finish one time-sensitive personal lead before opening three long sides.</li>
          <li>Keep a contingency buffer in the Time Budget planner.</li>
          <li>Tag uncertain costs as “either” until you know the phase lock.</li>
          <li>
            Log candidates in the{" "}
            <Link href="/missables" className="text-ember-400 hover:underline">
              missables index
            </Link>{" "}
            once you have an Estimated or Reported note—never as fake Verified.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Soft spoiler pacing note</h2>
        <Spoiler label="Reveal mild pacing spoiler">
          Family-related leads can feel more time-sensitive than district tours.
          If that arc matters to you, front-load those spends and delay long
          optional chains until after the first major story gate.
        </Spoiler>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Tools to pair with this guide</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <Link href="/planner" className="text-ember-400 hover:underline">
              Time Budget planner
            </Link>{" "}
            — Save Family Fast preset if personal leads are priority.
          </li>
          <li>
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              Time costs catalog
            </Link>{" "}
            — check Estimated phase tags.
          </li>
          <li>
            <Link href="/quests" className="text-ember-400 hover:underline">
              Quest catalog schema
            </Link>{" "}
            — fields stored after observation, not a finished quest list.
          </li>
          <li>
            <Link
              href="/guides/30-day-deadline"
              className="text-ember-400 hover:underline"
            >
              30-day deadline
            </Link>{" "}
            — week-by-week cut discipline.
          </li>
        </ol>
      </section>
    </GuideLayout>
  );
}
