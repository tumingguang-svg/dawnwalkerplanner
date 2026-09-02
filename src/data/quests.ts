import type {
  TimePhase,
  VerificationStatus,
  YoutubeSourceMeta,
} from "./apConfig";

/**
 * Quest catalog schema. Fill rows only after retail observation or a complete
 * YouTube citation. Do not invent Verified costs or fake quest names.
 */
export type QuestEntry = {
  id: string;
  name: string;
  type: "main" | "side" | "personal" | "faction";
  /** Null until observed. Null is not zero. */
  estimatedAp: number | null;
  phase: TimePhase | "unknown";
  verificationStatus: VerificationStatus;
  missableRisk: "low" | "medium" | "high" | "unknown";
  notes: string;
  lastVerified?: string | null;
  sourceNote?: string;
  platform?: string;
  patch?: string;
  gameVersion?: string;
  youtubeSource?: YoutubeSourceMeta;
};

/**
 * At most one schema example until real observations exist.
 * This is not a quest list.
 */
export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: "schema-example-pending",
    name: "Schema example — not a real quest",
    type: "main",
    estimatedAp: null,
    phase: "unknown",
    verificationStatus: "estimated",
    missableRisk: "unknown",
    notes:
      "Pending verification. Illustrates the fields this catalog will store after retail play or fully cited player footage. Not a quest title, cost, or spoiler.",
    lastVerified: null,
    sourceNote: "Schema example only — awaiting observation",
  },
];
