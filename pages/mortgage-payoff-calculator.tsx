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
import { calculateMortgagePayoff } from '../calculators/mortgagePayoff';

export default function MortgagePayoffCalculator() {
  const [balance, setBalance] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [result, setResult] = useState<{ months: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ b: parseFloat(balance), r: parseFloat(annualRate), p: parseFloat(monthlyPayment) }), [balance, annualRate, monthlyPayment]);

  const calculate = () => {
    setError('');
    if ([parsed.b, parsed.r, parsed.p].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.b <= 0 || parsed.r < 0 || parsed.p <= 0) return setError('Balance and payment must be positive, and rate cannot be negative.');
    const res = calculateMortgagePayoff(parsed.b, parsed.r, parsed.p);
    if (!isFinite(res.months)) return setError('The monthly payment is too low to pay off the mortgage.');
    setResult(res);
  };

  return (
    <CalculatorPageShell
      category="Financial"
      title="Mortgage Payoff Calculator"
      description="Estimate how long it takes to eliminate an existing mortgage balance at a fixed payment amount."
      left={<CalculatorInputPanel description="Enter the current balance, annual rate, and monthly payment." actions={<Button onClick={calculate}>Calculate payoff</Button>} error={error}>
        <Input label="Current balance ($)" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <Input label="Annual rate (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
        <Input label="Monthly payment ($)" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your mortgage payoff timeline and summary will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated payoff time" value={`${result.months} months`} badge={`${(result.months/12).toFixed(1)} years`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
          <DetailCardGrid items={[
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
            { title: 'Current balance', value: `$${parsed.b.toFixed(2)}` },
            { title: 'Monthly payment', value: `$${parsed.p.toFixed(2)}` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Balance vs interest cost</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Balance', 'Interest'], datasets: [{ label: 'Amount', data: [parsed.b, result.totalInterest], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Dollars' } } } }} />
            </div>
          </div>
          <FormulaBlock formula="n = log(Payment ÷ (Payment − Balance × Monthly Rate)) ÷ log(1 + Monthly Rate)" explanation="This payoff-period formula estimates how many months are needed when the payment exceeds monthly interest." />
          <Steps steps={[
            `Convert annual rate to monthly rate.`,
            `Check that the payment is larger than monthly interest, otherwise payoff will not occur.`,
            `Use the payoff-period formula to estimate the number of months to reach zero balance.`,
            `Simulate the loan month by month to estimate total interest paid.`,
          ]} />
          <AboutResult paragraphs={['This estimate assumes the rate stays fixed and that you make the same payment every month.', 'Extra payments beyond the required amount can shorten payoff time substantially.']} />
        </>
      )}
    />
  );
}
