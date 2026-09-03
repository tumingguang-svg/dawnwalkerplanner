export const AP_CONFIG = {
  totalDays: 30,
  dayAp: 8,
  nightAp: 8,
  get totalAp() {
    return this.totalDays * (this.dayAp + this.nightAp);
  },
  /** Fan model units for the interactive planner (not official Action Points). */
  label: "Estimated 30-day Time Budget · 480 model units (30 × 8 day + 8 night)",
  note: "Fan planning model. Interactive planner units stay Estimated. Mechanics copy may say day/night 8 segments Reported (IGN + PC Gamer + Polygon + Falcon YT). RageGaming spoken “10 notches” day and night is a conflicting footnote only—not the site default. Not official Action Points.",
} as const;

/** Verification tiers for catalog costs and quest shells. */
export type VerificationStatus = "estimated" | "reported" | "verified";

export type TimePhase = "day" | "night" | "either";

export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  estimated: "Estimated",
  reported: "Reported",
  verified: "Verified",
};

/**
 * Required metadata when a value is derived from player footage (e.g. YouTube).
 * Do not mark such rows Verified without every field filled.
 * Incomplete timestamps may use "full-video narration" and stay Reported.
 */
export type YoutubeSourceMeta = {
  url: string;
  timestamp: string;
  platform: string;
  gameVersion: string;
  verificationDate: string;
};

const YT_LAUNCH_WEEK = {
  timestamp: "full-video narration",
  platform: "YouTube",
  gameVersion: "retail launch week Sep 2026",
  verificationDate: "2026-09-03",
} as const;

/** IGN tip video: hourglass segments + prologue quest narration. */
export const YT_IGN_PROLOGUE: YoutubeSourceMeta = {
  url: "https://www.youtube.com/watch?v=hD1GMoxMY7o",
  ...YT_LAUNCH_WEEK,
};

/** Falcon: 8 day + 8 night segments, 480 tokens, typical quest cost. */
export const YT_FALCON_TIME: YoutubeSourceMeta = {
  url: "https://www.youtube.com/watch?v=Wz80QrL1Uac",
  ...YT_LAUNCH_WEEK,
};

/** RageGaming: shrine travel / wait tips; also spoken 10-notch conflict. */
export const YT_RAGE_TIPS: YoutubeSourceMeta = {
  url: "https://www.youtube.com/watch?v=s-xq8JeUHQE",
  ...YT_LAUNCH_WEEK,
};

/** Written-guide URLs cited in sourceNote fields (Reported, not Verified). */
export const SOURCE_URLS = {
  pcgamerPrologue:
    "https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-prologue-quests-order/",
  polygonMassQuests:
    "https://www.polygon.com/blood-of-dawnwalker-mass-quests-which-prologue/",
  polygonTime:
    "https://www.polygon.com/blood-of-dawnwalker-time-system-explained-how-works/",
  gamespotPrologue:
    "https://www.gamespot.com/articles/blood-of-dawnwalker-prologue-quest-priority/",
  ignTime:
    "https://www.ign.com/articles/the-blood-of-dawnwalker-30-day-time-limit",
  altcharTime:
    "https://www.altchar.com/guides/the-blood-of-dawnwalker-how-time-progression-works-aqro25G3s67B",
  powerpyxWithering:
    "https://www.powerpyx.com/blood-of-dawnwalker-withering-away-walkthrough/",
  powerpyxCovenant:
    "https://www.powerpyx.com/blood-of-dawnwalker-sacred-covenant-walkthrough/",
} as const;

/** Sitewide page-level data banner defaults. Planner units stay Estimated. */
export const SITE_DATA_STATUS = {
  status: "estimated" as VerificationStatus,
  lastReviewed: "2026-09-03",
  lastVerified: null as string | null,
  gameVersion: "retail launch week Sep 2026" as string | undefined,
  platform: undefined as string | undefined,
  source:
    "Launch-week guides + YouTube narration (IGN, PC Gamer, Polygon, GameSpot, Falcon, RageGaming)" as
      | string
      | undefined,
  youtube: undefined as YoutubeSourceMeta | undefined,
  basis:
    "Interactive Time Budget units remain an Estimated fan model (30 × 8 day + 8 night = 480). Day/night 8-segment mechanics are Reported from IGN, PC Gamer, Polygon, and Falcon YT. RageGaming spoken “10 notches” is footnoted only. Prologue catalogs are a Reported mix from guides and tip videos—not in-house Verified play.",
  pendingNote:
    "Launch-week Reported fill (2026-09-03) from guides and YouTube narration. In-house Verified play still pending. Reported is not Verified.",
};
