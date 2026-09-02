"use client";

import { useState, type ReactNode } from "react";

export function Spoiler({
  label = "Show spoiler",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-blood-600/40 bg-night-900/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-blood-400 hover:text-blood-400/80"
      >
        <span>{open ? "Hide spoiler" : label}</span>
        <span className="text-xs uppercase tracking-wider opacity-70">
          {open ? "open" : "collapsed"}
        </span>
      </button>
      {open && (
        <div className="border-t border-blood-600/30 px-3 py-3 text-dusk-200 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
