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
    window: "Before Blood Mass — finish Withering Away with the correct brew (hot water + three spoonfuls)",
    risk: "high",
    ...REPORTED_LAUNCH,
    lastVerified: "2026-09-04",
    notes:
      "Brew steps (Reported): choose Use hot water, then Add three spoonfuls of herbs (PC Gamer Anca recipe; PowerPyx Withering Away; GameSpot save-mom). Anca’s spoken tip: three scoops with water hot but not boiling. Wrong prep or unfinished Withering Away before Mass/Sacred Covenant → Esme dies (PowerPyx fail state). IGN + LunarGaming also flag the ceremony fail.",
    sourceNote: `PC Gamer recipe + PowerPyx walkthrough + GameSpot. Ceremony also IGN YT / LunarGaming. ${SOURCE_URLS.pcgamerAncaRecipe} ${SOURCE_URLS.powerpyxWithering} ${SOURCE_URLS.gamespotEsme}`,
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
  {
    id: "missable-30-day-family-rescue",
    name: "In the Nick of Time (30-day family rescue)",
    window: "Rescue family within 30 in-game days after Prologue",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx trophy guide marks this MISSABLE and calls the 30-day family rescue the overall most missable requirement. If time runs out, the trophy cannot be earned.",
    sourceNote: SOURCE_URLS.powerpyxTrophy,
  },
  {
    id: "missable-bittersweet-toast",
    name: "The Bittersweet Toast (timed duel)",
    window:
      "Optional sub-quest of The Gilded Gauntlet before dueling Ambrus; then ~3 days / 48 segments to duel on time",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx calls this highly missable. Fail states include killing Codrin or leaving mid-ritual; after the toast, a timed window remains to duel Ambrus.",
    sourceNote: SOURCE_URLS.powerpyxBittersweet,
  },
  {
    id: "missable-together-forever",
    name: "Together Forever (Home Sweet Home dream loop)",
    window:
      "Home Sweet Home (Silts Tower): complete 4 dream cycles, stay on the 5th — do not escape via the well",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx marks the trophy MISSABLE. Escaping via the well early misses the secret Together Forever ending path.",
    sourceNote: SOURCE_URLS.powerpyxTrophy,
  },
  {
    id: "missable-mothers-plea",
    name: "A Mother's Plea (hidden time-sensitive)",
    window:
      "Hidden Court/side activity via Lacra → Song of the Mountain; time-sensitive once started",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx walkthrough: hidden, missable, and time-sensitive; tied to Lacra / Osha side lines and chains toward The Heart Wants What It Wants.",
    sourceNote: SOURCE_URLS.powerpyxWalkthrough,
  },
  {
    id: "missable-misery-loves-company",
    name: "Misery Loves Company (Lacra optional before Midnight Reckoning)",
    window: "Complete The Night of Horrors before Lacra ending quest Midnight Reckoning",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx trophy guide: MISSABLE. Optional Lacra quest The Night of Horrors must be done before Midnight Reckoning.",
    sourceNote: SOURCE_URLS.powerpyxTrophy,
  },
  {
    id: "missable-the-manumit",
    name: "The Manumit (Crake optionals before Rise at Dawn)",
    window: "Distant Shadows → A Closer Look before Rise at Dawn",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx trophy guide: MISSABLE. Complete optional Crake quests Distant Shadows and A Closer Look before Rise at Dawn.",
    sourceNote: SOURCE_URLS.powerpyxTrophy,
  },
  {
    id: "missable-uphill-battle",
    name: "Uphill Battle (full ending on Duelist)",
    window: "Start and finish at least one full ending on Duelist from the start of the playthrough",
    risk: "high",
    ...REPORTED_LAUNCH,
    notes:
      "PowerPyx trophy guide: MISSABLE. Requires a full ending that saves Laslea on Duelist; early endings may not count.",
    sourceNote: SOURCE_URLS.powerpyxTrophy,
  },
];
