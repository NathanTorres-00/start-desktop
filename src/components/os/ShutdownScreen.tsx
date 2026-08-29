"use client";

import { useOs } from "@/components/os/OsProvider";

export function ShutdownScreen() {
  const { theme, wake } = useOs();
  const isXp = theme === "winxp";

  return (
    <button
      type="button"
      className={`shutdown ${isXp ? "winxp" : "win95"} w-full`}
      onClick={wake}
    >
      <div>
        <p className="text-xs tracking-[0.25em] opacity-70">START.</p>
        <h1 className="mt-3 text-2xl font-bold sm:text-4xl">
          It's now safe to turn off your computer.
        </h1>
        <p className="mt-4 text-sm opacity-80">Click anywhere to restart.</p>
      </div>
    </button>
  );
}
