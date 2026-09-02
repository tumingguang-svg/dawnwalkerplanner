import type { Metadata } from "next";
import { BUILD_TEMPLATES } from "@/data/buildTemplates";

export const metadata: Metadata = {
  title: "Build Templates — Diplomat, Stalker & More",
  description:
    "Unofficial Blood of Dawnwalker build sketches (diplomat, stalker, guardian, heartstring) with playstyle focus, strengths, watch-outs, and AP budgeting tips.",
};

export default function BuildsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Build templates
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Lightweight playstyle sketches—not skill-tree dumps. Every template is
          marked estimated and meant to pair with the AP planner.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {BUILD_TEMPLATES.map((build) => (
          <article
            key={build.id}
            className="rounded-2xl border border-dusk-800 bg-night-900/50 p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-2xl text-dusk-50">{build.name}</h2>
              {build.estimated && (
                <span className="rounded border border-ember-600/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ember-400">
                  estimated
                </span>
              )}
            </div>
            <p className="text-sm text-ember-400">{build.focus}</p>
            <p className="text-sm text-dusk-300">{build.playstyle}</p>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-dusk-500">
                Strengths
              </h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
                {build.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-dusk-500">
                Watch-outs
              </h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
                {build.watchouts.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-dusk-500">
                Starter tips
              </h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
                {build.starterTips.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
