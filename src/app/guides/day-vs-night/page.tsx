import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/day-vs-night",
  title: "Dawnwalker Day vs Night – When to Spend Each Phase",
  description:
    "Dawnwalker day vs night: allocate estimated day and night Time Budget units, avoid idle wallets, and plan phase-locked activities for Blood of Dawnwalker.",
  absoluteTitle: true,
});

export default function DayVsNightPage() {
  return (
    <GuideLayout
      path="/guides/day-vs-night"
      title="Dawnwalker Day vs Night"
      intro="Daylight and darkness are not just mood—they are two wallets in the estimated Time Budget model. Here is how to keep both productive without assuming official Action Point rules."
      keywordNote="Primary focus: day vs night (Dawnwalker)."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Two wallets, one month</h2>
        <p>
          In our fan model each day grants {AP_CONFIG.dayAp} day units and{" "}
          {AP_CONFIG.nightAp} night units. Overspend one wallet while ignoring
          the other and you create artificial scarcity. Tagging costs as day,
          night, or either in the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>{" "}
          makes that imbalance visible early.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">What usually fits daylight</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>District travel and open exploration blocks</li>
          <li>Markets, crafting sessions, many social introductions</li>
          <li>Formal duels and other public confrontations</li>
        </ul>
        <p className="text-sm text-dusk-500">
          Phase locks in the catalog are Estimated until Reported or Verified
          against retail play.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">What usually fits night</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Hunt patrols and stealth infiltrations</li>
          <li>Salon / court scenes after dark</li>
          <li>Occult rituals and predator-leaning routes</li>
        </ul>
        <p>
          Vampire-leaning{" "}
          <Link
            href="/builds/vampire"
            className="text-ember-400 hover:underline"
          >
            build sketches
          </Link>{" "}
          often front-load night units; human-leaning{" "}
          <Link href="/builds/human" className="text-ember-400 hover:underline">
            builds
          </Link>{" "}
          may burn more day units on diplomacy and defense.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Practical rules of thumb</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Never empty both wallets on the same long side chain.</li>
          <li>
            If night is idle three days in a row, schedule information gathering
            or a short hunt—not another day-only tour.
          </li>
          <li>
            Keep “either” costs flexible until you know the real phase lock;
            then retag in the planner.
          </li>
          <li>
            Cross-check spends in the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>
            .
          </li>
        </ol>
      </section>
    </GuideLayout>
  );
}
