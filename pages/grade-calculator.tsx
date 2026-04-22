import { useMemo, useState } from 'react';
import { BarChart } from '../components/ChartComponents';
import Input from '../components/Input';
import Button from '../components/Button';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import { calculateWeightedGrade } from '../calculators/grade';

export default function GradeCalculator() {
  interface Item { score: string; weight: string; }
  const [items, setItems] = useState<Item[]>([{ score: '', weight: '' }]);
  const [result, setResult] = useState<number | null>(null);
  const [summary, setSummary] = useState<{ totalWeight: number; weightedSum: number } | null>(null);
  const [error, setError] = useState('');

  const handleChange = (index: number, field: keyof Item, value: string) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  };

  const addItem = () => setItems((prev) => [...prev, { score: '', weight: '' }]);
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const parsedItems = useMemo(() => items.map((it) => ({
    score: parseFloat(it.score),
    weight: parseFloat(it.weight),
  })), [items]);

  const calculate = () => {
    setError('');
    setResult(null);
    try {
      const parsed = items.map((item) => {
        const score = parseFloat(item.score);
        const weight = parseFloat(item.weight);
        if (isNaN(score) || isNaN(weight) || weight < 0) {
          throw new Error('Please enter valid scores and non-negative weights.');
        }
        return { score, weight };
      });
      const grade = calculateWeightedGrade(parsed);
      const totalWeight = parsed.reduce((s, x) => s + x.weight, 0);
      const weightedSum = parsed.reduce((s, x) => s + x.score * x.weight, 0);
      setResult(grade);
      setSummary({ totalWeight, weightedSum });
    } catch (err: any) {
      setError(err.message || 'Invalid input');
    }
  };

  const steps = result !== null && summary ? [
    `Multiply each score by its weight to get weighted contribution.`,
    `Add all weighted contributions to get ${summary.weightedSum.toFixed(2)}.`,
    `Add all weights to get ${summary.totalWeight.toFixed(2)}.`,
    `Divide weighted sum by total weight: ${summary.weightedSum.toFixed(2)} ÷ ${summary.totalWeight.toFixed(2)} = ${result.toFixed(2)}.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Grade Calculator"
      description="Compute a weighted average grade from scores and their assignment weights."
      left={
        <CalculatorInputPanel
          description="Enter each score and its corresponding weight, then calculate the weighted grade."
          actions={
            <>
              <Button onClick={calculate}>Calculate grade</Button>
              <button type="button" onClick={addItem} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">+ Add Item</button>
            </>
          }
          error={error}
        >
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]">
              <Input label={`Score (Item ${index + 1})`} type="number" value={item.score} onChange={(e) => handleChange(index, 'score', e.target.value)} />
              <Input label="Weight" type="number" value={item.weight} onChange={(e) => handleChange(index, 'weight', e.target.value)} placeholder="e.g. 20 for 20%" />
              {items.length > 1 ? <button type="button" onClick={() => removeItem(index)} className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">Remove</button> : <div />}
            </div>
          ))}
        </CalculatorInputPanel>
      }
      right={
        result === null || !summary ? (
          <EmptyResultState text="Your weighted grade summary and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Weighted average grade" value={`${result.toFixed(2)}%`} />
            <DetailCardGrid items={[
              { title: 'Total weight', value: summary.totalWeight.toFixed(2) },
              { title: 'Weighted sum', value: summary.weightedSum.toFixed(2) },
              { title: 'Items', value: items.length },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Weights by item</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: parsedItems.map((_, idx) => `Item ${idx + 1}`), datasets: [{ label: 'Weight', data: parsedItems.map((x) => isNaN(x.weight) ? 0 : x.weight), backgroundColor: 'rgba(154,205,50,0.9)', borderRadius: 8 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Weight' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula="Weighted Grade = Σ(Score × Weight) ÷ Σ(Weight)" explanation="Each item contributes according to its weight rather than counting equally." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Weighted grades are useful when tests, homework, projects, and finals do not all count equally.',
              'If weights are percentages, make sure they match your course syllabus. If they are points, the same weighted-average logic still applies.',
            ]} />
          </>
        )
      }
    />
  );
}
