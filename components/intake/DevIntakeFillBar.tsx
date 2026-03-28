"use client";

import { useIntake } from "@/app/intake/_state/useIntake";
import { buildDevIntakeSample, showDevIntakeFill } from "@/data/devIntakeSample";
import Link from "next/link";
import { useState } from "react";

export default function DevIntakeFillBar() {
  const set = useIntake((s) => s.set);
  const [done, setDone] = useState(false);

  if (!showDevIntakeFill()) return null;

  return (
    <div className="border-b border-amber-500/40 bg-amber-950/90 px-4 py-2 text-sm text-amber-50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3">
        <span className="font-semibold tracking-wide text-amber-200">
          Dev test data
        </span>
        <button
          type="button"
          onClick={() => {
            set(buildDevIntakeSample());
            setDone(true);
          }}
          className="rounded-lg bg-amber-600 px-3 py-1.5 font-medium text-black hover:bg-amber-500"
        >
          Fill sample intake (JOHN/JANE DOE, BD XXX XXX, LA, attorneys)
        </button>
        {done && (
          <span className="text-amber-200/90">Loaded — walk steps or go to review.</span>
        )}
        <Link
          href="/intake/review"
          className="text-amber-100 underline-offset-2 hover:text-white hover:underline"
        >
          Jump to review
        </Link>
      </div>
    </div>
  );
}
