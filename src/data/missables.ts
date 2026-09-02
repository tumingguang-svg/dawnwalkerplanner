import type { VerificationStatus, YoutubeSourceMeta } from "./apConfig";

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

/** Empty until retail observation or a complete footage citation. */
export const MISSABLE_ENTRIES: MissableEntry[] = [];
