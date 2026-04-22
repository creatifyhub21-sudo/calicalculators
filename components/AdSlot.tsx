type AdSlotProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
  style,
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client || !slot) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 ${className}`}
        style={style}
      >
        Ad space
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}