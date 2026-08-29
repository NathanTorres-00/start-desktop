"use client";

import { useOs } from "@/components/os/OsProvider";

export function BootScreen() {
  const { chooseOs } = useOs();

  return (
    <div className="boot">
      <header className="flex items-end justify-between gap-4 px-5 py-4 sm:px-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-zinc-400">C:\START.EXE</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            START.
          </h1>
        </div>
        <p className="max-w-[26ch] text-right text-xs text-zinc-400 sm:text-sm">
          A t-shirt shop that boots like an operating system. Pick a desktop.
        </p>
      </header>
      <div className="chooser">
        <button
          type="button"
          className="chooser-pane"
          onClick={() => chooseOs("win95")}
          style={{ background: "#008080" }}
        >
          <div className="pointer-events-none absolute inset-6 border-2 border-white/40 shadow-[inset_2px_2px_0_#fff,inset_-2px_-2px_0_#004040] sm:inset-10" />
          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.25em]">OPERATING SYSTEM</p>
            <h2>Windows 95</h2>
            <p>
              Teal desktop, chunky bevels, navy title bars. The original click.
            </p>
            <span
              className="inline-block bg-[#c0c0c0] px-4 py-1 text-black"
              style={{
                boxShadow:
                  "inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
              }}
            >
              Enter 95
            </span>
          </div>
        </button>
        <button
          type="button"
          className="chooser-pane"
          onClick={() => chooseOs("winxp")}
          style={{
            background:
              "linear-gradient(180deg, #6eb5e0 0%, #b9ddf2 40%, #7cb14a 100%)",
            color: "#083018",
          }}
        >
          <div className="pointer-events-none absolute inset-6 rounded-xl border-[3px] border-[#0054e3]/70 sm:inset-10" />
          <div className="relative z-10">
            <p className="text-[11px] tracking-[0.25em] text-[#0a246a]">
              OPERATING SYSTEM
            </p>
            <h2 className="text-[#0a246a]">Windows XP</h2>
            <p className="text-[#0a246a]">
              Bliss hills, Luna blue chrome, a green Start button. Soft and glossy.
            </p>
            <span className="inline-block rounded-sm border border-[#003c74] bg-gradient-to-b from-white to-[#ece9d8] px-4 py-1 text-black">
              Enter XP
            </span>
          </div>
        </button>
      </div>
      <p className="px-5 py-3 text-center text-[11px] text-zinc-500 sm:px-8">
        Prototype — windows open, icons work, cart is local. Checkout comes later.
      </p>
    </div>
  );
}
