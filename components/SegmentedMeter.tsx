import React from 'react';

interface Segment {
  label: string;
  min: number;
  max: number;
  colorClass: string;
}

interface SegmentedMeterProps {
  value: number;
  max?: number;
  segments: Segment[];
  caption?: string;
}

export default function SegmentedMeter({
  value,
  max = 40,
  segments,
  caption,
}: SegmentedMeterProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const leftPercent = (clamped / max) * 100;

  return (
    <div className="w-full">
      <div className="relative pt-8">
        <div
          className="absolute top-0 -translate-x-1/2 text-xs font-semibold text-slate-700"
          style={{ left: `${leftPercent}%` }}
        >
          {value.toFixed(1)}
        </div>
        <div
          className="absolute top-5 h-5 w-0.5 bg-slate-900 -translate-x-1/2"
          style={{ left: `${leftPercent}%` }}
        />
        <div className="overflow-hidden rounded-full border border-slate-200 shadow-inner">
          <div className="flex h-6 w-full">
            {segments.map((segment) => {
              const width = ((segment.max - segment.min) / max) * 100;
              return (
                <div
                  key={segment.label}
                  className={segment.colorClass}
                  style={{ width: `${width}%` }}
                  title={`${segment.label}: ${segment.min} - ${segment.max}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {segments.map((segment) => (
          <div key={segment.label} className="rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700">
            <div className={`mb-1 inline-block h-2.5 w-2.5 rounded-full ${segment.colorClass}`} />
            <div className="font-medium">{segment.label}</div>
            <div>{segment.min} - {segment.max}</div>
          </div>
        ))}
      </div>

      {caption ? <p className="mt-3 text-sm text-slate-600">{caption}</p> : null}
    </div>
  );
}
