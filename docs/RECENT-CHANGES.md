# Recent changes (for commits / deploy notes)

Use as inspiration for `git commit -m "..."` and VPS deploy awareness.

## CalPERS templates (Word merge)

- Defined **CalPERS template IDs** and paths in `data/templates.ts` under `templates/calpers/` (`.docx` files are added by you after converting from WordPerfect).
- **Model A / B / C** × **plan member = Petitioner** vs **Respondent** → six base IDs (e.g. `calpers-modA-pet-mem`).
- **Model C** also has **Standard** vs **DRO** (`mod-c-dro-*.docx`) and **Option 3W** on standard only (`mod-c-option-3w-*.docx`).
- `pickTemplateForPlan` selects the right ID; review step passes intake into it.
- Comments in `data/templates.ts`, `lib/viewModel.ts`, and `lib/renderTemplates.ts` remind authors to **strip sample party/case text** and use `{{merge}}` placeholders.

## Database (Prisma)

- `Party.fkaLastName` (formerly known as).
- `PlanSelection`: `calpersOrderModel`, `calpersOption3W`, `calpersModelCForm`.
- `AltPayeeBeneficiary` for **non-member spouse** beneficiaries (e.g. Model B); case step collects up to four rows.
- New migrations under `prisma/migrations/` — run `npx prisma migrate deploy` on the VPS.

## Intake & API

- Plan questions: CalPERS model A/B/C, Model C template (standard vs DRO), Option 3W when applicable.
- Parties: optional former last name (FKA).
- Case step: alternate-payee beneficiary slots.
- Submit route: persists the above; **member side** uses `petitionerIsPlanMember()` when respondent is the member.
- Dev-only **Fill sample intake** bar on `/intake/*` (`data/devIntakeSample.ts`, `components/intake/DevIntakeFillBar.tsx`, `app/intake/layout.tsx`) — hidden in production unless `NEXT_PUBLIC_DEV_INTAKE_FILL=true`.

## Merge / view model (`lib/viewModel.ts`)

- Party display names with FKA, member vs alt payee, **participant pronouns** (he/she from spouse type).
- **Signature** caption blocks (in pro per vs attorney) and signatory lines.
- `nonmember_beneficiary` / `nonmember_beneficiary_rows` (four padded slots).
- `calpers.order_model`, `calpers.option_3w`, `calpers.model_c_form`.

## Supporting libs

- `lib/intakeMember.ts`, `lib/pronouns.ts`, `lib/formatPhone.ts`, `lib/signatureCaption.ts`, `lib/nonmemberBeneficiariesMerge.ts`.

## Deploy reminder

- Commit **template `.docx` files** if you want them deployed via git; otherwise copy `templates/calpers/` on the server after pull.

---

**Example commit subject:**  
`Add CalPERS template routing, DB fields, intake flow, and dev intake fill`

**Example commit body (short):**

- Wire CalPERS A/B/C template IDs (pet vs resp member; Mod C standard/DRO + Option 3W).
- Prisma: FKA, CalPERS plan flags, alt-payee beneficiaries + migrations.
- Enrich merge model (pronouns, signatures, beneficiaries, calpers flags).
- Intake UI + submit; dev-only sample fill for testing.
