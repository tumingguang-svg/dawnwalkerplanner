export type BuildPath = "vampire" | "human" | "flexible";

export type BuildTemplate = {
  id: string;
  name: string;
  path: BuildPath;
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
    path: "human",
    focus: "Social + steel",
    playstyle:
      "Open doors with reputation, then cut through what talk cannot solve. Strong for court intrigue and mid-game duels.",
    strengths: [
      "Flexible day / night Time Budget use",
      "High dialogue success rate (est.)",
      "Solid against elite human foes",
    ],
    watchouts: [
      "Weaker vs pure supernatural threats early",
      "Needs units for salons and gift beats",
    ],
    starterTips: [
      "Bank 2–3 night units for court events",
      "Pair with Balanced Explore preset",
    ],
    estimated: true,
  },
  {
    id: "night-stalker",
    name: "Night Stalker",
    path: "vampire",
    focus: "Stealth & predation",
    playstyle:
      "Spend night units aggressively on hunts and infiltrations. Daytime is for recovery, crafting, and scouting.",
    strengths: [
      "Excellent map control after dark",
      "High loot density (est.)",
      "Synergizes with occult rituals",
    ],
    watchouts: [
      "Day wallet can feel idle if you over-invest",
      "Detection failures burn contingency units",
    ],
    starterTips: [
      "Keep a 16-unit contingency buffer",
      "Use Save Family Fast only if story timers feel tight",
    ],
    estimated: true,
  },
  {
    id: "ward-guardian",
    name: "Ward Guardian",
    path: "human",
    focus: "Defense & family",
    playstyle:
      "Prioritize rescue leads and defensive systems. Exploration is selective; romance is optional.",
    strengths: [
      "Reliable story completion",
      "Lower soft-lock risk",
      "Clear Time Budget budgeting",
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
    path: "flexible",
    focus: "Romance & companions",
    playstyle:
      "Schedule companion scenes first, then fill remaining units with the minimum main-path set.",
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
      "Track remaining units after every gift night",
    ],
    estimated: true,
  },
  {
    id: "crimson-rite",
    name: "Crimson Rite",
    path: "vampire",
    focus: "Occult power curve",
    playstyle:
      "Trade social flexibility for ritual preparation and night dominance. Daytime is logistics; nights are the real campaign.",
    strengths: [
      "Strong late supernatural toolkit (est.)",
      "Clear night-unit spending plan",
    ],
    watchouts: [
      "Riskier if rituals fail and burn contingency",
      "Weaker court reputation early",
    ],
    starterTips: [
      "Park long day-only tours until rituals stabilize",
      "Read the day vs night guide before overfilling nights",
    ],
    estimated: true,
  },
];

export function buildsForPath(path: BuildPath | "all") {
  if (path === "all") return BUILD_TEMPLATES;
  if (path === "vampire")
    return BUILD_TEMPLATES.filter(
      (b) => b.path === "vampire" || b.path === "flexible"
    );
  if (path === "human")
    return BUILD_TEMPLATES.filter(
      (b) => b.path === "human" || b.path === "flexible"
    );
  return BUILD_TEMPLATES.filter((b) => b.path === path);
}
