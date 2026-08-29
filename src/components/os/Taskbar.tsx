"use client";

import { useEffect, useState } from "react";
import { OsIcon, WindowsLogo } from "@/components/icons";
import { useOs } from "@/components/os/OsProvider";

export function Taskbar() {
  const {
    theme,
    windows,
    activeId,
    startOpen,
    setStartOpen,
    focusWindow,
    minimizeWindow,
    cartCount,
    openWindow,
  } = useOs();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  return (
    <footer className="taskbar">
      <button
        type="button"
        className={`start-btn ${startOpen ? "open" : ""}`}
        aria-expanded={startOpen}
        aria-haspopup="menu"
        onClick={() => setStartOpen(!startOpen)}
      >
        <WindowsLogo size={theme === "winxp" ? 18 : 16} />
        {theme === "winxp" ? "start" : "Start"}
      </button>
      <div className="task-list">
        {windows.map((win) => (
          <button
            key={win.id}
            type="button"
            className={`task-btn ${activeId === win.id && !win.minimized ? "active" : ""}`}
            onClick={() => {
              if (activeId === win.id && !win.minimized) {
                minimizeWindow(win.id);
              } else {
                focusWindow(win.id);
              }
            }}
          >
            <OsIcon name={win.icon} size={14} />
            <span>{win.title}</span>
          </button>
        ))}
      </div>
      <div className="tray">
        <button
          type="button"
          className="flex items-center gap-1"
          aria-label="Open shopping cart"
          onClick={() =>
            openWindow("cart", {
              title: "Shopping Cart",
              icon: "cart",
              kind: { type: "cart" },
              w: 400,
              h: 320,
            })
          }
        >
          <OsIcon name="cart" size={14} />
          {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>
        <time dateTime={now.toISOString()}>{time}</time>
      </div>
    </footer>
  );
}
