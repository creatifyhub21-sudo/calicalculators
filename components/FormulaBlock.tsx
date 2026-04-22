import React from 'react';

interface FormulaBlockProps {
  title?: string;
  formula: string;
  explanation?: string;
}

export default function FormulaBlock({
  title = 'Formula',
  formula,
  explanation,
}: FormulaBlockProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-3 break-words rounded-xl bg-white px-4 py-3 font-mono text-base font-semibold text-[#062B52] shadow-sm">
        {formula}
      </p>
      {explanation ? <p className="mt-3 text-sm leading-6 text-slate-600">{explanation}</p> : null}
    </div>
  );
}
