import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { GuideLayout } from "@/components/GuideLayout";
import { AP_CONFIG } from "@/data/apConfig";

export const metadata: Metadata = pageMetadata({
  path: "/guides/can-you-do-everything",
  title: "Can You Do Everything in Dawnwalker? – Time Budget Reality",
  description:
    "Can you do everything in Dawnwalker? Why a single 30-day pass rarely clears all Blood of Dawnwalker content—and how to prioritize with a Time Budget.",
  absoluteTitle: true,
});

export default function CanYouDoEverythingPage() {
  return (
    <GuideLayout
      path="/guides/can-you-do-everything"
      title="Can You Do Everything in Dawnwalker?"
      intro="Short answer: plan as if you cannot. A fixed month plus branching priorities means completionism collides with the clock—especially if you treat fan model units as a hard ceiling for practice."
      keywordNote="Primary focus: can you do everything (Dawnwalker)."
    >
      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Why “100% in one pass” is a trap
        </h2>
        <p>
          Side chains, romance beats, faction missions, exploration blocks, and
          ending preparation all compete for the same estimated Time Budget. Our
          fan ledger tops out at {AP_CONFIG.totalAp} model units across{" "}
          {AP_CONFIG.totalDays} days. Even if the shipped game’s exact economy
          differs, the structural lesson holds: saying yes to everything means
          saying no to contingency.
        </p>
        <p className="text-sm text-dusk-500">
          This is not a Verified retail claim about total content hours. It is
          planning advice for the unofficial{" "}
          <Link href="/planner" className="text-ember-400 hover:underline">
            planner
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          Choose a definition of “done”
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-dusk-100">Story-first:</strong> main gates +
            ending prep; sides only if they fund the ending you want.
          </li>
          <li>
            <strong className="text-dusk-100">Relationship-first:</strong>{" "}
            companion scenes before tourist districts.
          </li>
          <li>
            <strong className="text-dusk-100">Explorer-first:</strong> accept a
            thinner personal arc to clear more map content.
          </li>
        </ul>
        <p>
          Match the definition to a{" "}
          <Link href="/builds" className="text-ember-400 hover:underline">
            build hub
          </Link>{" "}
          and a planner preset, then cut ruthlessly when the remaining units
          dip below your contingency.
        </p>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">
          What to cut first when the ledger goes red
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Long side chains that do not feed your ending.</li>
          <li>Repeatable hunts once you already learned the route.</li>
          <li>Optional markets after you have the gear you need.</li>
          <li>
            Anything marked high missable risk that you already decided not to
            chase—see{" "}
            <Link
              href="/guides/missable-content"
              className="text-ember-400 hover:underline"
            >
              missable content
            </Link>
            .
          </li>
        </ol>
      </section>

      <section className="space-y-3 text-dusk-300">
        <h2 className="font-display text-xl text-dusk-50">New Game habits</h2>
        <p>
          Use a second campaign for the content you parked. Export a share URL
          from the planner as a “what I skipped” list. Check Estimated costs on{" "}
          <Link href="/time-costs" className="text-ember-400 hover:underline">
            /time-costs
          </Link>{" "}
          and empty catalogs on{" "}
          <Link href="/quests" className="text-ember-400 hover:underline">
            /quests
          </Link>{" "}
          as Reported rows land post-launch. Those pages describe schema, not
          confirmed quest lists.
        </p>
      </section>
    </GuideLayout>
  );
}
