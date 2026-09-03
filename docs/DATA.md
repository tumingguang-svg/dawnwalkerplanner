# Data honesty rules

**Hard rule:** Any data without gameplay verification, official sources, or reliable player footage must **not** be stated as confirmed fact.

This unofficial fan site plans around an estimated 30-day Time Budget model. Readers should be able to tell at a glance what is a guess and what has been checked.

## Status labels

| Status | Meaning | When to use |
| --- | --- | --- |
| **Estimated** | Fan-model or leftover generic placeholder. Not confirmed. | Interactive planner units; pre-launch catalog shapes. |
| **Reported** | A cited guide, player, or YouTube observation that is not yet treated as in-house Verified. | Launch-week prologue / mechanics fill (2026-09-03). |
| **Verified** | Confirmed against the released game, a named patch, or fully cited footage. | Only after filling `lastVerified`, and platform / game version / source as known. **Never invent Verified retail costs.** |

Do not upgrade a row to Verified because it “looks right.”

## YouTube and other player footage

If a number or lock window comes from YouTube (or similar footage), keep **all** of:

1. Source URL
2. Timestamp (incomplete timestamps may use `full-video narration`)
3. Platform
4. Game version
5. Verification date (`YYYY-MM-DD`)

Store those on `youtubeSource` (see `YoutubeSourceMeta` in `src/data/apConfig.ts`). Incomplete footage citations stay **Estimated** or **Reported**, never **Verified**.

## Page-level DataStatus

Content pages render `DataStatus` with site defaults from `SITE_DATA_STATUS`:

- Data status: Estimated for the interactive planner model; quests / missables / time-cost prologue tables may pass `status="reported"`
- Last reviewed: `2026-09-03`
- Mix of Estimated planner units and launch-week Reported guide/YouTube observations
- Launch-week Reported fill; in-house Verified play still pending

Default day/night wallets stay **8 + 8** (=480). Mechanics copy may say day/night **8 segments Reported** (IGN, PC Gamer, Polygon, Falcon YT). RageGaming spoken “10 notches” is a footnote only.

To mark a **page** Verified later, pass `status="verified"` plus `lastVerified`, `gameVersion`, `platform`, and `source` (and `youtube` when the check is footage). Leave those props unset until the check is real.

## Catalog rows

Quests, missables, and time costs use the same tiers. Blank `estimatedAp` means “not observed yet,” not zero cost. An explicit `0` is a cited free action.

`/quests` and `/missables` hold launch-week **Reported** prologue rows. Do not invent extra costs or mark them Verified. Keep useful Estimated placeholder structure on `/time-costs` in a separate table from Reported prologue / mechanics rows.
