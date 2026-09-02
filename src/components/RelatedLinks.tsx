import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

const DEFAULT_LINKS: RelatedLink[] = [
  {
    href: "/planner",
    label: "Time Budget planner",
    description: "Budget an estimated 30-day campaign ledger.",
  },
  {
    href: "/time-costs",
    label: "Time costs catalog",
    description: "Browse Estimated / Reported / Verified activity costs.",
  },
  {
    href: "/guides/how-to-plan-your-time",
    label: "How to plan your time",
    description: "Time Budget planner workflow.",
  },
  {
    href: "/guides/choices-and-consequences",
    label: "Choices and consequences",
    description: "Limited time turns choices into trade-offs.",
  },
];

type Props = {
  title?: string;
  links?: RelatedLink[];
  extra?: RelatedLink[];
};

export function RelatedLinks({
  title = "Related",
  links = DEFAULT_LINKS,
  extra = [],
}: Props) {
  const items = [...links, ...extra].filter(
    (item, index, arr) => arr.findIndex((x) => x.href === item.href) === index
  );
  return (
    <aside className="rounded-2xl border border-dusk-800 bg-night-900/40 p-5">
      <h2 className="font-display text-lg text-dusk-50">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block rounded-lg px-1 py-1.5 hover:bg-night-800/60"
            >
              <span className="text-sm font-medium text-ember-400 group-hover:underline">
                {item.label}
              </span>
              {item.description && (
                <span className="mt-0.5 block text-xs text-dusk-500">
                  {item.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
