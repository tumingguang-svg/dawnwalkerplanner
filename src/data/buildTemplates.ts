export type BuildTemplate = {
  id: string;
  name: string;
  focus: string;
  playstyle: string;
  strengths: string[];
  watchouts: string[];
  starterTips: string[];
  estimated: boolean;
};

export const BUILD_TEMPLATES: BuildTemplate[] = [
  {
    id: "blade-diplomat",
    name: "Blade Diplomat",
    focus: "Social + steel",
    playstyle:
      "Open doors with reputation, then cut through what talk cannot solve. Strong for court intrigue and mid-game duels.",
    strengths: [
      "Flexible day / night AP use",
      "High dialogue success rate (est.)",
      "Solid against elite human foes",
    ],
    watchouts: [
      "Weaker vs pure supernatural threats early",
      "Needs AP for salons and gift beats",
    ],
    starterTips: [
      "Bank 2–3 night AP for court events",
      "Pair with Balanced Explore preset",
    ],
    estimated: true,
  },
  {
    id: "night-stalker",
    name: "Night Stalker",
    focus: "Stealth & predation",
    playstyle:
      "Spend night AP aggressively on hunts and infiltrations. Daytime is for recovery, crafting, and scouting.",
    strengths: [
      "Excellent map control after dark",
      "High loot density (est.)",
      "Synergizes with occult rituals",
    ],
    watchouts: [
      "Day AP can feel idle if you over-invest",
      "Detection failures burn contingency AP",
    ],
    starterTips: [
      "Keep a 16 AP contingency buffer",
      "Use Save Family Fast only if story timers feel tight",
    ],
    estimated: true,
  },
  {
    id: "ward-guardian",
    name: "Ward Guardian",
    focus: "Defense & family",
    playstyle:
      "Prioritize rescue leads and defensive systems. Exploration is selective; romance is optional.",
    strengths: [
      "Reliable story completion",
      "Lower soft-lock risk",
      "Clear AP budgeting",
    ],
    watchouts: [
      "Misses many side districts",
      "Companion content may stall",
    ],
    starterTips: [
      "Load Save Family Fast preset",
      "Skip long side chains until after mid-campaign",
    ],
    estimated: true,
  },
  {
    id: "heartstring",
    name: "Heartstring",
    focus: "Romance & companions",
    playstyle:
      "Schedule companion scenes first, then fill remaining AP with the minimum main-path set.",
    strengths: [
      "Deep character payoff",
      "Strong late-game personal endings (est.)",
    ],
    watchouts: [
      "Easy to overspend early",
      "Requires discipline on side content",
    ],
    starterTips: [
      "Start from Romance Priority preset",
      "Track remaining AP after every gift night",
    ],
    estimated: true,
  },
];
