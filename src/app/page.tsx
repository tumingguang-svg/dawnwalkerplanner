import Link from "next/link";
import { AP_CONFIG } from "@/data/apConfig";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-dusk-800 bg-night-900/60 px-6 py-14 shadow-glow md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(224,120,48,0.15),transparent_45%)]" />
        <div className="relative max-w-2xl space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-ember-400">
            Unofficial fan site
          </p>
          <h1 className="font-display text-4xl leading-tight text-dusk-50 md:text-5xl">
            Plan 30 nights before the dawn breaks
          </h1>
          <p className="text-lg text-dusk-300">
            Dawnwalker Planner helps you budget an estimated{" "}
            <strong className="text-dusk-100">{AP_CONFIG.totalAp} Action Points</strong>{" "}
            across {AP_CONFIG.totalDays} days ({AP_CONFIG.dayAp} day +{" "}
            {AP_CONFIG.nightAp} night). Built for The Blood of Dawnwalker fans who
            want a clear AP ledger—not spoilers dumped in your face.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/planner"
              className="rounded-lg bg-ember-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ember-500"
            >
              Open interactive planner
            </Link>
            <Link
              href="/beginner"
              className="rounded-lg border border-dusk-600 px-5 py-2.5 text-sm text-dusk-100 hover:border-ember-500"
            >
              Beginner guide
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            href: "/planner",
            title: "480 AP planner",
            body: "Add costs, load presets, track remaining AP, autosave locally, and share a URL.",
          },
          {
            href: "/time-costs",
            title: "Time cost catalog",
            body: "About twenty estimated activities with verification labels and collapsed spoilers.",
          },
          {
            href: "/builds",
            title: "Build templates",
            body: "Four playstyle sketches—diplomat, stalker, guardian, heartstring—with AP tips.",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 hover:border-ember-500/50 transition-colors"
          >
            <h2 className="font-display text-xl text-dusk-50">{card.title}</h2>
            <p className="mt-2 text-sm text-dusk-400">{card.body}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-dusk-800/80 bg-night-950/50 p-6 text-sm text-dusk-400">
        <h2 className="font-display text-lg text-dusk-200">Before you play</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>This site is not affiliated with Rebel Wolves or Bandai Namco.</li>
          <li>Numbers are estimated or unverified fan models for planning practice.</li>
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
    </div>
  );
}
