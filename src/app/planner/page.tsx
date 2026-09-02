import type { Metadata } from "next";
import { PlannerClient } from "@/components/PlannerClient";

export const metadata: Metadata = {
  title: "Interactive 480 AP Planner",
  description:
    "Budget 30 days of day and night Action Points for Blood of Dawnwalker. Presets, localStorage, and shareable plan URLs.",
};

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Interactive planner
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Model a campaign with an estimated 480 AP budget (30 days x 8 day + 8
          night). Load a preset, add catalog costs, or invent custom line items.
          Your plan stays in this browser and can be shared via URL.
        </p>
      </div>
      <PlannerClient />
    </div>
  );
}
