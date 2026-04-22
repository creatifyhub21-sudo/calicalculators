import React from 'react';

export default function UseCasesSection({ title = 'Where this calculator helps', items }: { title?: string; items: string[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Use cases</p>
      <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <article key={item} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#062B52] text-sm font-bold text-white">{index + 1}</div>
            <p className="mt-4 leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
