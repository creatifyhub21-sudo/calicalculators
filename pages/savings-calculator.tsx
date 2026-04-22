import { useMemo, useState } from 'react';
import { LineChart, PieChart } from '../components/ChartComponents';
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
import { calculateSavings } from '../calculators/savings';

export default function SavingsCalculator() {
  const [principal, setPrincipal] = useState('');
  const [contribution, setContribution] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ finalAmount: number; totalContributions: number; interestEarned: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ p: parseFloat(principal), c: parseFloat(contribution), r: parseFloat(rate), y: parseFloat(years) }), [principal, contribution, rate, years]);

  const calculate = () => {
    setError('');
    if ([parsed.p, parsed.c, parsed.r, parsed.y].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.p < 0 || parsed.c < 0 || parsed.r < 0 || parsed.y < 0) return setError('Values cannot be negative.');
    setResult(calculateSavings(parsed.p, parsed.c, parsed.r, parsed.y));
  };

  const series = useMemo(() => {
    if (!result) return [];
    const fullYears = Math.max(1, Math.ceil(parsed.y));
    return Array.from({ length: fullYears + 1 }, (_, i) => {
      const y = Math.min(i, parsed.y);
      return { year: y, amount: calculateSavings(parsed.p, parsed.c, parsed.r, y).finalAmount };
    });
  }, [result, parsed]);

  const steps = result ? [
    `Grow the initial deposit using monthly compounding over ${parsed.y} years.`,
    `Add the future value of monthly contributions made over the same time period.`,
    `Combine the two growth pieces to estimate a final balance of $${result.finalAmount.toFixed(2)}.`,
    `Subtract total contributions from final balance to estimate interest earned.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Savings Calculator"
      description="Project the future value of savings with an initial deposit, recurring monthly contributions, and compound growth."
      left={<CalculatorInputPanel description="Enter starting savings, monthly additions, annual return, and time horizon." actions={<Button onClick={calculate}>Calculate savings</Button>} error={error}>
        <Input label="Initial deposit ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Input label="Monthly contribution ($)" type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} />
        <Input label="Annual rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your savings projection and growth charts will appear here after calculation." /> : (
        <>
          <ResultHero title="Projected savings balance" value={`$${result.finalAmount.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Total contributions', value: `$${result.totalContributions.toFixed(2)}` },
            { title: 'Interest earned', value: `$${result.interestEarned.toFixed(2)}` },
            { title: 'Monthly contribution', value: `$${parsed.c.toFixed(2)}` },
          ]} />
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Growth over time</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <LineChart data={{ labels: series.map((s) => String(s.year)), datasets: [{ label: 'Savings Value', data: series.map((s) => Number(s.amount.toFixed(2))), borderColor: 'rgb(6,43,82)', backgroundColor: 'rgba(154,205,50,0.25)', fill: true, tension: 0.25, pointRadius: 3 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Years' } }, y: { title: { display: true, text: 'Value ($)' } } } }} />
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Contributions vs growth</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <PieChart data={{ labels: ['Contributions', 'Interest Earned'], datasets: [{ data: [result.totalContributions, result.interestEarned], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderWidth: 0 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            </div>
          </section>
          <FormulaBlock formula="FV = PV(1+i)^n + PMT × ((1+i)^n − 1) ÷ i" explanation="This combines growth of the starting deposit with the future value of recurring monthly contributions." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['Consistent contributions are often just as important as the rate of return over long periods.', 'Starting earlier gives compound growth more time to work, which can significantly increase the ending balance.']} />
        </>
      )}
    />
  );
}
