import type { Metadata } from "next";
import Link from "next/link";
import { Spoiler } from "@/components/Spoiler";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = {
  title: "Beginner Guide",
  description:
    "Beginner tips for budgeting day and night Action Points in Blood of Dawnwalker — unofficial fan advice.",
};

export default function BeginnerPage() {
  return (
    <div className="prose-invert max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Beginner guide
        </h1>
        <p className="mt-2 text-dusk-400">
          A short, spoiler-light orientation for planning your first campaign
          around an estimated {AP_CONFIG.totalAp} AP budget.
        </p>
      </div>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">The AP loop</h2>
        <p>
          Treat each day as two wallets: {AP_CONFIG.dayAp} day AP and{" "}
          {AP_CONFIG.nightAp} night AP. Some activities accept either phase;
          others are locked to daylight or darkness. When you are unsure, log
          the cost as &quot;either&quot; in the planner and refine later.
        </p>
        <p>
          Over thirty days that yields {AP_CONFIG.totalAp} AP total. That number
          is a fan planning model—verify against your own play once the game
          ships patches.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">First-week habits</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Finish one main beat before opening three side chains.</li>
          <li>Keep a 16–24 AP contingency for travel and failures.</li>
          <li>Spend at least one night AP on information gathering early.</li>
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

      <section className="rounded-xl border border-dusk-800 bg-night-900/40 p-4 text-sm text-dusk-400">
        No cheats, trainers, or exploit instructions appear on this site—only
        planning hygiene and estimated costs.
      </section>
    </div>
  );
}
