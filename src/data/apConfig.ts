export const AP_CONFIG = {
  totalDays: 30,
  dayAp: 8,
  nightAp: 8,
  get totalAp() {
    return this.totalDays * (this.dayAp + this.nightAp);
  },
  /** Fan model units for the interactive planner (not official Action Points). */
  label: "Estimated 30-day Time Budget · 480 model units (30 × 8 day + 8 night)",
  note: "Fan planning model only. These are estimated Time Budget units—not official Action Points. Actual game values may differ after launch or patches.",
} as const;

/** Verification tiers for catalog costs and quest shells. */
export type VerificationStatus = "estimated" | "reported" | "verified";

export type TimePhase = "day" | "night" | "either";

export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  estimated: "Estimated",
  reported: "Reported",
  verified: "Verified",
};
