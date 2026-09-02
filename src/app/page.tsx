import Link from "next/link";
import { AP_CONFIG } from "@/data/apConfig";
import { DataStatus } from "@/components/DataStatus";

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
            Budget every night before the dawn breaks
          </h1>
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

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
            body: "Schema of fields we will store after retail observation or cited footage—not a confirmed quest list.",
          },
          {
            href: "/missables",
            title: "Missables index",
            body: "Timer-window schema. Stays empty until Estimated or Reported observations exist.",
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
            <h2 className="font-display text-xl text-dusk-50 group-hover:text-ember-400 transition-colors">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-dusk-400">
              {card.body}
            </p>
          </Link>
        ))}
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
            .
          </li>
        </ul>
      </section>

      <DataStatus />
    </div>
  );
}
