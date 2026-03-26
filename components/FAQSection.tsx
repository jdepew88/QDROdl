"use client";
import React, { useState } from "react";

export default function FAQSection() {
  const [showFAQ, setShowFAQ] = useState({});

  const faqs = [
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

  function toggleFAQ(index) {
    setShowFAQ((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  return (
    <section id="faq" className="py-24 bg-stone-950">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl leading-none font-[538] text-stone-50 max-sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto my-0 text-xl max-w-[600px] text-slate-300 max-sm:text-lg">
            Common questions about QDRO preparation and process
          </p>
        </div>
        <div className="mx-auto my-0 max-w-[800px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden mb-4 rounded-lg bg-neutral-900"
            >
              <button
                className="flex justify-between items-center p-6 w-full text-left bg-transparent cursor-pointer border-[none]"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="m-0 text-xl font-[538] text-stone-50">
                  {faq.question}
                </h3>
                <span
                  className="text-2xl transition-transform duration-[0.3s] ease-[ease] text-neutral-400"
                  style={{
                    transform: showFAQ[index]
                      ? "rotate(45deg)"
                      : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {showFAQ[index] && (
                <div className="px-6 pt-0 pb-6 border-t border-solid border-t-white border-t-opacity-10">
                  <p className="mx-0 mt-4 mb-0 text-lg leading-relaxed text-slate-300">
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
