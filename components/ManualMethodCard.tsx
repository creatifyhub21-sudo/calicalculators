import React from 'react';

export default function ManualMethodCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Manual method</p>
      <h2 className="mt-2 text-2xl font-black text-slate-900">How to work it out without the calculator</h2>
      <p className="mt-3 text-slate-600">Use this quick framework when you want to verify the result by hand or explain the process to someone else.</p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f7d9] text-sm font-bold text-[#577c12]">{index + 1}</div>
            <div>
              <p className="font-semibold text-slate-900">Step {index + 1}</p>
              <p className="mt-1 leading-7 text-slate-600">{step}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 rounded-2xl border border-[#9ACD32]/30 bg-[#f6fbe8] p-4 text-sm leading-6 text-[#3d5f0e]">
        Tip: use the displayed formula and keep units consistent from start to finish. That removes most of the mistakes people make when checking a {title.toLowerCase()} manually.
      </div>
    </section>
  );
}
