import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { AP_CONFIG } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Dawnwalker Planner – Free 30-Day Time Budget Tool for Blood of Dawnwalker",
  description:
    "Free Dawnwalker Planner: unofficial 30-day Time Budget tool for The Blood of Dawnwalker. Presets, catalog costs, share URLs—fan model, not official AP.",
  absoluteTitle: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnwalkerplanner.org";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Dawnwalker Planner",
      url: siteUrl,
      description:
        "Unofficial Blood of Dawnwalker fan planner for an estimated 30-day Time Budget (480 model units).",
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      name: "Dawnwalker Planner",
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      url: `${siteUrl}/planner`,
      description:
        "Unofficial fan tool to budget an estimated 30-day Time Budget across a Blood of Dawnwalker campaign. Model units only—not official Action Points. Not affiliated with Rebel Wolves or Bandai Namco.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "Dawnwalker Planner (unofficial fan project)",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden rounded-3xl border border-dusk-800 bg-night-900/60 px-6 py-12 shadow-glow md:px-12 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(224,120,48,0.15),transparent_45%)]" />
        <div className="relative max-w-2xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-ember-400">
              Unofficial fan site
            </p>
            <span className="rounded-full border border-ember-600/50 bg-ember-600/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ember-400">
              Time Budget · estimated
            </span>
          </div>
          <h1 className="font-display text-4xl leading-tight text-dusk-50 md:text-5xl">
            Dawnwalker Planner
          </h1>
          <p className="text-lg text-dusk-200 md:text-xl">
            Free 30-day Time Budget tool for The Blood of Dawnwalker
          </p>
          <p className="font-display text-xl text-ember-400/90 md:text-2xl">
            Budget every night before the dawn breaks
          </p>
          <p className="text-lg text-dusk-300">
            Dawnwalker Planner is a free, browser-based ledger for an estimated{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.totalDays}-day Time Budget
            </strong>{" "}
            ({AP_CONFIG.totalAp} model units: {AP_CONFIG.dayAp} day +{" "}
            {AP_CONFIG.nightAp} night). Load presets, add catalog costs, autosave
            locally, and share a plan URL—without dumping spoilers in your face.
          </p>
          <p className="text-sm text-dusk-500">
            Model units are a fan planning shorthand, not a claim about official
            Action Points. See the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              disclaimer
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/planner"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ember-600 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-ember-500"
            >
              Open interactive planner
            </Link>
            <Link
              href="/time-costs"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-dusk-600 px-5 py-3 text-sm font-medium text-dusk-100 hover:border-ember-500"
            >
              Browse time costs
            </Link>
            <Link
              href="/guides/how-time-works"
              className="inline-flex min-h-11 items-center justify-center px-2 py-3 text-sm text-dusk-400 underline-offset-4 hover:text-ember-400 hover:underline"
            >
              How time works
            </Link>
          </div>
        </div>
      </section>

      <article className="prose-invert mx-auto max-w-3xl space-y-10 text-dusk-300">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            What is a Time Budget in Blood of Dawnwalker planning?
          </h2>
          <p>
            A Time Budget is a fan planning model: a simple way to treat the
            campaign clock in The Blood of Dawnwalker as a scarce resource you
            can write down before you spend it. Public marketing for the game has
            emphasized a tense, limited window—story pressure that makes every
            detour feel expensive. Players who love RPGs often want a ledger for
            that pressure. Dawnwalker Planner exists for that habit, not as a
            substitute for the shipped rules.
          </p>
          <p>
            Think of a Time Budget the way some players think of a weekly meal
            plan or a travel itinerary. You are not claiming the restaurant
            menu is fixed forever; you are deciding, in advance, which meals you
            can afford this week. In Blood of Dawnwalker terms, that means
            deciding which main-path beats, side explorations, relationship
            conversations, and night-only activities you intend to prioritize
            before the month runs out. The ledger makes trade-offs visible. It
            does not invent official Action Point values, and it does not
            guarantee that every catalog row will match retail.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Why fans invent planning models before retail numbers exist
          </h3>
          <p>
            Pre-release communities often need a shared language. Without one,
            advice collapses into vibes: “do the important stuff first,” “save
            nights for infiltration,” “don’t open too many side chains.” Those
            tips are useful, but they are hard to practice. A Time Budget gives
            you a practice surface. You can load a preset, subtract a few
            estimated costs, watch a remaining total drop, and feel the shape of
            scarcity—even when every number is still labeled Estimated.
          </p>
          <p>
            That practice matters for The Blood of Dawnwalker because the fantasy
            of the setting is already about limited nights and dawns that keep
            coming. A planner that mirrors day and night wallets helps you
            rehearse the emotional rhythm of the campaign: daylight for public
            moves, darkness for quieter or riskier ones, and a contingency buffer
            for the mistakes you have not made yet. None of that requires
            inventing Verified quest costs. It requires honesty about what is
            still unknown.
          </p>
          <p>
            Dawnwalker Planner therefore separates three ideas that players often
            blur together. First, the narrative premise of a limited campaign
            window drawn from public marketing. Second, our estimated fan model
            of {AP_CONFIG.totalAp} model units across {AP_CONFIG.totalDays} days.
            Third, whatever official Action Point or time economy Rebel Wolves
            ships in the released game. Mixing those three into one confident
            table is how fan sites accidentally publish fiction as fact. We keep
            them apart on purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            How the estimated 30-day / 480 model units work
          </h2>
          <p>
            Our fan model is deliberately simple. Each campaign day is treated as
            two wallets:{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.dayAp} day units
            </strong>{" "}
            and{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.nightAp} night units
            </strong>
            . Multiply by {AP_CONFIG.totalDays} days and you get{" "}
            <strong className="text-dusk-100">
              {AP_CONFIG.totalAp} model units
            </strong>{" "}
            total—often written as “8 day + 8 night × 30.” That arithmetic is
            Estimated. It is a planning scaffold, not a leaked spreadsheet and
            not an official Action Point total.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Day wallet, night wallet, and “either” costs
          </h3>
          <p>
            In the interactive planner, every line item can be tagged as day,
            night, or either. Day tags drain the daylight wallet. Night tags
            drain the darkness wallet. Either tags can flex depending on how you
            schedule the activity. The point of the split is not lore pedantry;
            it is to stop you from spending an entire month of night units on
            daytime social calls and then wondering why the nocturnal half of
            Blood of Dawnwalker feels rushed.
          </p>
          <p>
            Because the model is estimated, you should expect to revise it. After
            launch, patches, difficulty options, or better player reports may
            show that some activities cost more or less than our catalog
            guesses. When that happens, Dawnwalker Planner will prefer clear
            labels—Estimated, Reported, or Verified—over silent edits that
            pretend we always knew. Until a row is checked against retail play or
            fully cited footage, it stays Estimated. Unverified data is not
            confirmed fact.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            What “Estimated” means on this site
          </h3>
          <p>
            Estimated means “useful for rehearsal, not ratified.” Reported means
            a player or video source described a cost with enough detail to cite,
            but we have not yet treated it as Verified. Verified is reserved for
            values confirmed against the released game under documented
            conditions. We do not invent Verified retail quest costs. If a table
            looks thin, that emptiness is honesty—not a missing dump of invented
            numbers.
          </p>
          <p>
            The 480 total also teaches a pacing lesson even if the shipped
            economy differs. A fixed month rewards players who decide early what
            “enough” looks like. Trying to finish every district tour, romance
            beat, and faction errand in one pass is how ledgers go red. Whether
            your personal Time Budget ends up at 480 model units or some other
            shape after retail, the habit of leaving contingency is what survives
            the patch notes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            How to use this Dawnwalker Planner
          </h2>
          <p>
            Open the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              interactive planner
            </Link>{" "}
            when you want a working ledger rather than another essay. The tool
            is designed for short sessions: load a starting shape, subtract a
            handful of costs, glance at remaining day and night units, then
            adjust. You do not need a perfect catalog to benefit. You need a
            visible budget and the willingness to cut something when the
            remaining total looks uncomfortable.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            Presets, catalog, undo, share URL, and localStorage
          </h3>
          <p>
            Presets give you a first draft. A balanced explore preset, a
            story-first split, or a night-forward sketch can populate the ledger
            so you are not staring at a blank page. Treat presets as opinions,
            not destinies. After you load one, delete lines that do not match
            your goals for The Blood of Dawnwalker and add the ones that do.
          </p>
          <p>
            The{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>{" "}
            feeds quick-add buttons and reference rows. Catalog activities carry
            Estimated costs, phase tags, and notes that stay collapsed when they
            might spoil. Prefer a complete-enough catalog over perfect lore
            accuracy. When you are unsure, add a custom line item with your own
            guess and refine later. Undo exists because planning is iterative;
            one accidental click should not wreck a carefully tuned month.
          </p>
          <p>
            Share URLs encode the plan so you can send a link to a co-op partner
            or future-you without exporting a spreadsheet. Autosave uses
            localStorage in this browser: convenient for returning to the same
            machine, not a cloud account and not a backup guarantee. If you care
            about a plan, copy the share URL somewhere durable. Clear site data
            and the local draft disappears. That is intentional privacy posture,
            not a missing login wall.
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            A practical first session
          </h3>
          <p>
            First, skim{" "}
            <Link
              href="/guides/how-time-works"
              className="text-ember-400 hover:underline"
            >
              how time works
            </Link>{" "}
            so the day/night wallets make sense. Second, open the planner and
            load a preset close to your intended pace. Third, protect a
            contingency buffer—sixteen to twenty-four model units is a common
            starter range in our guides—before you fill every remaining slot with
            tourist content. Fourth, mark anything that feels timer-sensitive in
            your notes even if the{" "}
            <Link href="/missables" className="text-ember-400 hover:underline">
              missables index
            </Link>{" "}
            is still empty. Fifth, share the URL if you want a second opinion.
          </p>
          <p>
            If you are brand new to the setting’s planning problems, the{" "}
            <Link href="/beginner" className="text-ember-400 hover:underline">
              beginner guide
            </Link>{" "}
            walks first-week habits without dumping endings. Build hubs for{" "}
            <Link
              href="/builds/vampire"
              className="text-ember-400 hover:underline"
            >
              vampire
            </Link>{" "}
            and{" "}
            <Link
              href="/builds/human"
              className="text-ember-400 hover:underline"
            >
              human
            </Link>{" "}
            playstyles add Time Budget tips that pair with the ledger. None of
            those pages replace reading the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              disclaimer
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-dusk-50">
            Difference vs official Action Points — and our disclaimers
          </h2>
          <p>
            Official Action Points—or whatever economy the released Blood of
            Dawnwalker uses—belong to Rebel Wolves and their publishing
            partners. Dawnwalker Planner’s model units belong to a fan ledger.
            Similar words do not make them the same system. If a streamer says
            “AP” and our UI says “model units,” assume they might be talking past
            each other until someone cites retail evidence with platform, patch,
            and date.
          </p>
          <p>
            This site is not affiliated with Rebel Wolves or Bandai Namco. We do
            not host official assets, cheats, trainers, or exploit instructions.
            We write original copy about planning hygiene. Quest and missable
            tables stay schema-first until observations exist. Privacy-minded
            players can read the{" "}
            <Link href="/privacy" className="text-ember-400 hover:underline">
              privacy policy
            </Link>
            ; terms of use live on{" "}
            <Link href="/terms" className="text-ember-400 hover:underline">
              /terms
            </Link>
            . The full legal and affiliation note is on the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              disclaimer page
            </Link>
            .
          </p>
          <h3 className="font-display text-xl text-dusk-100">
            How to read every number on this site
          </h3>
          <p>
            If a number lacks a Verified label, treat it as a rehearsal value.
            If a quest name looks generic or explicitly marked as a schema
            example, it is not a spoiler list. If a missable window is blank,
            that means “not yet observed,” not “nothing can be missed.” Public
            marketing for The Blood of Dawnwalker has highlighted time pressure;
            that premise is enough to justify planning tools. It is not enough
            to justify inventing deadlines for unnamed side quests.
          </p>
          <p>
            When retail data arrives, expect the catalog to grow carefully. We
            would rather publish fewer rows with source notes than a wall of
            confident fiction. Until then, use Dawnwalker Planner the way a
            tabletop group uses a session zero checklist: to align expectations,
            not to predict the dice.
          </p>
        </section>
      </article>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-dusk-50">
          Tools and guides on this site
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              href: "/planner",
              title: "30-day Time Budget planner",
              body: "Add costs, load presets, track remaining model units, undo mistakes, autosave locally, and share a URL.",
            },
            {
              href: "/time-costs",
              title: "Time cost catalog",
              body: "Estimated activities with Estimated / Reported / Verified labels, source notes, and collapsed spoilers.",
            },
            {
              href: "/builds",
              title: "Build hubs",
              body: "Vampire and human playstyle sketches with Time Budget tips—not skill-tree dumps.",
            },
            {
              href: "/quests",
              title: "Quest database",
              body: "Currently known information and the fields we will store after retail observation—not a confirmed quest list.",
            },
            {
              href: "/missables",
              title: "Missables index",
              body: "Planning for timer risks from public marketing pressure. Empty verified table until observations exist.",
            },
            {
              href: "/guides/how-to-plan-your-time",
              title: "Guides",
              body: "Planner workflow, choices and consequences under limited time, deadline, day vs night, and missables.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card-surface group rounded-2xl p-5 transition-colors hover:border-ember-500/50"
            >
              <h3 className="font-display text-xl text-dusk-50 group-hover:text-ember-400 transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dusk-400">
                {card.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dusk-800/80 bg-night-950/50 p-5 sm:p-6 text-sm text-dusk-400">
        <h2 className="font-display text-lg text-dusk-200">Before you play</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>This site is not affiliated with Rebel Wolves or Bandai Namco.</li>
          <li>
            The 480 total is an estimated 30-day Time Budget fan model (model
            units), not official Action Points.
          </li>
          <li>
            Costs are labeled Estimated, Reported, or Verified—never invent
            Verified retail numbers. Unverified data is not confirmed fact.
          </li>
          <li>No cheats, no official assets, original copy only.</li>
          <li>
            Read the{" "}
            <Link href="/disclaimer" className="text-ember-400 hover:underline">
              full disclaimer
            </Link>
            ,{" "}
            <Link href="/privacy" className="text-ember-400 hover:underline">
              privacy
            </Link>
            , and{" "}
            <Link href="/terms" className="text-ember-400 hover:underline">
              terms
            </Link>
            .
          </li>
        </ul>
      </section>

      <DataStatus />
    </div>
  );
}
