"use client";

import { useOs } from "@/components/os/OsProvider";

export function Wallpaper() {
  const { theme } = useOs();

  if (theme === "win95") {
    return <div className="os-wallpaper" aria-hidden="true" />;
  }

  return (
    <div className="os-wallpaper" aria-hidden="true">
      <svg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
      >
        <defs>
          <linearGradient id="xp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6eb5e0" />
            <stop offset="42%" stopColor="#b9ddf2" />
            <stop offset="70%" stopColor="#d8ecb0" />
            <stop offset="100%" stopColor="#7cb14a" />
          </linearGradient>
          <radialGradient id="xp-sun" cx="78%" cy="28%" r="32%">
            <stop offset="0%" stopColor="#fff6d0" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#cfe8f8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#cfe8f8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#xp-sky)" />
        <rect width="1600" height="900" fill="url(#xp-sun)" />
        <ellipse cx="1180" cy="210" rx="90" ry="28" fill="#fff" opacity="0.55" />
        <ellipse cx="1240" cy="200" rx="60" ry="22" fill="#fff" opacity="0.4" />
        <path
          d="M0 620 C 220 540, 380 700, 620 610 C 860 520, 980 700, 1220 600 C 1420 520, 1520 640, 1600 590 L 1600 900 L 0 900 Z"
          fill="#3f8c3a"
        />
        <path
          d="M0 680 C 260 620, 480 760, 760 680 C 1040 600, 1260 760, 1600 670 L 1600 900 L 0 900 Z"
          fill="#5aaa46"
        />
        <path
          d="M0 780 C 300 740, 520 820, 820 770 C 1120 720, 1340 830, 1600 760 L 1600 900 L 0 900 Z"
          fill="#2f6b32"
        />
      </svg>
    </div>
  );
}
