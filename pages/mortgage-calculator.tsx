import { useMemo, useState } from 'react';
import { BarChart, PieChart } from '../components/ChartComponents';
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

export default function MortgageCalculator() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    price: parseFloat(price),
    down: parseFloat(downPayment),
    rate: parseFloat(annualRate),
    years: parseFloat(years),
  }), [price, downPayment, annualRate, years]);

  const principal = !isNaN(parsed.price) && !isNaN(parsed.down) ? parsed.price - parsed.down : NaN;
  const monthlyRate = parsed.rate / 100 / 12;
  const totalPayments = parsed.years * 12;

  const calculate = () => {
    setError('');
    setResult(null);
    if ([parsed.price, parsed.down, parsed.rate, parsed.years].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.price <= 0 || parsed.down < 0 || parsed.down >= parsed.price || parsed.rate < 0 || parsed.years <= 0) {
      setError('Home price must be positive, down payment must be less than price, and years must be positive.');
      return;
    }
    setResult(calculateLoanPayment(principal, parsed.rate, parsed.years));
  };

  const steps = result ? [
    `Find the mortgage principal by subtracting the down payment: $${parsed.price.toFixed(2)} − $${parsed.down.toFixed(2)} = $${principal.toFixed(2)}.`,
    `Convert the annual mortgage rate to a monthly decimal: ${parsed.rate}% ÷ 12 ÷ 100 = ${monthlyRate.toFixed(6)}.`,
    `Calculate the number of monthly payments: ${parsed.years} × 12 = ${totalPayments}.`,
    `Use the standard mortgage payment formula to get a monthly payment of $${result.monthlyPayment.toFixed(2)}.`,
    `Total interest equals total paid minus the original financed amount.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Mortgage Calculator"
      description="Estimate monthly mortgage cost, total repayment, and total interest based on home price, down payment, rate, and term."
      left={
        <CalculatorInputPanel
          description="Enter the property price, down payment, interest rate, and mortgage term."
          actions={<Button onClick={calculate}>Calculate mortgage</Button>}
          error={error}
        >
          <Input label="Home price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input label="Down payment ($)" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
          <Input label="Annual rate (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
          <Input label="Term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your mortgage summary, financing breakdown, and walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Estimated monthly mortgage payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
            <DetailCardGrid items={[
              { title: 'Financed amount', value: `$${principal.toFixed(2)}`, hint: 'Home price minus down payment.' },
              { title: 'Total paid', value: `$${result.totalPayment.toFixed(2)}`, hint: 'All monthly payments over the full mortgage term.' },
              { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}`, hint: 'The borrowing cost over the life of the mortgage.' },
            ]} />
            <section className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Purchase structure</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <PieChart
                    data={{
                      labels: ['Down Payment', 'Financed Amount'],
                      datasets: [{ data: [parsed.down, principal], backgroundColor: ['rgba(154,205,50,0.9)', 'rgba(6,43,82,0.9)'], borderWidth: 0 }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Repayment composition</h3>
                <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <BarChart
                    data={{
                      labels: ['Total Cost'],
                      datasets: [
                        { label: 'Principal', data: [principal], backgroundColor: 'rgba(6,43,82,0.85)', borderRadius: 8 },
                        { label: 'Interest', data: [result.totalInterest], backgroundColor: 'rgba(154,205,50,0.9)', borderRadius: 8 },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { title: { display: true, text: 'Dollars' } }, x: { stacked: true }, yAxis: {} } as any }}
                  />
                </div>
              </div>
            </section>
            <FormulaBlock formula="Mortgage PMT = P × [i(1+i)^N] ÷ [(1+i)^N − 1]" explanation="The same amortizing payment formula used for fixed-rate loans applies to standard fixed-rate mortgages." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'This mortgage calculator estimates principal-and-interest only. Property taxes, insurance, HOA dues, and mortgage insurance are not included unless you add them separately later.',
              'A larger down payment reduces the financed amount, which lowers both the monthly payment and total interest.',
            ]} />
          </>
        )
      }
    />
  );
}
