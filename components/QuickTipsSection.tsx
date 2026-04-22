import React from 'react';

export default function QuickTipsSection({ items }: { items: string[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Better results</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Ways to get a more useful answer</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 leading-7 text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
