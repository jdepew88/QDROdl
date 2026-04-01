"use client";

import { useRouter } from "next/navigation";
import { useIntake, type PartyForm } from "../_state/useIntake";
import { formatUsPhoneInput } from "@/lib/phoneUs";
import { isLikelyValidEmail } from "@/lib/emailValidation";
import { isValidUsPostalCode } from "@/lib/postalCodeUs";

function PartyForm({ which }: { which: "petitioner" | "respondent" }) {
  const { petitioner, respondent, attorneys, set } = useIntake();
  const party = which === "petitioner" ? petitioner : respondent;

  const update = (k: string, v: unknown) => {
    const next = {
      ...(which === "petitioner" ? petitioner : respondent),
      [k]: v,
    };
    set(which === "petitioner" ? { petitioner: next } : { respondent: next });
  };

  /** Single zustand write — avoids stale state when setting spouseType + clearing FKA together. */
  const patchParty = (patch: Partial<PartyForm>) => {
    const key = which === "petitioner" ? "petitioner" : "respondent";
    const current = useIntake.getState()[key];
    set({ [key]: { ...current, ...patch } });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-1 text-lg font-semibold text-stone-50">
        {which === "petitioner" ? "Petitioner" : "Respondent"}
      </h3>
      <p className="mb-4 text-xs text-zinc-400">
        Basic contact information. (Additional identifiers can be collected
        later if your plan requires them.)
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="First Name"
          value={party.firstName || ""}
          onChange={(e) => update("firstName", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Last Name"
          value={party.lastName || ""}
          onChange={(e) => update("lastName", e.target.value)}
        />
        {party.spouseType !== "Husband" && (
          <input
            className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
            placeholder="Former last name only, if different (shown as fka …)"
            value={party.fkaLastName || ""}
            onChange={(e) => update("fkaLastName", e.target.value)}
          />
        )}
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Email"
          value={party.email || ""}
          onChange={(e) => update("email", e.target.value.trim())}
        />
        {party.email && !isLikelyValidEmail(party.email) && (
          <p className="text-xs text-rose-300">Enter a real email address.</p>
        )}
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Phone"
          value={formatUsPhoneInput(party.phone || "")}
          onChange={(e) =>
            update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
          placeholder="Street address"
          autoComplete="street-address"
          value={party.address1 || ""}
          onChange={(e) => update("address1", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
          placeholder="Apartment, suite, unit (optional)"
          autoComplete="address-line2"
          value={party.address2 || ""}
          onChange={(e) => update("address2", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="City"
          autoComplete="address-level2"
          value={party.city || ""}
          onChange={(e) => update("city", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="State (e.g. CA)"
          autoComplete="address-level1"
          value={party.state || ""}
          onChange={(e) => update("state", e.target.value.toUpperCase().slice(0, 2))}
          maxLength={2}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
          placeholder="ZIP code"
          autoComplete="postal-code"
          inputMode="numeric"
          value={party.postalCode || ""}
          onChange={(e) =>
            update(
              "postalCode",
              e.target.value.replace(/[^\d-]/g, "").slice(0, 10),
            )
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name={`${which}-spouse`}
            checked={party.spouseType === "Husband"}
            onChange={() =>
              patchParty({ spouseType: "Husband", fkaLastName: "" })
            }
          />
          Husband
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name={`${which}-spouse`}
            checked={party.spouseType === "Wife"}
            onChange={() => patchParty({ spouseType: "Wife" })}
          />
          Wife
        </label>
        <label className="inline-flex items-center gap-2 md:ml-4">
          <input
            type="checkbox"
            checked={!!party.isMember}
            onChange={(e) => update("isMember", e.target.checked)}
          />
          CalPERS member / participant
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          className="mt-1"
          checked={!!party.selfRepresented}
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
            update("selfRepresented", checked);
            if (checked) {
              const at = { ...attorneys };
              if (which === "petitioner") at.petitioner = { name: "" };
              else at.respondent = { name: "" };
              set({ attorneys: at });
            }
          }}
        />
        <span>
          <span className="font-medium text-stone-200">Self-represented</span>{" "}
          (in pro per). We will not ask for attorney contact for this party.
        </span>
      </label>
    </div>
  );
}

export default function PartiesStep() {
  const r = useRouter();
  const { petitioner, respondent } = useIntake();

  const validParty = (p: typeof petitioner) =>
    Boolean(
      p.firstName?.trim() &&
        p.lastName?.trim() &&
        p.address1?.trim() &&
        p.city?.trim() &&
        p.state?.trim() &&
        p.postalCode?.trim() &&
        isValidUsPostalCode(p.postalCode) &&
        p.email?.trim() &&
        isLikelyValidEmail(p.email) &&
        (p.phone || "").replace(/\D/g, "").length === 10 &&
        p.spouseType,
    );

  const canContinue = validParty(petitioner) && validParty(respondent);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-stone-50">
        Step 2: Party information
      </h1>
      <p className="mb-6 text-zinc-300">
        Both parties and who is the plan member. Next: attorney details (only
        for represented parties).
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <PartyForm which="petitioner" />
        <PartyForm which="respondent" />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => r.push("/intake/case")}
          className="rounded-xl border border-white/15 px-5 py-3 text-zinc-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => r.push("/intake/attorneys")}
          disabled={!canContinue}
          className="rounded-xl bg-lime-800 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
