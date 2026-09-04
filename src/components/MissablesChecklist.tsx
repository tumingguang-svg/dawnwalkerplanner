"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CHECKLIST_GROUPS,
  MISSABLE_ENTRIES,
  MISSABLE_TO_COST_ID,
  type MissableEntry,
} from "@/data/missables";
import { TIME_COST_ENTRIES } from "@/data/timeCostEntries";
import { AddToPlannerButton } from "@/components/AddToPlannerButton";
import { VERIFICATION_LABELS } from "@/data/apConfig";
import { plannerHrefForCostIds } from "@/lib/plannerLinks";

const STORAGE_KEY = "dawnwalker-missables-checklist-v1";

const RISK_BADGE: Record<MissableEntry["risk"], string> = {
  high: "border-red-500/50 bg-red-500/10 text-red-200",
  medium: "border-amber-500/50 bg-amber-500/10 text-amber-200",
  low: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
  unknown: "border-dusk-500 bg-dusk-800/40 text-dusk-300",
};

type CheckedMap = Record<string, boolean>;
type FilterMode = "all" | "remaining" | "completed";

function shortNotes(notes: string, max = 140): string {
  const t = notes.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 60 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

function shortSource(note?: string, max = 72): string | null {
  if (!note) return null;
  const t = note.replace(/\s+/g, " ").trim();
  // Prefer a readable label before long URLs
  const label = t.split(/https?:\/\//)[0].trim().replace(/[·.]+$/, "").trim();
  const base = label || t;
  if (base.length <= max) return base;
  const cut = base.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 40 ? cut.slice(0, sp) : cut).trimEnd()}…`;
}

function costLabelForMissable(missableId: string): string | null {
  const costId = MISSABLE_TO_COST_ID[missableId];
  if (!costId) return null;
  const entry = TIME_COST_ENTRIES.find((e) => e.id === costId);
  if (!entry) return null;
  return `${entry.apCost} seg`;
}

function lastCheckedLabel(row: MissableEntry): string | null {
  if (!row.lastVerified) return null;
  return row.verificationStatus === "verified"
    ? `Verified ${row.lastVerified}`
    : row.lastVerified;
}

export function MissablesChecklist() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterMode>("all");

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
  const completedCount = useMemo(
    () => MISSABLE_ENTRIES.filter((e) => checked[e.id]).length,
    [checked]
  );
  const remainingCount = total - completedCount;

  const selectedCostIds = useMemo(() => {
    const ids: string[] = [];
    const seen = new Set<string>();
    for (const e of MISSABLE_ENTRIES) {
      if (!checked[e.id]) continue;
      const costId = MISSABLE_TO_COST_ID[e.id];
      if (!costId || seen.has(costId)) continue;
      if (!TIME_COST_ENTRIES.some((c) => c.id === costId)) continue;
      seen.add(costId);
      ids.push(costId);
    }
    return ids;
  }, [checked]);

  const selectedUnmappedCount = useMemo(() => {
    return MISSABLE_ENTRIES.filter(
      (e) => checked[e.id] && !MISSABLE_TO_COST_ID[e.id]
    ).length;
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const clearAll = useCallback(() => setChecked({}), []);

  const byId = useMemo(() => {
    const m = new Map<string, MissableEntry>();
    for (const e of MISSABLE_ENTRIES) m.set(e.id, e);
    return m;
  }, []);

  const passesFilter = useCallback(
    (id: string) => {
      const isOn = Boolean(checked[id]);
      if (filter === "remaining") return !isOn;
      if (filter === "completed") return isOn;
      return true;
    },
    [checked, filter]
  );

  const addSelectedHref = plannerHrefForCostIds(selectedCostIds);

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
            Track Reported windows locally in this browser. Data status stays
            Reported—not Verified.
          </p>
          <p
            className="mt-2 font-display text-lg text-dusk-50"
            aria-live="polite"
          >
            {hydrated ? (
              <>
                <span className="text-ember-400">
                  {completedCount} / {total} completed
                </span>
                <span className="mx-2 text-dusk-600">·</span>
                <span className="text-dusk-300">
                  {remainingCount} remaining
                </span>
              </>
            ) : (
              <span className="text-dusk-500">— / {total} completed</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedCostIds.length > 0 ? (
            <Link
              href={addSelectedHref}
              className="inline-flex min-h-9 items-center rounded-md bg-ember-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ember-500"
            >
              Add selected to Planner ({selectedCostIds.length})
            </Link>
          ) : (
            <span
              className="inline-flex min-h-9 items-center rounded-md border border-dusk-700 px-3 py-1.5 text-xs text-dusk-600"
              title="Check mapped items (Esme, Lazar, Gremla) first"
            >
              Add selected to Planner
            </span>
          )}
          <Link
            href="/planner"
            className="inline-flex min-h-9 items-center rounded-md border border-ember-600/50 px-3 py-1.5 text-xs font-medium text-ember-400 hover:bg-ember-600/10"
          >
            Open planner
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-lg border border-dusk-700 bg-night-950/60 p-0.5"
          role="group"
          aria-label="Checklist filter"
        >
          {(
            [
              ["all", "All"],
              ["remaining", "Remaining"],
              ["completed", "Completed"],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilter(mode)}
              aria-pressed={filter === mode}
              className={`min-h-8 rounded-md px-3 text-xs font-medium transition-colors ${
                filter === mode
                  ? "bg-ember-600/20 text-ember-300"
                  : "text-dusk-400 hover:text-dusk-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-dusk-500">
          {selectedCostIds.length > 0 ? (
            <>
              {selectedCostIds.length} checked item
              {selectedCostIds.length === 1 ? "" : "s"} map to planner costs
              {selectedUnmappedCount > 0
                ? ` · ${selectedUnmappedCount} checklist-only`
                : ""}
              .
            </>
          ) : (
            <>
              Check Esme / Lazar / Gremla (or any mapped row), then Add selected.
              Unmapped checked items stay checklist-only.
            </>
          )}
        </p>
      </div>

      <div className="space-y-6">
        {CHECKLIST_GROUPS.map((group) => {
          const allRows = group.missableIds
            .map((id) => byId.get(id))
            .filter((e): e is MissableEntry => Boolean(e));
          const rows = allRows.filter((r) => passesFilter(r.id));
          const groupChecked = allRows.filter((r) => checked[r.id]).length;
          if (rows.length === 0) return null;
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
                  {group.description} · {groupChecked}/{allRows.length} in group
                  {filter !== "all" ? ` · showing ${rows.length}` : ""}
                </p>
              </div>
              <ul className="divide-y divide-dusk-800/80">
                {rows.map((row) => {
                  const costId = MISSABLE_TO_COST_ID[row.id];
                  const isOn = Boolean(checked[row.id]);
                  const timeLabel = costLabelForMissable(row.id);
                  const source = shortSource(row.sourceNote);
                  const checkedDate = lastCheckedLabel(row);
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
                        <span className="min-w-0 space-y-1.5">
                          <span
                            className={`block font-medium ${
                              isOn
                                ? "text-dusk-500 line-through"
                                : "text-dusk-100"
                            }`}
                          >
                            {row.name}
                          </span>
                          <span className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-block rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${RISK_BADGE[row.risk]}`}
                            >
                              {row.risk} risk
                            </span>
                            <span className="inline-block rounded border border-dusk-500 px-2 py-0.5 text-[10px] text-dusk-200">
                              {VERIFICATION_LABELS[row.verificationStatus]}
                            </span>
                          </span>
                          <dl className="grid gap-1 text-xs text-dusk-400 sm:grid-cols-2">
                            {timeLabel ? (
                              <div className="flex gap-1.5 min-w-0">
                                <dt className="shrink-0 text-dusk-600">Time</dt>
                                <dd className="min-w-0 text-dusk-300">
                                  {timeLabel}
                                </dd>
                              </div>
                            ) : null}
                            <div className="flex gap-1.5 min-w-0 sm:col-span-2">
                              <dt className="shrink-0 text-dusk-600">Window</dt>
                              <dd className="min-w-0 text-dusk-300">
                                {row.window}
                              </dd>
                            </div>
                            <div className="flex gap-1.5 min-w-0">
                              <dt className="shrink-0 text-dusk-600">Risk</dt>
                              <dd className="min-w-0 capitalize text-dusk-300">
                                {row.risk}
                              </dd>
                            </div>
                            {checkedDate ? (
                              <div className="flex gap-1.5 min-w-0">
                                <dt className="shrink-0 text-dusk-600">
                                  {row.verificationStatus === "verified"
                                    ? "Last verified"
                                    : "Last checked"}
                                </dt>
                                <dd className="min-w-0 text-dusk-300">
                                  {row.lastVerified}
                                </dd>
                              </div>
                            ) : null}
                            <div className="flex gap-1.5 min-w-0 sm:col-span-2">
                              <dt className="shrink-0 text-dusk-600">
                                Consequence
                              </dt>
                              <dd className="min-w-0 text-dusk-500">
                                {shortNotes(row.notes)}
                              </dd>
                            </div>
                            {source ? (
                              <div className="flex gap-1.5 min-w-0 sm:col-span-2">
                                <dt className="shrink-0 text-dusk-600">
                                  Source
                                </dt>
                                <dd className="min-w-0 text-dusk-500">{source}</dd>
                              </div>
                            ) : null}
                          </dl>
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

      {filter !== "all" &&
        CHECKLIST_GROUPS.every((group) => {
          const rows = group.missableIds.filter((id) => {
            const e = byId.get(id);
            return e && passesFilter(e.id);
          });
          return rows.length === 0;
        }) && (
          <p className="rounded-lg border border-dusk-800 bg-night-900/50 px-3 py-3 text-sm text-dusk-500">
            No {filter} items right now. Switch to All or change your checks.
          </p>
        )}
    </section>
  );
}
