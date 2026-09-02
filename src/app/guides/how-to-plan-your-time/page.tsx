import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/how-to-plan-your-time",
  title: "Dawnwalker How to Plan Your Time – Time Budget Workflow",
  description:
    "Dawnwalker how to plan your time: Time Budget planner workflow—presets, catalog costs, contingency buffer, share URL. Fan model, not official AP.",
  absoluteTitle: true,
});

export default function HowToPlanYourTimePage() {
  return (
    <GuideLayout
      title="Dawnwalker How to Plan Your Time"
      intro="A practical workflow for the unofficial 30-day ledger: turn Estimated activities into a visible budget, keep day and night wallets honest, and leave room for the choices you have not made yet."
      keywordNote="Primary focus: how to plan your time / Time Budget planner workflow."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          What you are budgeting
        </h2>
        <p>
          Dawnwalker Planner uses an estimated fan model:{" "}
          <strong className="text-dusk-100">
            {AP_CONFIG.totalDays} days × ({AP_CONFIG.dayAp} day +{" "}
            {AP_CONFIG.nightAp} night) = {AP_CONFIG.totalAp} model units
          </strong>
          . Those units are a ledger shorthand—not a claim about official Action
          Points. Catalog costs stay Estimated until they are checked in retail
          play or fully cited footage.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Workflow: catalog to ledger
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Open the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              Time Budget planner
            </Link>{" "}
            and load a preset that matches your intent (story-first, personal
            leads, or broader exploration). Treat presets as starting shapes,
            not recommended builds.
          </li>
          <li>
            Skim the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>{" "}
            . Note phase tags (day / night / either) and the verification
            label. Do not treat Estimated numbers as confirmed retail costs.
          </li>
          <li>
            Quick-add catalog rows you expect to take, or add a custom line
            when the catalog has no fit. Tag the phase so one wallet cannot
            silently overspend.
          </li>
          <li>
            Protect a contingency buffer (travel, retries, surprise follow-ups).
            If remaining units drop below that buffer, cut a side chain before
            you cut the buffer.
          </li>
          <li>
            Autosave stays in this browser. Use a share URL when you want a
            snapshot of “what I planned to spend.”
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Habits that keep the ledger useful
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Log a choice as a cost using the{" "}
            <Link
              href="/guides/choices-and-consequences"
              className="text-ember-400 hover:underline"
            >
              Choice → Consequence → Time Cost → Planner
            </Link>{" "}
            chain, instead of waiting until the month is already tight.
          </li>
          <li>
            If night or day sits idle for several days in the plan, retag or
            swap activities rather than emptying one wallet twice.
          </li>
          <li>
            Revisit Estimated rows after you play. Wrong costs should change
            status (Estimated → Reported → Verified) with a source—not a silent
            overwrite presented as fact.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Start planning</h2>
        <p>
          This is the planner workflow, not a first-week tips list (that lives
          on{" "}
          <Link href="/beginner" className="text-ember-400 hover:underline">
            /beginner
          </Link>
          ). When you are ready to put numbers on a month:
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/planner"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ember-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-ember-500"
          >
            Open the Time Budget planner
          </Link>
          <Link
            href="/time-costs"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-dusk-600 px-5 py-2.5 text-sm font-medium text-dusk-100 hover:border-ember-500"
          >
            Browse time costs
          </Link>
        </div>
      </section>
    </GuideLayout>
  );
}
