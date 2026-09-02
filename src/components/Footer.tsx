import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-dusk-800/80 bg-night-950">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-dusk-400 space-y-4">
        <p>
          <strong className="text-dusk-200">Fan disclaimer:</strong> Dawnwalker
          Planner is an unofficial fan-made site. It is{" "}
          <strong className="text-dusk-200">not affiliated with</strong> Rebel
          Wolves, Bandai Namco, or The Blood of Dawnwalker (TM). All trademarks
          belong to their respective owners. The 480 total is an estimated
          30-day Time Budget fan model (model units), not official Action
          Points. Catalog rows are labeled Estimated, Reported, or Verified and
          may be wrong.
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/disclaimer"
            className="inline-flex min-h-10 items-center text-ember-400 hover:underline"
          >
            Full disclaimer
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Terms
          </Link>
          <a
            href="mailto:contact@dawnwalkerplanner.org"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Contact
          </a>
          <Link
            href="/planner"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Planner
          </Link>
          <Link
            href="/time-costs"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Time Costs
          </Link>
          <Link
            href="/quests"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Quests
          </Link>
          <Link
            href="/missables"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Missables
          </Link>
          <Link
            href="/builds"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Builds
          </Link>
          <Link
            href="/guides/how-time-works"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Guides
          </Link>
          <Link
            href="/guides/how-to-plan-your-time"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            How to plan
          </Link>
          <Link
            href="/guides/choices-and-consequences"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Choices
          </Link>
          <Link
            href="/faq"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            FAQ
          </Link>
        </p>
        <p className="text-xs text-dusk-600">
          Original copy only. No official game art or logos. No cheats. Spoilers
          are collapsed by default.
        </p>
      </div>
    </footer>
  );
}
