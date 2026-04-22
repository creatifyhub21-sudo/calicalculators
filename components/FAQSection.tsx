import React from 'react';
import type { FAQItem } from '../data/calculatorContent';

export default function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">FAQ</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Frequently asked questions</h2>
        <p className="mt-3 text-slate-600">Quick answers that make the result easier to trust, compare, and apply.</p>
      </div>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 open:bg-white open:shadow-sm">
            <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-900 marker:hidden">
              {item.question}
              <span className="float-right text-slate-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
