import { useMemo, useState } from 'react';
import { LineChart } from '../components/ChartComponents';
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
import { retirementSavings } from '../calculators/finance';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    current: parseInt(currentAge || '0'),
    retire: parseInt(retirementAge || '0'),
    savings: parseFloat(currentSavings),
    monthly: parseFloat(monthlyContribution),
    rate: parseFloat(annualRate),
  }), [currentAge, retirementAge, currentSavings, monthlyContribution, annualRate]);

  const yearsToGrow = parsed.retire - parsed.current;

  const calculate = () => {
    setError('');
    if ([parsed.current, parsed.retire, parsed.savings, parsed.monthly, parsed.rate].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.current < 0 || parsed.retire <= parsed.current) {
      setError('Retirement age must be greater than current age.');
      return;
    }
    if (parsed.savings < 0 || parsed.monthly < 0 || parsed.rate < 0) {
      setError('Savings, monthly contribution, and annual rate cannot be negative.');
      return;
    }
    setResult(Number(retirementSavings(parsed.current, parsed.retire, parsed.savings, parsed.monthly, parsed.rate).toFixed(2)));
  };

  const series = useMemo(() => {
    if (result === null) return [];
    return Array.from({ length: yearsToGrow + 1 }, (_, i) => ({
      age: parsed.current + i,
      value: retirementSavings(parsed.current, parsed.current + i, parsed.savings, parsed.monthly, parsed.rate),
    }));
  }, [result, yearsToGrow, parsed]);

  const totalContributed = parsed.savings + parsed.monthly * yearsToGrow * 12;

  return (
    <CalculatorPageShell
      category="Financial"
      title="Retirement Calculator"
      description="Project how much you could have saved by retirement based on your current age, target retirement age, savings, contributions, and assumed return."
      left={
        <CalculatorInputPanel
          description="Enter your current age, retirement age, current savings, monthly contribution, and annual return assumption."
          actions={<Button onClick={calculate}>Calculate retirement</Button>}
          error={error}
        >
          <Input label="Current age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
          <Input label="Retirement age" type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
          <Input label="Current savings ($)" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
          <Input label="Monthly contribution ($)" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
          <Input label="Annual return (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={result === null ? (
        <EmptyResultState text="Your retirement projection and growth chart will appear here after calculation." />
      ) : (
        <>
          <ResultHero title="Projected retirement savings" value={`$${result.toFixed(2)}`} badge={`${yearsToGrow} years to grow`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
          <DetailCardGrid items={[
            { title: 'Total contributed', value: `$${totalContributed.toFixed(2)}` },
            { title: 'Estimated growth', value: `$${Math.max(result - totalContributed, 0).toFixed(2)}` },
            { title: 'Retirement age', value: parsed.retire },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Savings by age</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <LineChart
                data={{
                  labels: series.map((s) => String(s.age)),
                  datasets: [{
                    label: 'Projected Savings',
                    data: series.map((s) => Number(s.value.toFixed(2))),
                    borderColor: 'rgb(6,43,82)',
                    backgroundColor: 'rgba(154,205,50,0.25)',
                    fill: true,
                    tension: 0.25,
                    pointRadius: 3,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { title: { display: true, text: 'Age' } },
                    y: { title: { display: true, text: 'Savings ($)' } },
                  },
                }}
              />
            </div>
          </div>
          <FormulaBlock
            formula="Retirement Value = Future Value(Current Savings + Monthly Contributions)"
            explanation="This calculator uses compound growth on the current savings and adds recurring monthly contributions until retirement."
          />
          <Steps steps={[
            `Find years to retirement: ${parsed.retire} − ${parsed.current} = ${yearsToGrow}.`,
            `Grow current savings at the assumed annual return over ${yearsToGrow} years.`,
            `Add the future value of monthly contributions made until retirement.`,
            `Estimate a retirement balance of $${result.toFixed(2)}.`,
          ]} />
          <AboutResult paragraphs={[
            'Retirement projections are very sensitive to return assumptions, contribution consistency, and time horizon.',
            'This model assumes a constant annual return and fixed monthly contributions over time.',
          ]} />
        </>
      )}
    />
  );
}
