import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/how-time-works",
  title: "Dawnwalker How Time Works – 8 Segments Reported, 480 Fan Model",
  description:
    "Dawnwalker how time works: Reported 8 day + 8 night segments from launch-week guides, plus the estimated 30-day Time Budget fan model. Not official AP.",
  absoluteTitle: true,
});

export default function HowTimeWorksPage() {
  return (
    <GuideLayout
      path="/guides/how-time-works"
      title="Dawnwalker How Time Works"
      intro="How the time bar is Reported to work at retail launch week, and how this site’s Estimated 30-day Time Budget model maps those segments into a planner ledger."
      keywordNote="Primary focus: how time works (Dawnwalker)."
      lastUpdated="2026-09-03"
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Time is a scarce resource
        </h2>
        <p>
          Blood of Dawnwalker frames the story around a limited campaign window.
          Activities consume pieces of that window. Some only make sense in
          daylight; others lean on darkness. The practical question for planning
          is not “what is the lore clock,” but “how do I avoid spending the whole
          month on the wrong stack of tasks?”
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Day and night: 8 segments Reported
        </h2>
        <p>
          Launch-week guides and tip videos Report that the day time bar has{" "}
          <strong className="text-dusk-100">8 segments</strong>; when it fills,
          night begins. The same 8-segment night bar is Reported by Falcon YT
          (8 day + 8 night, 480 tokens across 30 days), PC Gamer, Polygon, and
          IGN YT. Time advances on hourglass-marked actions; the number is
          segments (IGN). Explore/walk is often free (IGN, Boomstick narration).
        </p>
        <p className="text-sm text-dusk-500">
          Footnote: RageGaming spoken narration says{" "}
          <strong className="text-dusk-300">10 notches</strong> for day and
          night. That conflicts with the majority sources. This site’s default
          stays 8 + 8. Interactive planner units remain{" "}
          <strong className="text-dusk-300">Estimated</strong>; the 8-segment
          mechanic may be described as{" "}
          <strong className="text-dusk-300">Reported</strong>. Not Verified
          in-house play.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Shrine-to-shrine fast travel seems 0 time (RageGaming, Reported).
          </li>
          <li>
            Shrine Wait can burn large chunks—avoid casual use (Rage). Cost
            unknown; no invented number.
          </li>
          <li>
            Caught stealing hits the bar hard; PC Gamer Reports{" "}
            <strong className="text-dusk-100">4</strong> segments.
          </li>
          <li>
            Skills/perks at shrines often cost ~1 segment (Polygon / AltChar).
          </li>
          <li>
            Quests typically ~1 segment; NPC hangouts may cost extra (Falcon).
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Our estimated Time Budget model
        </h2>
        <p>
          Dawnwalker Planner still uses an estimated fan model for interactive
          units:{" "}
          <strong className="text-dusk-100">
            {AP_CONFIG.totalDays} days × ({AP_CONFIG.dayAp} day +{" "}
            {AP_CONFIG.nightAp} night) = {AP_CONFIG.totalAp} model units
          </strong>
          . Those units are a ledger shorthand for the{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>
          —not official Action Points. The 8+8 default now matches the Reported
          segment counts above.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-dusk-100">Day units</strong> — travel,
            markets, open exploration, many social beats.
          </li>
          <li>
            <strong className="text-dusk-100">Night units</strong> — hunts,
            stealth, court after dark, occult attempts.
          </li>
          <li>
            <strong className="text-dusk-100">Either</strong> — flexible costs
            you can retag once you know the phase lock.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Estimated vs Reported vs Verified
        </h2>
        <p>
          Catalog rows on{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            /time-costs
          </Link>{" "}
          carry a verification tier. Estimated means fan planning guess
          (including leftover generic placeholders). Reported means a cited
          guide or YouTube observation that is not yet in-house Verified.
          Verified is reserved for costs confirmed against the released game or
          a named patch—with a date or source. This site does not invent
          Verified numbers.
        </p>
        <p className="text-sm text-dusk-500">
          LunarGaming launch-week narration (label carefully as Estimated /
          Reported, not Verified): main story may fit in about 10 focused days;
          ~20 days of sides if you are saving the family; ~40 days for
          “everything” implies a reload / family-die route. Treat those as
          pacing hunches, not hard numbers.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">How to use the tools</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Skim the{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              time costs catalog
            </Link>{" "}
            for phase tags.
          </li>
          <li>
            Load a preset in the{" "}
            <Link href="/planner" className="text-ember-400 hover:underline">
              planner
            </Link>{" "}
            and leave a contingency buffer. Full workflow:{" "}
            <Link
              href="/guides/how-to-plan-your-time"
              className="text-ember-400 hover:underline"
            >
              how to plan your time
            </Link>
            .
          </li>
          <li>
            Read{" "}
            <Link
              href="/guides/day-vs-night"
              className="text-ember-400 hover:underline"
            >
              day vs night
            </Link>{" "}
            and the{" "}
            <Link
              href="/guides/30-day-deadline"
              className="text-ember-400 hover:underline"
            >
              30-day deadline
            </Link>{" "}
            guides before you overfill the ledger.
          </li>
        </ol>
      </section>
    </GuideLayout>
  );
}
