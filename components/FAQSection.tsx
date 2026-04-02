"use client";

import React, { useState } from "react";

type FaqItem = { question: string; answer: string };

const faqs: FaqItem[] = [
  {
    question: "How long does the QDRO process take?",
    answer:
      "Typically 2-4 weeks from start to finish, depending on plan complexity and court requirements.",
  },
  {
    question: "Do I need a QDRO for all retirement accounts?",
    answer:
      "QDROs are required for employer-sponsored plans like 401(k)s and pensions. IRAs can be divided through the divorce decree.",
  },
  {
    question: "What is a joinder, and when is it required?",
    answer:
      "A joinder is a pleading that asks the court to make the retirement plan a party to your dissolution case. Some plan administrators require it before they will review a draft domestic relations order or a filed order. Others do not. Whether you need one depends on your specific plan’s rules and sometimes local court practice—not on whether you use QDROdl.",
  },
  {
    question: "Does QDROdl prepare joinders for every case?",
    answer:
      "No. We prepare joinders only when your plan administrator or procedure requires the plan to be joined to the case. It is not a default add-on. If a joinder applies to your matter, we explain how it fits in the timeline, what we need from you, and how it is priced—after we know your plan and county. The QDRO prep process walkthrough (Get started, and Process under your dashboard when you are logged in) explains where joinders fit. The Joinders plan guide summarizes which kinds of plans typically require joinder.",
  },
  {
    question: "What happens if the plan administrator rejects the QDRO?",
    answer:
      "We work with the plan administrator to address any issues and revise the QDRO at no additional cost.",
  },
  {
    question: "Can a QDRO be modified after approval?",
    answer:
      "QDROs can only be modified in limited circumstances. It's crucial to get it right the first time.",
  },
  {
    question: "Do you handle federal retirement plans?",
    answer:
      "Yes, we specialize in TSP, FERS, CSRS, and military retirement benefit divisions.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  function toggleFAQ(index: number) {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <section id="faq" className="bg-stone-950 py-24">
      <div className="mx-auto max-w-screen-lg px-6 py-0">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl font-[538] leading-none text-stone-50 max-sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto my-0 max-w-[600px] text-xl text-slate-300 max-sm:text-lg">
            Common questions about QDRO preparation and process
          </p>
        </div>
        <div className="mx-auto max-w-[800px]">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="mb-4 overflow-hidden rounded-lg bg-neutral-900"
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={Boolean(open[index])}
              >
                <h3 className="m-0 pr-4 text-xl font-[538] text-stone-50">
                  {faq.question}
                </h3>
                <span
                  className="shrink-0 text-2xl text-neutral-400 transition-transform duration-[0.3s] ease-[ease]"
                  style={{
                    transform: open[index] ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {open[index] && (
                <div className="border-t border-solid border-t-white border-t-opacity-10 px-6 pb-6 pt-0">
                  <p className="mx-0 mb-0 mt-4 text-lg leading-relaxed text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
