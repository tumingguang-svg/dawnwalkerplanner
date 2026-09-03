import Link from "next/link";
import type { TimePhase } from "@/data/apConfig";

type Props = {
  /** Preferred: time-cost catalog id */
  entryId?: string;
  name?: string;
  cost?: number;
  phase?: TimePhase | "unknown";
  className?: string;
  label?: string;
};

export function AddToPlannerButton({
  entryId,
  name,
  cost,
  phase = "day",
  className = "",
  label = "Add to Planner",
}: Props) {
  const params = new URLSearchParams();
  if (entryId) {
    params.set("add", entryId);
  } else if (name != null && cost != null) {
    params.set("name", name);
    params.set("cost", String(cost));
    params.set("phase", phase === "unknown" ? "either" : phase);
  } else {
    return null;
  }
  return (
    <Link
      href={`/planner?${params.toString()}`}
      className={
        className ||
        "inline-flex min-h-9 items-center rounded-md border border-ember-600/50 px-2.5 py-1 text-xs font-medium text-ember-400 hover:bg-ember-600/10"
      }
    >
      {label}
    </Link>
  );
}
