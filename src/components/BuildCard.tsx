import type { BuildTemplate } from "@/data/buildTemplates";

export function BuildCard({ build }: { build: BuildTemplate }) {
  return (
    <article className="rounded-2xl border border-dusk-800 bg-night-900/50 p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-display text-2xl text-dusk-50">{build.name}</h2>
        <div className="flex flex-wrap gap-1 justify-end">
          {build.estimated && (
            <span className="rounded border border-ember-600/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ember-400">
              estimated
            </span>
          )}
          <span className="rounded border border-dusk-600 px-2 py-0.5 text-[10px] uppercase tracking-wider text-dusk-400">
            {build.path}
          </span>
        </div>
      </div>
      <p className="text-sm text-ember-400">{build.focus}</p>
      <p className="text-sm text-dusk-300">{build.playstyle}</p>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-dusk-500">
          Strengths
        </h3>
        <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
          {build.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-dusk-500">
          Watch-outs
        </h3>
        <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
          {build.watchouts.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-dusk-500">
          Starter tips
        </h3>
        <ul className="mt-1 list-disc pl-5 text-sm text-dusk-300">
          {build.starterTips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
