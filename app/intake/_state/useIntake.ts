"use client";

import { create } from "zustand";
import type { PlanKey, County, CalpersModelCForm } from "@/data/templates";
import { NONMEMBER_BENEFICIARY_SLOT_COUNT } from "@/lib/nonmemberBeneficiariesMerge";

type PartyRole = "PETITIONER" | "RESPONDENT";
type SpouseType = "Husband" | "Wife";

export interface PartyForm {
  role: PartyRole;
  firstName: string;
  lastName: string;
  fkaLastName?: string;
  /** If true, party appears in pro per; attorney step is skipped for this side. */
  selfRepresented?: boolean;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  dob?: string;
  ssn?: string;
  spouseType?: SpouseType;
  isMember?: boolean;
}

/** Designated beneficiaries of the non-member spouse (alternate payee), e.g. CalPERS Model B. */
export interface AltPayeeBeneficiaryForm {
  fullName: string;
  relationship?: string;
  address1?: string;
  address2?: string;
}

export type CalpersOrderModel = "A" | "B" | "C";

export interface PlanAnswer {
  plan: PlanKey;
  isInPayStatus?: boolean;
  usesTimeRule?: boolean;
  laceraOption4?: boolean;
  calpersOrderModel?: CalpersOrderModel;
  /** CalPERS Model C: include optional “Option 3W” language / template (standard form only). */
  calpersOption3W?: boolean;
  /** CalPERS Model C: which of the two template pairs (standard vs DRO). */
  calpersModelCForm?: CalpersModelCForm;
}

function emptyBeneficiarySlots(): AltPayeeBeneficiaryForm[] {
  return [
    {
      fullName: "",
      relationship: "",
      address1: "",
      address2: "",
    },
  ];
}

export interface IntakeState {
  plans: PlanKey[];
  planAnswers: PlanAnswer[];
  caseInfo: {
    caseNumber: string;
    county: County;
    otherCounty?: string;
    dom: string;
    dos: string;
    doj?: string;
    concurrentWithJudgment: boolean;
  };
  petitioner: PartyForm;
  respondent: PartyForm;
  attorneys: {
    petitioner?: {
      name: string;
      bar?: string;
      email?: string;
      phone?: string;
      address1?: string;
      address2?: string;
    };
    respondent?: {
      name: string;
      bar?: string;
      email?: string;
      phone?: string;
      address1?: string;
      address2?: string;
    };
  };
  requester: {
    isParty: boolean | null;
    role?: PartyRole;
    spouseType?: SpouseType;
  };
  altpayeeBeneficiaries: AltPayeeBeneficiaryForm[];
  set: (u: Partial<IntakeState>) => void;
}

export const useIntake = create<IntakeState>((set) => ({
  plans: [],
  planAnswers: [],
  caseInfo: {
    caseNumber: "",
    county: "Los Angeles",
    dom: "",
    dos: "",
    doj: "",
    concurrentWithJudgment: false,
  },
  petitioner: {
    role: "PETITIONER",
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
  },
  respondent: {
    role: "RESPONDENT",
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
  },
  attorneys: {},
  requester: {
    isParty: null,
  },
  altpayeeBeneficiaries: emptyBeneficiarySlots(),
  set,
}));
