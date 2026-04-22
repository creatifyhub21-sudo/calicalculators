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
import { calculateCreditCardPayoff } from '../calculators/creditCard';

export default function CreditCardCalculator() {
  const [balance, setBalance] = useState('');
  const [apr, setApr] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [result, setResult] = useState<{ months: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ b: parseFloat(balance), a: parseFloat(apr), p: parseFloat(monthlyPayment) }), [balance, apr, monthlyPayment]);

  const calculate = () => {
    setError('');
    if ([parsed.b, parsed.a, parsed.p].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.b <= 0 || parsed.a < 0 || parsed.p <= 0) return setError('Balance and payment must be positive, and APR cannot be negative.');
    const res = calculateCreditCardPayoff(parsed.b, parsed.a, parsed.p);
    if (!isFinite(res.months)) return setError('The payment is too low to pay off the balance.');
    setResult(res);
  };

  const yearsApprox = result ? (result.months / 12) : 0;
  const steps = result ? [
    `Convert the APR into periodic interest and estimate payoff using the credit card payoff equation.`,
    `Using your monthly payment of $${parsed.p.toFixed(2)}, the estimated payoff time is ${result.months} months.`,
    `The model also simulates monthly interest accumulation to estimate about $${result.totalInterest.toFixed(2)} in interest paid.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Credit Card Payoff Calculator"
      description="Estimate how long it could take to pay off a credit card balance with a fixed monthly payment."
      left={<CalculatorInputPanel description="Enter the current balance, APR, and the payment you expect to make each month." actions={<Button onClick={calculate}>Calculate payoff</Button>} error={error}>
        <Input label="Balance ($)" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <Input label="APR (%)" type="number" value={apr} onChange={(e) => setApr(e.target.value)} />
        <Input label="Monthly payment ($)" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your payoff time, interest estimate, and explanation will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated payoff time" value={`${result.months} months`} badge={`${yearsApprox.toFixed(1)} years`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
          <DetailCardGrid items={[
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
            { title: 'Monthly payment', value: `$${parsed.p.toFixed(2)}` },
            { title: 'Current balance', value: `$${parsed.b.toFixed(2)}` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Balance vs interest cost</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Current Balance', 'Estimated Interest'], datasets: [{ label: 'Amount', data: [parsed.b, result.totalInterest], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Dollars' } } } }} />
            </div>
          </div>
          <FormulaBlock formula="Payoff Months ≈ function(balance, APR, monthly payment)" explanation="The payoff equation accounts for compound interest and fixed recurring payments." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['This estimate assumes you make the same payment every month and do not add new charges to the card.', 'Paying more than the minimum can dramatically reduce both payoff time and interest cost.']} />
        </>
      )}
    />
  );
}
