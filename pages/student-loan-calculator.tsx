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
import { calculateStudentLoan } from '../calculators/studentLoan';

export default function StudentLoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [deferment, setDeferment] = useState('');
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ p: parseFloat(principal), r: parseFloat(rate), y: parseFloat(years), d: deferment ? parseFloat(deferment) : 0 }), [principal, rate, years, deferment]);

  const effectivePrincipal = useMemo(() => {
    if ([parsed.p, parsed.r, parsed.d].some((v) => isNaN(v))) return NaN;
    let ep = parsed.p;
    const mr = parsed.r / 100 / 12;
    for (let i = 0; i < parsed.d; i++) ep += ep * mr;
    return ep;
  }, [parsed]);

  const calculate = () => {
    setError('');
    if ([parsed.p, parsed.r, parsed.y].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.p <= 0 || parsed.r < 0 || parsed.y <= 0 || parsed.d < 0) return setError('Principal and term must be positive. Rate and deferment cannot be negative.');
    setResult(calculateStudentLoan(parsed.p, parsed.r, parsed.y, parsed.d));
  };

  const steps = result ? [
    `Start with the original student loan principal of $${parsed.p.toFixed(2)}.`,
    parsed.d > 0 ? `Accrue interest during ${parsed.d} deferment months to get an effective repayment principal of about $${effectivePrincipal.toFixed(2)}.` : 'No deferment interest is added because deferment is zero.',
    `Use the amortizing loan formula on the repayment principal to estimate monthly payment.`,
    `Multiply by the number of repayment months to estimate total paid and derive total interest.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Student Loan Calculator"
      description="Estimate monthly payment and total borrowing cost, including optional deferment months that allow interest to accrue."
      left={<CalculatorInputPanel description="Enter loan amount, rate, repayment term, and any deferment period." actions={<Button onClick={calculate}>Calculate student loan</Button>} error={error}>
        <Input label="Loan amount ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Input label="Annual rate (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        <Input label="Deferment (months)" type="number" value={deferment} onChange={(e) => setDeferment(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your student loan repayment estimate and deferment impact will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated monthly payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Total paid', value: `$${result.totalPayment.toFixed(2)}` },
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
            { title: 'Effective principal', value: `$${effectivePrincipal.toFixed(2)}`, hint: 'Principal after deferment interest accrual.' },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Principal growth during deferment</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Original Principal', 'Effective Principal'], datasets: [{ label: 'Amount', data: [parsed.p, effectivePrincipal], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Dollars' } } } }} />
            </div>
          </div>
          <FormulaBlock formula="Effective Principal after deferment → standard loan payment formula" explanation="If interest accrues during deferment, repayment starts from a larger principal balance." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['Deferment can temporarily postpone payments, but accrued interest may increase the amount you later repay.', 'Shorter repayment terms often increase monthly payment but reduce total interest over time.']} />
        </>
      )}
    />
  );
}
