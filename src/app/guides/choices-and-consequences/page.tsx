import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";

export const metadata: Metadata = pageMetadata({
  path: "/guides/choices-and-consequences",
  title: "Dawnwalker Choices and Consequences – Limited Time",
  description:
    "Dawnwalker choices with time stakes: Esme brew steps (Reported), then choice → consequence → Time Segment cost in the planner. Reported launch-week sources, not in-house Verified.",
  absoluteTitle: true,
});

export default function ChoicesAndConsequencesPage() {
  return (
    <GuideLayout
      path="/guides/choices-and-consequences"
      title="Dawnwalker Choices and Consequences"
      intro="In a 30-day campaign, a choice spends clock, closes windows, and leaves a consequence you still budget for. Below: one high-stakes prologue brew with sources, then the planning chain. Not a full ending dump."
      keywordNote="Primary focus: choices and consequences + limited time (Dawnwalker)."
      lastUpdated="2026-09-04"
    >
      <section className="space-y-3 rounded-xl border border-ember-600/30 bg-ember-600/5 p-4 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Prologue: Esme’s medicine (Reported)
        </h2>
        <p className="text-sm text-dusk-400">
          Highest early missable. Sources agree on the brew steps; wrong prep or
          unfinished{" "}
          <strong className="text-dusk-200">Withering Away</strong> before Blood
          Mass → Esme dies (PowerPyx fail state).
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            <strong className="text-dusk-100">Choice.</strong> At home with
            Pieter, brew Anca’s herbs: pick{" "}
            <strong className="text-dusk-100">Use hot water</strong>, then{" "}
            <strong className="text-dusk-100">Add three spoonfuls of herbs</strong>{" "}
            (PC Gamer Anca recipe; PowerPyx Withering Away; GameSpot save-mom).
            Anca’s spoken tip: three scoops, water hot but not boiling.
          </li>
          <li>
            <strong className="text-dusk-100">Consequence.</strong> Correct brew
            + finished quest before Mass keeps Esme alive through the ceremony
            (still captive later). Wrong brew or skip → death at Mass.
          </li>
          <li>
            <strong className="text-dusk-100">Time cost.</strong> Planner default{" "}
            <strong className="text-dusk-100">2</strong> segments (PC Gamer
            table). PowerPyx lists 1 when leaving Anca (+1 if you stay for
            Page-Turner). Optional mid-quest spends can push higher (Gamer
            Guides ~2–4) — check the hourglass.
          </li>
          <li>
            <strong className="text-dusk-100">Planner.</strong> Add{" "}
            <Link href="/quests" className="text-ember-400 hover:underline">
              Withering Away
            </Link>{" "}
            from Reported quests, keep a buffer, and finish before the day bar
            fills. See{" "}
            <Link href="/missables" className="text-ember-400 hover:underline">
              /missables
            </Link>{" "}
            and{" "}
            <Link href="/guides/quest-order" className="text-ember-400 hover:underline">
              quest order
            </Link>
            .
          </li>
        </ol>
        <p className="text-xs text-dusk-500">
          Sources: PC Gamer Anca recipe (2026-09-02), PowerPyx Withering Away,
          GameSpot “save Coen’s mother”. Reported ≠ Verified in-house play.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Limited time is the real stake
        </h2>
        <p>
          Blood of Dawnwalker frames decisions inside a scarce campaign window.
          Saying yes to a conversation, a detour, or a confrontation does not
          just pick a flavor of scene—it spends day or night units you cannot
          spend twice. The consequence is often another spend: travel back,
          a follow-up, a locked-out window, or simply less contingency later.
        </p>
        <p className="text-sm text-dusk-500">
          Named prologue lock windows live on{" "}
          <Link href="/missables" className="text-ember-400 hover:underline">
            /missables
          </Link>{" "}
          as Reported rows, not Verified endings. We only promote choice details
          when Tier 1–4 sources agree. Treat this page as planning hygiene plus
          a few sourced forks.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Choice → Consequence → Time Cost → Planner
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong className="text-dusk-100">Choice.</strong> You commit to a
            beat (or skip it). Write it down in plain language you will still
            understand a week later.
          </li>
          <li>
            <strong className="text-dusk-100">Consequence.</strong> Ask what
            becomes true: a window might close, a relationship might need a
            later scene, a district might stay unexplored. Keep this at the
            mechanism level—no invented outcomes.
          </li>
          <li>
            <strong className="text-dusk-100">Time cost.</strong> Match the
            choice to an Estimated activity on{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              /time-costs
            </Link>{" "}
            (or a custom line if the catalog has no fit). Phase-tag it day,
            night, or either.
          </li>
          <li>
            <strong className="text-dusk-100">Planner.</strong> Log the cost in
            the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              Time Budget planner
            </Link>{" "}
            so the remaining wallets show the trade-off before you take a
            second detour.
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          How to use this chain without spoiling yourself
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Log the spend first; look up alleged outcomes later, if at all.
          </li>
          <li>
            If a choice feels timer-sensitive, flag it as unknown risk on{" "}
            <Link href="/missables" className="text-ember-400 hover:underline">
              /missables
            </Link>{" "}
            only after you have an Estimated note—not a fake Verified row.
          </li>
          <li>
            Leave a contingency buffer so one expensive consequence does not
            empty both wallets. See{" "}
            <Link
              href="/guides/how-to-plan-your-time"
              className="text-ember-400 hover:underline"
            >
              how to plan your time
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">Related tools</h2>
        <p>
          Log the Esme spend in the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>
          , cross-check{" "}
          <Link href="/quests" className="text-ember-400 hover:underline">
            quests
          </Link>{" "}
          and{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            time costs
          </Link>
          , and keep Lazar / Mass windows on{" "}
          <Link href="/missables" className="text-ember-400 hover:underline">
            missables
          </Link>
          . More sourced choices land here only when guides agree.
        </p>
      </section>
    </GuideLayout>
  );
}
