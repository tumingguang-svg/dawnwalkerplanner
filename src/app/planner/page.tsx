import type { Metadata } from "next";
import Link from "next/link";
import { PlannerClient } from "@/components/PlannerClient";

export const metadata: Metadata = {
  title: "Interactive 30-Day Time Budget Planner",
  description:
    "Interactive unofficial Blood of Dawnwalker planner: budget an estimated 30-day Time Budget (480 model units), load presets, undo changes, track overspend, autosave locally, and share plan URLs.",
};

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Interactive Time Budget planner
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Model a campaign with an estimated 30-day Time Budget (480 model
          units: 30 × 8 day + 8 night). Load a preset, quick-add catalog costs,
          or invent custom line items. Your plan stays in this browser and can
          be shared via URL. These are fan model units—not a claim about
          official Action Points. See{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>{" "}
          and the{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            time costs catalog
          </Link>
          .
        </p>
      </div>
      <PlannerClient />
    </div>
  );
}
