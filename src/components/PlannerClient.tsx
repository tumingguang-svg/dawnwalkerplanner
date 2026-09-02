"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AP_CONFIG } from "@/data/apConfig";
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

export function PlannerClient() {
  const totalAp = AP_CONFIG.totalAp;
  const [lines, setLines] = useState<PlanLine[]>([]);
  const [customLabel, setCustomLabel] = useState("");
  const [customCost, setCustomCost] = useState(2);
  const [customPhase, setCustomPhase] = useState<TimePhase>("either");
  const [selectedEntry, setSelectedEntry] = useState(TIME_COST_ENTRIES[0]?.id ?? "");
  const [hydrated, setHydrated] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

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
  const dayUsed = lines.filter((l) => l.phase === "day").reduce((s, l) => s + l.apCost, 0);
  const nightUsed = lines.filter((l) => l.phase === "night").reduce((s, l) => s + l.apCost, 0);
  const eitherUsed = lines.filter((l) => l.phase === "either").reduce((s, l) => s + l.apCost, 0);

  const addLine = useCallback((item: Omit<PlanLine, "id">) => {
    setLines((prev) => [...prev, { ...item, id: uid() }]);
  }, []);

  const removeLine = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const clearPlan = () => setLines([]);

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setLines(
      preset.items.map((item: PresetItem) => ({
        id: uid(),
        label: item.label,
        apCost: item.apCost,
        phase: item.phase,
        entryId: item.entryId,
      }))
    );
  };

  const addFromCatalog = () => {
    const entry = TIME_COST_ENTRIES.find((e) => e.id === selectedEntry);
    if (!entry) return;
    addLine({ label: entry.name, apCost: entry.apCost, phase: entry.phase, entryId: entry.id });
  };

  const addCustom = () => {
    if (!customLabel.trim()) return;
    addLine({ label: customLabel.trim(), apCost: Math.max(0, Number(customCost) || 0), phase: customPhase });
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

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-dusk-800 bg-night-900/70 p-5 shadow-glow">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-dusk-50">Action Point budget</h2>
            <p className="mt-1 text-sm text-dusk-400">{AP_CONFIG.label}</p>
            <p className="mt-1 text-xs text-ember-400">{AP_CONFIG.note}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display text-ember-400">{remaining}</div>
            <div className="text-xs uppercase tracking-wider text-dusk-400">AP remaining</div>
            <div className="mt-1 text-sm text-dusk-300">Used {used} / {totalAp}</div>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-night-800">
          <div
            className={`h-full transition-all ${remaining < 0 ? "bg-blood-500" : "bg-gradient-to-r from-ember-600 to-ember-400"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-dusk-400">
          <span>Day-tagged: {dayUsed}</span>
          <span>Night-tagged: {nightUsed}</span>
          <span>Either: {eitherUsed}</span>
          {remaining < 0 && (
            <span className="text-blood-400 font-medium">Over budget — trim the plan.</span>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="rounded-xl border border-dusk-800 bg-night-900/50 p-4 text-left hover:border-ember-500/60 hover:bg-night-800 transition-colors"
          >
            <div className="font-display text-lg text-dusk-50">{preset.name}</div>
            <p className="mt-2 text-sm text-dusk-400">{preset.description}</p>
            <div className="mt-3 text-xs text-ember-400">
              Load preset ({preset.items.reduce((s, i) => s + i.apCost, 0)} AP)
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-dusk-800 bg-night-900/50 p-4 space-y-4">
          <h3 className="font-display text-xl text-dusk-50">Add from catalog</h3>
          <select
            value={selectedEntry}
            onChange={(e) => setSelectedEntry(e.target.value)}
            className="w-full rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100"
          >
            {TIME_COST_ENTRIES.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — {e.apCost} AP ({e.phase}) [{e.verificationStatus}]
              </option>
            ))}
          </select>
          <button type="button" onClick={addFromCatalog} className="rounded-lg bg-ember-600 px-4 py-2 text-sm font-medium text-white hover:bg-ember-500">
            Add selected
          </button>
          <h3 className="font-display text-xl text-dusk-50 pt-2">Custom cost</h3>
          <input value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="Activity label" className="w-full rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100" />
          <div className="flex gap-2">
            <input type="number" min={0} value={customCost} onChange={(e) => setCustomCost(Number(e.target.value))} className="w-24 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100" />
            <select value={customPhase} onChange={(e) => setCustomPhase(e.target.value as TimePhase)} className="flex-1 rounded-lg border border-dusk-700 bg-night-950 px-3 py-2 text-sm text-dusk-100">
              <option value="either">Either</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
          </div>
          <button type="button" onClick={addCustom} className="rounded-lg border border-dusk-600 px-4 py-2 text-sm text-dusk-100 hover:border-ember-500">
            Add custom
          </button>
        </div>

        <div className="rounded-xl border border-dusk-800 bg-night-900/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="font-display text-xl text-dusk-50">Your plan</h3>
            <div className="flex gap-2">
              <button type="button" onClick={copyShareUrl} className="rounded-md border border-dusk-700 px-2.5 py-1 text-xs text-dusk-200 hover:border-ember-500">Copy share URL</button>
              <button type="button" onClick={clearPlan} className="rounded-md border border-blood-600/50 px-2.5 py-1 text-xs text-blood-400 hover:bg-blood-600/10">Clear</button>
            </div>
          </div>
          {shareMsg && <p className="mb-3 break-all text-xs text-ember-400">{shareMsg}</p>}
          {lines.length === 0 ? (
            <p className="text-sm text-dusk-500">No activities yet. Load a preset or add costs from the catalog.</p>
          ) : (
            <ul className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
              {lines.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-3 rounded-lg border border-dusk-800/80 bg-night-950/60 px-3 py-2">
                  <div>
                    <div className="text-sm text-dusk-100">{line.label}</div>
                    <div className="text-xs text-dusk-500">{line.apCost} AP · {line.phase}</div>
                  </div>
                  <button type="button" onClick={() => removeLine(line.id)} className="text-xs text-dusk-500 hover:text-blood-400" aria-label="Remove">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="text-xs text-dusk-600">
        Plan autosaves to localStorage in this browser. Share URLs encode your current list (no account). Values remain estimated/unverified fan data.
      </p>
    </div>
  );
}
