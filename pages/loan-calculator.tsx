import { useMemo, useState } from 'react';
import { BarChart, PieChart } from '../components/ChartComponents';
import Navbar from '../components/Navbar';
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
import { calculateLoanPayment } from '../calculators/loan';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    p: parseFloat(principal),
    r: parseFloat(rate),
    y: parseFloat(years),
  }), [principal, rate, years]);

  const monthlyRate = parsed.r / 100 / 12;
  const totalPayments = parsed.y * 12;

  const calculate = () => {
    setError('');
    setResult(null);
    if ([parsed.p, parsed.r, parsed.y].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.p <= 0 || parsed.r < 0 || parsed.y <= 0) {
      setError('Loan amount and years must be positive, and rate cannot be negative.');
      return;
    }
    setResult(calculateLoanPayment(parsed.p, parsed.r, parsed.y));
  };

  const steps = result ? [
    `Convert annual rate to a monthly decimal: ${parsed.r}% ÷ 12 ÷ 100 = ${monthlyRate.toFixed(6)}.`,
    `Calculate the number of monthly payments: ${parsed.y} × 12 = ${totalPayments}.`,
    `Use the payment formula PMT = P × [i(1+i)^N] ÷ [(1+i)^N − 1].`,
    `Substitute your values to compute the monthly payment of $${result.monthlyPayment.toFixed(2)}.`,
    `Multiply the monthly payment by ${totalPayments} months to get the total paid, then subtract the original loan to find total interest.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Loan Calculator"
      description="Estimate a fixed monthly payment, total repayment, and total interest for a standard installment loan."
      left={
        <CalculatorInputPanel
          description="Enter the loan amount, annual percentage rate, and repayment term."
          actions={<Button onClick={calculate}>Calculate loan</Button>}
          error={error}
        >
          <Input label="Loan amount ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <Input label="Annual rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <Input label="Term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your loan payment summary, charts, and formula walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Monthly payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
            <DetailCardGrid items={[
              { title: 'Total paid', value: `$${result.totalPayment.toFixed(2)}`, hint: 'Total of all monthly payments across the full term.' },
              { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}`, hint: 'How much you pay above the original principal.' },
              { title: 'Monthly rate', value: `${(monthlyRate * 100).toFixed(4)}%`, hint: 'Annual rate converted to a monthly rate.' },
            ]} />
            <section className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Principal vs interest</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <PieChart
                    data={{
                      labels: ['Principal', 'Interest'],
                      datasets: [{
                        data: [parsed.p, result.totalInterest],
                        backgroundColor: ['rgba(6,43,82,0.88)', 'rgba(154,205,50,0.88)'],
                        borderWidth: 0,
                      }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Monthly cost breakdown</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <BarChart
                    data={{
                      labels: ['Monthly Payment'],
                      datasets: [
                        { label: 'Average Principal Portion', data: [parsed.p / totalPayments], backgroundColor: 'rgba(6,43,82,0.85)', borderRadius: 8 },
                        { label: 'Average Interest Portion', data: [result.totalInterest / totalPayments], backgroundColor: 'rgba(154,205,50,0.9)', borderRadius: 8 },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { title: { display: true, text: 'Dollars' } } } }}
                  />
                </div>
              </div>
            </section>
            <FormulaBlock
              formula="PMT = P × [i(1+i)^N] ÷ [(1+i)^N − 1]"
              explanation="P is the principal, i is the monthly interest rate, and N is the total number of monthly payments."
            />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'This calculator assumes a standard fully amortizing loan with equal payments made each month.',
              'A lower interest rate or shorter term reduces total interest, but a shorter term usually increases the monthly payment.',
            ]} />
          </>
        )
      }
    />
  );
}
