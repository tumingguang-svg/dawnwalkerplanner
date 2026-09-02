export const AP_CONFIG = {
  totalDays: 30,
  dayAp: 8,
  nightAp: 8,
  get totalAp() {
    return this.totalDays * (this.dayAp + this.nightAp);
  },
  label: "480 Action Points (30 days x 8 day + 8 night)",
  note: "Estimated / unverified fan model. Actual game values may differ after launch or patches.",
} as const;

export type VerificationStatus = "estimated" | "unverified" | "community";

export type TimePhase = "day" | "night" | "either";
