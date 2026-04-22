import { useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
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
import { calculateMeanMedianModeRange } from '../calculators/statistics';

export default function MeanMedianModeRangeCalculator() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateMeanMedianModeRange> | null>(null);
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

  const sortedValues = useMemo(() => [...valuesState].sort((a, b) => a - b), [valuesState]);

  const calculate = () => {
    setError('');
    setResult(null);
    setCalcSteps([]);
    const values = parseNumbers(numbers);
    if (!values.length) {
      setError('Please enter at least one number.');
      return;
    }
    const summary = calculateMeanMedianModeRange(values);
    setValuesState(values);
    setResult(summary);
    const sum = values.reduce((acc, value) => acc + value, 0);
    setCalcSteps([
      `Sort the dataset to make the middle and spread easier to read: [${[...values].sort((a, b) => a - b).join(', ')}].`,
      `Mean = sum ÷ count = ${sum} ÷ ${values.length} = ${summary.mean.toFixed(4)}.`,
      `Median is the middle value of the sorted list${values.length % 2 === 0 ? ', or the average of the two middle values when the count is even' : ''}.`,
      `Mode is the value${Array.isArray(summary.mode) && summary.mode.length > 1 ? 's' : ''} that appears most often: ${summary.mode.length ? summary.mode.join(', ') : 'none'}.`,
      `Range = maximum − minimum = ${Math.max(...values)} − ${Math.min(...values)} = ${summary.range}.`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Math & Statistics"
      title="Mean, Median, Mode & Range Calculator"
      description="Summarize a dataset with the four most-used descriptive statistics in a premium layout with steps, charting, and supporting explanation."
      left={
        <CalculatorInputPanel
          description="Enter numbers separated by commas or spaces. The calculator will summarize the dataset using four common measures of center and spread."
          actions={
            <>
              <Button onClick={calculate}>Calculate statistics</Button>
              <button
                type="button"
                onClick={() => {
                  setNumbers('');
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
          <Input label="Numbers (comma or space separated)" type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g. 2, 5, 5, 7, 10" />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Enter a dataset to see the mean, median, mode, range, chart, and calculation walkthrough." />
        ) : (
          <>
            <ResultHero title="Mean" value={result.mean.toFixed(4)} badge={`${valuesState.length} values`} />
            <DetailCardGrid items={[
              { title: 'Median', value: result.median.toFixed(4), hint: 'The center of the sorted dataset.' },
              { title: 'Mode', value: result.mode.length ? result.mode.join(', ') : 'No mode', hint: 'Most frequent value(s).' },
              { title: 'Range', value: result.range, hint: 'Difference between the largest and smallest values.' },
              { title: 'Minimum', value: sortedValues[0], hint: 'Smallest value in the dataset.' },
              { title: 'Maximum', value: sortedValues[sortedValues.length - 1], hint: 'Largest value in the dataset.' },
            ]} />
            <PremiumSection eyebrow="Dataset view" title="Sorted values" description="This chart shows the values in ascending order so you can quickly spot the middle and the spread.">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[300px]">
                  <BarChart data={{ labels: sortedValues.map((_, i) => `#${i + 1}`), datasets: [{ label: 'Sorted values', data: sortedValues, backgroundColor: 'rgba(6,43,82,0.85)', borderRadius: 10 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }} />
                </div>
              </div>
            </PremiumSection>
            <FormulaBlock formula="Mean = sum ÷ count; Median = middle value; Mode = most frequent value; Range = max − min." explanation="These four measures answer different questions about a dataset: average level, middle point, most common value, and overall spread." />
            <Steps steps={calcSteps} />
            <AboutResult paragraphs={[
              'Mean is the average, but it can move a lot when outliers are present. Median is often more stable when the dataset includes unusually high or low values.',
              'Mode is useful when repeated values matter, such as most common order size, score, or rating.',
              'Range gives the simplest possible measure of spread. For deeper spread analysis, use the standard deviation or full statistics calculator.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Statistics Calculator', href: '/statistics-calculator', description: 'Get a fuller dataset summary including variance and standard deviation.' },
              { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator', description: 'Measure how tightly or loosely the values cluster around the mean.' },
              { name: 'Average Calculator', href: '/average-calculator', description: 'Focus only on the arithmetic mean for simple quick checks.' },
            ]} />
          </>
        )
      }
    />
  );
}
