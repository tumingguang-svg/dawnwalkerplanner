import type { Metadata } from "next";
import Link from "next/link";
import { MISSABLE_ENTRIES } from "@/data/missables";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata: Metadata = {
  title: "Missables Index — Timer-Sensitive Content Shell",
  description:
    "Unofficial Blood of Dawnwalker missables index. Empty shell with explanation and link to the missable content guide. No invented Verified lists.",
};

export default function MissablesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Missables index
        </h1>
        <p className="mt-2 max-w-2xl text-dusk-400">
          Home for timer-sensitive content once Estimated or Reported rows
          exist. The table is intentionally empty for now—we will not invent a
          Verified missable checklist. For planning habits, read the{" "}
          <Link
            href="/guides/missable-content"
            className="text-ember-400 hover:underline"
          >
            missable content guide
          </Link>
          .
        </p>
      </div>

      <section className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5 text-sm text-dusk-300 space-y-3">
        <h2 className="font-display text-xl text-dusk-50">How this page will grow</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Add a row only with an Estimated or Reported note and a source.</li>
          <li>Keep lastVerified null until retail confirmation.</li>
          <li>
            Link related costs to{" "}
            <Link href="/time-costs" className="text-ember-400 hover:underline">
              /time-costs
            </Link>{" "}
            and quest shells on{" "}
            <Link href="/quests" className="text-ember-400 hover:underline">
              /quests
            </Link>
            .
          </li>
        </ul>
      </section>

      <div className="overflow-x-auto rounded-xl border border-dusk-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-night-900 text-xs uppercase tracking-wider text-dusk-400">
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Window</th>
              <th className="px-3 py-3">Risk</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {MISSABLE_ENTRIES.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-10 text-center text-dusk-500"
                >
                  No missable rows yet. Start with the{" "}
                  <Link
                    href="/guides/missable-content"
                    className="text-ember-400 hover:underline"
                  >
                    missable content guide
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/planner"
                    className="text-ember-400 hover:underline"
                  >
                    Time Budget planner
                  </Link>
                  .
                </td>
              </tr>
            ) : (
              MISSABLE_ENTRIES.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-dusk-800/80 bg-night-950/40 align-top"
                >
                  <td className="px-3 py-3 text-dusk-100">{row.name}</td>
                  <td className="px-3 py-3 text-dusk-400">{row.window}</td>
                  <td className="px-3 py-3 capitalize text-dusk-300">
                    {row.risk}
                  </td>
                  <td className="px-3 py-3 capitalize text-ember-400">
                    {row.verificationStatus}
                  </td>
                  <td className="px-3 py-3 text-dusk-400">{row.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <RelatedLinks
        extra={[
          {
            href: "/guides/missable-content",
            label: "Missable content guide",
            description: "Spoiler-light planning framework.",
          },
          {
            href: "/guides/can-you-do-everything",
            label: "Can you do everything?",
            description: "Why completionism collides with the clock.",
          },
        ]}
      />
    </div>
  );
}
