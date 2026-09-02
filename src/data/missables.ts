/**
 * Missable content index shell. Prefer linking to the guide until retail data lands.
 * Empty by default — do not invent missable lists as Verified.
 */
export type MissableEntry = {
  id: string;
  name: string;
  window: string;
  risk: "low" | "medium" | "high" | "unknown";
  verificationStatus: "estimated" | "reported" | "verified";
  notes: string;
  lastVerified?: string | null;
  sourceNote?: string;
};

/** Intentionally empty until Observed/Estimated entries are filled post-launch. */
export const MISSABLE_ENTRIES: MissableEntry[] = [];
