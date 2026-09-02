# Data honesty rules

**Hard rule:** Any data without gameplay verification, official sources, or reliable player footage must **not** be stated as confirmed fact.

This unofficial fan site plans around an estimated 30-day Time Budget model. Readers should be able to tell at a glance what is a guess and what has been checked.

## Status labels

| Status | Meaning | When to use |
| --- | --- | --- |
| **Estimated** | Pre-release or fan-model value. Not confirmed. | Default for every new row and every page until a real check exists. |
| **Reported** | A player or community observation that is not yet treated as retail-stable. | After a cited note that still needs a second check. |
| **Verified** | Confirmed against the released game, a named patch, or fully cited footage. | Only after filling `lastVerified`, and platform / game version / source as known. **Never invent Verified retail costs.** |

Pre-release values are **Estimated**. Do not upgrade a row to Verified because it “looks right.”

## YouTube and other player footage

If a number or lock window comes from YouTube (or similar footage), keep **all** of:

1. Source URL
2. Timestamp
3. Platform
4. Game version
5. Verification date (`YYYY-MM-DD`)

Store those on `youtubeSource` (see `YoutubeSourceMeta` in `src/data/apConfig.ts`). Incomplete footage citations stay **Estimated** or **Reported**, never **Verified**.

## Page-level DataStatus

Content pages render `DataStatus` with site defaults from `SITE_DATA_STATUS`:

- Data status: Estimated
- Last reviewed: `2026-09-02` (update the date when you actually re-read the page)
- Based on pre-release / fan model information
- Retail gameplay verification pending

To mark a **page** Verified later, pass `status="verified"` plus `lastVerified`, `gameVersion`, `platform`, and `source` (and `youtube` when the check is footage). Leave those props unset until the check is real.

## Catalog rows

Quests, missables, and time costs use the same tiers. Blank `estimatedAp` / empty catalogs mean “not observed yet,” not zero cost and not “this content does not exist.”

Fill `/quests` and `/missables` after retail observation or a complete YouTube citation—not with placeholder names that look like a live database.
