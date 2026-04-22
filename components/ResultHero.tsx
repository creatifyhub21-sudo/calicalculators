import React from 'react';

interface ResultHeroProps {
  eyebrow?: string;
  title: string;
  value: string;
  badge?: string;
  badgeClassName?: string;
}

export default function ResultHero({
  eyebrow = 'Result',
  title,
  value,
  badge,
  badgeClassName = 'bg-[#9ACD32]/15 text-[#577c12]',
}: ResultHeroProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
          <p className="mt-2 text-4xl font-black text-[#062B52]">{value}</p>
        </div>
        {badge ? (
          <div className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${badgeClassName}`}>
            {badge}
          </div>
        ) : null}
      </div>
    </div>
  );
}
