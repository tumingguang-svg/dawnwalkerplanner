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

export const PRESETS: PlanPreset[] = [
  {
    id: "save-family-fast",
    name: "Save Family Fast",
    description:
      "Prioritize critical story beats and family-related objectives. Leaves little room for side exploration.",
    items: [
      { entryId: "main-act1", label: "Main path — early acts (est.)", apCost: 48, phase: "either" },
      { entryId: "family-urgent", label: "Family rescue chain (est.)", apCost: 56, phase: "either" },
      { entryId: "travel-hub", label: "Hub travel blocks (est.)", apCost: 24, phase: "day" },
      { entryId: "night-intel", label: "Night intel & contacts (est.)", apCost: 32, phase: "night" },
      { entryId: "boss-gates", label: "Major confrontation gates (est.)", apCost: 40, phase: "either" },
      { entryId: "buffer", label: "Contingency buffer", apCost: 16, phase: "either" },
    ],
  },
  {
    id: "balanced-explore",
    name: "Balanced Explore",
    description:
      "Split Time Budget units between story progress, districts, and optional encounters without overcommitting.",
    items: [
      { entryId: "main-steady", label: "Main path — steady pace (est.)", apCost: 64, phase: "either" },
      { entryId: "districts", label: "District exploration (est.)", apCost: 48, phase: "day" },
      { entryId: "side-quests", label: "Side objectives pack (est.)", apCost: 40, phase: "either" },
      { entryId: "night-hunt", label: "Night hunting & stealth (est.)", apCost: 36, phase: "night" },
      { entryId: "social", label: "Social / reputation beats (est.)", apCost: 28, phase: "day" },
      { entryId: "flex", label: "Flexible reserve", apCost: 32, phase: "either" },
    ],
  },
  {
    id: "romance-priority",
    name: "Romance Priority",
    description:
      "Front-load companion and relationship scenes while keeping enough Time Budget units to finish the campaign.",
    items: [
      { entryId: "romance-arc", label: "Romance / companion arc (est.)", apCost: 48, phase: "either" },
      { entryId: "gift-social", label: "Gifts & social evenings (est.)", apCost: 24, phase: "night" },
      { entryId: "main-min", label: "Main path — minimum viable (est.)", apCost: 72, phase: "either" },
      { entryId: "jealousy", label: "Rival / jealousy beats (est.)", apCost: 16, phase: "day" },
      { entryId: "explore-lite", label: "Light exploration (est.)", apCost: 32, phase: "day" },
      { entryId: "reserve", label: "Ending-prep reserve", apCost: 24, phase: "either" },
    ],
  },
];
