import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";

export const metadata: Metadata = pageMetadata({
  path: "/guides/choices-and-consequences",
  title: "Dawnwalker Choices and Consequences – Limited Time",
  description:
    "Dawnwalker choices and consequences under a limited Time Budget: choice → consequence → time cost in the planner. Estimated fan model, not retail outcomes.",
  absoluteTitle: true,
});

export default function ChoicesAndConsequencesPage() {
  return (
    <GuideLayout
      path="/guides/choices-and-consequences"
      title="Dawnwalker Choices and Consequences"
      intro="In a 30-day campaign, a choice is not only a story fork. It spends a slice of the clock, closes or delays other options, and leaves a consequence you still have to budget for. This is a mechanism guide—not an ending list."
      keywordNote="Primary focus: choices and consequences + limited time (Dawnwalker)."
    >
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
          We do not list specific endings, rewards, or plot locks here. Those
          stay unstated until they are observed in retail play or fully cited
          footage. Treat this page as Estimated planning hygiene.
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
          The{" "}
          <Link href="/quests" className="text-ember-400 hover:underline">
            quest catalog
          </Link>{" "}
          stores schema fields for costs and missable risk once observations
          exist. Until then, practice the chain on generic Estimated activities
          rather than treating placeholder names as a walkthrough.
        </p>
      </section>
    </GuideLayout>
  );
}
