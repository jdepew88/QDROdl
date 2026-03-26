import React from "react";
import ProcessStep from "./ProcessStep";

export default function ProcessSection() {
  const step1Data = {
    stepNumber: "Step 1",
    title: "Time Rule Method Application",
    description:
      "The time rule method calculates the marital portion of pension benefits by comparing years of service during marriage to total years of service. This ensures accurate division of benefits earned during the marital period.",
    formula: {
      title: "Formula:",
      content:
        "Marital Portion = (Years of Service During Marriage ÷ Total Years of Service) × Total Benefit",
    },
    keyComponents: [
      {
        title: "✓ Marriage Date",
        description: "Starting point for calculating marital service credit",
      },
      {
        title: "✓ Separation Date",
        description: "End point for marital service credit calculation",
      },
      {
        title: "✓ Service Credit",
        description: "Total years of service with the employer or plan",
      },
      {
        title: "✓ Benefit Calculation",
        description: "Monthly benefit amount based on plan formula",
      },
    ],
    advantages: [
      "Accurately separates marital from separate property",
      "Accounts for future benefit increases and cost-of-living adjustments",
      "Provides clear, defensible division methodology",
    ],
    colorScheme: "blue" as const,
  };

  const step2Data = {
    stepNumber: "Step 2",
    title: "Plan Administrator Determination",
    description:
      "We identify the correct plan administrator responsible for processing QDROs. Each pension plan has specific requirements and procedures that must be followed for successful benefit division.",
    centerContent: {
      title: "We Determine the Plan Administrator",
      description:
        "Our team identifies the correct plan administrator and obtains the appropriate QDRO forms and requirements for division",
    },
    keyComponents: [
      {
        title: "✓ Plan Identification",
        description:
          "Verify plan name, number, and administrator contact information",
      },
      {
        title: "✓ QDRO Requirements",
        description:
          "Obtain plan-specific QDRO forms and procedural requirements",
      },
      {
        title: "✓ Contact Information",
        description:
          "Secure current administrator address and submission procedures",
      },
      {
        title: "✓ Processing Timeline",
        description: "Understand plan review timeline and approval process",
      },
    ],
    colorScheme: "violet" as const,
  };

  const step3Data = {
    stepNumber: "Step 3",
    title: "QDRO Preparation & Submission",
    description:
      "We prepare the appropriate QDRO using the time rule method and plan-specific requirements. Our QDROs ensure accurate division of defined benefit pension plans while meeting all administrator requirements.",
    keyComponents: [
      {
        title: "✓ Time Rule Formula",
        description:
          "Precise calculation of marital portion using service credit dates",
      },
      {
        title: "✓ Payment Instructions",
        description: "Clear direction for benefit payments to alternate payee",
      },
      {
        title: "✓ Survivor Benefits",
        description:
          "Provisions for survivor benefit elections and protections",
      },
      {
        title: "✓ Plan Compliance",
        description: "Adherence to specific plan administrator requirements",
      },
    ],
    requirements: [
      "Participant and alternate payee information",
      "Marriage and separation dates for time rule calculation",
      "Plan name, number, and administrator details",
    ],
    qualityAssurance:
      "Every QDRO is reviewed for accuracy and compliance before submission. We handle the entire process from preparation through administrator approval, ensuring successful benefit division.",
    colorScheme: "green" as const,
  };

  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        Defined Benefit Plan Division Process
      </h2>
      <div className="grid gap-12 grid-cols-[1fr]">
        <ProcessStep {...step1Data} />
        <ProcessStep {...step2Data} />
        <ProcessStep {...step3Data} />
      </div>
    </section>
  );
}

