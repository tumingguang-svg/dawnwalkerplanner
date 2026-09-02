import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/time-costs", label: "Time Costs" },
  { href: "/quests", label: "Quests" },
  { href: "/missables", label: "Missables" },
  { href: "/builds", label: "Builds" },
  { href: "/guides/how-time-works", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="border-b border-dusk-800/80 bg-night-950/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2 min-h-11">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ember-500 to-blood-600 text-sm font-bold text-white shadow-glow">
            DW
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide text-dusk-50 group-hover:text-ember-400 transition-colors">
              Dawnwalker Planner
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-dusk-400">
              Unofficial · 30-day Time Budget model
            </div>
          </div>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-dusk-200 hover:bg-dusk-900 hover:text-ember-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
