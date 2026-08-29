"use client";

import { Desktop } from "@/components/os/Desktop";
import { OsProvider } from "@/components/os/OsProvider";

export default function Home() {
  return (
    <OsProvider>
      <Desktop />
    </OsProvider>
  );
}
