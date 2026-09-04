import { TIME_COST_ENTRIES } from "@/data/timeCostEntries";
import type { QuestEntry } from "@/data/quests";
import type { TimePhase } from "@/data/apConfig";

/** Map prologue quest ids to time-cost catalog ids when names align. */
export const QUEST_TO_COST_ID: Record<string, string> = {
  "prologue-withering-away": "prologue-cost-withering-away",
  "prologue-live-bait": "prologue-cost-live-bait",
  "prologue-deep-down": "prologue-cost-deep-down",
  "prologue-on-the-run": "prologue-cost-on-the-run",
  "prologue-enter-not": "prologue-cost-zero-xp",
  "prologue-dead-drop": "prologue-cost-zero-xp",
  "prologue-if-a-tree-falls": "prologue-cost-zero-xp",
  "prologue-bandits-treasure": "prologue-cost-bandits-treasure",
  "prologue-blasphemy": "prologue-cost-typical-side",
  "prologue-someone-needs-a-lesson": "prologue-cost-typical-side",
  "prologue-disturbed": "prologue-cost-typical-side",
  "prologue-into-the-den": "prologue-cost-typical-side",
  "prologue-like-father-like-son": "prologue-cost-typical-side",
  "prologue-page-turner": "prologue-cost-typical-side",
  "prologue-bandit-camp": "prologue-cost-typical-side",
};

export function plannerHrefForQuest(quest: QuestEntry): string {
  const entryId = QUEST_TO_COST_ID[quest.id];
  if (entryId && TIME_COST_ENTRIES.some((e) => e.id === entryId)) {
    return `/planner?add=${encodeURIComponent(entryId)}`;
  }
  const phase: TimePhase =
    quest.phase === "day" || quest.phase === "night" ? quest.phase : "either";
  const cost = quest.estimatedAp ?? 0;
  const params = new URLSearchParams({
    name: quest.name,
    cost: String(cost),
    phase,
  });
  return `/planner?${params.toString()}`;
}

export function countSources(sourceNote?: string, hasYoutube?: boolean): number {
  if (!sourceNote && !hasYoutube) return 0;
  let n = 0;
  const note = sourceNote ?? "";
  if (/IGN/i.test(note)) n += 1;
  if (/PC Gamer|pcgamer/i.test(note)) n += 1;
  if (/Polygon/i.test(note)) n += 1;
  if (/GameSpot/i.test(note)) n += 1;
  if (/Falcon/i.test(note)) n += 1;
  if (/Rage/i.test(note)) n += 1;
  if (/Lunar/i.test(note)) n += 1;
  if (/PowerPyx/i.test(note)) n += 1;
  if (/Boomstick/i.test(note)) n += 1;
  if (/AltChar/i.test(note)) n += 1;
  if (hasYoutube && n === 0) n = 1;
  if (hasYoutube && !/YouTube|YT/i.test(note)) n += 1;
  return Math.max(n, note ? 1 : 0);
}

/** Build /planner URL that hydrates one or more time-cost ids via ?add=. */
export function plannerHrefForCostIds(costIds: string[]): string {
  const unique = [...new Set(costIds.filter(Boolean))];
  if (unique.length === 0) return "/planner";
  if (unique.length === 1) {
    return `/planner?add=${encodeURIComponent(unique[0])}`;
  }
  // Comma-separated is compact; PlannerClient also accepts repeated ?add=.
  return `/planner?add=${unique.map(encodeURIComponent).join(",")}`;
}
