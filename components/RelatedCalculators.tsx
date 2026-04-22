import Link from 'next/link';
import PremiumSection from './PremiumSection';

interface RelatedCalculatorItem {
  name: string;
  href: string;
  description?: string;
}

interface RelatedCalculatorsProps {
  title?: string;
  description?: string;
  items: RelatedCalculatorItem[];
}

export default function RelatedCalculators({
  title = 'Related calculators',
  description = 'Explore nearby tools to compare scenarios, validate your result, or continue your workflow.',
  items,
}: RelatedCalculatorsProps) {
  if (!items.length) return null;

  return (
    <PremiumSection
      eyebrow="Explore more"
      title={title}
      description={description}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-[#9ACD32]/40 hover:bg-white hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#062B52]">{item.name}</h3>
            {item.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-semibold text-[#062B52]">Open calculator →</div>
          </Link>
        ))}
      </div>
    </PremiumSection>
  );
}
