import React from 'react';

interface PremiumSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PremiumSection({
  eyebrow,
  title,
  description,
  children,
}: PremiumSectionProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      {eyebrow ? (
        <div className="mb-3 inline-flex rounded-full border border-[#9ACD32]/40 bg-[#9ACD32]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#577c12]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-slate-600">{description}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
