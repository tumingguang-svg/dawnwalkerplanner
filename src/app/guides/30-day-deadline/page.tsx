import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG, SOURCE_URLS } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/30-day-deadline",
  title: "Blood of Dawnwalker 30-Day Deadline – What Happens After",
  description:
    "Blood of Dawnwalker 30-day deadline: what happens when the timer runs out (family, trophy, epilogue), plus Estimated pacing habits for the Time Budget planner.",
  absoluteTitle: true,
});

export default function ThirtyDayDeadlinePage() {
  return (
    <GuideLayout
      path="/guides/30-day-deadline"
      title="Blood of Dawnwalker 30-Day Deadline"
      intro="The campaign month is a pacing problem, not a real-time stopwatch. Below: Reported outcomes when the 30-day timer elapses, then Estimated habits for budgeting Time Segments in the fan planner."
      keywordNote="Primary focus: Blood of Dawnwalker 30-day deadline / what happens after."
      lastUpdated="2026-09-05"
      dataStatus={{
        status: "reported",
        lastReviewed: "2026-09-05",
        source: "VGC after-30-days + PC Gamer endings + PowerPyx trophy (Reported, not Verified)",
        basis:
          "Outcome bullets are launch-week Reported from written guides. The ~40/30/20/10 split remains Estimated planning hygiene only.",
      }}
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          What happens after 30 days (Reported)
        </h2>
        <p>
          The timer is tied to saving Coen’s family — not a hard game-over. If
          you stretch past day 30 before a family rescue ending:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Family perish at Brencis’ ceremony; you miss the{" "}
            <strong className="text-dusk-100">In the Nick of Time</strong>{" "}
            trophy/achievement (
            <a
              href={SOURCE_URLS.vgcAfter30}
              className="text-ember-400 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              VGC
            </a>
            ; also{" "}
            <a
              href={SOURCE_URLS.powerpyxTrophy}
              className="text-ember-400 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              PowerPyx
            </a>
            ).
          </li>
          <li>
            You miss the family epilogue chapter after a successful rescue (
            <a
              href={SOURCE_URLS.vgcAfter30}
              className="text-ember-400 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              VGC
            </a>
            ).{" "}
            <a
              href={SOURCE_URLS.pcgamerEndings}
              className="text-ember-400 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              PC Gamer endings
            </a>{" "}
            likewise note the family is dead/absent if the timer ran out.
          </li>
          <li>
            You can keep playing afterward (sandbox mop-up), but family-linked
            main quests and that epilogue stay unavailable (VGC).
          </li>
          <li>
            After you <em>do</em> rescue them and roll credits, there is no
            free-roam — make a manual save before the final boss (VGC; PowerPyx
            side-quest hub).
          </li>
        </ul>
        <p className="text-sm text-dusk-500">
          Last checked 2026-09-05. Reported from guides — not in-house Verified
          play. Cross-check the{" "}
          <Link href="/missables" className="text-ember-400 hover:underline">
            Missables checklist
          </Link>{" "}
          row for In the Nick of Time.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Why the month still feels tight
        </h2>
        <p>
          A fixed campaign window rewards players who decide early what
          “enough” looks like. Trying to finish every district tour, romance
          beat, and faction errand in one pass is how ledgers go red. Our
          estimated model assumes {AP_CONFIG.totalAp} Time Segments across{" "}
          {AP_CONFIG.totalDays} days—useful for practice, not a promise about
          official Action Points. Time only advances on hourglass commits (not
          free exploration) — see{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          A simple pacing split (Estimated)
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-dusk-100">~40% main path</strong> — story
            gates that advance the month’s stakes.
          </li>
          <li>
            <strong className="text-dusk-100">~30% personal / missable-risk</strong>{" "}
            — family leads, timers you care about, key relationships.
          </li>
          <li>
            <strong className="text-dusk-100">~20% exploration &amp; sides</strong>{" "}
            — districts, hunts, optional chains.
          </li>
          <li>
            <strong className="text-dusk-100">~10% contingency</strong> — travel,
            failures, “I didn’t know that cost two nights.”
          </li>
        </ul>
        <p className="text-sm text-dusk-500">
          Those percentages are Estimated planning hygiene, not Verified retail
          math. Adjust after your first playthrough.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Week-by-week habits</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong className="text-dusk-100">Days 1–7:</strong> learn the day /
            night split; finish one main beat before opening three side chains.
            Prologue first — see{" "}
            <Link
              href="/guides/quest-order"
              className="text-ember-400 hover:underline"
            >
              quest order
            </Link>
            .
          </li>
          <li>
            <strong className="text-dusk-100">Days 8–15:</strong> spend personal
            leads you care about; keep the contingency buffer intact.
          </li>
          <li>
            <strong className="text-dusk-100">Days 16–23:</strong> close or park
            long side chains; do not start new multi-step arcs casually.
          </li>
          <li>
            <strong className="text-dusk-100">Days 24–30:</strong> protect ending
            preparation; spend leftover units on low-risk cleanup only. Save
            before the final boss if you want mop-up later.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Put it in the planner</h2>
        <p>
          Load the Balanced Explore or Save Family Fast preset in the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            Time Budget planner
          </Link>
          , then trim against the{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            time costs catalog
          </Link>
          . Flag campaign missables on the{" "}
          <Link href="/missables" className="text-ember-400 hover:underline">
            Missables checklist
          </Link>
          . If you are asking whether one campaign can eat everything, read{" "}
          <Link
            href="/guides/can-you-do-everything"
            className="text-ember-400 hover:underline"
          >
            can you do everything?
          </Link>
          .
        </p>
      </section>
    </GuideLayout>
  );
}
