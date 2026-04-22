import { useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import CalculatorPageShell from '../components/CalculatorPageShell';
import DetailCardGrid from '../components/DetailCardGrid';
import EmptyResultState from '../components/EmptyResultState';
import FormulaBlock from '../components/FormulaBlock';
import PremiumSection from '../components/PremiumSection';
import RelatedCalculators from '../components/RelatedCalculators';
import ResultHero from '../components/ResultHero';
import { LineChart, BarChart } from '../components/ChartComponents';
import { amortizationSchedule } from '../calculators/amortization';

export default function AmortizationCalculator() {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [payment, setPayment] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<ReturnType<typeof amortizationSchedule>['schedule'] | null>(null);
  const [error, setError] = useState('');
  const [calcSteps, setCalcSteps] = useState<string[]>([]);

  const summary = useMemo(() => {
    if (!schedule || payment === null) return null;
    const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);
    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    return { totalPaid, totalInterest, paymentCount: schedule.length, firstRow: schedule[0], lastRow: schedule[schedule.length - 1] };
  }, [schedule, payment]);

  const calculate = () => {
    setError('');
    setPayment(null);
    setSchedule(null);
    setCalcSteps([]);

    const p = parseFloat(principal);
    const rate = parseFloat(annualRate);
    const yrs = parseFloat(years);

    if (isNaN(p) || isNaN(rate) || isNaN(yrs)) {
      setError('Please enter valid numbers.');
      return;
    }
    if (p <= 0 || rate < 0 || yrs <= 0) {
      setError('Principal and years must be positive, and rate cannot be negative.');
      return;
    }

    const result = amortizationSchedule(p, rate, yrs);
    setPayment(Math.round(result.payment * 100) / 100);
    setSchedule(result.schedule);

    const monthlyRate = rate / 100 / 12;
    const totalPayments = yrs * 12;
    if (monthlyRate === 0) {
      const zeroRatePayment = p / totalPayments;
      setCalcSteps([
        `With a 0% interest rate, the amortization formula simplifies to principal ÷ number of payments.`,
        `Number of payments = ${yrs} × 12 = ${totalPayments}.`,
        `Monthly payment = ${p} ÷ ${totalPayments} = ${zeroRatePayment.toFixed(2)}.`,
        `Each payment reduces the balance directly because there is no interest portion.`,
      ]);
      return;
    }

    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    const monthlyPayment = p * (numerator / denominator);

    setCalcSteps([
      `Convert annual interest rate to a monthly decimal: ${rate}% ÷ 12 ÷ 100 = ${monthlyRate.toFixed(6)}.`,
      `Calculate the total number of monthly payments: ${yrs} × 12 = ${totalPayments}.`,
      `Apply the amortization formula M = P × [i(1+i)^n] ÷ [(1+i)^n − 1].`,
      `Substitute your values: ${p} × [${monthlyRate.toFixed(6)} × (1 + ${monthlyRate.toFixed(6)})^${totalPayments}] ÷ [(1 + ${monthlyRate.toFixed(6)})^${totalPayments} − 1] = ${monthlyPayment.toFixed(2)}.`,
      `For each payment, interest = current balance × monthly rate, principal = payment − interest, and new balance = old balance − principal.`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Financial Calculators"
      title="Amortization Calculator"
      description="View monthly payment details, balance decline, and payment composition in one premium amortization view."
      left={
        <CalculatorInputPanel
          description="Enter the loan principal, annual interest rate, and loan term. The calculator builds the payment amount and full amortization schedule."
          actions={
            <>
              <Button onClick={calculate}>Calculate amortization</Button>
              <button
                type="button"
                onClick={() => {
                  setPrincipal('');
                  setAnnualRate('');
                  setYears('');
                  setPayment(null);
                  setSchedule(null);
                  setError('');
                  setCalcSteps([]);
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Clear
              </button>
            </>
          }
          error={error}
        >
          <Input label="Principal ($)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 250000" />
          <Input label="Annual interest rate (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} placeholder="e.g. 6.5" />
          <Input label="Loan term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 30" />
        </CalculatorInputPanel>
      }
      right={
        !summary || !schedule || payment === null ? (
          <EmptyResultState text="Your payment summary, charts, and amortization schedule will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Monthly payment" value={`$${payment.toFixed(2)}`} badge={`${summary.paymentCount} payments`} />
            <DetailCardGrid items={[
              { title: 'Total paid', value: `$${summary.totalPaid.toFixed(2)}`, hint: 'Total of all scheduled payments.' },
              { title: 'Total interest', value: `$${summary.totalInterest.toFixed(2)}`, hint: 'Total interest cost across the loan.' },
              { title: 'First-month interest', value: `$${summary.firstRow.interest.toFixed(2)}`, hint: 'Interest portion of the first scheduled payment.' },
              { title: 'Last payment balance', value: `$${summary.lastRow.balance.toFixed(2)}`, hint: 'Ending balance after the final payment.' },
            ]} />

            <PremiumSection eyebrow="Balance trend" title="Remaining balance" description="This line chart shows how the outstanding balance declines across the life of the loan.">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[320px]">
                  <LineChart
                    data={{
                      labels: schedule.map((row) => row.period.toString()),
                      datasets: [{ label: 'Balance', data: schedule.map((row) => Number(row.balance.toFixed(2))), borderColor: 'rgb(6,43,82)', backgroundColor: 'rgba(6,43,82,0.12)', pointRadius: 0, tension: 0.25, fill: true }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { maxTicksLimit: 10 } }, y: { title: { display: true, text: 'Balance ($)' } } } }}
                  />
                </div>
              </div>
            </PremiumSection>

            <PremiumSection eyebrow="Payment mix" title="Principal vs interest" description="Compare how much of each payment goes toward principal versus interest over time.">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[320px]">
                  <BarChart
                    data={{
                      labels: schedule.map((row) => row.period.toString()),
                      datasets: [
                        { label: 'Principal', data: schedule.map((row) => Number(row.principal.toFixed(2))), backgroundColor: 'rgba(154,205,50,0.8)', borderRadius: 6 },
                        { label: 'Interest', data: schedule.map((row) => Number(row.interest.toFixed(2))), backgroundColor: 'rgba(6,43,82,0.78)', borderRadius: 6 },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { x: { stacked: true, ticks: { maxTicksLimit: 10 } }, y: { stacked: true, title: { display: true, text: 'Amount ($)' } } } }}
                  />
                </div>
              </div>
            </PremiumSection>

            <FormulaBlock formula="M = P × [i(1+i)^n] ÷ [(1+i)^n − 1]" explanation="M is the monthly payment, P is the principal, i is the monthly interest rate, and n is the total number of monthly payments." />
            <Steps steps={calcSteps} />

            <PremiumSection eyebrow="Schedule" title="Amortization schedule" description="Review how each payment is split into interest and principal, and how the balance drops over time.">
              <div className="overflow-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">#</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Payment</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Interest</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Principal</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {schedule.map((row) => (
                      <tr key={row.period}>
                        <td className="px-4 py-3">{row.period}</td>
                        <td className="px-4 py-3">${row.payment.toFixed(2)}</td>
                        <td className="px-4 py-3">${row.interest.toFixed(2)}</td>
                        <td className="px-4 py-3">${row.principal.toFixed(2)}</td>
                        <td className="px-4 py-3">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PremiumSection>

            <AboutResult paragraphs={[
              'An amortization schedule shows more than just the monthly payment. It reveals how the loan cost is distributed across interest and principal over time.',
              'Early payments usually carry a larger interest portion, while later payments shift more heavily toward principal reduction.',
              'This view is especially useful when comparing loans, extra-payment strategies, refinance options, or different term lengths.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Mortgage Calculator', href: '/mortgage-calculator', description: 'Estimate monthly payment and total borrowing cost for a home loan.' },
              { name: 'Loan Calculator', href: '/loan-calculator', description: 'Review a simpler fixed-payment loan summary.' },
              { name: 'Mortgage Payoff Calculator', href: '/mortgage-payoff-calculator', description: 'Test how extra payments could shorten the payoff timeline.' },
            ]} />
          </>
        )
      }
    />
  );
}
