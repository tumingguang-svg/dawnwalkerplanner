import type { TimePhase } from "./apConfig";

export type PresetItem = {
  entryId: string;
  label: string;
  apCost: number;
  phase: TimePhase;
};

export type PlanPreset = {
  id: string;
  name: string;
  description: string;
  items: PresetItem[];
};

/**
 * Presets built from launch-week Reported prologue rows (not legacy estimates).
 * Costs are time-bar segments. See /guides/quest-order for the full route.
 */
export const PRESETS: PlanPreset[] = [
  {
    id: "prologue-safe-family",
    name: "Prologue: Save Esme + Lazar",
    description:
      "Zero-cost XP first, Deep Down early for Lazar, finish Withering Away before Mass. Uses Reported segment costs.",
    items: [
      { entryId: "prologue-cost-zero-xp", label: "Enter Not (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-zero-xp", label: "Dead Drop (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-zero-xp", label: "If a Tree Falls (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-deep-down", label: "Deep Down (1) — before 5 segments passed", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-withering-away", label: "Withering Away (2) — must before Mass", apCost: 2, phase: "day" },
      { entryId: "prologue-cost-live-bait", label: "Live Bait (1) — skip tag", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-typical-side", label: "Someone Needs A Lesson (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-typical-side", label: "Blasphemy (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-typical-side", label: "Disturbed (1) — skip bury extra", apCost: 1, phase: "day" },
    ],
  },
  {
    id: "prologue-max-xp",
    name: "Prologue: Max free XP",
    description:
      "Grab every 0-segment quest, then high-value hourglass sides. Still finish Withering Away before Mass.",
    items: [
      { entryId: "prologue-cost-zero-xp", label: "Enter Not (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-zero-xp", label: "Dead Drop (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-zero-xp", label: "If a Tree Falls (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-withering-away", label: "Withering Away (2)", apCost: 2, phase: "day" },
      { entryId: "prologue-cost-deep-down", label: "Deep Down (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-on-the-run", label: "On The Run (2)", apCost: 2, phase: "day" },
      { entryId: "prologue-cost-typical-side", label: "Blasphemy (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-live-bait", label: "Live Bait (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-bandits-treasure", label: "Bandits’ Treasure Map (2) — optional squeeze", apCost: 2, phase: "day" },
    ],
  },
  {
    id: "prologue-minimal",
    name: "Prologue: Minimal Mass-safe",
    description:
      "Bare minimum before Blood Mass: Esme medicine + a little XP. Leaves segments for mistakes.",
    items: [
      { entryId: "prologue-cost-zero-xp", label: "Enter Not (0)", apCost: 0, phase: "day" },
      { entryId: "prologue-cost-withering-away", label: "Withering Away (2)", apCost: 2, phase: "day" },
      { entryId: "prologue-cost-live-bait", label: "Live Bait (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-deep-down", label: "Deep Down (1)", apCost: 1, phase: "day" },
      { entryId: "prologue-cost-typical-side", label: "Like Father, Like Son (1) — optional", apCost: 1, phase: "day" },
    ],
  },
];
