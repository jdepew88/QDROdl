/**
 * Fake intake values for local / QA testing only.
 *
 * **Production:** This file is unused unless `showDevIntakeFill()` is true (see below).
 * To hard-remove later: delete this file, `components/intake/DevIntakeFillBar.tsx`, and
 * the `<DevIntakeFillBar />` line in `app/intake/layout.tsx`.
 */
import type { IntakeState } from "@/app/intake/_state/useIntake";
import { NONMEMBER_BENEFICIARY_SLOT_COUNT } from "@/lib/nonmemberBeneficiariesMerge";

/** `development` build, or opt-in with `NEXT_PUBLIC_DEV_INTAKE_FILL=true` in `.env.local`. */
export function showDevIntakeFill(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEV_INTAKE_FILL === "true"
  );
}

function emptyBeneficiaries(): IntakeState["altpayeeBeneficiaries"] {
  return Array.from({ length: NONMEMBER_BENEFICIARY_SLOT_COUNT }, () => ({
    fullName: "",
    relationship: "",
    address1: "",
    address2: "",
  }));
}

/**
 * Full intake snapshot for one-click testing (DB submit + review).
 * Replace or delete this object when you no longer need fixtures.
 */
export function buildDevIntakeSample(): Partial<IntakeState> {
  return {
    plans: ["calpers"],
    planAnswers: [
      {
        plan: "calpers",
        isInPayStatus: false,
        usesTimeRule: false,
        calpersOrderModel: "A",
        calpersModelCForm: "standard",
        calpersOption3W: false,
      },
    ],
    caseInfo: {
      caseNumber: "BD XXX XXX",
      county: "Los Angeles",
      otherCounty: undefined,
      dom: "2015-05-01",
      dos: "2023-08-15",
      doj: "2024-01-20",
      concurrentWithJudgment: false,
    },
    petitioner: {
      role: "PETITIONER",
      firstName: "JOHN",
      lastName: "DOE",
      fkaLastName: undefined,
      email: "john.doe.test@example.invalid",
      phone: "2135550101",
      address1: "123 Main Street",
      address2: "Los Angeles, CA 90012",
      dob: "1980-01-15",
      ssn: "123456789",
      spouseType: "Husband",
      isMember: true,
    },
    respondent: {
      role: "RESPONDENT",
      firstName: "JANE",
      lastName: "DOE",
      fkaLastName: undefined,
      email: "jane.doe.test@example.invalid",
      phone: "2135550199",
      address1: "456 Oak Avenue",
      address2: "Los Angeles, CA 90013",
      dob: "1982-06-20",
      ssn: "987654321",
      spouseType: "Wife",
      isMember: false,
    },
    attorneys: {
      petitioner: {
        name: "ALAN VEGA",
        bar: "123456",
        email: "vega.test@example.invalid",
        phone: "2135550200",
        address1: "100 Attorney Plaza, Suite 500",
        address2: "Los Angeles, CA 90017",
      },
      respondent: {
        name: "PAM PORTER",
        bar: "654321",
        email: "porter.test@example.invalid",
        phone: "2135550201",
        address1: "200 Counsel Row",
        address2: "Los Angeles, CA 90018",
      },
    },
    altpayeeBeneficiaries: emptyBeneficiaries(),
  };
}
