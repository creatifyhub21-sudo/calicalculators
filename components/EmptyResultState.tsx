import React from 'react';

interface EmptyResultStateProps {
  text: string;
}

export default function EmptyResultState({ text }: EmptyResultStateProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-slate-500 shadow-sm">
      {text}
    </div>
  );
}
