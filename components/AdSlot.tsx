import { useEffect, useMemo } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot?: string;
  label?: string;
  minHeight?: number;
  className?: string;
  intent?: 'sidebar' | 'inline' | 'mobile';
}

export default function AdSlot({
  slot,
  label = 'Advertisement',
  minHeight = 250,
  className = '',
  intent = 'inline',
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isReady = Boolean(client && slot && !slot.startsWith('demo-'));

  useEffect(() => {
    if (!isReady) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore ad render errors during development or repeated hydration.
    }
  }, [isReady, slot]);

  const helperCopy = useMemo(() => {
    if (intent === 'sidebar') return 'Adaptive sidebar ad';
    if (intent === 'mobile') return 'Mobile in-content ad';
    return 'Responsive in-content ad';
  }, [intent]);

  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm ${className}`}
      style={{ minHeight }}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
        <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Sponsored
        </span>
      </div>

      {isReady ? (
        <div className="px-3 py-3">
          <ins
            className="adsbygoogle block w-full"
            style={{ display: 'block', minHeight: `${Math.max(minHeight - 24, 120)}px` }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div className="flex h-full min-h-[180px] flex-col items-center justify-center px-5 py-8 text-center">
          <div className="rounded-full border border-[#9ACD32]/35 bg-[#f6fbe8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#577c12]">
            {helperCopy}
          </div>
          <p className="mt-3 max-w-xs text-sm font-semibold text-slate-700">AdSense-ready placement</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Add your AdSense client and slot IDs to replace this placeholder without shifting the page layout.
          </p>
        </div>
      )}
    </div>
  );
}
