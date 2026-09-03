import {
  VERIFICATION_LABELS,
  type VerificationStatus,
} from "@/data/apConfig";

const STYLES: Record<VerificationStatus, string> = {
  estimated: "border-ember-600/50 bg-ember-600/10 text-ember-400",
  reported: "border-sky-500/50 bg-sky-500/10 text-sky-200",
  verified: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
};

const DOT: Record<VerificationStatus, string> = {
  estimated: "🟠",
  reported: "🔵",
  verified: "🟢",
};

type Props = {
  status: VerificationStatus;
  /** Optional independent source count for Reported rows */
  sources?: number;
  className?: string;
};

export function ConfidenceBadge({ status, sources, className = "" }: Props) {
  const label =
    status === "reported" && sources && sources > 0
      ? `${VERIFICATION_LABELS[status]} · ${sources} source${sources === 1 ? "" : "s"}`
      : VERIFICATION_LABELS[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs ${STYLES[status]} ${className}`}
      title={label}
    >
      <span aria-hidden>{DOT[status]}</span>
      {label}
    </span>
  );
}
