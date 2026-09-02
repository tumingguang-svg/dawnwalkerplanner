import type { TimePhase, VerificationStatus } from "./apConfig";

/**
 * Quest database shell. Rows are placeholders pending retail confirmation.
 * Do not invent Verified costs.
 */
export type QuestEntry = {
  id: string;
  name: string;
  type: "main" | "side" | "personal" | "faction";
  estimatedAp: number | null;
  phase: TimePhase | "unknown";
  verificationStatus: VerificationStatus;
  missableRisk: "low" | "medium" | "high" | "unknown";
  notes: string;
  lastVerified?: string | null;
  sourceNote?: string;
  platform?: string;
  patch?: string;
};

export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: "placeholder-main-opener",
    name: "Main path opener (placeholder)",
    type: "main",
    estimatedAp: null,
    phase: "unknown",
    verificationStatus: "estimated",
    missableRisk: "unknown",
    notes:
      "Pending Estimated Time Budget cost after retail observation. Not Verified.",
    lastVerified: null,
    sourceNote: "Shell row — awaiting playthrough notes",
  },
  {
    id: "placeholder-side-district",
    name: "District side chain (placeholder)",
    type: "side",
    estimatedAp: null,
    phase: "either",
    verificationStatus: "estimated",
    missableRisk: "medium",
    notes:
      "Placeholder for a multi-step side chain. Cost intentionally blank until Estimated.",
    lastVerified: null,
  },
];
