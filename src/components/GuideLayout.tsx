import type { ReactNode } from "react";
import { RelatedLinks, type RelatedLink } from "./RelatedLinks";

type Props = {
  title: string;
  intro: string;
  children: ReactNode;
  related?: RelatedLink[];
  lastUpdated?: string;
  keywordNote?: string;
};

const GUIDE_LINKS: RelatedLink[] = [
  {
    href: "/guides/how-time-works",
    label: "How time works",
    description: "Day, night, and the fan Time Budget model.",
  },
  {
    href: "/guides/30-day-deadline",
    label: "30-day deadline",
    description: "Pacing the campaign clock without panic.",
  },
  {
    href: "/guides/day-vs-night",
    label: "Day vs night",
    description: "When to spend daylight vs darkness.",
  },
  {
    href: "/guides/can-you-do-everything",
    label: "Can you do everything?",
    description: "Why completionism collides with the clock.",
  },
  {
    href: "/guides/missable-content",
    label: "Missable content",
    description: "Soft locks, timers, and what to flag early.",
  },
];

export function GuideLayout({
  title,
  intro,
  children,
  related,
  lastUpdated = "2026-09-02",
  keywordNote,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <article className="prose-invert max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-ember-400">
            Unofficial guide · estimated data
          </p>
          <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
            {title}
          </h1>
          <p className="text-dusk-400">{intro}</p>
          {keywordNote && (
            <p className="text-xs text-dusk-600">{keywordNote}</p>
          )}
        </header>
        {children}
        <p className="border-t border-dusk-800 pt-4 text-xs text-dusk-600">
          Last updated: {lastUpdated} (Asia/Shanghai calendar date). Fan
          commentary only—not affiliated with Rebel Wolves or Bandai Namco. No
          Verified retail costs are invented here.
        </p>
      </article>
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <RelatedLinks
          title="Tools"
          links={[
            {
              href: "/planner",
              label: "Time Budget planner",
              description: "Interactive 30-day ledger.",
            },
            {
              href: "/time-costs",
              label: "Time costs",
              description: "Estimated activity catalog.",
            },
          ]}
        />
        <RelatedLinks
          title="Related guides"
          links={(related ?? GUIDE_LINKS).filter(
            (l) => !title.toLowerCase().includes(l.label.toLowerCase().slice(0, 8))
          )}
        />
      </div>
    </div>
  );
}
