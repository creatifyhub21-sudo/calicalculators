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
import { futureValue } from '../calculators/finance';

export default function InvestmentCalculator() {
  const [principal, setPrincipal] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ p: parseFloat(principal), c: parseFloat(monthlyContribution), r: parseFloat(annualRate), y: parseFloat(years) }), [principal, monthlyContribution, annualRate, years]);

  const calculate = () => {
    setError('');
    if ([parsed.p, parsed.c, parsed.r, parsed.y].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.p < 0 || parsed.c < 0 || parsed.r < 0 || parsed.y <= 0) return setError('Inputs must be non-negative and years must be greater than zero.');
    setResult(Number(futureValue(parsed.p, parsed.c, parsed.r, parsed.y).toFixed(2)));
  };

  const series = useMemo(() => {
    if (result === null) return [];
    const yrs = Math.max(1, Math.ceil(parsed.y));
    return Array.from({ length: yrs + 1 }, (_, i) => ({ year: i, value: futureValue(parsed.p, parsed.c, parsed.r, i) }));
  }, [result, parsed]);

  const totalContrib = parsed.p + parsed.c * parsed.y * 12;

  return (
    <CalculatorPageShell
      category="Financial"
      title="Investment Calculator"
      description="Project future investment value from a starting amount, monthly contributions, and compound growth."
      left={<CalculatorInputPanel description="Enter a starting investment, recurring monthly addition, annual return, and investment period." actions={<Button onClick={calculate}>Calculate investment</Button>} error={error}>
        <Input label="Initial investment ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Input label="Monthly contribution ($)" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
        <Input label="Annual return (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
        <Input label="Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      </CalculatorInputPanel>}
      right={result === null ? <EmptyResultState text="Your projected investment value and growth charts will appear here after calculation." /> : (
        <>
          <ResultHero title="Projected future value" value={`$${result.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Total contributed', value: `$${totalContrib.toFixed(2)}` },
            { title: 'Estimated growth', value: `$${Math.max(result - totalContrib, 0).toFixed(2)}` },
            { title: 'Monthly contribution', value: `$${parsed.c.toFixed(2)}` },
          ]} />
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-slate-900">Growth timeline</h3><div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"><LineChart data={{ labels: series.map((s) => String(s.year)), datasets: [{ label: 'Investment Value', data: series.map((s) => Number(s.value.toFixed(2))), borderColor: 'rgb(6,43,82)', backgroundColor: 'rgba(154,205,50,0.25)', fill: true, tension: 0.25, pointRadius: 3 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Years' } }, y: { title: { display: true, text: 'Value ($)' } } } }} /></div></div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-slate-900">Contributions vs growth</h3><div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"><PieChart data={{ labels: ['Contributions', 'Growth'], datasets: [{ data: [totalContrib, Math.max(result - totalContrib, 0)], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderWidth: 0 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} /></div></div>
          </section>
          <FormulaBlock formula="FV = PV(1 + i)^n + PMT × ((1 + i)^n − 1) ÷ i" explanation="The final balance comes from growth of the initial investment plus the future value of monthly contributions." />
          <Steps steps={[
            'Convert the annual return into a monthly growth rate.',
            'Grow the starting investment for the selected number of months.',
            'Add the future value of the monthly contributions made over that same period.',
            `The projected ending balance is $${result.toFixed(2)}.`,
          ]} />
          <AboutResult paragraphs={['Investment projections are highly sensitive to return assumptions and time horizon.', 'This model assumes a constant return and equal monthly contributions throughout the period.']} />
        </>
      )}
    />
  );
}
