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
          belong to their respective owners. Data on this site is labeled
          estimated or unverified and may be wrong.
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/disclaimer"
            className="inline-flex min-h-10 items-center text-ember-400 hover:underline"
          >
            Full disclaimer
          </Link>
          <Link
            href="/planner"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            AP Planner
          </Link>
          <Link
            href="/time-costs"
            className="inline-flex min-h-10 items-center hover:text-dusk-200"
          >
            Time Costs
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
