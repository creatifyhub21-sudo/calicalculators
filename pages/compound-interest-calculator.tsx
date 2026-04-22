import { useMemo, useState } from 'react';
import { LineChart, PieChart } from '../components/ChartComponents';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import { calculateCompoundInterest } from '../calculators/compoundInterest';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [compounding, setCompounding] = useState('12');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ finalAmount: number; interestEarned: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    p: parseFloat(principal),
    r: parseFloat(rate),
    n: parseInt(compounding, 10),
    y: parseFloat(years),
  }), [principal, rate, compounding, years]);

  const calculate = () => {
    setError('');
    setResult(null);
    if ([parsed.p, parsed.r, parsed.n, parsed.y].some((v) => isNaN(v))) {
      setError('Please enter valid values.');
      return;
    }
    if (parsed.p < 0 || parsed.r < 0 || parsed.n <= 0 || parsed.y < 0) {
      setError('Principal, rate, and time cannot be negative, and compounding periods must be positive.');
      return;
    }
    setResult(calculateCompoundInterest(parsed.p, parsed.r, parsed.n, parsed.y));
  };

  const yearlySeries = useMemo(() => {
    if (!result || isNaN(parsed.p) || isNaN(parsed.r) || isNaN(parsed.n) || isNaN(parsed.y)) return [];
    const fullYears = Math.max(1, Math.ceil(parsed.y));
    return Array.from({ length: fullYears + 1 }, (_, i) => {
      const yearsVal = Math.min(i, parsed.y);
      const amt = calculateCompoundInterest(parsed.p, parsed.r, parsed.n, yearsVal).finalAmount;
      return { year: yearsVal, amount: amt };
    });
  }, [result, parsed]);

  const steps = result ? [
    `Convert the annual rate to decimal form: ${parsed.r}% ÷ 100 = ${(parsed.r / 100).toFixed(4)}.`,
    `Identify compounding periods per year: n = ${parsed.n}.`,
    `Use the compound interest formula A = P(1 + r/n)^(nt).`,
    `Substitute your values: A = ${parsed.p}(1 + ${(parsed.r / 100).toFixed(4)}/${parsed.n})^(${parsed.n} × ${parsed.y}).`,
    `The final amount is $${result.finalAmount.toFixed(2)} and the interest earned is $${result.interestEarned.toFixed(2)}.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Compound Interest Calculator"
      description="Project how an investment grows when interest is compounded repeatedly over time."
      left={
        <CalculatorInputPanel
          description="Enter a starting amount, annual return, compounding frequency, and investment period."
          actions={<Button onClick={calculate}>Calculate growth</Button>}
          error={error}
        >
          <Input label="Principal ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <Input label="Annual rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <Select
            label="Compounding frequency"
            value={compounding}
            onChange={(e) => setCompounding(e.target.value)}
            options={[
              { label: 'Daily (365)', value: '365' },
              { label: 'Monthly (12)', value: '12' },
              { label: 'Quarterly (4)', value: '4' },
              { label: 'Semi-Annually (2)', value: '2' },
              { label: 'Annually (1)', value: '1' },
            ]}
          />
          <Input label="Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your compound growth summary, chart, and formula walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Future value" value={`$${result.finalAmount.toFixed(2)}`} />
            <DetailCardGrid items={[
              { title: 'Interest earned', value: `$${result.interestEarned.toFixed(2)}`, hint: 'Growth above the original principal.' },
              { title: 'Starting principal', value: `$${parsed.p.toFixed(2)}`, hint: 'The initial amount invested.' },
              { title: 'Compounding periods', value: parsed.n, hint: 'How often interest is applied each year.' },
            ]} />
            <section className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Growth over time</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <LineChart
                    data={{
                      labels: yearlySeries.map((x) => String(x.year)),
                      datasets: [{ label: 'Account value', data: yearlySeries.map((x) => Number(x.amount.toFixed(2))), borderColor: 'rgb(6,43,82)', backgroundColor: 'rgba(154,205,50,0.25)', fill: true, pointRadius: 3, tension: 0.25 }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Years' } }, y: { title: { display: true, text: 'Value ($)' } } } }}
                  />
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Principal vs growth</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <PieChart
                    data={{ labels: ['Principal', 'Interest Earned'], datasets: [{ data: [parsed.p, result.interestEarned], backgroundColor: ['rgba(6,43,82,0.9)', 'rgba(154,205,50,0.9)'], borderWidth: 0 }] }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
            </section>
            <FormulaBlock formula="A = P(1 + r/n)^(nt)" explanation="A is final amount, P is principal, r is the annual rate as a decimal, n is compounding frequency, and t is time in years." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Compounding means you earn returns on both the original principal and previously earned interest.',
              'Higher rates, more time, and more frequent compounding all increase the future value of the investment.',
            ]} />
          </>
        )
      }
    />
  );
}
