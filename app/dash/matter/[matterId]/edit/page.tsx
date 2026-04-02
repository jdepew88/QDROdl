"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { County } from "@/data/templates";
import { isLikelyValidEmail } from "@/lib/emailValidation";
import { formatUsPhoneInput } from "@/lib/phoneUs";
import { tryParseLegacyCityStateZip } from "@/lib/partyAddressLines";
import { isValidUsPostalCode } from "@/lib/postalCodeUs";

const COUNTIES: County[] = [
  "Los Angeles",
  "Orange",
  "Ventura",
  "San Bernardino",
  "San Diego",
  "Other",
];

export default function EditMatterPage({
  params,
}: {
  params: { matterId: string };
}) {
  const matterId = params.matterId;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch(`/api/matters/${matterId}`);
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || "Load failed");
        if (c) return;
        const m = j.matter;
        const pet = m.petitioner;
        const resp = m.respondent;

        const splitPartyAddr = (party: typeof pet) => {
          let city = party.city || "";
          let state = party.state || "";
          let postalCode = party.postalCode || "";
          let address2 = party.address2 || "";
          if (!city && !state && !postalCode) {
            const parsed = tryParseLegacyCityStateZip(address2);
            if (parsed) {
              city = parsed.city;
              state = parsed.state;
              postalCode = parsed.postalCode;
              address2 = "";
            }
          }
          return { city, state, postalCode, address2 };
        };
        const petAddr = splitPartyAddr(pet);
        const respAddr = splitPartyAddr(resp);
        const petAt = m.attorneys?.find((a: any) => a.side === "PETITIONER");
        const respAt = m.attorneys?.find((a: any) => a.side === "RESPONDENT");
        setForm({
          caseNumber: m.caseNumber,
          county: m.county,
          otherCounty: m.otherCounty || "",
          dom: m.dom?.slice(0, 10) || "",
          dos: m.dos?.slice(0, 10) || "",
          doj: m.doj ? m.doj.slice(0, 10) : "",
          concurrentWithJudgment: m.concurrentWithJudgment,
          petitionerIsMember: m.petitionerIsMember,
          // Payment responsibility "bones" (entered by parties in this dashboard step).
          splitBill: m.splitBill,
          petitionerShareCents: m.petitionerShareCents ?? null,
          respondentShareCents: m.respondentShareCents ?? null,
          petitioner: {
            firstName: pet.firstName,
            lastName: pet.lastName,
            fkaLastName: pet.fkaLastName || "",
            selfRepresented: pet.selfRepresented,
            email: pet.email,
            phone: pet.phone || "",
            address1: pet.address1,
            address2: petAddr.address2,
            city: petAddr.city,
            state: petAddr.state,
            postalCode: petAddr.postalCode,
            spouseType: pet.spouseType || "Husband",
          },
          respondent: {
            firstName: resp.firstName,
            lastName: resp.lastName,
            fkaLastName: resp.fkaLastName || "",
            selfRepresented: resp.selfRepresented,
            email: resp.email,
            phone: resp.phone || "",
            address1: resp.address1,
            address2: respAddr.address2,
            city: respAddr.city,
            state: respAddr.state,
            postalCode: respAddr.postalCode,
            spouseType: resp.spouseType || "Wife",
          },
          attorneys: {
            petitioner: petAt
              ? {
                  name: petAt.name,
                  bar: petAt.barNumber || "",
                  email: petAt.email || "",
                  phone: petAt.phone || "",
                  address1: petAt.address1 || "",
                  address2: petAt.address2 || "",
                }
              : { name: "" },
            respondent: respAt
              ? {
                  name: respAt.name,
                  bar: respAt.barNumber || "",
                  email: respAt.email || "",
                  phone: respAt.phone || "",
                  address1: respAt.address1 || "",
                  address2: respAt.address2 || "",
                }
              : { name: "" },
          },
          beneficiaries:
            m.altPayeeBeneficiaries?.map((b: any) => ({
              fullName: b.fullName,
              relationship: b.relationship || "",
              address1: b.address1 || "",
              address2: b.address2 || "",
            })) || [],
        });
      } catch (e: any) {
        if (!c) setError(e.message);
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, [matterId]);

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/matters/${matterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseNumber: form.caseNumber,
          county: form.county,
          otherCounty: form.otherCounty || null,
          dom: form.dom,
          dos: form.dos,
          doj: form.doj || null,
          concurrentWithJudgment: form.concurrentWithJudgment,
          petitionerIsMember: form.petitionerIsMember,
          splitBill: Boolean(form.splitBill),
          petitionerShareCents:
            form.petitionerShareCents == null
              ? null
              : Number(form.petitionerShareCents),
          respondentShareCents:
            form.respondentShareCents == null
              ? null
              : Number(form.respondentShareCents),
          petitioner: {
            ...form.petitioner,
            state: String(form.petitioner.state || "")
              .trim()
              .toUpperCase()
              .slice(0, 2),
          },
          respondent: {
            ...form.respondent,
            state: String(form.respondent.state || "")
              .trim()
              .toUpperCase()
              .slice(0, 2),
          },
          attorneys: form.attorneys,
          altpayeeBeneficiaries: form.beneficiaries.filter(
            (b: any) => (b.fullName || "").trim(),
          ),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Save failed");
      router.push(`/dash/matter/${matterId}`);
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-zinc-300">Loading…</main>
    );
  }
  if (error && !form) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-rose-200">
        {error}
      </main>
    );
  }
  if (!form) return null;

  const pf = (prefix: string, field: string, v: unknown) => {
    setForm({
      ...form,
      [prefix]: { ...form[prefix], [field]: v },
    });
  };

  const phoneDigits = (value: string) => (value || "").replace(/\D/g, "");
  const centsToDollars = (cents: number | null | undefined) =>
    cents == null ? "" : (cents / 100).toFixed(2);
  const dollarsToCentsOrNull = (raw: string) => {
    const t = raw.trim();
    if (!t) return null;
    const n = Number(t);
    if (!Number.isFinite(n)) return null;
    return Math.round(n * 100);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-50">Edit matter</h1>
        <Link
          href={`/dash/matter/${matterId}`}
          className="text-sm text-lime-400 hover:underline"
        >
          Cancel
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-950/50 p-3 text-sm text-rose-100">
          {error}
        </div>
      )}

      <section className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-semibold text-stone-100">Case</h2>
        <input
          className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          value={form.caseNumber}
          onChange={(e) => setForm({ ...form, caseNumber: e.target.value })}
        />
        <select
          className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          value={form.county}
          onChange={(e) => setForm({ ...form, county: e.target.value })}
        >
          {COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {form.county === "Other" && (
          <input
            className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
            placeholder="County"
            value={form.otherCounty}
            onChange={(e) => setForm({ ...form, otherCounty: e.target.value })}
          />
        )}
        <div className="grid gap-3 md:grid-cols-3">
          <input
            type="date"
            className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
            value={form.dom}
            onChange={(e) => setForm({ ...form, dom: e.target.value })}
          />
          <input
            type="date"
            className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
            value={form.dos}
            onChange={(e) => setForm({ ...form, dos: e.target.value })}
          />
          <input
            type="date"
            className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
            value={form.doj}
            onChange={(e) => setForm({ ...form, doj: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={form.concurrentWithJudgment}
            onChange={(e) =>
              setForm({ ...form, concurrentWithJudgment: e.target.checked })
            }
          />
          Concurrent with judgment
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={form.petitionerIsMember}
            onChange={(e) =>
              setForm({ ...form, petitionerIsMember: e.target.checked })
            }
          />
          Petitioner is plan member (otherwise respondent is)
        </label>
      </section>

      <section className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-semibold text-stone-100">Payment responsibility (skeleton)</h2>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={!!form.splitBill}
            onChange={(e) => {
              const checked = e.target.checked;
              setForm({
                ...form,
                splitBill: checked,
                petitionerShareCents: checked ? (form.petitionerShareCents ?? 0) : null,
                respondentShareCents: checked ? (form.respondentShareCents ?? 0) : null,
              });
            }}
          />
          Split the total cost of the service between the parties
        </label>

        {form.splitBill && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-zinc-950/20 p-4">
              <p className="text-xs font-medium text-zinc-400">
                Petitioner share ({form.petitioner.spouseType || "Husband"})
              </p>
              <label className="mt-2 block text-xs text-zinc-500">
                Amount (USD)
                <input
                  className="mt-1 w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                  value={centsToDollars(form.petitionerShareCents)}
                  onChange={(e) => {
                    const cents = dollarsToCentsOrNull(e.target.value);
                    setForm({ ...form, petitionerShareCents: cents });
                  }}
                  inputMode="decimal"
                />
              </label>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-950/20 p-4">
              <p className="text-xs font-medium text-zinc-400">
                Respondent share ({form.respondent.spouseType || "Wife"})
              </p>
              <label className="mt-2 block text-xs text-zinc-500">
                Amount (USD)
                <input
                  className="mt-1 w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                  value={centsToDollars(form.respondentShareCents)}
                  onChange={(e) => {
                    const cents = dollarsToCentsOrNull(e.target.value);
                    setForm({ ...form, respondentShareCents: cents });
                  }}
                  inputMode="decimal"
                />
              </label>
            </div>
          </div>
        )}

        <p className="text-xs text-zinc-500">
          For special circumstances (example: 80/20 splits), contact support via email or a support ticket so staff can
          confirm the exact split. For now, this captures the split amounts so we can prepare the draft package workflow later.
        </p>
      </section>

      {(["petitioner", "respondent"] as const).map((side) => (
        <section
          key={side}
          className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h2 className="font-semibold capitalize text-stone-100">{side}</h2>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={!!form[side].selfRepresented}
              onChange={(e) => {
                const checked = e.target.checked;
                if (
                  checked &&
                  !confirm(
                    "Mark this party as in pro per and remove their attorney from this matter?",
                  )
                ) {
                  return;
                }
                pf(side, "selfRepresented", checked);
                if (checked) {
                  setForm({
                    ...form,
                    attorneys: {
                      ...form.attorneys,
                      [side]: { name: "" },
                    },
                  });
                }
              }}
            />
            Self-represented
          </label>
          <p className="text-xs text-zinc-500">
            Name and date-of-birth are permanent after save. If those must
            change, delete this matter and start a fresh intake.
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-zinc-400"
              placeholder="First"
              value={form[side].firstName}
              readOnly
            />
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-zinc-400"
              placeholder="Last"
              value={form[side].lastName}
              readOnly
            />
            {form[side].spouseType !== "Husband" && (
              <input
                className="md:col-span-2 rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                placeholder="FKA last name"
                value={form[side].fkaLastName}
                onChange={(e) => pf(side, "fkaLastName", e.target.value)}
              />
            )}
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="Email"
              value={form[side].email}
              onChange={(e) => pf(side, "email", e.target.value.trim())}
            />
            {form[side].email && !isLikelyValidEmail(form[side].email) && (
              <p className="text-xs text-rose-300">Enter a real email address.</p>
            )}
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="Phone"
              value={formatUsPhoneInput(form[side].phone || "")}
              onChange={(e) =>
                pf(side, "phone", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            />
            <input
              className="md:col-span-2 rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="Street address"
              autoComplete="street-address"
              value={form[side].address1}
              onChange={(e) => pf(side, "address1", e.target.value)}
            />
            <input
              className="md:col-span-2 rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="Apartment, suite, unit (optional)"
              autoComplete="address-line2"
              value={form[side].address2}
              onChange={(e) => pf(side, "address2", e.target.value)}
            />
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="City"
              autoComplete="address-level2"
              value={form[side].city}
              onChange={(e) => pf(side, "city", e.target.value)}
            />
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="State"
              autoComplete="address-level1"
              maxLength={2}
              value={form[side].state}
              onChange={(e) =>
                pf(
                  side,
                  "state",
                  e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2),
                )
              }
            />
            <input
              className="md:col-span-2 rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="ZIP code"
              autoComplete="postal-code"
              inputMode="numeric"
              value={form[side].postalCode}
              onChange={(e) =>
                pf(
                  side,
                  "postalCode",
                  e.target.value.replace(/[^\d-]/g, "").slice(0, 10),
                )
              }
            />
          </div>
        </section>
      ))}

      <section className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-semibold text-stone-100">Attorneys</h2>
        {!form.petitioner.selfRepresented && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-400">Petitioner attorney</p>
            <button
              type="button"
              className="text-xs text-rose-300 hover:underline"
              onClick={() =>
                setForm({
                  ...form,
                  attorneys: { ...form.attorneys, petitioner: { name: "" } },
                })
              }
            >
              Remove petitioner attorney
            </button>
            {(["name", "bar", "email", "phone", "address1", "address2"] as const).map(
              (f) => (
                <input
                  key={f}
                  className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                  placeholder={f}
                  value={form.attorneys.petitioner[f] || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      attorneys: {
                        ...form.attorneys,
                        petitioner: {
                          ...form.attorneys.petitioner,
                          [f]: e.target.value,
                        },
                      },
                    })
                  }
                />
              ),
            )}
          </div>
        )}
        {!form.respondent.selfRepresented && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-400">Respondent attorney</p>
            <button
              type="button"
              className="text-xs text-rose-300 hover:underline"
              onClick={() =>
                setForm({
                  ...form,
                  attorneys: { ...form.attorneys, respondent: { name: "" } },
                })
              }
            >
              Remove respondent attorney
            </button>
            {(["name", "bar", "email", "phone", "address1", "address2"] as const).map(
              (f) => (
                <input
                  key={f}
                  className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                  placeholder={f}
                  value={form.attorneys.respondent[f] || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      attorneys: {
                        ...form.attorneys,
                        respondent: {
                          ...form.attorneys.respondent,
                          [f]: e.target.value,
                        },
                      },
                    })
                  }
                />
              ),
            )}
          </div>
        )}
      </section>

      <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-2 font-semibold text-stone-100">
          Alternate payee beneficiaries
        </h2>
        <p className="mb-3 text-xs text-zinc-400">
          Model B / non-member spouse beneficiaries. Leave blank rows out of the
          saved list.
        </p>
        {form.beneficiaries.map((b: any, i: number) => (
          <div key={i} className="mb-3 grid gap-2 border-t border-white/10 pt-3">
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-2 text-stone-50"
              placeholder="Name"
              value={b.fullName}
              onChange={(e) => {
                const next = [...form.beneficiaries];
                next[i] = { ...next[i], fullName: e.target.value };
                setForm({ ...form, beneficiaries: next });
              }}
            />
            <input
              className="rounded-lg border border-white/15 bg-zinc-900 p-2 text-stone-50"
              placeholder="Relationship"
              value={b.relationship}
              onChange={(e) => {
                const next = [...form.beneficiaries];
                next[i] = { ...next[i], relationship: e.target.value };
                setForm({ ...form, beneficiaries: next });
              }}
            />
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-sm text-lime-400 hover:underline"
          onClick={() =>
            setForm({
              ...form,
              beneficiaries: [
                ...form.beneficiaries,
                {
                  fullName: "",
                  relationship: "",
                  address1: "",
                  address2: "",
                },
              ],
            })
          }
        >
          Add beneficiary row
        </button>
      </section>

      <button
        type="button"
        onClick={save}
        disabled={
          saving ||
          !isLikelyValidEmail(form.petitioner.email) ||
          !isLikelyValidEmail(form.respondent.email) ||
          phoneDigits(form.petitioner.phone).length !== 10 ||
          phoneDigits(form.respondent.phone).length !== 10 ||
          !form.petitioner.city?.trim() ||
          !form.petitioner.state?.trim() ||
          !isValidUsPostalCode(form.petitioner.postalCode || "") ||
          !form.respondent.city?.trim() ||
          !form.respondent.state?.trim() ||
          !isValidUsPostalCode(form.respondent.postalCode || "")
        }
        className="rounded-xl bg-lime-800 px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </main>
  );
}
