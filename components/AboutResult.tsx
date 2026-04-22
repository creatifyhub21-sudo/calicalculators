import React from 'react';

interface AboutResultProps {
  title?: string;
  paragraphs: string[];
}

export default function AboutResult({
  title = 'About this result',
  paragraphs,
}: AboutResultProps) {
  if (!paragraphs.length) return null;
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <div className="mt-4 space-y-4 text-slate-600">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
