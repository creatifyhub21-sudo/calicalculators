import React from 'react';

interface StepsProps {
  steps: string[];
}

const Steps: React.FC<StepsProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-full border border-[#9ACD32]/40 bg-[#9ACD32]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#577c12]">
        Explanation
      </div>
      <h3 className="text-xl font-bold text-slate-900">How the result was calculated</h3>
      <ol className="mt-4 space-y-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#062B52] text-sm font-bold text-white">
              {idx + 1}
            </span>
            <span className="leading-7">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Steps;
