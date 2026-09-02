import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/30-day-deadline",
  title: "Dawnwalker 30-Day Deadline – Pacing the Campaign Clock",
  description:
    "Dawnwalker 30-day deadline guide: pace main path, side content, and contingency with an estimated Time Budget fan model—not official Action Points.",
  absoluteTitle: true,
});

export default function ThirtyDayDeadlinePage() {
  return (
    <GuideLayout
      title="Dawnwalker 30-Day Deadline"
      intro="How to treat the campaign month as a pacing problem: front-load what feels time-sensitive, park tourist content, and keep a contingency buffer in the fan Time Budget model."
      keywordNote="Primary focus: 30-day deadline (Dawnwalker)."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Why the month feels tight
        </h2>
        <p>
          A fixed campaign window rewards players who decide early what
          “enough” looks like. Trying to finish every district tour, romance
          beat, and faction errand in one pass is how ledgers go red. Our
          estimated model assumes {AP_CONFIG.totalAp} model units across{" "}
          {AP_CONFIG.totalDays} days—useful for practice, not a promise about
          official Action Points.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">A simple pacing split</h2>
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
            preparation; spend leftover units on low-risk cleanup only.
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
