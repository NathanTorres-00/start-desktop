"use client";

import { useEffect, useState } from "react";
import { BootScreen } from "@/components/os/BootScreen";
import { DesktopIcons } from "@/components/os/DesktopIcons";
import { openKnownWindow, useOs } from "@/components/os/OsProvider";
import { ShutdownScreen } from "@/components/os/ShutdownScreen";
import { StartMenu } from "@/components/os/StartMenu";
import { Taskbar } from "@/components/os/Taskbar";
import { Wallpaper } from "@/components/os/Wallpaper";
import { WindowFrame } from "@/components/os/WindowFrame";

export function Desktop() {
  const { theme, phase, windows, startOpen, setStartOpen, hintOpen, dismissHint, isMobile, setSelectedIcon, openWindow } =
    useOs();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const close = () => {
      setStartOpen(false);
      setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setStartOpen]);

  if (phase === "boot") return <BootScreen />;
  if (phase === "shutdown") return <ShutdownScreen />;

  return (
    <div className="os-root" data-os={theme}>
      <div
        className="os-desktop"
        onClick={() => {
          setStartOpen(false);
          setMenu(null);
          setSelectedIcon(null);
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          setMenu({ x: event.clientX, y: event.clientY });
          setStartOpen(false);
        }}
      >
        <Wallpaper />
        <DesktopIcons />
        {windows.map((win) => (
          <WindowFrame key={win.id} win={win} />
        ))}
        {hintOpen && !isMobile ? (
          <div
            className="hint-bubble"
            style={{ left: 8, bottom: 12 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-bold">Click here to begin.</p>
            <p className="mt-1">
              Start menu, Shop, and Display Properties (95 / XP) are live.
            </p>
            <button type="button" className="os-btn mt-2" onClick={dismissHint}>
              OK
            </button>
          </div>
        ) : null}
        {menu ? (
          <div
            className="ctx-menu window"
            style={{ left: menu.x, top: menu.y, position: "absolute", width: 200, height: "auto" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="menu-item"
              onClick={() => {
                openKnownWindow(openWindow, "display");
                setMenu(null);
              }}
            >
              Display Properties
            </button>
            <button
              type="button"
              className="menu-item"
              onClick={() => {
                openKnownWindow(openWindow, "help");
                setMenu(null);
              }}
            >
              Help
            </button>
          </div>
        ) : null}
      </div>
      {startOpen ? (
        <div
          className="absolute inset-0 z-[85]"
          onClick={() => setStartOpen(false)}
        />
      ) : null}
      <StartMenu />
      <Taskbar />
    </div>
  );
}
