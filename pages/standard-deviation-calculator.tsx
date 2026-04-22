import { useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import CalculatorPageShell from '../components/CalculatorPageShell';
import DetailCardGrid from '../components/DetailCardGrid';
import EmptyResultState from '../components/EmptyResultState';
import FormulaBlock from '../components/FormulaBlock';
import PremiumSection from '../components/PremiumSection';
import RelatedCalculators from '../components/RelatedCalculators';
import ResultHero from '../components/ResultHero';
import { BarChart } from '../components/ChartComponents';
import { populationStandardDeviation, sampleStandardDeviation } from '../calculators/stdDeviation';

export default function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState('');
  const [type, setType] = useState<'population' | 'sample'>('population');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [calcSteps, setCalcSteps] = useState<string[]>([]);
  const [valuesState, setValuesState] = useState<number[]>([]);

  const parseNumbers = (input: string): number[] =>
    input
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter((n) => !Number.isNaN(n));

  const summary = useMemo(() => {
    if (!valuesState.length || result === null) return null;
    const mean = valuesState.reduce((sum, v) => sum + v, 0) / valuesState.length;
    const min = Math.min(...valuesState);
    const max = Math.max(...valuesState);
    const varianceDenominator = type === 'population' ? valuesState.length : valuesState.length - 1;
    const squaredDiffs = valuesState.map((v) => Math.pow(v - mean, 2));
    const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / varianceDenominator;
    return { mean, min, max, count: valuesState.length, variance, squaredDiffs };
  }, [valuesState, result, type]);

  const calculate = () => {
    setError('');
    setCalcSteps([]);
    setResult(null);

    const values = parseNumbers(numbers);
    if (values.length === 0) {
      setError('Please enter at least one number.');
      return;
    }
    if (type === 'sample' && values.length < 2) {
      setError('At least two numbers are required for the sample standard deviation.');
      return;
    }

    const std = type === 'population' ? populationStandardDeviation(values) : sampleStandardDeviation(values);
    setResult(std);
    setValuesState(values);

    const n = values.length;
    const mean = values.reduce((sum, v) => sum + v, 0) / n;
    const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
    const varianceDenominator = type === 'population' ? n : n - 1;
    const variance = squaredDiffs.reduce((sum, sd) => sum + sd, 0) / varianceDenominator;

    setCalcSteps([
      `Add all values and divide by the number of values to get the mean: ${values.reduce((sum, v) => sum + v, 0)} ÷ ${n} = ${mean.toFixed(4)}.`,
      `Find each squared difference from the mean: [${squaredDiffs.map((sd) => sd.toFixed(4)).join(', ')}].`,
      `Add the squared differences: ${squaredDiffs.reduce((sum, sd) => sum + sd, 0).toFixed(4)}.`,
      `Divide by ${type === 'population' ? 'N' : 'N − 1'} (${varianceDenominator}) to get the variance: ${variance.toFixed(4)}.`,
      `Take the square root of the variance: √${variance.toFixed(4)} = ${Math.sqrt(variance).toFixed(4)}.`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Math & Statistics"
      title="Standard Deviation Calculator"
      description="Measure how spread out your data values are, with clearer result cards, a distribution chart, and a transparent formula walkthrough."
      left={
        <CalculatorInputPanel
          description="Enter numbers separated by commas or spaces, then choose whether the dataset should be treated as a population or a sample."
          actions={
            <>
              <Button onClick={calculate}>Calculate standard deviation</Button>
              <button
                type="button"
                onClick={() => {
                  setNumbers('');
                  setType('population');
                  setResult(null);
                  setError('');
                  setCalcSteps([]);
                  setValuesState([]);
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Clear
              </button>
            </>
          }
          error={error}
        >
          <Input label="Numbers (comma or space separated)" type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g. 12, 15, 20, 25" />
          <Select label="Type" value={type} onChange={(e) => setType(e.target.value as 'population' | 'sample')} options={[{ value: 'population', label: 'Population' }, { value: 'sample', label: 'Sample' }]} />
        </CalculatorInputPanel>
      }
      right={
        !summary || result === null ? (
          <EmptyResultState text="Your standard deviation summary, supporting chart, and formula explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Standard deviation" value={result.toFixed(4)} badge={type === 'population' ? 'Population' : 'Sample'} />
            <DetailCardGrid items={[
              { title: 'Mean', value: summary.mean.toFixed(4), hint: 'Average of the dataset.' },
              { title: 'Variance', value: summary.variance.toFixed(4), hint: 'Average squared distance from the mean.' },
              { title: 'Count', value: summary.count, hint: 'Number of observations in the dataset.' },
              { title: 'Minimum', value: summary.min, hint: 'Lowest value in the dataset.' },
              { title: 'Maximum', value: summary.max, hint: 'Highest value in the dataset.' },
            ]} />
            <PremiumSection eyebrow="Value distribution" title="Dataset at a glance" description="Each bar represents one value from your dataset, which helps you see how far values sit from the center.">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[320px]">
                  <BarChart data={{ labels: valuesState.map((_, idx) => `Value ${idx + 1}`), datasets: [{ label: 'Value', data: valuesState, backgroundColor: 'rgba(6,43,82,0.85)', borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
                </div>
              </div>
            </PremiumSection>
            <FormulaBlock formula={type === 'population' ? 'σ = √[Σ(x − μ)² / N]' : 's = √[Σ(x − x̄)² / (N − 1)]'} explanation="Population standard deviation uses the full count N. Sample standard deviation uses N − 1, which is Bessel’s correction for estimating spread from a sample." />
            <Steps steps={calcSteps} />
            <AboutResult paragraphs={[
              'Standard deviation measures how tightly or loosely values cluster around the mean. A smaller value means the dataset is more tightly grouped.',
              'Use population standard deviation when you have the full dataset. Use sample standard deviation when your data is only a sample of a larger population.',
              'When the mean alone hides important differences between datasets, standard deviation gives a clearer view of consistency and volatility.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Statistics Calculator', href: '/statistics-calculator', description: 'Review variance, range, median, mode, and additional summary values.' },
              { name: 'Mean, Median, Mode & Range Calculator', href: '/mean-median-mode-range-calculator', description: 'See the most common descriptive statistics together.' },
              { name: 'Average Calculator', href: '/average-calculator', description: 'Check the arithmetic mean before analyzing spread.' },
            ]} />
          </>
        )
      }
    />
  );
}
