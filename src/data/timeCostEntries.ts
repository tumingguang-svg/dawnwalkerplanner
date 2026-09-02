import type { TimePhase, VerificationStatus } from "./apConfig";

/**
 * Time-cost catalog for the planner and /time-costs page.
 *
 * Verification tiers: Estimated | Reported | Verified.
 * Post-launch owner updates:
 * 1. Play or cite a patch/player observation for an activity.
 * 2. Set `apCost` / `phase` to the observed values.
 * 3. Set `verificationStatus` to "reported" (player/community note) or
 *    "verified" (confirmed against retail/patch), else keep "estimated".
 * 4. Fill `lastVerified` (YYYY-MM-DD), optional `sourceNote`, and optional
 *    `platform` / `patch` when known.
 * 5. Leave `lastVerified: null` for rows that still need a real check.
 * Prefer shipping a complete estimated catalog over blank rows.
 * Do not invent Verified retail numbers.
 */
export type TimeCostEntry = {
  id: string;
  name: string;
  category: string;
  apCost: number;
  phase: TimePhase;
  verificationStatus: VerificationStatus;
  notes: string;
  spoiler?: boolean;
  /** Optional citation for how the cost was checked. */
  sourceNote?: string;
  /** ISO date (YYYY-MM-DD) of last in-game or patch verification, or null. */
  lastVerified?: string | null;
  /** Optional platform where the cost was observed (e.g. PC, PS5). */
  platform?: string;
  /** Optional patch / build id (e.g. 1.0.2). */
  patch?: string;
};

/** Fan-estimated time costs. Prefer complete planner UX over perfect lore numbers. */
export const TIME_COST_ENTRIES: TimeCostEntry[] = [
  {
    id: "travel-district",
    name: "Travel between districts",
    category: "Travel",
    apCost: 2,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Short hops inside the same ward may cost less.",
    lastVerified: null,
    sourceNote: "Pre-launch fan model",
  },
  {
    id: "travel-wilds",
    name: "Expedition to the wilds",
    category: "Travel",
    apCost: 4,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Longer routes and weather may increase cost.",
    lastVerified: null,
  },
  {
    id: "main-scene",
    name: "Main story scene block",
    category: "Story",
    apCost: 4,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Typical cinematic / dialogue-heavy beat.",
    lastVerified: null,
  },
  {
    id: "main-chapter",
    name: "Main chapter climax",
    category: "Story",
    apCost: 8,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Boss gates and multi-stage set pieces.",
    spoiler: true,
    lastVerified: null,
  },
  {
    id: "side-short",
    name: "Short side objective",
    category: "Side",
    apCost: 2,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Fetch / talk / escort lite.",
    lastVerified: null,
  },
  {
    id: "side-long",
    name: "Long side chain",
    category: "Side",
    apCost: 6,
    phase: "either",
    verificationStatus: "reported",
    notes: "Multi-step district arcs.",
    lastVerified: null,
    sourceNote: "Aggregated from early player discussion (Reported, unconfirmed in retail)",
  },
  {
    id: "explore-block",
    name: "Open exploration block",
    category: "Exploration",
    apCost: 3,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Loot, landmarks, ambient events.",
    lastVerified: null,
  },
  {
    id: "night-hunt",
    name: "Night hunt patrol",
    category: "Combat",
    apCost: 3,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Predator-focused nighttime activity.",
    lastVerified: null,
  },
  {
    id: "stealth-infil",
    name: "Stealth infiltration",
    category: "Combat",
    apCost: 4,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Detection failure may burn extra AP.",
    lastVerified: null,
  },
  {
    id: "duel",
    name: "Formal duel / arena",
    category: "Combat",
    apCost: 3,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Includes prep and aftermath dialogue.",
    lastVerified: null,
  },
  {
    id: "social-salon",
    name: "Salon / court social",
    category: "Social",
    apCost: 2,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Reputation and rumor gathering.",
    lastVerified: null,
  },
  {
    id: "romance-scene",
    name: "Companion romance scene",
    category: "Social",
    apCost: 3,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Relationship progression beat.",
    spoiler: true,
    lastVerified: null,
  },
  {
    id: "crafting-session",
    name: "Crafting / upgrade session",
    category: "Systems",
    apCost: 2,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Vendor waits and recipe unlocks.",
    lastVerified: null,
  },
  {
    id: "rest-recover",
    name: "Rest & recover",
    category: "Systems",
    apCost: 1,
    phase: "either",
    verificationStatus: "estimated",
    notes: "May advance phase without full day skip.",
    lastVerified: null,
  },
  {
    id: "investigation",
    name: "Investigation puzzle",
    category: "Story",
    apCost: 3,
    phase: "either",
    verificationStatus: "reported",
    notes: "Clue boards and interrogations.",
    lastVerified: null,
    sourceNote: "Aggregated from early player discussion (Reported, unconfirmed in retail)",
  },
  {
    id: "family-lead",
    name: "Family rescue lead",
    category: "Story",
    apCost: 5,
    phase: "either",
    verificationStatus: "estimated",
    notes: "High-priority personal quest beats.",
    spoiler: true,
    lastVerified: null,
  },
  {
    id: "faction-mission",
    name: "Faction mission",
    category: "Side",
    apCost: 4,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Alignment shifts possible.",
    lastVerified: null,
  },
  {
    id: "market-day",
    name: "Market day shopping",
    category: "Systems",
    apCost: 1,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Vendors rotate; stock is limited.",
    lastVerified: null,
  },
  {
    id: "ritual",
    name: "Occult ritual attempt",
    category: "Story",
    apCost: 5,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Failure states may lock content.",
    spoiler: true,
    lastVerified: null,
  },
  {
    id: "ending-prep",
    name: "Ending preparation block",
    category: "Story",
    apCost: 8,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Late-game commitment of remaining AP.",
    spoiler: true,
    lastVerified: null,
  },
];
