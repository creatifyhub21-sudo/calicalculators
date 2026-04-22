type AdSlotProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
  intent?: string;
  minHeight?: number | string;
};

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
  style,
  intent,
  minHeight,
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client || !slot) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 ${className}`}
        style={{ minHeight, ...style }}
      >
        Ad space
      </div>
    );
  }

  return (
    <div className={className} style={{ minHeight, ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-intent={intent}
      />
    </div>
  );
}