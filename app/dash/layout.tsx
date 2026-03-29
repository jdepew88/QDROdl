"use client";

import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dash/DashboardSidebar";
import LogoutButton from "@/components/LogoutButton";

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-50 flex shrink-0 items-center justify-end gap-3 border-b border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/80">
          <LogoutButton className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5" />
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
