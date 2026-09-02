"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AP_CONFIG, VERIFICATION_LABELS } from "@/data/apConfig";
import { TIME_COST_ENTRIES } from "@/data/timeCostEntries";
import { PRESETS, type PresetItem } from "@/data/presets";
import type { TimePhase } from "@/data/apConfig";

export type PlanLine = {
  id: string;
  label: string;
  apCost: number;
  phase: TimePhase;
  entryId?: string;
};

const STORAGE_KEY = "dawnwalker-planner-v1";

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

export function PlannerClient() {
  const totalAp = AP_CONFIG.totalAp;
  const [lines, setLines] = useState<PlanLine[]>([]);
  const [customLabel, setCustomLabel] = useState("");
  const [customCost, setCustomCost] = useState(2);
  const [customPhase, setCustomPhase] = useState<TimePhase>("either");
  const [selectedEntry, setSelectedEntry] = useState(
    TIME_COST_ENTRIES[0]?.id ?? ""
  );
  const [hydrated, setHydrated] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [undoStack, setUndoStack] = useState<PlanLine[][]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("plan");
    if (shared) {
      const decoded = decodePlan(shared);
      if (decoded) {
        setLines(decoded);
        setHydrated(true);
        return;
      }
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlanLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

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

  const selectedCatalog = TIME_COST_ENTRIES.find((e) => e.id === selectedEntry);

  const addFromCatalog = () => {
    const entry = selectedCatalog;
    if (!entry) return;
    addLine({
      label: entry.name,
      apCost: entry.apCost,
      phase: entry.phase,
      entryId: entry.id,
    });
  };

  const addCustom = () => {
    if (!customLabel.trim()) return;
    addLine({
      label: customLabel.trim(),
      apCost: Math.max(0, Number(customCost) || 0),
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

  const budgetSummary = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-dusk-50 sm:text-2xl">
            Time Budget
          </h2>
          <p className="mt-1 text-sm text-dusk-400">{AP_CONFIG.label}</p>
          <p className="mt-1 text-xs text-ember-400">{AP_CONFIG.note}</p>
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
            Units remaining
          </div>
          <div className="mt-1 text-sm text-dusk-300">
            Used {used} / {totalAp}
          </div>
        </div>
      </div>
      <div
        className="ap-progress-track mt-3"
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={totalAp}
        aria-label="Time Budget units used"
      >
        <div
          className={barClass}
          style={{ width: `${overBudget ? 100 : pct}%` }}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dusk-400">
        <span>Day-tagged: {dayUsed}</span>
        <span>Night-tagged: {nightUsed}</span>
        <span>Either: {eitherUsed}</span>
        {overBudget && (
          <span className="font-medium text-blood-400">
            Over budget by {Math.abs(remaining)} units — trim the plan.
          </span>
        )}
        {!overBudget && nearBudget && (
          <span className="font-medium text-ember-400">
            Low remaining units — leave contingency if you can.
          </span>
        )}
      </div>
    </>
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Sticky mobile AP summary */}
      <div className="sticky top-[3.25rem] z-30 -mx-4 border-b border-dusk-800/80 bg-night-950/95 px-4 py-3 backdrop-blur sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-dusk-500">
              Remaining
            </div>
            <div
              className={`font-display text-2xl leading-none ${
                overBudget ? "text-blood-400" : "text-ember-400"
              }`}
            >
              {remaining} units
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-right text-xs text-dusk-400">
              {used} / {totalAp} used
            </div>
            <div className="ap-progress-track mt-1.5">
              <div
                className={barClass}
                style={{ width: `${overBudget ? 100 : pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="card-surface rounded-2xl p-4 shadow-glow sm:p-5">
        {budgetSummary}
      </section>

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
              Load preset ({preset.items.reduce((s, i) => s + i.apCost, 0)} units)
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="card-surface space-y-4 rounded-xl p-4">
          <div>
            <h3 className="font-display text-xl text-dusk-50">
              Quick-add from catalog
            </h3>
            <p className="mt-1 text-xs text-dusk-500">
              Pick an estimated activity, then add it to your plan in one tap.
            </p>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-dusk-500">
              Activity
            </span>
            <select
              value={selectedEntry}
              onChange={(e) => setSelectedEntry(e.target.value)}
              className="w-full min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            >
              {TIME_COST_ENTRIES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} · {e.apCost} · {phaseLabel(e.phase)} ·{" "}
                  {VERIFICATION_LABELS[e.verificationStatus]}
                </option>
              ))}
            </select>
          </label>
          {selectedCatalog && (
            <p className="rounded-lg border border-dusk-800/80 bg-night-950/50 px-3 py-2 text-xs text-dusk-400">
              <span className="text-dusk-200">{selectedCatalog.name}</span>
              {" — "}
              {selectedCatalog.apCost} units ({phaseLabel(selectedCatalog.phase)}),{" "}
              {VERIFICATION_LABELS[selectedCatalog.verificationStatus]}.{" "}
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
              aria-label="Custom Time Budget cost"
              className="w-28 min-h-11 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            />
            <select
              value={customPhase}
              onChange={(e) => setCustomPhase(e.target.value as TimePhase)}
              aria-label="Phase"
              className="min-h-11 flex-1 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2.5 text-sm text-dusk-100"
            >
              <option value="either">Either phase</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
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
                Load a preset above, quick-add from the catalog, or invent a
                custom cost. Plans autosave in this browser.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {PRESETS.slice(0, 2).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className="inline-flex min-h-10 items-center rounded-lg border border-ember-600/40 px-3 py-2 text-xs font-medium text-ember-400 hover:bg-ember-600/10"
                  >
                    Try “{preset.name}”
                  </button>
                ))}
              </div>
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
                      {line.apCost} units · {phaseLabel(line.phase)}
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
        Plan autosaves to localStorage in this browser. Share URLs encode your
        current list (no account). Values remain Estimated or Reported fan model units—not official Action Points.
        Undo restores the previous plan state after add, remove, clear, or
        preset load.
      </p>
    </div>
  );
}
