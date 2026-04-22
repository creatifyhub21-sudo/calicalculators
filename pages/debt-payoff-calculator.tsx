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
import { calculateDebtPayoff } from '../calculators/debtPayoff';

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [payment, setPayment] = useState('');
  const [result, setResult] = useState<{ months: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ b: parseFloat(balance), r: parseFloat(annualRate), p: parseFloat(payment) }), [balance, annualRate, payment]);

  const calculate = () => {
    setError('');
    if ([parsed.b, parsed.r, parsed.p].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.b <= 0 || parsed.r < 0 || parsed.p <= 0) return setError('Balance and payment must be positive, and rate cannot be negative.');
    const res = calculateDebtPayoff(parsed.b, parsed.r, parsed.p);
    if (!isFinite(res.months)) return setError('Monthly payment is too low to pay off the balance.');
    setResult(res);
  };

  const steps = result ? [
    `Convert annual rate into monthly rate: ${parsed.r}% ÷ 12 ÷ 100 = ${(parsed.r/100/12).toFixed(6)}.`,
    `Use the payoff-period formula to estimate the number of months needed to reduce the debt to zero.`,
    `Simulate the debt balance month by month to estimate total interest paid.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Debt Payoff Calculator"
      description="Estimate how long a debt takes to pay off using a fixed monthly payment and interest rate."
      left={<CalculatorInputPanel description="Enter the balance, interest rate, and monthly payment amount." actions={<Button onClick={calculate}>Calculate debt payoff</Button>} error={error}>
        <Input label="Balance ($)" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <Input label="Annual rate (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
        <Input label="Monthly payment ($)" type="number" value={payment} onChange={(e) => setPayment(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your debt payoff summary and cost comparison will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated payoff time" value={`${result.months} months`} />
          <DetailCardGrid items={[
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
            { title: 'Balance', value: `$${parsed.b.toFixed(2)}` },
            { title: 'Payment', value: `$${parsed.p.toFixed(2)}` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Debt vs interest</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Balance', 'Interest'], datasets: [{ label: 'Amount', data: [parsed.b, result.totalInterest], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Dollars' } } } }} />
            </div>
          </div>
          <FormulaBlock formula="n = log(Payment ÷ (Payment − Balance × Monthly Rate)) ÷ log(1 + Monthly Rate)" explanation="This formula estimates how many payment periods are needed when the payment exceeds monthly interest." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['This payoff model assumes a constant interest rate and a constant payment every month.', 'If your payment increases over time, actual payoff could happen sooner than this estimate.']} />
        </>
      )}
    />
  );
}
