/**
 * Prologue quest-order routes for /guides/quest-order.
 * All costs Reported (launch-week guides + IGN YT). Not Verified in-house.
 */

export type QuestOrderStep = {
  order: number;
  questId: string;
  name: string;
  segments: number;
  runningTotal: number;
  tip: string;
  risk?: "high" | "medium" | "low";
};

export type QuestOrderRoute = {
  id: string;
  name: string;
  phaseLabel: string;
  budgetSegments: number;
  summary: string;
  steps: QuestOrderStep[];
  leftoverNote: string;
};

/** Recommended Day-1 / pre-Mass route fitting ~8 Reported day segments. */
export const PROLOGUE_DAY1_ROUTE: QuestOrderRoute = {
  id: "prologue-day1-mass",
  name: "Prologue before Blood Mass",
  phaseLabel: "Day · ~8 segments Reported",
  budgetSegments: 8,
  summary:
    "Roughly 13 named prologue quests compete for about 8 day segments. Do zero-cost XP first, resolve Deep Down early if Lazar matters, and finish Withering Away before Mass. Do not start a multi-step hourglass quest with only 1 segment left.",
  steps: [
    {
      order: 1,
      questId: "prologue-enter-not",
      name: "Enter Not",
      segments: 0,
      runningTotal: 0,
      tip: "0 segments · free XP. Grab before spending the bar.",
      risk: "low",
    },
    {
      order: 2,
      questId: "prologue-dead-drop",
      name: "Dead Drop",
      segments: 0,
      runningTotal: 0,
      tip: "0 segments for the quest itself. Bandit camp engage nearby is a separate +1.",
      risk: "low",
    },
    {
      order: 3,
      questId: "prologue-if-a-tree-falls",
      name: "If a Tree Falls in a Forest",
      segments: 0,
      runningTotal: 0,
      tip: "0 segments · free XP.",
      risk: "low",
    },
    {
      order: 4,
      questId: "prologue-deep-down",
      name: "Deep Down",
      segments: 1,
      runningTotal: 1,
      tip: "Do while ≤4 segments have already passed if you want Lazar alive (IGN). Quest itself ~1.",
      risk: "high",
    },
    {
      order: 5,
      questId: "prologue-withering-away",
      name: "Withering Away",
      segments: 2,
      runningTotal: 3,
      tip: "Must finish before Mass or Esme/mom suffers. Staying for the storm/Page-Turner is +1.",
      risk: "high",
    },
    {
      order: 6,
      questId: "prologue-live-bait",
      name: "Live Bait",
      segments: 1,
      runningTotal: 4,
      tip: "Skip playing tag (+1). Base ~1 segment.",
      risk: "medium",
    },
    {
      order: 7,
      questId: "prologue-someone-needs-a-lesson",
      name: "Someone Needs A Lesson",
      segments: 1,
      runningTotal: 5,
      tip: "~1 segment · solid XP.",
      risk: "low",
    },
    {
      order: 8,
      questId: "prologue-blasphemy",
      name: "Blasphemy",
      segments: 1,
      runningTotal: 6,
      tip: "~1 segment. Revelation choice affects Gremla at Mass.",
      risk: "medium",
    },
    {
      order: 9,
      questId: "prologue-disturbed",
      name: "Disturbed",
      segments: 1,
      runningTotal: 7,
      tip: "Base ~1. Helping bury is an extra +1 — skip if low on segments.",
      risk: "medium",
    },
    {
      order: 10,
      questId: "prologue-like-father-like-son",
      name: "Like Father, Like Son",
      segments: 1,
      runningTotal: 8,
      tip: "Optional after Withering Away. Or skip remaining day straight to Mass.",
      risk: "low",
    },
  ],
  leftoverNote:
    "At 8/8 you are at Mass. Optional swaps: Into The Den (1), On The Run (2), Bandit camp (1) / Treasure map (2) — only if you drop something else. Never open a multi-step chain on your last segment.",
};

export const QUEST_ORDER_ROUTES = [PROLOGUE_DAY1_ROUTE];
