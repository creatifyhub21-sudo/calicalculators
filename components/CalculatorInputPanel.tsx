import React from 'react';

interface CalculatorInputPanelProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  error?: string | null;
}

export default function CalculatorInputPanel({
  title = 'Inputs',
  description,
  children,
  actions,
  error,
}: CalculatorInputPanelProps) {
  return (
    <section id="calculator-input-panel" className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm scroll-mt-28 xl:flex xl:max-h-[calc(100vh-7rem)] xl:flex-col">
      <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>

      <div className="p-6 xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
        <div className="mb-5 flex flex-wrap gap-2">
          {['Clear labels', 'Quick validation', 'Mobile friendly'].map((item) => (
            <div key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {item}
            </div>
          ))}
        </div>

        <div className="space-y-4">{children}</div>
        {actions ? <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 bg-white pt-4 xl:sticky xl:bottom-0 xl:pb-1">{actions}</div> : null}
        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {error}
          </div>
        ) : null}
      </div>
    </section>
  );
}
