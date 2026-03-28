"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useIntake,
  type AltPayeeBeneficiaryForm,
  type PlanAnswer,
} from "../_state/useIntake";
import { NONMEMBER_BENEFICIARY_SLOT_COUNT } from "@/lib/nonmemberBeneficiariesMerge";

export default function PlanQuestions() {
  const r = useRouter();
  const { plans, planAnswers, altpayeeBeneficiaries, set } = useIntake();

  const update = (plan: string, field: keyof PlanAnswer, value: unknown) => {
    const next = [...planAnswers];
    const i = next.findIndex((a) => a.plan === plan);
    const patch = { [field]: value } as Partial<PlanAnswer>;
    if (i >= 0) {
      next[i] = { ...next[i], ...patch };
    } else {
      next.push({
        plan: plan as PlanAnswer["plan"],
        ...patch,
      } as PlanAnswer);
    }
    set({ planAnswers: next });
  };

  const setCalpersInPay = (checked: boolean) => {
    const next = [...planAnswers];
    const i = next.findIndex((a) => a.plan === "calpers");
    if (i >= 0) {
      next[i] = {
        ...next[i],
        isInPayStatus: checked,
        calpersOrderModel: checked ? "C" : "A",
        ...(checked ? {} : { calpersOption3W: false }),
      };
    } else {
      next.push({
        plan: "calpers",
        isInPayStatus: checked,
        calpersOrderModel: checked ? "C" : "A",
      });
    }
    set({ planAnswers: next });
  };

  const getAns = (plan: string) => planAnswers.find((a) => a.plan === plan);

  const updateBeneficiary = (
    index: number,
    field: keyof AltPayeeBeneficiaryForm,
    value: string,
  ) => {
    const next = [...altpayeeBeneficiaries];
    next[index] = { ...next[index], [field]: value };
    set({ altpayeeBeneficiaries: next });
  };

  const addBeneficiary = () => {
    if (altpayeeBeneficiaries.length >= NONMEMBER_BENEFICIARY_SLOT_COUNT)
      return;
    set({
      altpayeeBeneficiaries: [
        ...altpayeeBeneficiaries,
        {
          fullName: "",
          relationship: "",
          address1: "",
          address2: "",
        },
      ],
    });
  };

  const removeLastBeneficiary = () => {
    if (altpayeeBeneficiaries.length <= 1) return;
    set({
      altpayeeBeneficiaries: altpayeeBeneficiaries.slice(0, -1),
    });
  };

  const showCalpersBeneficiaries = (plan: string) => {
    const a = getAns(plan);
    if (!a || a.plan !== "calpers") return false;
    if (a.isInPayStatus) return false;
    return a.calpersOrderModel === "B";
  };

  const row = (label: string, control: ReactNode) => (
    <div className="flex flex-col gap-2 border-b border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="font-medium text-stone-100">{label}</div>
      <div className="shrink-0">{control}</div>
    </div>
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-stone-50">
        Step 4: Plan & order type
      </h1>
      <p className="mb-6 text-sm text-zinc-300">
        Plan-specific options used to choose the correct CalPERS (or other)
        order template.
      </p>

      {plans.length === 0 && (
        <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/40 p-4 text-sm text-amber-100">
          No plans selected.{" "}
          <Link href="/intake/plans" className="text-lime-400 underline">
            Go back to plan selection
          </Link>
          .
        </p>
      )}

      {plans.map((p) => {
        const ans = getAns(p);
        const isDB = ["calpers", "calstrs", "lacera", "mpi_pension", "federal"].includes(
          p,
        );

        return (
          <div
            key={p}
            className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="mb-3 font-semibold text-lime-200">{p}</h2>

            {p === "calpers" && (
              <>
                {row(
                  "Is the CalPERS member already in pay status (retired and receiving benefits)?",
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-lime-600"
                    checked={!!ans?.isInPayStatus}
                    onChange={(e) => setCalpersInPay(e.target.checked)}
                  />,
                )}

                {ans?.isInPayStatus && (
                  <div className="mb-4 rounded-xl border border-sky-500/30 bg-sky-950/40 p-4 text-sm text-sky-100">
                    <p className="font-semibold text-sky-50">
                      Model C order required
                    </p>
                    <p className="mt-2 text-sky-100/90">
                      When the member is in pay status, the judgment must use a{" "}
                      <strong>Model C</strong> domestic relations order dividing
                      benefits already in payment.
                    </p>
                  </div>
                )}

                {ans?.isInPayStatus && (
                  <>
                    {row(
                      "Model C template version",
                      <select
                        className="max-w-xs rounded-lg border border-white/15 bg-zinc-900 p-2 text-stone-50"
                        value={ans?.calpersModelCForm || "standard"}
                        onChange={(e) =>
                          update(p, "calpersModelCForm", e.target.value)
                        }
                      >
                        <option value="standard">Standard Model C</option>
                        <option value="dro">Model C (DRO variant)</option>
                      </select>,
                    )}
                    {(ans?.calpersModelCForm ?? "standard") === "standard" &&
                      row(
                        "Include optional Option 3W language (if your template supports it)?",
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-lime-600"
                          checked={!!ans?.calpersOption3W}
                          onChange={(e) =>
                            update(p, "calpersOption3W", e.target.checked)
                          }
                        />,
                      )}
                  </>
                )}

                {!ans?.isInPayStatus && (
                  <>
                    <div className="mb-4 space-y-3 text-sm text-zinc-300">
                      <p>
                        <span className="font-semibold text-stone-200">
                          Model A — Separation of account
                        </span>{" "}
                        divides the member&apos;s account into separate accounts.
                        Often used for shorter marriages or shorter CalPERS
                        membership; the alternate payee&apos;s share can
                        typically be taken as a lump sum and rolled into other
                        retirement vehicles at their discretion (subject to plan
                        rules).
                      </p>
                      <p>
                        <span className="font-semibold text-stone-200">
                          Model B
                        </span>{" "}
                        provides for a separate interest with survivor
                        options; it often includes designated beneficiaries of the
                        <strong> non-member spouse</strong>. You can list those
                        beneficiaries below when Model B is selected.
                      </p>
                    </div>
                    {row(
                      "Which CalPERS model order?",
                      <select
                        className="max-w-xs rounded-lg border border-white/15 bg-zinc-900 p-2 text-stone-50"
                        value={ans?.calpersOrderModel || "A"}
                        onChange={(e) =>
                          update(p, "calpersOrderModel", e.target.value)
                        }
                      >
                        <option value="A">Model A</option>
                        <option value="B">Model B</option>
                      </select>,
                    )}
                  </>
                )}
              </>
            )}

            {p !== "calpers" &&
              row(
                "Is the Member already in pay status (retired)?",
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-lime-600"
                  checked={!!ans?.isInPayStatus}
                  onChange={(e) => update(p, "isInPayStatus", e.target.checked)}
                />,
              )}

            {isDB &&
              !ans?.isInPayStatus &&
              p !== "calpers" &&
              row(
                "Use time-rule order?",
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-lime-600"
                  checked={!!ans?.usesTimeRule}
                  onChange={(e) => update(p, "usesTimeRule", e.target.checked)}
                />,
              )}

            {p === "lacera" &&
              !ans?.isInPayStatus &&
              row(
                "If NOT Unmodified, require Optional Settlement 4?",
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-lime-600"
                  checked={!!ans?.laceraOption4}
                  onChange={(e) =>
                    update(p, "laceraOption4", e.target.checked)
                  }
                />,
              )}

            {showCalpersBeneficiaries(p) && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="mb-1 text-lg font-semibold text-stone-50">
                  Model B — alternate payee beneficiaries
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Names of the <strong>non-member spouse&apos;s</strong>{" "}
                  designated beneficiaries (up to {NONMEMBER_BENEFICIARY_SLOT_COUNT}
                  ). Start with one row; add more if needed.
                </p>
                <div className="space-y-6">
                  {altpayeeBeneficiaries.map((b, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-zinc-900/40 p-4"
                    >
                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                        Beneficiary {i + 1}
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
                          placeholder="Full legal name"
                          value={b.fullName}
                          onChange={(e) =>
                            updateBeneficiary(i, "fullName", e.target.value)
                          }
                        />
                        <input
                          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
                          placeholder="Relationship to alternate payee"
                          value={b.relationship || ""}
                          onChange={(e) =>
                            updateBeneficiary(i, "relationship", e.target.value)
                          }
                        />
                        <input
                          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                          placeholder="Address line 1"
                          value={b.address1 || ""}
                          onChange={(e) =>
                            updateBeneficiary(i, "address1", e.target.value)
                          }
                        />
                        <input
                          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                          placeholder="Address line 2"
                          value={b.address2 || ""}
                          onChange={(e) =>
                            updateBeneficiary(i, "address2", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={addBeneficiary}
                    disabled={
                      altpayeeBeneficiaries.length >=
                      NONMEMBER_BENEFICIARY_SLOT_COUNT
                    }
                    className="rounded-lg border border-lime-700/50 bg-lime-950/40 px-4 py-2 text-sm font-medium text-lime-100 disabled:opacity-40"
                  >
                    Add another beneficiary
                  </button>
                  <button
                    type="button"
                    onClick={removeLastBeneficiary}
                    disabled={altpayeeBeneficiaries.length <= 1}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-300 disabled:opacity-40"
                  >
                    Remove last row
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => r.push("/intake/attorneys")}
          className="rounded-xl border border-white/15 px-5 py-3 text-zinc-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => r.push("/intake/review")}
          className="rounded-xl bg-lime-800 px-6 py-3 font-semibold text-white"
        >
          Continue to review
        </button>
      </div>
    </main>
  );
}
