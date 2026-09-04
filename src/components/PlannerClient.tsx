"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AP_CONFIG, VERIFICATION_LABELS } from "@/data/apConfig";
import {
  ESTIMATED_PLACEHOLDER_TIME_COSTS,
  REPORTED_PROLOGUE_TIME_COSTS,
  TIME_COST_ENTRIES,
  type TimeCostEntry,
} from "@/data/timeCostEntries";
import { PRESETS, type PresetItem } from "@/data/presets";
import type { TimePhase } from "@/data/apConfig";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";

export type PlanLine = {
  id: string;
  label: string;
  apCost: number;
  phase: TimePhase;
  entryId?: string;
};

const STORAGE_KEY = "dawnwalker-planner-v1";
const PROGRESS_KEY = "dawnwalker-planner-progress-v1";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function encodePlan(lines: PlanLine[]): string {
  const payload = lines.map((l) => ({
    l: l.label,
    a: l.apCost,
    p: l.phase,
    e: l.entryId,
  }));
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodePlan(raw: string): PlanLine[] | null {
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
    if (!Array.isArray(data)) return null;
    return data.map((row: { l: string; a: number; p: TimePhase; e?: string }) => ({
      id: uid(),
      label: String(row.l),
      apCost: Number(row.a) || 0,
      phase: row.p === "day" || row.p === "night" ? row.p : "either",
      entryId: row.e,
    }));
  } catch {
    return null;
  }
}

function phaseLabel(phase: TimePhase) {
  if (phase === "day") return "Day";
  if (phase === "night") return "Night";
  return "Either phase";
}

function lineFromEntry(entry: TimeCostEntry): Omit<PlanLine, "id"> {
  return {
    label: entry.name,
    apCost: entry.apCost,
    phase: entry.phase,
    entryId: entry.id,
  };
}

export function PlannerClient() {
  const totalAp = AP_CONFIG.totalAp;
  const [lines, setLines] = useState<PlanLine[]>([]);
  const [customLabel, setCustomLabel] = useState("");
  const [customCost, setCustomCost] = useState(1);
  const [customPhase, setCustomPhase] = useState<TimePhase>("day");
  const [selectedEntry, setSelectedEntry] = useState(
    REPORTED_PROLOGUE_TIME_COSTS[0]?.id ?? ""
  );
  const [showLegacy, setShowLegacy] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<"day" | "night">("day");
  const [hydrated, setHydrated] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [addFlash, setAddFlash] = useState("");
  const [undoStack, setUndoStack] = useState<PlanLine[][]>([]);

  const catalogEntries = useMemo(() => {
    return showLegacy
      ? [...REPORTED_PROLOGUE_TIME_COSTS, ...ESTIMATED_PLACEHOLDER_TIME_COSTS]
      : REPORTED_PROLOGUE_TIME_COSTS;
  }, [showLegacy]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("plan");
    let initial: PlanLine[] = [];
    if (shared) {
      const decoded = decodePlan(shared);
      if (decoded) initial = decoded;
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as PlanLine[];
          if (Array.isArray(parsed)) initial = parsed;
        }
      } catch {
        /* ignore */
      }
    }

    const addName = params.get("name");
    const addCost = params.get("cost");
    const addPhase = params.get("phase");
    // Support repeated ?add=id&add=id2 and comma-separated ?add=id1,id2,id3
    const rawAddParams = params.getAll("add");
    const addIds = [
      ...new Set(
        rawAddParams
          .flatMap((v) => v.split(","))
          .map((s) => s.trim())
          .filter(Boolean)
      ),
    ];
    const addedNames: string[] = [];
    if (addIds.length > 0) {
      const next = [...initial];
      for (const addId of addIds) {
        const entry = TIME_COST_ENTRIES.find((e) => e.id === addId);
        if (!entry) continue;
        next.push({ ...lineFromEntry(entry), id: uid() });
        addedNames.push(entry.name);
        setSelectedEntry(entry.id);
      }
      initial = next;
      if (addedNames.length === 1) {
        const only = TIME_COST_ENTRIES.find((e) => e.id === addIds[0]);
        setAddFlash(
          only
            ? `Added “${only.name}” (${only.apCost} segments).`
            : `Added “${addedNames[0]}”.`
        );
      } else if (addedNames.length > 1) {
        setAddFlash(`Added ${addedNames.length} items from checklist/link.`);
      }
    } else if (addName != null && addCost != null) {
      const phase: TimePhase =
        addPhase === "night" || addPhase === "day" ? addPhase : "either";
      const line = {
        id: uid(),
        label: addName,
        apCost: Math.max(0, Number(addCost) || 0),
        phase,
      };
      initial = [...initial, line];
      setAddFlash(`Added “${addName}” (${line.apCost} segments).`);
    }

    try {
      const prog = localStorage.getItem(PROGRESS_KEY);
      if (prog) {
        const p = JSON.parse(prog) as { day?: number; phase?: string };
        if (p.day && p.day >= 1 && p.day <= 30) setCurrentDay(p.day);
        if (p.phase === "day" || p.phase === "night") setCurrentPhase(p.phase);
      }
    } catch {
      /* ignore */
    }

    setLines(initial);
    setHydrated(true);

    if (addIds.length > 0 || addName) {
      const url = new URL(window.location.href);
      url.searchParams.delete("add");
      url.searchParams.delete("name");
      url.searchParams.delete("cost");
      url.searchParams.delete("phase");
      url.searchParams.delete("plan");
      window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ day: currentDay, phase: currentPhase })
    );
  }, [currentDay, currentPhase, hydrated]);

  const used = useMemo(
    () => lines.reduce((sum, l) => sum + (Number(l.apCost) || 0), 0),
    [lines]
  );
  const remaining = totalAp - used;
  const overBudget = remaining < 0;
  const nearBudget = !overBudget && remaining <= totalAp * 0.1;
  const dayUsed = lines
    .filter((l) => l.phase === "day")
    .reduce((s, l) => s + l.apCost, 0);
  const nightUsed = lines
    .filter((l) => l.phase === "night")
    .reduce((s, l) => s + l.apCost, 0);
  const eitherUsed = lines
    .filter((l) => l.phase === "either")
    .reduce((s, l) => s + l.apCost, 0);

  const phaseCap =
    currentPhase === "day" ? AP_CONFIG.dayAp : AP_CONFIG.nightAp;
  const phaseTagged = currentPhase === "day" ? dayUsed : nightUsed;
  const phaseRemaining = phaseCap - phaseTagged - eitherUsed;
  const oneSegmentWarn = phaseRemaining <= 1;
  const phaseOver = phaseRemaining < 0;

  const pushUndo = useCallback((snapshot: PlanLine[]) => {
    setUndoStack((prev) => [...prev.slice(-19), snapshot]);
  }, []);

  const addLine = useCallback(
    (item: Omit<PlanLine, "id">) => {
      setLines((prev) => {
        pushUndo(prev);
        return [...prev, { ...item, id: uid() }];
      });
    },
    [pushUndo]
  );

  const removeLine = (id: string) => {
    setLines((prev) => {
      pushUndo(prev);
      return prev.filter((l) => l.id !== id);
    });
  };

  const undoLast = () => {
    setUndoStack((stack) => {
      if (stack.length === 0) return stack;
      const previous = stack[stack.length - 1];
      setLines(previous);
      return stack.slice(0, -1);
    });
  };

  const clearPlan = () => {
    if (lines.length === 0) return;
    const ok = window.confirm(
      "Clear your entire plan? You can Undo afterward if this was a mistake."
    );
    if (!ok) return;
    setLines((prev) => {
      pushUndo(prev);
      return [];
    });
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setLines((prev) => {
      pushUndo(prev);
      return preset.items.map((item: PresetItem) => ({
        id: uid(),
        label: item.label,
        apCost: item.apCost,
        phase: item.phase,
        entryId: item.entryId,
      }));
    });
  };

  const selectedCatalog = catalogEntries.find((e) => e.id === selectedEntry)
    ?? TIME_COST_ENTRIES.find((e) => e.id === selectedEntry);

  const addFromCatalog = () => {
    const entry = selectedCatalog;
    if (!entry) return;
    if (oneSegmentWarn && entry.apCost > 1) {
      const ok = window.confirm(
        `Only ${Math.max(0, phaseRemaining)} segment(s) left this ${currentPhase}. “${entry.name}” costs ${entry.apCost}. Multi-step quests can fail with 1 segment left (Polygon). Add anyway?`
      );
      if (!ok) return;
    }
    addLine(lineFromEntry(entry));
  };

  const addCustom = () => {
    if (!customLabel.trim()) return;
    const cost = Math.max(0, Number(customCost) || 0);
    if (oneSegmentWarn && cost > 1) {
      const ok = window.confirm(
        `Only ${Math.max(0, phaseRemaining)} segment(s) left this ${currentPhase}. Add a ${cost}-segment line anyway?`
      );
      if (!ok) return;
    }
    addLine({
      label: customLabel.trim(),
      apCost: cost,
      phase: customPhase,
    });
    setCustomLabel("");
  };

  const copyShareUrl = async () => {
    const url = `${window.location.origin}/planner?plan=${encodePlan(lines)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg("Share URL copied to clipboard.");
    } catch {
      setShareMsg(url);
    }
  };

  const pct = Math.min(100, Math.max(0, (used / totalAp) * 100));
  const barClass = overBudget
    ? "ap-progress-fill ap-progress-fill--over"
    : nearBudget
      ? "ap-progress-fill ap-progress-fill--warn"
      : "ap-progress-fill ap-progress-fill--ok";

  const recommend = REPORTED_PROLOGUE_TIME_COSTS.filter(
    (e) => e.category === "Prologue" && e.apCost <= Math.max(0, phaseRemaining)
  ).slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="sticky top-[3.25rem] z-30 -mx-4 border-b border-dusk-800/80 bg-night-950/95 px-4 py-3 backdrop-blur sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-dusk-500">
              Day {currentDay} · {currentPhase}
            </div>
            <div
              className={`font-display text-2xl leading-none ${
                phaseOver || oneSegmentWarn ? "text-blood-400" : "text-ember-400"
              }`}
            >
              {phaseRemaining} left
            </div>
          </div>
          <div className="min-w-0 flex-1 text-right text-xs text-dusk-400">
            Campaign {used}/{totalAp}
          </div>
        </div>
      </div>

      {addFlash && (
        <p className="rounded-lg border border-ember-600/40 bg-ember-600/10 px-3 py-2 text-sm text-ember-400">
          {addFlash}
        </p>
      )}

      <section className="card-surface rounded-2xl p-4 shadow-glow sm:p-5 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl text-dusk-50 sm:text-2xl">
              Current progress
            </h2>
            <p className="mt-1 text-sm text-dusk-400">{AP_CONFIG.label}</p>
          </div>
          <div className="text-right">
            <div
              className={`text-3xl font-display ${
                overBudget ? "text-blood-400" : "text-ember-400"
              }`}
            >
              {remaining}
            </div>
            <div className="text-xs uppercase tracking-wider text-dusk-400">
              Campaign segments left
            </div>
            <div className="mt-1 text-sm text-dusk-300">
              Used {used} / {totalAp}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wider text-dusk-500">
              Current day
            </span>
            <input
              type="number"
              min={1}
              max={30}
              value={currentDay}
              onChange={(e) =>
                setCurrentDay(Math.min(30, Math.max(1, Number(e.target.value) || 1)))
              }
              className="w-full min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wider text-dusk-500">
              Current phase
            </span>
            <select
              value={currentPhase}
              onChange={(e) =>
                setCurrentPhase(e.target.value === "night" ? "night" : "day")
              }
              className="w-full min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100"
            >
              <option value="day">Day ({AP_CONFIG.dayAp} segments)</option>
              <option value="night">Night ({AP_CONFIG.nightAp} segments)</option>
            </select>
          </label>
          <div className="rounded-lg border border-dusk-800 bg-night-950/60 px-3 py-2">
            <div className="text-xs uppercase tracking-wider text-dusk-500">
              This {currentPhase} left
            </div>
            <div
              className={`font-display text-2xl ${
                phaseOver || oneSegmentWarn ? "text-blood-400" : "text-dusk-50"
              }`}
            >
              {phaseRemaining}
              <span className="text-sm text-dusk-500"> / {phaseCap}</span>
            </div>
            <div className="text-xs text-dusk-500">
              Tagged {phaseTagged} + either {eitherUsed}
            </div>
          </div>
        </div>

        {(oneSegmentWarn || phaseOver) && (
          <div className="rounded-lg border border-blood-600/50 bg-blood-600/10 px-3 py-2 text-sm text-blood-400">
            {phaseOver
              ? `This ${currentPhase} is over budget by ${Math.abs(phaseRemaining)} segments — remove lines or switch phase.`
              : `Only ${phaseRemaining} segment(s) left this ${currentPhase}. Do not start a multi-step hourglass quest (Polygon: can fail with no rewards). Prefer 0-cost or 1-segment Reported rows.`}
          </div>
        )}

        <div
          className="ap-progress-track"
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={totalAp}
          aria-label="Campaign Time Segments used"
        >
          <div className={barClass} style={{ width: `${overBudget ? 100 : pct}%` }} />
        </div>
        <p className="text-xs text-dusk-500">{AP_CONFIG.note}</p>
      </section>

      {recommend.length > 0 && (
        <section className="card-surface rounded-xl p-4 space-y-3">
          <h3 className="font-display text-lg text-dusk-50">
            Fits remaining {currentPhase} ({Math.max(0, phaseRemaining)} segments)
          </h3>
          <ul className="space-y-2">
            {recommend.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dusk-800/80 bg-night-950/50 px-3 py-2"
              >
                <div>
                  <span className="text-sm text-dusk-100">{e.name}</span>
                  <span className="ml-2 text-xs text-dusk-500">
                    {e.apCost} seg · <ConfidenceBadge status={e.verificationStatus} />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (oneSegmentWarn && e.apCost > 1) {
                      const ok = window.confirm(
                        `Low segments left. Add “${e.name}” (${e.apCost}) anyway?`
                      );
                      if (!ok) return;
                    }
                    addLine(lineFromEntry(e));
                  }}
                  className="inline-flex min-h-9 items-center rounded-md border border-ember-600/50 px-2.5 text-xs text-ember-400 hover:bg-ember-600/10"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-dusk-600">
            See{" "}
            <Link href="/guides/quest-order" className="text-ember-400 hover:underline">
              quest order
            </Link>{" "}
            for the full pre-Mass route.
          </p>
        </section>
      )}

      <section className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="card-surface rounded-xl p-4 text-left transition-colors hover:border-ember-500/60 hover:bg-night-800 min-h-[5.5rem]"
          >
            <div className="font-display text-lg text-dusk-50">{preset.name}</div>
            <p className="mt-2 text-sm text-dusk-400">{preset.description}</p>
            <div className="mt-3 text-xs text-ember-400">
              Load preset ({preset.items.reduce((s, i) => s + i.apCost, 0)} segments)
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="card-surface space-y-4 rounded-xl p-4">
          <div>
            <h3 className="font-display text-xl text-dusk-50">
              Quick-add (Reported)
            </h3>
            <p className="mt-1 text-xs text-dusk-500">
              Default catalog is launch-week Reported only. Legacy estimates stay hidden until you opt in.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-dusk-300">
            <input
              type="checkbox"
              checked={showLegacy}
              onChange={(e) => setShowLegacy(e.target.checked)}
              className="rounded border-dusk-600"
            />
            Show experimental / Legacy estimates
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-dusk-500">
              Activity
            </span>
            <select
              value={selectedEntry}
              onChange={(e) => setSelectedEntry(e.target.value)}
              className="w-full min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            >
              {Array.from(
                catalogEntries.reduce((map, e) => {
                  const list = map.get(e.category) ?? [];
                  list.push(e);
                  map.set(e.category, list);
                  return map;
                }, new Map<string, TimeCostEntry[]>())
              )
                .sort(([a], [b]) => {
                  const rank = (c: string) =>
                    c === "Prologue" ? 0 : c === "Mechanics" ? 1 : 2;
                  const d = rank(a) - rank(b);
                  return d !== 0 ? d : a.localeCompare(b);
                })
                .map(([category, entries]) => (
                  <optgroup key={category} label={category}>
                    {entries.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name} · {e.apCost} · {phaseLabel(e.phase)} ·{" "}
                        {VERIFICATION_LABELS[e.verificationStatus]}
                      </option>
                    ))}
                  </optgroup>
                ))}
            </select>
          </label>
          {selectedCatalog && (
            <p className="rounded-lg border border-dusk-800/80 bg-night-950/50 px-3 py-2 text-xs text-dusk-400">
              <span className="text-dusk-200">{selectedCatalog.name}</span>
              {" — "}
              {selectedCatalog.apCost} segments ({phaseLabel(selectedCatalog.phase)}).{" "}
              <ConfidenceBadge status={selectedCatalog.verificationStatus} />{" "}
              {selectedCatalog.notes}
            </p>
          )}
          <button
            type="button"
            onClick={addFromCatalog}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-ember-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ember-500 sm:w-auto"
          >
            Add to plan
          </button>

          <h3 className="font-display text-xl text-dusk-50 pt-2">Custom cost</h3>
          <input
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Activity label"
            className="w-full min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
          />
          <div className="flex flex-wrap gap-2">
            <input
              type="number"
              min={0}
              value={customCost}
              onChange={(e) => setCustomCost(Number(e.target.value))}
              aria-label="Custom Time Segment cost"
              className="w-28 min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            />
            <select
              value={customPhase}
              onChange={(e) => setCustomPhase(e.target.value as TimePhase)}
              aria-label="Phase"
              className="min-h-11 flex-1 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="either">Either phase</option>
            </select>
          </div>
          <button
            type="button"
            onClick={addCustom}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-dusk-600 px-4 py-2.5 text-sm text-dusk-100 hover:border-ember-500"
          >
            Add custom line
          </button>
        </div>

        <div className="card-surface rounded-xl p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl text-dusk-50">Your plan</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={undoLast}
                disabled={undoStack.length === 0}
                className="inline-flex min-h-10 items-center rounded-md border border-dusk-700 px-3 py-1.5 text-xs text-dusk-200 hover:border-ember-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={copyShareUrl}
                className="inline-flex min-h-10 items-center rounded-md border border-dusk-700 px-3 py-1.5 text-xs text-dusk-200 hover:border-ember-500"
              >
                Copy share URL
              </button>
              <button
                type="button"
                onClick={clearPlan}
                className="inline-flex min-h-10 items-center rounded-md border border-blood-600/50 px-3 py-1.5 text-xs text-blood-400 hover:bg-blood-600/10"
              >
                Clear…
              </button>
            </div>
          </div>
          {shareMsg && (
            <p className="mb-3 break-all text-xs text-ember-400">{shareMsg}</p>
          )}
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-dusk-700 bg-night-950/40 px-4 py-10 text-center">
              <p className="font-display text-lg text-dusk-200">
                Your ledger is empty
              </p>
              <p className="max-w-sm text-sm text-dusk-500">
                Load a prologue preset, add Reported rows, or open a quest page
                and tap Add to Planner.
              </p>
            </div>
          ) : (
            <ul className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-dusk-800/80 bg-night-950/60 px-3 py-2.5"
                >
                  <div>
                    <div className="text-sm text-dusk-100">{line.label}</div>
                    <div className="text-xs text-dusk-500">
                      {line.apCost} segments · {phaseLabel(line.phase)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md text-xs text-dusk-500 hover:bg-blood-600/10 hover:text-blood-400"
                    aria-label={`Remove ${line.label}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="text-xs text-dusk-600">
        Progress (day/phase) and plan autosave in this browser. Share URLs encode
        the plan list only. Time Segments are a fan ledger—not official Action
        Points.
      </p>
    </div>
  );
}
