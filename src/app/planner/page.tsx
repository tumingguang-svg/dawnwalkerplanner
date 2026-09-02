import type { Metadata } from "next";
import { PlannerClient } from "@/components/PlannerClient";

export const metadata: Metadata = {
  title: "Interactive 480 AP Planner — Budget Day & Night",
  description:
    "Interactive unofficial Blood of Dawnwalker planner: budget ~480 Action Points across 30 days, load presets, undo changes, track overspend, autosave locally, and share plan URLs.",
};

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Interactive planner
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Model a campaign with an estimated 480 AP budget (30 days × 8 day + 8
          night). Load a preset, quick-add catalog costs, or invent custom line
          items. Your plan stays in this browser and can be shared via URL.
        </p>
      </div>
      <PlannerClient />
    </div>
  );
}
