"use client";

import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dash/DashboardSidebar";

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <DashboardSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
