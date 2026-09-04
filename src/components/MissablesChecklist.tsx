"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CHECKLIST_GROUPS,
  MISSABLE_ENTRIES,
  MISSABLE_TO_COST_ID,
  type MissableEntry,
} from "@/data/missables";
import { AddToPlannerButton } from "@/components/AddToPlannerButton";
import { VERIFICATION_LABELS } from "@/data/apConfig";

const STORAGE_KEY = "dawnwalker-missables-checklist-v1";

const RISK_BADGE: Record<MissableEntry["risk"], string> = {
  high: "border-red-500/50 bg-red-500/10 text-red-200",
  medium: "border-amber-500/50 bg-amber-500/10 text-amber-200",
  low: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
  unknown: "border-dusk-500 bg-dusk-800/40 text-dusk-300",
};

type CheckedMap = Record<string, boolean>;

function shortNotes(notes: string, max = 140): string {
  const t = notes.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 60 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

export function MissablesChecklist() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CheckedMap;
        if (parsed && typeof parsed === "object") setChecked(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated]);

  const total = MISSABLE_ENTRIES.length;
  const checkedCount = useMemo(
    () => MISSABLE_ENTRIES.filter((e) => checked[e.id]).length,
    [checked]
  );

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const clearAll = useCallback(() => setChecked({}), []);

  const byId = useMemo(() => {
    const m = new Map<string, MissableEntry>();
    for (const e of MISSABLE_ENTRIES) m.set(e.id, e);
    return m;
  }, []);

  const prologueWithCost = CHECKLIST_GROUPS.find(
    (g) => g.id === "before-blood-mass"
  )?.missableIds.filter((id) => MISSABLE_TO_COST_ID[id]) ?? [];

  return (
    <section className="space-y-5" aria-labelledby="missables-checklist-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="missables-checklist-heading"
            className="font-display text-xl text-dusk-50 md:text-2xl"
          >
            Missables checklist
          </h2>
          <p className="mt-1 text-sm text-dusk-400">
            Track Reported windows locally in this browser. Progress:{" "}
            <strong className="text-dusk-100">
              {hydrated ? checkedCount : "—"} of {total} checked
            </strong>
            . Data status stays Reported—not Verified.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/planner"
            className="inline-flex min-h-9 items-center rounded-md border border-ember-600/50 px-3 py-1.5 text-xs font-medium text-ember-400 hover:bg-ember-600/10"
          >
            Open planner (prologue presets)
          </Link>
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex min-h-9 items-center rounded-md border border-dusk-600 px-3 py-1.5 text-xs font-medium text-dusk-300 hover:border-dusk-400 hover:text-dusk-100"
          >
            Clear checks
          </button>
        </div>
      </div>

      <p className="rounded-lg border border-dusk-800 bg-night-900/50 px-3 py-2 text-xs text-dusk-500">
        Multi-add is limited to one planner query at a time. Use per-row{" "}
        <span className="text-dusk-300">Add to Planner</span> for related quest
        costs, or open the planner and load{" "}
        <span className="text-dusk-300">Prologue: Save Esme + Lazar</span> (covers
        Withering Away, Deep Down, Blasphemy, and other Mass-safe sides). Checked
        prologue items with costs:{" "}
        {prologueWithCost.filter((id) => checked[id]).length}/
        {prologueWithCost.length}.
      </p>

      <div className="space-y-6">
        {CHECKLIST_GROUPS.map((group) => {
          const rows = group.missableIds
            .map((id) => byId.get(id))
            .filter((e): e is MissableEntry => Boolean(e));
          const groupChecked = rows.filter((r) => checked[r.id]).length;
          return (
            <div
              key={group.id}
              className="overflow-hidden rounded-xl border border-dusk-800 bg-night-950/40"
            >
              <div className="border-b border-dusk-800/80 bg-night-900/60 px-4 py-3">
                <h3 className="font-display text-lg text-dusk-50">
                  {group.title}
                </h3>
                <p className="mt-0.5 text-xs text-dusk-500">
                  {group.description} · {groupChecked}/{rows.length} in group
                </p>
              </div>
              <ul className="divide-y divide-dusk-800/80">
                {rows.map((row) => {
                  const costId = MISSABLE_TO_COST_ID[row.id];
                  const isOn = Boolean(checked[row.id]);
                  return (
                    <li
                      key={row.id}
                      className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <label className="flex min-w-0 flex-1 cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 shrink-0 rounded border-dusk-500 bg-night-950 text-ember-500 focus:ring-ember-500/40"
                          checked={isOn}
                          onChange={() => toggle(row.id)}
                          aria-label={`Mark done: ${row.name}`}
                        />
                        <span className="min-w-0 space-y-1">
                          <span
                            className={`block font-medium ${
                              isOn
                                ? "text-dusk-500 line-through"
                                : "text-dusk-100"
                            }`}
                          >
                            {row.name}
                          </span>
                          <span className="block text-xs text-dusk-400">
                            <span className="text-dusk-500">Window:</span>{" "}
                            {row.window}
                          </span>
                          <span className="flex flex-wrap items-center gap-2 pt-0.5">
                            <span
                              className={`inline-block rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${RISK_BADGE[row.risk]}`}
                            >
                              {row.risk} risk
                            </span>
                            <span className="inline-block rounded border border-dusk-500 px-2 py-0.5 text-[10px] text-dusk-200">
                              {VERIFICATION_LABELS[row.verificationStatus]}
                            </span>
                          </span>
                          <span className="block text-xs leading-relaxed text-dusk-500">
                            {shortNotes(row.notes)}
                          </span>
                        </span>
                      </label>
                      <div className="shrink-0 pl-7 sm:pl-0">
                        {costId ? (
                          <AddToPlannerButton entryId={costId} />
                        ) : (
                          <span
                            className="inline-flex min-h-9 items-center text-xs text-dusk-600"
                            title="No matching time-cost catalog entry"
                          >
                            Checklist only
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
