"use client";

import { OsIcon } from "@/components/icons";
import { openKnownWindow, useOs } from "@/components/os/OsProvider";
import type { IconName } from "@/lib/types";

const ICONS: { id: string; label: string; icon: IconName }[] = [
  { id: "shop", label: "Shop", icon: "shop" },
  { id: "lookbook", label: "Lookbook", icon: "folder" },
  { id: "readme", label: "README.TXT", icon: "notepad" },
  { id: "recycle", label: "Recycle Bin", icon: "recycle" },
  { id: "display", label: "Display", icon: "display" },
  { id: "cart", label: "Shopping Cart", icon: "cart" },
  { id: "help", label: "Help", icon: "help" },
];

export function DesktopIcons() {
  const { selectedIcon, setSelectedIcon, openWindow, isMobile } = useOs();

  return (
    <div className="icon-grid">
      {ICONS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`icon-button ${selectedIcon === item.id ? "selected" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedIcon(item.id);
            if (isMobile) {
              openKnownWindow(openWindow, item.id);
            }
          }}
          onDoubleClick={(event) => {
            event.stopPropagation();
            openKnownWindow(openWindow, item.id);
          }}
        >
          <OsIcon name={item.icon} size={32} />
          <span className="icon-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
