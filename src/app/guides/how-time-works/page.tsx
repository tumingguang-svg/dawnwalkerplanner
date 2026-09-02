import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = {
  title: "How Time Works in Blood of Dawnwalker (Fan Model)",
  description:
    "Unofficial explainer of how the Blood of Dawnwalker 30-day Time Budget fan model works: day units, night units, phases, and how to use Dawnwalker Planner without treating numbers as official Action Points.",
};

export default function HowTimeWorksPage() {
  return (
    <GuideLayout
      title="How time works in Blood of Dawnwalker"
      intro="A spoiler-light overview of the campaign clock as a planning problem—and how this site’s estimated 30-day Time Budget model helps you think in day and night wallets."
      keywordNote="Primary focus: how time works (Dawnwalker)."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Time is a scarce resource
        </h2>
        <p>
          Blood of Dawnwalker frames the story around a limited campaign window.
          Activities consume pieces of that window. Some only make sense in
          daylight; others lean on darkness. The practical question for planning
          is not “what is the lore clock,” but “how do I avoid spending the whole
          month on the wrong stack of tasks?”
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Our estimated Time Budget model
        </h2>
        <p>
          Dawnwalker Planner uses an estimated fan model:{" "}
          <strong className="text-dusk-100">
            {AP_CONFIG.totalDays} days × ({AP_CONFIG.dayAp} day +{" "}
            {AP_CONFIG.nightAp} night) = {AP_CONFIG.totalAp} model units
          </strong>
          . Those units are a ledger shorthand for the interactive{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>
          —not a claim that the shipped game exposes official Action Points with
          those exact values.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-dusk-100">Day units</strong> — travel,
            markets, open exploration, many social beats.
          </li>
          <li>
            <strong className="text-dusk-100">Night units</strong> — hunts,
            stealth, court after dark, occult attempts.
          </li>
          <li>
            <strong className="text-dusk-100">Either</strong> — flexible costs
            you can retag once you know the phase lock.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Estimated vs Reported vs Verified
        </h2>
        <p>
          Catalog rows on{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            /time-costs
          </Link>{" "}
          carry a verification tier. Estimated means fan planning guess.
          Reported means a player note that is not yet treated as retail-stable.
          Verified is reserved for costs confirmed against the released game or
          a named patch—with a date or source. This site does not invent
          Verified numbers.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">How to use the tools</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Skim the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>{" "}
            for phase tags.
          </li>
          <li>
            Load a preset in the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              planner
            </Link>{" "}
            and leave a contingency buffer.
          </li>
          <li>
            Read{" "}
            <Link
              href="/guides/day-vs-night"
              className="text-ember-400 hover:underline"
            >
              day vs night
            </Link>{" "}
            and the{" "}
            <Link
              href="/guides/30-day-deadline"
              className="text-ember-400 hover:underline"
            >
              30-day deadline
            </Link>{" "}
            guides before you overfill the ledger.
          </li>
        </ol>
      </section>
    </GuideLayout>
  );
}
