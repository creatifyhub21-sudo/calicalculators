import { useMemo, useState } from 'react';
import { PieChart } from '../components/ChartComponents';
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
import { calculatePayment } from '../calculators/payment';

export default function PaymentCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ p: parseFloat(principal), r: parseFloat(rate), y: parseFloat(years) }), [principal, rate, years]);

  const calculate = () => {
    setError('');
    if ([parsed.p, parsed.r, parsed.y].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.p <= 0 || parsed.r < 0 || parsed.y <= 0) return setError('Principal and term must be positive, and rate cannot be negative.');
    setResult(calculatePayment(parsed.p, parsed.r, parsed.y));
  };

  const steps = result ? [
    `Convert the annual rate to a monthly decimal and determine the total number of monthly payments.`,
    `Apply the fixed-payment loan formula to calculate the monthly payment of $${result.monthlyPayment.toFixed(2)}.`,
    `Multiply the monthly payment by the term length in months to get total paid, then subtract principal to get total interest.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Payment Calculator"
      description="Calculate a standard monthly loan payment from a principal, annual interest rate, and loan term."
      left={<CalculatorInputPanel description="Enter the loan amount, annual rate, and term length." actions={<Button onClick={calculate}>Calculate payment</Button>} error={error}>
        <Input label="Loan amount ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Input label="Annual rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your payment result and repayment summary will appear here after calculation." /> : (
        <>
          <ResultHero title="Monthly payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Total payment', value: `$${result.totalPayment.toFixed(2)}` },
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
            { title: 'Term', value: `${(parsed.y*12).toFixed(0)} months` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Payment composition</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <PieChart data={{ labels: ['Principal', 'Interest'], datasets: [{ data: [parsed.p, result.totalInterest], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderWidth: 0 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
          <FormulaBlock formula="PMT = P × [i(1+i)^N] ÷ [(1+i)^N − 1]" explanation="This formula solves the fixed payment needed to amortize the loan over N monthly payments." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['This calculator assumes equal payments every month for the full term.', 'It is useful for quickly estimating loan affordability before adding other real-world costs or fees.']} />
        </>
      )}
    />
  );
}
