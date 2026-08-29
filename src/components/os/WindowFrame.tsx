"use client";

import { useEffect, useRef } from "react";
import { OsIcon } from "@/components/icons";
import { useOs } from "@/components/os/OsProvider";
import { WindowContent } from "@/components/windows/contents";
import type { OsWindow } from "@/lib/types";

export function WindowFrame({ win }: { win: OsWindow }) {
  const {
    activeId,
    isMobile,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
  } = useOs();
  const dragging = useRef<{ ox: number; oy: number } | null>(null);
  const active = activeId === win.id && !win.minimized;

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      const nextX = event.clientX - dragging.current.ox;
      const nextY = event.clientY - dragging.current.oy;
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      moveWindow(
        win.id,
        Math.max(-win.w + 80, Math.min(nextX, maxX)),
        Math.max(0, Math.min(nextY, maxY)),
      );
    };
    const onUp = () => {
      dragging.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [moveWindow, win.id, win.w]);

  if (win.minimized) return null;

  const maximized = win.maximized || isMobile;

  return (
    <section
      role="dialog"
      aria-label={win.title}
      className={`window ${maximized ? "maximized" : ""} ${active ? "" : "inactive"}`}
      style={
        maximized
          ? { zIndex: win.z }
          : {
              left: win.x,
              top: win.y,
              width: win.w,
              height: win.h,
              zIndex: win.z,
            }
      }
      onPointerDown={() => focusWindow(win.id)}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <header
        className={`title-bar ${active ? "" : "inactive"}`}
        onPointerDown={(event) => {
          if (maximized) return;
          if ((event.target as HTMLElement).closest("button")) return;
          focusWindow(win.id);
          dragging.current = {
            ox: event.clientX - win.x,
            oy: event.clientY - win.y,
          };
        }}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <OsIcon name={win.icon} size={14} />
        <span className="min-w-0 flex-1 truncate">{win.title}</span>
        <div className="title-buttons">
          <button type="button" className="tb-btn" aria-label="Minimize" onClick={() => minimizeWindow(win.id)}>_</button>
          <button type="button" className="tb-btn" aria-label={maximized ? "Restore" : "Maximize"} onClick={() => toggleMaximize(win.id)}>{maximized ? "❐" : "□"}</button>
          <button type="button" className="tb-btn close" aria-label="Close" onClick={() => closeWindow(win.id)}>×</button>
        </div>
      </header>
      <div className="window-body">
        <WindowContent kind={win.kind} />
      </div>
    </section>
  );
}
