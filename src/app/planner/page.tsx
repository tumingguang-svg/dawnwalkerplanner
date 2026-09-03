import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PlannerClient } from "@/components/PlannerClient";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/jsonld";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/planner",
  title: "Dawnwalker Planner – Interactive 30-Day Time Budget",
  description:
    "Interactive Dawnwalker Planner: budget an estimated 30-day Time Budget (480 Time Segments), load presets, undo, autosave locally, and share plan URLs.",
  absoluteTitle: true,
});

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            url: "/planner",
            name: "Dawnwalker Planner",
            description:
              "Free unofficial web GameApplication for budgeting an estimated 30-day Time Budget (480 Time Segments) in The Blood of Dawnwalker. Fan Time Segments only—not official Action Points.",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Planner", path: "/planner" },
          ]),
        ]}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Dawnwalker Planner – Interactive 30-Day Time Budget
        </h1>
        <h2 className="mt-2 font-display text-lg text-dusk-300">
          Budget day and night Time Segments
        </h2>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Model a campaign with an estimated 30-day Time Budget (480 model
          units: 30 × 8 day + 8 night). Load a preset, quick-add catalog costs,
          or invent custom line items. Your plan stays in this browser and can
          be shared via URL. These are fan Time Segments—not a claim about
          official Action Points. See{" "}
          <Link
            href="/guides/how-to-plan-your-time"
            className="text-ember-400 hover:underline"
          >
            how to plan your time
          </Link>
          ,{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>
          , and the{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            time costs catalog
          </Link>
          .
        </p>
      </div>
      <PlannerClient />

      <article className="prose-invert mx-auto max-w-3xl space-y-8 border-t border-dusk-800/80 pt-10 text-dusk-300">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            What Time Budget is
          </h2>
          <p>
            A Time Budget is a fan planning ledger for The Blood of Dawnwalker:
            a way to treat the campaign clock as a scarce resource you can write
            down before you spend it. Public marketing for the game has
            emphasized a tense, limited window—story pressure that makes every
            detour feel expensive. Players who like RPG spreadsheets often want
            that pressure made visible. This interactive Dawnwalker Planner
            exists for that habit. It is not a substitute for the shipped rules,
            and it is not affiliated with Rebel Wolves or Bandai Namco.
          </p>
          <p>
            Think of a Time Budget the way a tabletop group uses a session-zero
            checklist. You are aligning expectations: which main-path beats you
            intend to protect, which side explorations you can afford, which
            night-only activities deserve a reserved wallet, and how much
            contingency you keep for mistakes you have not made yet. The ledger
            makes trade-offs obvious. It does not invent official Action Point
            values, and it does not guarantee that every catalog row will match
            retail play.
          </p>
          <p>
            On this site, “Time Budget” always means our estimated fan model
            unless a row is later marked Reported or Verified against the
            released game. Unverified data is not confirmed fact. If you only
            remember one sentence from this page, make it that one—and read the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              disclaimer
            </Link>{" "}
            before treating any number as gospel.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            The 480 Time Segments (30 × 8 day + 8 night) — Estimated
          </h2>
          <p>
            Our fan model is deliberately simple. Each campaign day is treated
            as two wallets:{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.dayAp} day segments
            </strong>{" "}
            and{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.nightAp} night segments
            </strong>
            . Multiply by {AP_CONFIG.totalDays} days and you get{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.totalAp} Time Segments
            </strong>{" "}
            total—often written as “8 day + 8 night × 30.” That arithmetic is{" "}
            <strong className="text-dusk-100">Estimated</strong>. It is a
            planning scaffold, not a leaked spreadsheet and not an official
            Action Point total.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Day wallet, night wallet, and “either” costs
          </h3>
          <p>
            In the tool above, every line item can be tagged as day, night, or
            either. Day tags drain the daylight wallet. Night tags drain the
            darkness wallet. Either tags can flex depending on how you schedule
            the activity. The split exists so you do not empty an entire month
            of night segments on daytime social calls and then wonder why the
            nocturnal half of Blood of Dawnwalker feels rushed.
          </p>
          <p>
            Because the model is estimated, you should expect to revise it.
            After launch, patches, difficulty options, or better player reports
            may show that some activities cost more or less than our catalog
            guesses. When that happens, we prefer clear labels—Estimated,
            Reported, or Verified—over silent edits that pretend we always knew.
            We do not invent Verified retail quest costs. Browse the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>{" "}
            to see how rows are labeled today, and the{" "}
            <Link href="/faq" className="text-ember-400 hover:underline">
              FAQ
            </Link>{" "}
            for what each label means.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            What the three presets are for
          </h2>
          <p>
            Presets are first drafts, not destinies. They exist so you are not
            staring at a blank ledger when you open the planner for the first
            time. Each preset loads a plausible shape of Estimated spends; you
            are expected to delete, retag, and replace lines until the month
            matches your goals.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Save Family Fast
          </h3>
          <p>
            Use this when your priority is critical story beats and
            family-related objectives. It front-loads main-path and rescue-style
            spends, keeps travel and night intel lean, and leaves only a thin
            contingency buffer. Side exploration is intentionally starved. If
            you load this preset and still add every district tour, you are
            fighting the design of the draft.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Balanced Explore
          </h3>
          <p>
            Use this when you want a split between story progress, district
            wandering, optional encounters, and a healthier reserve. It is the
            default rehearsal shape for players who have not yet decided whether
            they are speed-running pressure or savoring the map. Treat the
            “flexible reserve” as sacred until you know which side chains are
            actually worth opening.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Romance Priority
          </h3>
          <p>
            Use this when companion and relationship scenes matter as much as
            the ending. It budgets romance and social evenings early, keeps a
            minimum viable main path, and still protects an ending-prep reserve.
            It is not a guarantee that every affection beat exists at the costs
            shown—those preset rows remain Estimated. Prologue catalog rows on
            /quests and /time-costs are Reported, not Verified.
          </p>
          <p>
            After any preset, open a few catalog quick-adds, mark day versus
            night honestly, and leave contingency you can actually feel. Undo
            exists because planning is iterative. Autosave uses localStorage in
            this browser; share URLs encode the plan for a co-op partner or
            future-you. Clear site data and the local draft disappears—see the{" "}
            <Link href="/faq" className="text-ember-400 hover:underline">
              privacy answers in the FAQ
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            Difference vs official Action Points
          </h2>
          <p>
            Official Action Points—or whatever economy the released Blood of
            Dawnwalker uses—belong to Rebel Wolves and their publishing
            partners. Dawnwalker Planner’s Time Segments belong to a fan ledger.
            Similar words do not make them the same system. If a streamer says
            “AP” and our UI says “Time Segments,” assume they might be talking past
            each other until someone cites retail evidence with platform, patch,
            and date.
          </p>
          <p>
            This free web tool is published as a GameApplication-style planner
            for rehearsal only. We do not host cheats, trainers, save editors,
            or exploit instructions. We write original planning copy and keep
            quest or missable tables honest (Reported is not Verified).
            For legal and affiliation notes, read the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              disclaimer
            </Link>
            . For label definitions and data-handling questions, use the{" "}
            <Link href="/faq" className="text-ember-400 hover:underline">
              FAQ
            </Link>
            . For Reported prologue rows and Estimated placeholders you can
            quick-add here, open{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              /time-costs
            </Link>
            . For workflow essays that pair with this ledger, start with the{" "}
            <Link
              href="/guides/how-to-plan-your-time"
              className="text-ember-400 hover:underline"
            >
              how to plan your time
            </Link>{" "}
            guide and{" "}
            <Link
              href="/guides/how-time-works"
              className="text-ember-400 hover:underline"
            >
              how time works
            </Link>
            .
          </p>
          <p>
            Expect the catalog to grow carefully. We would rather publish fewer
            rows with source notes than a wall of confident fiction. Use this
            Dawnwalker Planner the way you would use a pencil itinerary for a
            trip whose train schedules
            are still drafts: useful for deciding what matters, never a promise
            that every stop will cost exactly what you wrote down.
          </p>
        </section>
      </article>
    </div>
  );
}
