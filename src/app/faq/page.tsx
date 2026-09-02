import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ — Affiliation, Time Budget Model & Privacy",
  description:
    "FAQ for the unofficial Dawnwalker Planner: affiliation, where the 30-day Time Budget (480 model units) comes from, Estimated/Reported/Verified labels, localStorage privacy, and how to report wrong costs.",
});

const FAQS = [
  {
    q: "Is this an official Blood of Dawnwalker tool?",
    a: "No. Dawnwalker Planner is an unofficial fan project. It is not affiliated with Rebel Wolves, Bandai Namco, or The Blood of Dawnwalker (TM).",
  },
  {
    q: "Where does the 480 Time Budget total come from?",
    a: "It is a fan planning model: 30 days × 8 day units + 8 night units. Treat the units as estimated Time Budget shorthand—not official Action Points—until you confirm values in your own playthrough.",
  },
  {
    q: "What do Estimated, Reported, and Verified mean?",
    a: "Estimated = fan planning guess (the default for pre-release values). Reported = player or community observation not yet confirmed as retail-stable. Verified = checked against the released game / patch with a date or source note. Data without gameplay verification, official sources, or fully cited player footage is not confirmed fact. YouTube-derived rows must keep source URL, timestamp, platform, game version, and verification date. We never invent Verified numbers.",
  },
  {
    q: "Does the planner store my data on a server?",
    a: "No. Plans autosave to localStorage in your browser. Optional share URLs encode the plan in the query string.",
  },
  {
    q: "Will you add cheats or save editors?",
    a: "No. This site stays on planning, guides, and estimated data only.",
  },
  {
    q: "How do I report a wrong cost?",
    a: "Open an issue on the GitHub repository once you can cite an in-game observation. We will retag verification status (Estimated → Reported → Verified) rather than silently overwrite.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">FAQ</h1>
        <h2 className="mt-3 font-display text-xl text-dusk-200">
          Common questions about this fan planner
        </h2>
        <p className="mt-2 text-dusk-400">
          Short answers. See also the{" "}
          <Link href="/disclaimer" className="text-ember-400 hover:underline">
            disclaimer
          </Link>{" "}
          and{" "}
          <Link
            href="/guides/how-time-works"
            className="text-ember-400 hover:underline"
          >
            how time works
          </Link>
          .
        </p>
      </div>
      <div className="space-y-4">
        {FAQS.map((item) => (
          <section
            key={item.q}
            className="rounded-xl border border-dusk-800 bg-night-900/40 p-4"
          >
            <h3 className="font-display text-lg text-dusk-50">{item.q}</h3>
            <p className="mt-2 text-sm text-dusk-300">{item.a}</p>
          </section>
        ))}
      </div>
      <DataStatus />
    </div>
  );
}
