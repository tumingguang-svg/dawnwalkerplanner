import Link from "next/link";
import {
  SITE_DATA_STATUS,
  VERIFICATION_LABELS,
  type VerificationStatus,
  type YoutubeSourceMeta,
} from "@/data/apConfig";

export type DataStatusProps = {
  /** Page-level status. Defaults to Estimated until a retail check exists. */
  status?: VerificationStatus;
  lastReviewed?: string;
  lastVerified?: string | null;
  gameVersion?: string;
  platform?: string;
  /** Citation URL or short source label once a check exists. */
  source?: string;
  youtube?: YoutubeSourceMeta;
  basis?: string;
  className?: string;
};

const statusBadge: Record<VerificationStatus, string> = {
  estimated: "border-ember-600/40 text-ember-400",
  reported: "border-dusk-500 text-dusk-100",
  verified: "border-ember-500/60 bg-ember-600/10 text-dusk-50",
};

/**
 * Compact data-honesty footer for content pages.
 * Keep status Estimated (and lastVerified empty) until gameplay, official
 * notes, or fully cited player footage exist. Never present guesses as fact.
 */
export function DataStatus({
  status = SITE_DATA_STATUS.status,
  lastReviewed = SITE_DATA_STATUS.lastReviewed,
  lastVerified = SITE_DATA_STATUS.lastVerified,
  gameVersion = SITE_DATA_STATUS.gameVersion,
  platform = SITE_DATA_STATUS.platform,
  source = SITE_DATA_STATUS.source,
  youtube = SITE_DATA_STATUS.youtube,
  basis = SITE_DATA_STATUS.basis,
  className = "",
}: DataStatusProps) {
  const verified = status === "verified";
  const showVerifiedFields =
    verified || Boolean(lastVerified || gameVersion || platform || source || youtube);

  return (
    <aside
      className={`rounded-xl border border-dusk-800 bg-night-950/60 px-4 py-3 text-xs text-dusk-500 ${className}`}
      aria-label="Data status"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="flex flex-wrap items-center gap-2">
          <span className="uppercase tracking-[0.16em] text-dusk-600">
            Data status
          </span>
          <span
            className={`inline-block rounded border px-2 py-0.5 font-medium ${statusBadge[status]}`}
          >
            {VERIFICATION_LABELS[status]}
          </span>
        </p>
        <p>
          <span className="text-dusk-600">Last reviewed:</span>{" "}
          <time dateTime={lastReviewed} className="text-dusk-300">
            {lastReviewed}
          </time>
        </p>
      </div>
      <p className="mt-2 text-dusk-400">{basis}</p>
      {!verified && (
        <p className="mt-1 text-dusk-500">{SITE_DATA_STATUS.pendingNote}</p>
      )}
      {showVerifiedFields && (
        <dl className="mt-2 space-y-1">
          {lastVerified ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-dusk-600">Last verified</dt>
              <dd className="text-dusk-300">{lastVerified}</dd>
            </div>
          ) : null}
          {gameVersion ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-dusk-600">Game version</dt>
              <dd className="text-dusk-300">{gameVersion}</dd>
            </div>
          ) : null}
          {platform ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-dusk-600">Platform</dt>
              <dd className="text-dusk-300">{platform}</dd>
            </div>
          ) : null}
          {source ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-dusk-600">Source</dt>
              <dd className="text-dusk-300 break-all">{source}</dd>
            </div>
          ) : null}
          {youtube ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-dusk-600">YouTube source</dt>
              <dd className="text-dusk-300 space-y-0.5">
                <a
                  href={youtube.url}
                  className="text-ember-400 hover:underline break-all"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {youtube.url}
                </a>
                <span className="block">
                  Timestamp {youtube.timestamp} · {youtube.platform} ·{" "}
                  {youtube.gameVersion} · verified {youtube.verificationDate}
                </span>
              </dd>
            </div>
          ) : null}
        </dl>
      )}
      <p className="mt-2 text-dusk-600">
        Unofficial fan commentary—not affiliated with Rebel Wolves or Bandai
        Namco. Values without gameplay verification, official sources, or
        fully cited player footage are not confirmed fact.{" "}
        <Link href="/disclaimer" className="text-ember-400 hover:underline">
          Disclaimer
        </Link>
        .
      </p>
    </aside>
  );
}
