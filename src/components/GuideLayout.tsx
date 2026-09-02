import type { ReactNode } from "react";
import { DataStatus, type DataStatusProps } from "./DataStatus";
import { RelatedLinks, type RelatedLink } from "./RelatedLinks";
import { JsonLd } from "./JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  DEFAULT_DATE_MODIFIED,
} from "@/lib/jsonld";

type Props = {
  title: string;
  intro: string;
  /** Canonical path for Article + breadcrumbs, e.g. /guides/how-time-works */
  path: string;
  children: ReactNode;
  related?: RelatedLink[];
  lastUpdated?: string;
  keywordNote?: string;
  dataStatus?: DataStatusProps;
  description?: string;
};

const GUIDE_LINKS: RelatedLink[] = [
  {
    href: "/guides/how-time-works",
    label: "How time works",
    description: "Day, night, and the fan Time Budget model.",
  },
  {
    href: "/guides/how-to-plan-your-time",
    label: "How to plan your time",
    description: "Time Budget planner workflow, step by step.",
  },
  {
    href: "/guides/choices-and-consequences",
    label: "Choices and consequences",
    description: "How limited time turns choices into trade-offs.",
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
  path,
  children,
  related,
  lastUpdated = DEFAULT_DATE_MODIFIED,
  keywordNote,
  dataStatus,
  description,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <JsonLd
        data={[
          articleJsonLd({
            headline: title,
            description: description ?? intro,
            path,
            dateModified: lastUpdated,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides/how-to-plan-your-time" },
            { name: title, path },
          ]),
        ]}
      />
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-dusk-500">
            What this guide covers
          </h3>
        </header>
        {children}
        <DataStatus lastReviewed={lastUpdated} {...dataStatus} />
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
