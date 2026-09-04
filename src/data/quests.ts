import type {
  TimePhase,
  VerificationStatus,
  YoutubeSourceMeta,
} from "./apConfig";
import { SOURCE_URLS, YT_IGN_PROLOGUE } from "./apConfig";

/**
 * Quest catalog schema. Fill rows only after retail observation or a complete
 * YouTube citation. Do not invent Verified costs or fake quest names.
 */
export type QuestEntry = {
  id: string;
  name: string;
  type: "main" | "side" | "personal" | "faction";
  /** Null until observed. Null is not zero. */
  estimatedAp: number | null;
  phase: TimePhase | "unknown";
  verificationStatus: VerificationStatus;
  missableRisk: "low" | "medium" | "high" | "unknown";
  notes: string;
  lastVerified?: string | null;
  sourceNote?: string;
  platform?: string;
  patch?: string;
  gameVersion?: string;
  youtubeSource?: YoutubeSourceMeta;
};

const REPORTED_LAUNCH = {
  verificationStatus: "reported" as const,
  lastVerified: "2026-09-03",
  gameVersion: "retail launch week Sep 2026",
  platform: "YouTube / written guides",
};

/**
 * Launch-week Reported prologue catalog (2026-09-03).
 * Costs are model units = time-bar segments. Never marked Verified.
 */
export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: "prologue-withering-away",
    name: "Withering Away",
    type: "main",
    estimatedAp: 2,
    phase: "day",
    ...REPORTED_LAUNCH,
    lastVerified: "2026-09-04",
    missableRisk: "high",
    notes:
      "Must finish before Mass or Esme dies. Brew: hot water + three spoonfuls (PC Gamer / PowerPyx / GameSpot). Planner default 2 segments (PC Gamer table). PowerPyx lists base 1 at Anca leave (+1 if Page-Turner stay); Gamer Guides notes mid-quest options can push ~2–4 — keep default 2, footnote range. Storm / Page-Turner stay +1 (IGN / PowerPyx).",
    sourceNote: `PC Gamer table + Anca recipe; PowerPyx Withering Away; GameSpot save-mom; Gamer Guides time mgmt. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.pcgamerAncaRecipe} ${SOURCE_URLS.powerpyxWithering} ${SOURCE_URLS.gamespotEsme} ${SOURCE_URLS.gamerGuidesTime}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-live-bait",
    name: "Live Bait",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "medium",
    notes:
      "Kids fishing. Base ~1 segment; playing tag +1 extra hour (IGN / PC Gamer).",
    sourceNote: `IGN YT + PC Gamer. ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-blasphemy",
    name: "Blasphemy",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "medium",
    lastVerified: "2026-09-05",
    notes:
      "Banner investigation. Default 1 segment (PC Gamer / IGN). Gremla dies at Mass if you skip or never name Premysl (Gamer Guides). ROI tip: side with Premysl for Daylight Amulet, then tell Gremla anyway for both rewards + higher EXP (Gamer Guides).",
    sourceNote: `IGN YT + PC Gamer + Gamer Guides ROI. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-page-turner",
    name: "Page-Turner",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    notes:
      "Optional stay with Anca during Withering Away rain (PC Gamer / IGN). +1 hour if you stay. Polygon notes 1 or 2 depending on how it stacks with Withering Away.",
    sourceNote: `PC Gamer + IGN + Polygon. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.polygonMassQuests}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-someone-needs-a-lesson",
    name: "Someone Needs A Lesson",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    notes: "Vasil confrontation. ~1 segment; ~250 XP (IGN).",
    sourceNote: `IGN YT + PC Gamer. ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-deep-down",
    name: "Deep Down",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "high",
    notes:
      "Lazar: if the search resolves after 5 segments have already passed → dead; ≤4 segments passed → alive (IGN). Strong missable. Quest itself ~1 segment.",
    sourceNote: `IGN YT (deadline) + PC Gamer (1⌛). ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-on-the-run",
    name: "On The Run",
    type: "side",
    estimatedAp: 2,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "medium",
    lastVerified: "2026-09-05",
    notes:
      "Lost pig. PC Gamer lists 2⌛; IGN emphasizes XP. Planner default follows PCG. Gamer Guides calls this a poor ROI spend for prologue budget (2 TIME for modest XP/Denarius).",
    sourceNote: `PC Gamer 2⌛ + Gamer Guides ROI. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-enter-not",
    name: "Enter Not",
    type: "side",
    estimatedAp: 0,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    notes: "0 time segments; 100 XP (IGN). Do these zero-cost XP quests first.",
    sourceNote: `IGN + PC Gamer 0⌛. ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-dead-drop",
    name: "Dead Drop",
    type: "side",
    estimatedAp: 0,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    notes:
      "0 time for the quest itself (IGN / PC Gamer). Bandit-camp engagement nearby is a separate 1-segment spend.",
    sourceNote: `IGN + PC Gamer 0⌛. ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-if-a-tree-falls",
    name: "If a Tree Falls in a Forest",
    type: "side",
    estimatedAp: 0,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    notes: "0 time; 100 XP (IGN / PC Gamer).",
    sourceNote: `IGN + PC Gamer 0⌛. ${SOURCE_URLS.pcgamerPrologue}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-disturbed",
    name: "Disturbed",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "medium",
    lastVerified: "2026-09-05",
    notes:
      "Base ~1 segment. Help bury / refill the grave = extra +1 hour (IGN / PC Gamer). Gamer Guides: skip the bury ask — no meaningful payoff for the second segment.",
    sourceNote: `IGN YT + PC Gamer + Gamer Guides. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-into-the-den",
    name: "Into The Den",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    lastVerified: "2026-09-05",
    missableRisk: "low",
    notes:
      "PC Gamer / Polygon list 1⌛. Gamer Guides: Into The Den remains available after the prologue — prefer spending Mass-day segments on expiring NPC quests instead. Not listed on PowerPyx’s prologue-missable side list.",
    sourceNote: `PC Gamer + Polygon + Gamer Guides persist. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.polygonMassQuests} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
  },
  {
    id: "prologue-like-father-like-son",
    name: "Like Father, Like Son",
    type: "personal",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    lastVerified: "2026-09-05",
    notes:
      "After Withering Away. ~1 hour (IGN / PC Gamer). Gamer Guides ROI: duel + chat with Pieter yields Charge Manual (unlock Charge skill) — one of the stronger 1-segment prologue spends. You can still skip remaining day and go to Mass instead.",
    sourceNote: `IGN + PC Gamer + Gamer Guides Charge Manual. ${SOURCE_URLS.pcgamerPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-bandit-camp",
    name: "Bandit camp engagement",
    type: "side",
    estimatedAp: 1,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    lastVerified: "2026-09-05",
    notes:
      "UI warns engage = 1-hour segment (IGN). Treasure-map follow-up is a separate row. Gamer Guides: bandit camp remains available after prologue — do not burn Mass-day budget here if NPC sides still expire. Treasure-map missability conflicts (see Bandits’ Treasure row).",
    sourceNote: `IGN YT + Gamer Guides persist. Treasure chain: ${SOURCE_URLS.polygonMassQuests} ${SOURCE_URLS.gamespotPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "prologue-bandits-treasure",
    name: "Bandits’ Treasure Map (Laslea Glen)",
    type: "side",
    estimatedAp: 2,
    phase: "day",
    ...REPORTED_LAUNCH,
    missableRisk: "low",
    lastVerified: "2026-09-05",
    notes:
      "Polygon-style treasure chain listed as 2 segments. GameSpot describes camp fight + later dig (conflicting split vs a single 2). Planner default 2 (conservative). Persist conflict: PowerPyx lists this under prologue-missable sides; Gamer Guides says buried treasure remains after prologue — do not auto-assume safe to defer (Pending).",
    sourceNote: `Polygon 2; GameSpot split; PowerPyx missable list vs Gamer Guides persist. ${SOURCE_URLS.polygonMassQuests} ${SOURCE_URLS.gamespotPrologue} ${SOURCE_URLS.gamerGuidesPrologueBest}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
];
