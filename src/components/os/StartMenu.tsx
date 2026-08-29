"use client";

import { OsIcon, WindowsLogo } from "@/components/icons";
import { openKnownWindow, useOs } from "@/components/os/OsProvider";
import type { IconName } from "@/lib/types";

const ITEMS: { id: string; label: string; icon: IconName }[] = [
  { id: "shop", label: "START. Shop", icon: "shop" },
  { id: "lookbook", label: "Lookbook", icon: "folder" },
  { id: "readme", label: "README.TXT", icon: "notepad" },
  { id: "cart", label: "Shopping Cart", icon: "cart" },
  { id: "display", label: "Display Properties", icon: "display" },
  { id: "help", label: "Help", icon: "help" },
];

export function StartMenu() {
  const { theme, startOpen, setStartOpen, openWindow, restart, shutdown } =
    useOs();

  if (!startOpen) return null;

  return (
    <div className="start-menu" role="menu" aria-label="Start menu">
      {theme === "win95" ? (
        <div className="start-banner">Windows 95</div>
      ) : (
        <div className="start-banner">
          <WindowsLogo size={28} />
          START.
        </div>
      )}
      <div className="menu-col">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className="menu-item"
            onClick={() => {
              openKnownWindow(openWindow, item.id);
              setStartOpen(false);
            }}
          >
            <OsIcon name={item.icon} size={24} />
            <span>{item.label}</span>
          </button>
        ))}
        <div className="menu-sep my-1" />
        <button type="button" role="menuitem" className="menu-item" onClick={restart}>
          <OsIcon name="computer" size={24} />
          <span>Restart…</span>
        </button>
        <button type="button" role="menuitem" className="menu-item" onClick={shutdown}>
          <OsIcon name="error" size={24} />
          <span>Shut Down…</span>
        </button>
      </div>
    </div>
  );
}
