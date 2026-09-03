import type { VerificationStatus, YoutubeSourceMeta } from "./apConfig";
import { SOURCE_URLS, YT_IGN_PROLOGUE } from "./apConfig";

/**
 * Missable-content catalog schema. Keep empty until an Estimated or Reported
 * observation exists. Do not invent Verified missable lists.
 */
export type MissableEntry = {
  id: string;
  name: string;
  window: string;
  risk: "low" | "medium" | "high" | "unknown";
  verificationStatus: VerificationStatus;
  notes: string;
  lastVerified?: string | null;
  sourceNote?: string;
  platform?: string;
  gameVersion?: string;
  youtubeSource?: YoutubeSourceMeta;
};

const REPORTED_LAUNCH = {
  verificationStatus: "reported" as const,
  lastVerified: "2026-09-03",
  gameVersion: "retail launch week Sep 2026",
  platform: "YouTube / written guides",
};

/** Launch-week Reported prologue missables. Not Verified in-house play. */
export const MISSABLE_ENTRIES: MissableEntry[] = [
  {
    id: "missable-esme-medicine",
    name: "Save Esme / mom (Withering Away herbs)",
    window: "Before Blood Mass — finish Withering Away with the correct herb instructions",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "Save Esme/mom by following Anca’s herb instructions and completing Withering Away before Mass. Wrong prep or an unfinished main beat is reported to go badly at the ceremony (IGN + LunarGaming tip narration).",
    sourceNote: `IGN YT + LunarGaming launch-week narration. Ceremony fail state also noted by PowerPyx. ${SOURCE_URLS.powerpyxCovenant}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "missable-lazar-deep-down",
    name: "Lazar dies if Deep Down is late",
    window: "Deep Down search after 5 day segments have already passed",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "Lazar dies if Deep Down is resolved after 5 segments have passed; ≤4 segments passed → reported alive (IGN). The quest itself still costs ~1 segment.",
    sourceNote: "IGN YT full-video narration (Deep Down deadline).",
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "missable-gremla-blasphemy",
    name: "Gremla fate (Blasphemy / Premysl)",
    window: "Blasphemy resolution before Blood Mass",
    risk: "medium",
    ...REPORTED_LAUNCH,
    notes:
      "Gremla’s fate depends on whether you reveal Premysl in the banner investigation (IGN). Outcomes show up at Mass.",
    sourceNote: `IGN YT. Mass outcome also noted by PowerPyx Sacred Covenant. ${SOURCE_URLS.powerpyxCovenant}`,
    youtubeSource: YT_IGN_PROLOGUE,
  },
  {
    id: "missable-prologue-sides-after-mass",
    name: "Unfinished prologue sides after Blood Mass",
    window: "When the day bar fills / Blood Mass begins",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "All unfinished prologue sides fail or become unavailable after Blood Mass (GameSpot: clock-icon quests auto-fail; PowerPyx: Mass begins when time runs out).",
    sourceNote: `${SOURCE_URLS.gamespotPrologue} ${SOURCE_URLS.powerpyxCovenant}`,
  },
  {
    id: "missable-half-quest-one-segment",
    name: "Starting a multi-step quest with 1 segment left",
    window: "Any hourglass quest that spends a segment mid-chain",
    risk: "medium",
    ...REPORTED_LAUNCH,
    notes:
      "Starting a multi-step quest with 1 segment left can fail with no rewards if the next objective still needs time (Polygon).",
    sourceNote: SOURCE_URLS.polygonMassQuests,
  },
];
