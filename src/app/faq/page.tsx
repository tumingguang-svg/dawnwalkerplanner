import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Affiliation, 480 AP Model & Privacy",
  description:
    "FAQ for the unofficial Dawnwalker Planner: affiliation, where 480 AP comes from, estimated data labels, localStorage privacy, and how to report wrong costs.",
};

const FAQS = [
  {
    q: "Is this an official Blood of Dawnwalker tool?",
    a: "No. Dawnwalker Planner is an unofficial fan project. It is not affiliated with Rebel Wolves, Bandai Namco, or The Blood of Dawnwalker (TM).",
  },
  {
    q: "Where does 480 AP come from?",
    a: "It is a fan planning model: 30 days times 8 day AP plus 8 night AP. Treat it as estimated until you confirm values in your own playthrough.",
  },
  {
    q: "Why are costs labeled estimated or unverified?",
    a: "Pre-release and early community numbers drift. We label uncertainty instead of pretending precision.",
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
    a: "Open an issue on the GitHub repository once you can cite an in-game observation. We will retag verification status rather than silently overwrite.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">FAQ</h1>
        <p className="mt-2 text-dusk-400">
          Short answers. See also the{" "}
          <Link href="/disclaimer" className="text-ember-400 hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
      <dl className="space-y-4">
        {FAQS.map((item) => (
          <div
            key={item.q}
            className="rounded-xl border border-dusk-800 bg-night-900/40 p-4"
          >
            <dt className="font-display text-lg text-dusk-50">{item.q}</dt>
            <dd className="mt-2 text-sm text-dusk-300">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
