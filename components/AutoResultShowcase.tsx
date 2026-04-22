import React from 'react';

function prettifyLabel(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') {
    if ('numerator' in value && 'denominator' in value) {
      return `${value.numerator}/${value.denominator}`;
    }
    return Object.entries(value)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${prettifyLabel(k)}: ${formatValue(v)}`)
      .join(' • ');
  }
  return String(value);
}

function normalizeItems(data: any) {
  if (data === null || data === undefined) return [];
  if (typeof data !== 'object' || Array.isArray(data)) {
    return [{ label: 'Result', value: formatValue(data) }];
  }
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0))
    .map(([key, value]) => ({
      label: prettifyLabel(key),
      value: formatValue(value),
    }));
}

interface AutoResultShowcaseProps {
  title?: string;
  data: any;
  about?: string;
}

export default function AutoResultShowcase({
  title = 'Result Summary',
  data,
  about,
}: AutoResultShowcaseProps) {
  const items = normalizeItems(data);
  if (!items.length) return null;

  const hero = items[0];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 inline-flex rounded-full border border-[#9ACD32]/40 bg-[#9ACD32]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#577c12]">
          Result
        </div>
        <h2 className="text-2xl font-black text-slate-900">{title}</h2>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{hero.label}</p>
          <p className="mt-2 text-4xl font-black text-[#062B52]">{hero.value}</p>
        </div>

        {items.length > 1 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.slice(1).map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">How to read this result</h3>
        <div className="mt-4 space-y-3 text-slate-600">
          <p>
            The values above are generated directly from the inputs you entered into this calculator. The main highlighted figure is the primary answer, while the supporting cards break out related totals or sub-results.
          </p>
          <p>
            Update any input and calculate again to compare scenarios. This makes it easier to test different values and understand how each input affects the outcome.
          </p>
          {about ? <p>{about}</p> : null}
        </div>
      </section>
    </div>
  );
}
