import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Spoiler } from "@/components/Spoiler";
import { DataStatus } from "@/components/DataStatus";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/beginner",
  title: "Dawnwalker Beginner Guide – First Week Time Budget",
  description:
    "Dawnwalker beginner guide: first-week Time Budget habits for The Blood of Dawnwalker—day/night wallets, contingency buffer, and the unofficial planner.",
  absoluteTitle: true,
});

export default function BeginnerPage() {
  return (
    <div className="prose-invert max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Beginner Guide – First Week Time Budget
        </h1>
        <p className="mt-2 text-dusk-400">
          A short, spoiler-light orientation for planning your first campaign
          around an estimated {AP_CONFIG.totalDays}-day Time Budget ({AP_CONFIG.totalAp} model units).
        </p>
      </div>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">The Time Budget loop</h2>
        <p>
          Treat each day as two wallets: {AP_CONFIG.dayAp} day units and{" "}
          {AP_CONFIG.nightAp} night units in our fan model. Some activities
          accept either phase; others are locked to daylight or darkness. When
          you are unsure, log the cost as &quot;either&quot; in the planner and
          refine later.
        </p>
        <p>
          Over thirty days that yields {AP_CONFIG.totalAp} model units total.
          That number is an estimated Time Budget fan model—not official Action
          Points. Verify against your own play once patches land.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">First-week habits</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Finish one main beat before opening three side chains.</li>
          <li>Keep a 16–24 unit contingency for travel and failures.</li>
          <li>Spend at least one night unit on information gathering early.</li>
          <li>
            Open the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              planner
            </Link>{" "}
            and try the Balanced Explore preset.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">Soft spoilers</h2>
        <Spoiler label="Show pacing note (mild spoiler)">
          Family-related leads can feel time-sensitive. If you care about that
          arc, front-load those costs and delay long district tours until after
          the first major gate.
        </Spoiler>
      </section>

      <section className="space-y-2 text-sm text-dusk-400">
        <p>
          Dig deeper:{" "}
          <Link href="/guides/how-time-works" className="text-ember-400 hover:underline">
            how time works
          </Link>
          ,{" "}
          <Link
            href="/guides/how-to-plan-your-time"
            className="text-ember-400 hover:underline"
          >
            how to plan your time
          </Link>
          ,{" "}
          <Link
            href="/guides/choices-and-consequences"
            className="text-ember-400 hover:underline"
          >
            choices and consequences
          </Link>
          ,{" "}
          <Link href="/guides/30-day-deadline" className="text-ember-400 hover:underline">
            30-day deadline
          </Link>
          ,{" "}
          <Link href="/guides/day-vs-night" className="text-ember-400 hover:underline">
            day vs night
          </Link>
          .
        </p>
      </section>

      <section className="rounded-xl border border-dusk-800 bg-night-900/40 p-4 text-sm text-dusk-400">
        No cheats, trainers, or exploit instructions appear on this site—only
        planning hygiene and Estimated Time Budget costs. Unverified data is
        not confirmed fact.
      </section>

      <DataStatus />
    </div>
  );
}
