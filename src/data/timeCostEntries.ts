import type {
  TimePhase,
  VerificationStatus,
  YoutubeSourceMeta,
} from "./apConfig";
import {
  SOURCE_URLS,
  YT_FALCON_TIME,
  YT_IGN_PROLOGUE,
  YT_RAGE_TIPS,
} from "./apConfig";

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
 *    `platform` / `patch` / `gameVersion` when known.
 * 5. YouTube-derived rows must set `youtubeSource` with URL, timestamp,
 *    platform, game version, and verification date.
 * 6. Leave `lastVerified: null` for rows that still need a real check.
 * Prefer shipping a complete estimated catalog over blank rows.
 * Do not invent Verified retail numbers. Unverified data is not fact.
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
  /** Optional game version label when distinct from patch. */
  gameVersion?: string;
  /**
   * Required when the cost is derived from YouTube or similar footage.
   * Incomplete citations must not be marked Verified.
   */
  youtubeSource?: YoutubeSourceMeta;
};

/** Fan-estimated time costs. Prefer complete planner UX over perfect lore numbers. */
export const TIME_COST_ENTRIES: TimeCostEntry[] = [
  {
    id: "travel-district",
    name: "Travel between districts",
    category: "Legacy estimate",
    apCost: 2,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Short hops inside the same ward may cost less.",
    lastVerified: null,
    sourceNote: "Legacy estimate — pre-launch fan placeholder, not a retail quest cost",
  },
  {
    id: "travel-wilds",
    name: "Expedition to the wilds",
    category: "Legacy estimate",
    apCost: 4,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Longer routes and weather may increase cost.",
    lastVerified: null,
  },
  {
    id: "main-scene",
    name: "Main story scene block",
    category: "Legacy estimate",
    apCost: 4,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Typical cinematic / dialogue-heavy beat.",
    lastVerified: null,
  },
  {
    id: "main-chapter",
    name: "Main chapter climax",
    category: "Legacy estimate",
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
    category: "Legacy estimate",
    apCost: 2,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Fetch / talk / escort lite.",
    lastVerified: null,
  },
  {
    id: "side-long",
    name: "Long side chain",
    category: "Legacy estimate",
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
    category: "Legacy estimate",
    apCost: 3,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Loot, landmarks, ambient events.",
    lastVerified: null,
  },
  {
    id: "night-hunt",
    name: "Night hunt patrol",
    category: "Legacy estimate",
    apCost: 3,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Predator-focused nighttime activity.",
    lastVerified: null,
  },
  {
    id: "stealth-infil",
    name: "Stealth infiltration",
    category: "Legacy estimate",
    apCost: 4,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Detection failure may burn extra AP.",
    lastVerified: null,
  },
  {
    id: "duel",
    name: "Formal duel / arena",
    category: "Legacy estimate",
    apCost: 3,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Includes prep and aftermath dialogue.",
    lastVerified: null,
  },
  {
    id: "social-salon",
    name: "Salon / court social",
    category: "Legacy estimate",
    apCost: 2,
    phase: "night",
    verificationStatus: "estimated",
    notes: "Reputation and rumor gathering.",
    lastVerified: null,
  },
  {
    id: "romance-scene",
    name: "Companion romance scene",
    category: "Legacy estimate",
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
    category: "Legacy estimate",
    apCost: 2,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Vendor waits and recipe unlocks.",
    lastVerified: null,
  },
  {
    id: "rest-recover",
    name: "Rest & recover",
    category: "Legacy estimate",
    apCost: 1,
    phase: "either",
    verificationStatus: "estimated",
    notes: "May advance phase without full day skip.",
    lastVerified: null,
  },
  {
    id: "investigation",
    name: "Investigation puzzle",
    category: "Legacy estimate",
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
    category: "Legacy estimate",
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
    category: "Legacy estimate",
    apCost: 4,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Alignment shifts possible.",
    lastVerified: null,
  },
  {
    id: "market-day",
    name: "Market day shopping",
    category: "Legacy estimate",
    apCost: 1,
    phase: "day",
    verificationStatus: "estimated",
    notes: "Vendors rotate; stock is limited.",
    lastVerified: null,
  },
  {
    id: "ritual",
    name: "Occult ritual attempt",
    category: "Legacy estimate",
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
    category: "Legacy estimate",
    apCost: 8,
    phase: "either",
    verificationStatus: "estimated",
    notes: "Late-game commitment of remaining AP.",
    spoiler: true,
    lastVerified: null,
  },
  {
    id: "mech-hourglass-default",
    name: "Hourglass-marked activity (default)",
    category: "Mechanics",
    apCost: 1,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Time advances on hourglass-marked actions; the number is segments (IGN). Quests typically ~1 segment; NPC hangouts / extra scenes may cost more (Falcon).",
    lastVerified: "2026-09-03",
    sourceNote: `IGN YT + Falcon YT. ${SOURCE_URLS.ignTime}`,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "mech-caught-stealing",
    name: "Caught stealing",
    category: "Mechanics",
    apCost: 4,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Time bar hit hard if caught stealing. PC Gamer reports 4 segments (guide).",
    lastVerified: "2026-09-03",
    sourceNote: SOURCE_URLS.pcgamerPrologue,
    gameVersion: "retail launch week Sep 2026",
  },
  {
    id: "mech-shrine-fast-travel",
    name: "Shrine-to-shrine fast travel",
    category: "Mechanics",
    apCost: 0,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Shrine-to-shrine fast travel seems 0 time (RageGaming spoken tip). Not the same as Shrine Wait, which can burn large chunks—avoid casual Wait; cost unknown so no invented number.",
    lastVerified: "2026-09-03",
    sourceNote: "RageGaming YT full-video narration.",
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_RAGE_TIPS,
  },
  {
    id: "mech-skill-unlock",
    name: "Skill / perk unlock at shrine",
    category: "Mechanics",
    apCost: 1,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Most perk/ability levels cost ~1 segment (Polygon: most 1, a few 0 or 2; AltChar). Gamer Guides: advanced ranks (almost everything past the top row) cost time; Swordmastery alone can total 90+ ticks if maxed; a realistic single-tree spend is still multi-day — budget ~5–7 in-game days for leveling across a playthrough. Check the hourglass before confirming.",
    lastVerified: "2026-09-04",
    sourceNote: `${SOURCE_URLS.polygonTime} ${SOURCE_URLS.altcharTime} ${SOURCE_URLS.gamerGuidesTime}`,
    gameVersion: "retail launch week Sep 2026",
  },
  {
    id: "mech-explore-walk-free",
    name: "Explore / walk (no hourglass)",
    category: "Mechanics",
    apCost: 0,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Explore and walk often cost 0. Many small activities are free (IGN, Boomstick tip narration). Only hourglass actions spend segments.",
    lastVerified: "2026-09-03",
    sourceNote: `IGN article + IGN YT. ${SOURCE_URLS.ignTime}`,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "mech-zero-cost-predator-xp",
    name: "Zero-cost predator / kill XP",
    category: "Mechanics",
    apCost: 0,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "IGN tip narration: some predator / kill XP loops do not spend time segments. Still skip if they distract from Mass deadlines.",
    lastVerified: "2026-09-03",
    sourceNote: "IGN YT “other ways to earn” narration.",
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-cost-withering-away",
    name: "Prologue: Withering Away",
    category: "Prologue",
    apCost: 2,
    phase: "day",
    verificationStatus: "reported",
    notes:
      "Main prologue. Default 2 (PC Gamer table). PowerPyx: 1 at Anca leave (+1 Page-Turner stay). Gamer Guides: optional mid-quest spends can push ~2–4 — keep 2, do not overwrite. Brew must be hot water + three spoonfuls (PC Gamer / PowerPyx).",
    lastVerified: "2026-09-04",
    sourceNote: `${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.pcgamerAncaRecipe} ${SOURCE_URLS.powerpyxWithering} ${SOURCE_URLS.gamerGuidesTime}`,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
    spoiler: true,
  },
  {
    id: "prologue-cost-live-bait",
    name: "Prologue: Live Bait",
    category: "Prologue",
    apCost: 1,
    phase: "day",
    verificationStatus: "reported",
    notes: "Base 1; playing tag +1 (IGN / PC Gamer).",
    lastVerified: "2026-09-03",
    sourceNote: SOURCE_URLS.pcgamerPrologue,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-cost-deep-down",
    name: "Prologue: Deep Down",
    category: "Prologue",
    apCost: 1,
    phase: "day",
    verificationStatus: "reported",
    notes:
      "Quest ~1. Lazar deadline: after 5 segments already passed → dead (IGN).",
    lastVerified: "2026-09-03",
    sourceNote: SOURCE_URLS.pcgamerPrologue,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
    spoiler: true,
  },
  {
    id: "prologue-cost-on-the-run",
    name: "Prologue: On The Run",
    category: "Prologue",
    apCost: 2,
    phase: "day",
    verificationStatus: "reported",
    notes: "PC Gamer 2⌛. Conservative default vs IGN XP-focus.",
    lastVerified: "2026-09-03",
    sourceNote: SOURCE_URLS.pcgamerPrologue,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-cost-zero-xp",
    name: "Prologue: zero-cost XP trio",
    category: "Prologue",
    apCost: 0,
    phase: "day",
    verificationStatus: "reported",
    notes:
      "Enter Not + Dead Drop + If a Tree Falls: 0 segments, ~100 XP each (IGN / PC Gamer). Bandit camp nearby is not free.",
    lastVerified: "2026-09-03",
    sourceNote: SOURCE_URLS.pcgamerPrologue,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-cost-typical-side",
    name: "Prologue: typical 1-segment side",
    category: "Prologue",
    apCost: 1,
    phase: "day",
    verificationStatus: "reported",
    notes:
      "Blasphemy, Someone Needs A Lesson, Disturbed (base), Into The Den, Like Father Like Son, Page-Turner stay, bandit-camp engage. Falcon: hangouts may add extra.",
    lastVerified: "2026-09-03",
    sourceNote: `${SOURCE_URLS.pcgamerPrologue} Falcon YT ${YT_FALCON_TIME.url}`,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_FALCON_TIME,
  },
  {
    id: "mech-shrine-wait",
    name: "Shrine Wait (skip time)",
    category: "Mechanics",
    apCost: 16,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Gamer Guides: Wait at a shrine can advance up to 16 ticks (a full day+night) at once. Avoid casual Wait — spend the same ticks on skills/quests instead. Planner uses 16 as the Reported upper bound for one Wait commit, not a mandatory cost.",
    lastVerified: "2026-09-04",
    sourceNote: SOURCE_URLS.gamerGuidesTime,
    gameVersion: "retail launch week Sep 2026",
  },
  {
    id: "mech-combat-free",
    name: "Combat (non-quest)",
    category: "Mechanics",
    apCost: 0,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Gamer Guides: combat itself does not advance time unless tied to a quest/activity hourglass. Wolves, boars, and soldiers outside quests are free ticks.",
    lastVerified: "2026-09-04",
    sourceNote: SOURCE_URLS.gamerGuidesTime,
    gameVersion: "retail launch week Sep 2026",
  },
  {
    id: "mech-crafting-loot-free",
    name: "Craft / loot / buy-sell / survey tower",
    category: "Mechanics",
    apCost: 0,
    phase: "either",
    verificationStatus: "reported",
    notes:
      "Gamer Guides: crafting potions, looting chests, buying/selling, picking plants, searching enemies, and climbing survey towers do not consume time. (Some open-world interacts elsewhere may still show an hourglass — trust the UI.)",
    lastVerified: "2026-09-04",
    sourceNote: SOURCE_URLS.gamerGuidesTime,
    gameVersion: "retail launch week Sep 2026",
  },
  {
    id: "prologue-cost-bandits-treasure",
    name: "Prologue: Bandits’ Treasure Map",
    category: "Prologue",
    apCost: 2,
    phase: "day",
    verificationStatus: "reported",
    notes:
      "Polygon lists 2 for the Laslea Glen treasure chain. Camp engage alone is 1 (IGN). GameSpot split may differ.",
    lastVerified: "2026-09-03",
    sourceNote: `${SOURCE_URLS.polygonMassQuests} ${SOURCE_URLS.gamespotPrologue}`,
    gameVersion: "retail launch week Sep 2026",
    youtubeSource: YT_IGN_PROLOGUE,
  },
];

const LAUNCH_WEEK_REPORTED_CATEGORIES = new Set(["Prologue", "Mechanics"]);

export function isLaunchWeekReported(entry: TimeCostEntry): boolean {
  return (
    entry.verificationStatus === "reported" &&
    LAUNCH_WEEK_REPORTED_CATEGORIES.has(entry.category)
  );
}

export const REPORTED_PROLOGUE_TIME_COSTS = TIME_COST_ENTRIES.filter(
  isLaunchWeekReported
);

export const ESTIMATED_PLACEHOLDER_TIME_COSTS = TIME_COST_ENTRIES.filter(
  (entry) => !isLaunchWeekReported(entry)
);

/** Prefer these in Planner quick-add (Reported first). */
export const PLANNER_CATALOG_ENTRIES = [
  ...REPORTED_PROLOGUE_TIME_COSTS,
  ...ESTIMATED_PLACEHOLDER_TIME_COSTS,
];

