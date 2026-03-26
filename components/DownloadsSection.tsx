import React from "react";

export default function DownloadsSection() {
  const steps = [
    {
      number: "1",
      title: "Login to Portal",
      description:
        "Use your account credentials to access the secure client portal where all your documents are stored.",
    },
    {
      number: "2",
      title: "Select Downloads",
      description:
        "Navigate to the downloads section and choose the files you need - QDRO documents, code, or support materials.",
    },
    {
      number: "3",
      title: "Download & Use",
      description:
        "Download your files securely and follow the included instructions for filing or implementation.",
    },
  ];

  return (
    <section className="py-24 bg-stone-950">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl leading-none font-[538] text-stone-50 max-sm:text-4xl">
            Download Your Documents
          </h2>
          <p className="mx-auto my-0 text-xl max-w-[600px] text-slate-300 max-sm:text-lg">
            Access your completed QDRO documents through our secure portal
          </p>
        </div>
        <div className="grid gap-8 mb-16 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          <div className="p-8 text-center rounded-lg border-t border-solid bg-neutral-900 border-t-white border-t-opacity-10">
            <div className="flex justify-center items-center mx-auto mt-0 mb-6 w-16 h-16 bg-green-400 rounded-full">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(8, 9, 10)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-[538] text-stone-50">
              QDRO Documents
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              Download your completed QDRO documents in PDF format, ready for
              court filing and plan administrator submission.
            </p>
            <button className="px-6 py-3 w-full text-base bg-green-400 rounded-lg cursor-pointer border-[none] font-[510] text-zinc-950">
              Download QDRO
            </button>
          </div>
          <div className="p-8 text-center rounded-lg border-t border-solid bg-neutral-900 border-t-white border-t-opacity-10">
            <div className="flex justify-center items-center mx-auto mt-0 mb-6 w-16 h-16 bg-amber-300 rounded-full">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(8, 9, 10)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-[538] text-stone-50">
              Support Files
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              Download supporting documentation, filing instructions, and plan
              administrator contact information.
            </p>
            <button className="px-6 py-3 w-full text-base bg-amber-300 rounded-lg cursor-pointer border-[none] font-[510] text-zinc-950">
              Download Files
            </button>
          </div>
        </div>
        <div className="p-8 text-center rounded-lg border-t border-solid bg-neutral-900 border-t-white border-t-opacity-10">
          <h3 className="mb-4 text-2xl font-[538] text-stone-50">
            How to Access Your Downloads
          </h3>
          <div className="grid gap-6 mt-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {steps.map((step, index) => (
              <div key={index} className="text-left">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 text-sm bg-green-400 rounded-full font-[538] text-zinc-950">
                    {step.number}
                  </div>
                  <h4 className="m-0 text-lg font-[538] text-stone-50">
                    {step.title}
                  </h4>
                </div>
                <p className="m-0 text-base leading-relaxed text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
