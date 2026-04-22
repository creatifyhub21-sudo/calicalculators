import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import InfoCard from '../components/InfoCard';
import SegmentedMeter from '../components/SegmentedMeter';
import Steps from '../components/Steps';
import RelatedCalculators from '../components/RelatedCalculators';
import QuickTipsSection from '../components/QuickTipsSection';
import UseCasesSection from '../components/UseCasesSection';
import ManualMethodCard from '../components/ManualMethodCard';
import FAQSection from '../components/FAQSection';
import ResultActions from '../components/ResultActions';
import { absoluteUrl, siteConfig } from '../data/siteConfig';
import AdSlot from '../components/AdSlot';
import { calculateBMI, getBMICategory } from '../calculators/bmi';
import { getRelatedCalculators } from '../data/calculatorDirectory';
import { adSlots } from '../data/adSlots';
import { getCalculatorContent } from '../data/calculatorContent';

const bmiSegments = [
  { label: 'Underweight', min: 0, max: 18.5, colorClass: 'bg-amber-400' },
  { label: 'Healthy', min: 18.5, max: 25, colorClass: 'bg-emerald-500' },
  { label: 'Overweight', min: 25, max: 30, colorClass: 'bg-yellow-400' },
  { label: 'Obesity', min: 30, max: 40, colorClass: 'bg-rose-500' },
];

function poundsToKg(lb: number) {
  return lb * 0.45359237;
}

function inchesToMeters(inches: number) {
  return inches * 0.0254;
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [error, setError] = useState('');
  const [calcSteps, setCalcSteps] = useState<string[]>([]);

  const numericWeight = parseFloat(weight);
  const numericHeight = parseFloat(height);

  const relatedItems = useMemo(() => getRelatedCalculators('BMI Calculator', 'Fitness & Health', 6), []);
  const content = useMemo(
    () => getCalculatorContent(
      'BMI Calculator',
      'Fitness & Health',
      'Calculate body mass index with category guidance, healthy-weight ranges, and supporting context.'
    ),
    []
  );

  const detailValues = useMemo(() => {
    if (!result || isNaN(numericWeight) || isNaN(numericHeight) || numericHeight <= 0) {
      return null;
    }

    const heightMeters = units === 'metric' ? numericHeight / 100 : inchesToMeters(numericHeight);
    const weightKg = units === 'metric' ? numericWeight : poundsToKg(numericWeight);

    const healthyMinKg = 18.5 * heightMeters * heightMeters;
    const healthyMaxKg = 24.9 * heightMeters * heightMeters;
    const healthyMinLb = healthyMinKg * 2.20462262;
    const healthyMaxLb = healthyMaxKg * 2.20462262;
    const bmiPrime = result.bmi / 25;
    const ponderalIndex = weightKg / Math.pow(heightMeters, 3);

    return {
      heightMeters,
      weightKg,
      healthyMinKg,
      healthyMaxKg,
      healthyMinLb,
      healthyMaxLb,
      bmiPrime,
      ponderalIndex,
    };
  }, [result, numericWeight, numericHeight, units]);

  const calculate = () => {
    setError('');
    setCalcSteps([]);
    setResult(null);

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h)) {
      setError('Please enter valid numbers');
      return;
    }
    if (w <= 0 || h <= 0) {
      setError('Values must be positive');
      return;
    }

    const bmi = calculateBMI(w, h, units);
    const category = getBMICategory(bmi);
    setResult({ bmi: parseFloat(bmi.toFixed(1)), category });

    if (units === 'metric') {
      const meters = h / 100;
      setCalcSteps([
        `Convert height from centimeters to meters: ${h} cm ÷ 100 = ${meters.toFixed(2)} m`,
        `Square the height in meters: ${meters.toFixed(2)} × ${meters.toFixed(2)} = ${(meters * meters).toFixed(4)}`,
        `Divide body weight by height squared: ${w} ÷ ${(meters * meters).toFixed(4)} = ${bmi.toFixed(1)}`,
        `Compare the result with BMI categories to classify it as ${category}.`,
      ]);
    } else {
      setCalcSteps([
        `Use the imperial BMI formula: BMI = 703 × weight(lb) ÷ height(in)^2`,
        `Square the height in inches: ${h} × ${h} = ${(h * h).toFixed(0)}`,
        `Multiply the weight by 703: ${w} × 703 = ${(w * 703).toFixed(0)}`,
        `Divide ${(w * 703).toFixed(0)} by ${(h * h).toFixed(0)} to get ${bmi.toFixed(1)}, which falls in the ${category} range.`,
      ]);
    }
  };

  useEffect(() => {
    const handleAutoScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId || 'calculator-result-content';
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.addEventListener('calculator:scrollToResult', handleAutoScroll as EventListener);
    return () => window.removeEventListener('calculator:scrollToResult', handleAutoScroll as EventListener);
  }, []);

  const bmiJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BMI Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: content.metaDescription,
    url: absoluteUrl('/bmi-calculator'),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords.join(', ')} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/bmi-calculator')} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={absoluteUrl('/bmi-calculator')} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bmiJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>
      <Navbar />
      <div className="mx-auto max-w-[1500px] px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)_260px] xl:grid-cols-[400px_minmax(0,1fr)_300px] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div id="calculator-input-panel" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm scroll-mt-28">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Inputs</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Enter your measurements</h2>
              <p className="mt-3 text-slate-600">Choose a unit system, add height and weight, then calculate BMI instantly.</p>
              <div className="mt-6 space-y-4">
                <Select
                  label="Units"
                  value={units}
                  onChange={(e) => setUnits(e.target.value as 'metric' | 'imperial')}
                  options={[
                    { label: 'Metric (kg / cm)', value: 'metric' },
                    { label: 'Imperial (lb / in)', value: 'imperial' },
                  ]}
                />
                <Input label={units === 'metric' ? 'Weight (kg)' : 'Weight (lb)'} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <Input label={units === 'metric' ? 'Height (cm)' : 'Height (in)'} type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
                <Button onClick={calculate}>Calculate BMI</Button>
              </div>
            </div>
            <QuickTipsSection items={content.quickTips} />
            <div className="lg:hidden">
              <AdSlot slot={adSlots.bmi.inlinePrimary} intent="mobile" minHeight={180} />
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-[#f5fae8] p-6 shadow-sm lg:block xl:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-[#9ACD32]/30 bg-[#062B52]/5 px-3 py-1 text-sm font-semibold text-[#062B52]">
                  Fitness &amp; Health Calculator
                </div>
                <h1 className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">BMI Calculator</h1>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Calculate body mass index with category guidance, healthy-weight ranges, and premium result cards that help you interpret the number.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {content.highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                    <div className="text-sm font-semibold uppercase tracking-wide text-[#577c12]">Why this helps</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <ResultActions title="BMI Calculator" targetId="calculator-result-content" inputTargetId="calculator-input-panel" />
            <div id="calculator-result-content" className="space-y-6 scroll-mt-28">
            {!result ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Your BMI result will appear here</h2>
                <p className="mt-3 text-slate-600">Get the score, category, healthy-weight range, and a step-by-step breakdown after you calculate.</p>
              </div>
            ) : (
              <>
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Result</p>
                  <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 sm:text-5xl">{result.bmi.toFixed(1)}</h2>
                      <p className="mt-2 text-lg font-semibold text-[#577c12]">{result.category}</p>
                    </div>
                    <div className="rounded-2xl border border-[#9ACD32]/30 bg-[#f6fbe8] px-4 py-3 text-sm leading-6 text-[#3d5f0e]">
                      BMI is a screening metric that compares body weight with height. It works best when viewed alongside your activity, body composition, and long-term trends.
                    </div>
                  </div>
                  <div className="mt-6">
                    <SegmentedMeter value={result.bmi} min={0} max={40} segments={bmiSegments} />
                  </div>
                </div>

                {detailValues && (
                  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard title="Healthy range (kg)" value={`${detailValues.healthyMinKg.toFixed(1)} - ${detailValues.healthyMaxKg.toFixed(1)}`} description="Based on BMI 18.5 to 24.9." />
                    <InfoCard title="Healthy range (lb)" value={`${detailValues.healthyMinLb.toFixed(1)} - ${detailValues.healthyMaxLb.toFixed(1)}`} description="Imperial equivalent for the same healthy BMI range." />
                    <InfoCard title="BMI Prime" value={detailValues.bmiPrime.toFixed(2)} description="BMI divided by 25. Values over 1 are above the standard upper healthy threshold." />
                    <InfoCard title="Ponderal Index" value={detailValues.ponderalIndex.toFixed(2)} description="A height-adjusted body-size metric sometimes used alongside BMI." />
                  </section>
                )}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Formula</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-900">How BMI is calculated</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-500">Metric</p>
                      <p className="mt-3 text-xl font-bold text-slate-900">BMI = weight (kg) ÷ height² (m²)</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-500">Imperial</p>
                      <p className="mt-3 text-xl font-bold text-slate-900">BMI = 703 × weight (lb) ÷ height² (in²)</p>
                    </div>
                  </div>
                </div>

                <Steps steps={calcSteps} />
                <UseCasesSection items={content.useCases} />
                <ManualMethodCard title="BMI Calculator" steps={content.manualSteps} />
                <FAQSection items={content.faqs} />
              </>
            )}
            </div>

            <RelatedCalculators
              items={relatedItems}
              title="Related calculators"
              description="Use nearby health tools to turn your BMI result into a calorie, protein, target weight, or body-composition plan."
            />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot={adSlots.bmi.sidebarTop} intent="sidebar" minHeight={280} />
              <div className="hidden xl:block">
                <AdSlot slot={adSlots.bmi.sidebarBottom} intent="sidebar" minHeight={320} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
