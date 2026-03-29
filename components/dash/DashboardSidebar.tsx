"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { DASH_NAV_MAIN } from "@/data/dashboardNav";

function isActive(pathname: string, href: string) {
  if (href === "/dash") {
    return pathname === "/dash" || pathname === "/dash/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-zinc-950/95 text-zinc-200">
      <div className="border-b border-white/10 p-4">
        <Link href="/dash" className="block font-semibold text-stone-100">
          QDROdl.app
        </Link>
        <p className="mt-1 text-xs text-zinc-500">Client portal</p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {DASH_NAV_MAIN.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-lime-900/40 text-lime-100"
                  : "text-zinc-300 hover:bg-white/5 hover:text-stone-100"
              }`}
            >
              {item.label}
              {item.description && (
                <span className="mt-0.5 block text-xs font-normal text-zinc-500">
                  {item.description}
                </span>
              )}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/10" />

        <Link
          href="/intake/plans"
          className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
        >
          + New intake
        </Link>

        <div className="mt-3 border-t border-white/10 pt-3">
          <LogoutButton className="w-full rounded-lg border border-white/15 px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-white/5" />
        </div>
      </nav>
    </aside>
  );
}
