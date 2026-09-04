import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { PROLOGUE_DAY1_ROUTE } from "@/data/questOrder";
import { AddToPlannerButton } from "@/components/AddToPlannerButton";
import { QUEST_TO_COST_ID } from "@/lib/plannerLinks";

export const metadata: Metadata = pageMetadata({
  path: "/guides/quest-order",
  title: "Blood of Dawnwalker Quest Order – Prologue Time Guide",
  description:
    "Blood of Dawnwalker prologue quest order by Time Segments: zero-cost XP first, Deep Down for Lazar, Withering Away before Mass. Reported costs, not Verified.",
  absoluteTitle: true,
});

export default function QuestOrderPage() {
  const route = PROLOGUE_DAY1_ROUTE;
  return (
    <GuideLayout
      path="/guides/quest-order"
      title="Blood of Dawnwalker Quest Order: Best Way to Spend Your Time"
      intro="Not a full walkthrough dump—a Time Segment spending order for the prologue day before Blood Mass. Costs are launch-week Reported (IGN, PC Gamer, Polygon). Interactive planner units stay a fan model."
      keywordNote="Primary focus: Dawnwalker quest order / prologue time spend."
      lastUpdated="2026-09-03"
      dataStatus={{
        status: "reported",
        lastReviewed: "2026-09-03",
        source: "IGN YT, PC Gamer, Polygon, GameSpot",
      }}
      related={[
        {
          href: "/quests",
          label: "Quest catalog",
          description: "Full Reported prologue table with sources.",
        },
        {
          href: "/missables",
          label: "Missables",
          description: "Esme, Lazar, Mass fail windows.",
        },
        {
          href: "/planner",
          label: "Time Segment planner",
          description: "Load the prologue presets into your ledger.",
        },
      ]}
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">{route.name}</h2>
        <p>
          Budget:{" "}
          <strong className="text-dusk-100">{route.phaseLabel}</strong>.{" "}
          {route.summary}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-dusk-50">
          Recommended spend order
        </h2>
        <div className="overflow-x-auto rounded-xl border border-dusk-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Quest</th>
                <th className="px-3 py-3">Segments</th>
                <th className="px-3 py-3">Running</th>
                <th className="px-3 py-3">Tip</th>
                <th className="px-3 py-3">Planner</th>
              </tr>
            </thead>
            <tbody>
              {route.steps.map((step) => (
                <tr
                  key={step.questId + step.order}
                  className="border-t border-dusk-800/80 bg-night-950/40 align-top"
                >
                  <td className="px-3 py-3 text-dusk-500">{step.order}</td>
                  <td className="px-3 py-3 text-dusk-100">
                    <Link
                      href="/quests"
                      className="text-ember-400 hover:underline"
                    >
                      {step.name}
                    </Link>
                    {step.risk === "high" && (
                      <span className="ml-2 rounded border border-blood-600/50 px-1.5 py-0.5 text-[10px] uppercase text-blood-400">
                        High missable
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 font-medium text-ember-400">
                    {step.segments}
                  </td>
                  <td className="px-3 py-3 text-dusk-300">
                    {step.runningTotal}/{route.budgetSegments}
                  </td>
                  <td className="px-3 py-3 text-dusk-400 max-w-md">{step.tip}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <AddToPlannerButton
                      entryId={QUEST_TO_COST_ID[step.questId]}
                      name={step.name}
                      cost={step.segments}
                      phase="day"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-dusk-500">{route.leftoverNote}</p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Hard rules for this day
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Time advances on hourglass-marked actions; free roam usually does
            not.
          </li>
          <li>
            With only <strong className="text-dusk-100">1 segment</strong> left,
            do not start a multi-step quest that still spends mid-chain
            (Polygon).
          </li>
          <li>
            Unfinished prologue sides fail or lock when Mass begins (GameSpot /
            PowerPyx).
          </li>
          <li>
            Load the matching preset in the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              planner
            </Link>{" "}
            — catalog defaults now prioritize Reported prologue rows over
            Legacy estimates.
          </li>
        </ul>
      </section>
    </GuideLayout>
  );
}
