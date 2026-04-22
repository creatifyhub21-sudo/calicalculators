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
import { calculateAutoLoan } from '../calculators/autoLoan';

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [tradeIn, setTradeIn] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ financedAmount: number; monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    price: parseFloat(price),
    down: parseFloat(downPayment),
    trade: parseFloat(tradeIn),
    tax: parseFloat(taxRate),
    rate: parseFloat(annualRate),
    years: parseFloat(years),
  }), [price, downPayment, tradeIn, taxRate, annualRate, years]);

  const taxAmount = !isNaN(parsed.price) && !isNaN(parsed.tax) ? parsed.price * parsed.tax / 100 : NaN;

  const calculate = () => {
    setError('');
    if ([parsed.price, parsed.down, parsed.trade, parsed.tax, parsed.rate, parsed.years].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.price <= 0 || parsed.down < 0 || parsed.trade < 0 || parsed.tax < 0 || parsed.rate < 0 || parsed.years <= 0) {
      setError('Vehicle price must be positive, years must be positive, and the other values cannot be negative.');
      return;
    }
    setResult(calculateAutoLoan(parsed.price, parsed.down, parsed.trade, parsed.tax, parsed.rate, parsed.years));
  };

  const steps = result ? [
    `Compute sales tax on the purchase price: ${parsed.price.toFixed(2)} × ${parsed.tax}% = ${taxAmount.toFixed(2)}.`,
    `Find financed amount: price + tax − down payment − trade-in = ${parsed.price.toFixed(2)} + ${taxAmount.toFixed(2)} − ${parsed.down.toFixed(2)} − ${parsed.trade.toFixed(2)} = ${result.financedAmount.toFixed(2)}.`,
    `Convert annual rate to monthly rate and use the standard amortizing loan formula to calculate a monthly payment of $${result.monthlyPayment.toFixed(2)}.`,
    `Multiply the monthly payment by the number of months to estimate total paid and subtract financed amount to estimate total interest.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Auto Loan Calculator"
      description="Estimate how much of a car purchase is financed and what the monthly loan payment could look like."
      left={
        <CalculatorInputPanel
          description="Enter the vehicle price, upfront money, tax rate, financing rate, and term."
          actions={<Button onClick={calculate}>Calculate auto loan</Button>}
          error={error}
        >
          <Input label="Vehicle price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input label="Down payment ($)" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
          <Input label="Trade-in value ($)" type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} />
          <Input label="Sales tax rate (%)" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          <Input label="Annual rate (%)" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
          <Input label="Term (years)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={!result ? <EmptyResultState text="Your financed amount, payment summary, and charts will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated monthly auto payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Financed amount', value: `$${result.financedAmount.toFixed(2)}` },
            { title: 'Total paid', value: `$${result.totalPayment.toFixed(2)}` },
            { title: 'Total interest', value: `$${result.totalInterest.toFixed(2)}` },
          ]} />
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Purchase structure</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <PieChart data={{ labels: ['Down Payment', 'Trade-In', 'Sales Tax', 'Financed'], datasets: [{ data: [parsed.down, parsed.trade, taxAmount, result.financedAmount], backgroundColor: ['rgba(154,205,50,0.9)', 'rgba(100,180,120,0.9)', 'rgba(220,180,70,0.9)', 'rgba(6,43,82,0.9)'], borderWidth: 0 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Repayment composition</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart data={{ labels: ['Total Cost'], datasets: [{ label: 'Financed Amount', data: [result.financedAmount], backgroundColor: 'rgba(6,43,82,0.9)', borderRadius: 8 }, { label: 'Interest', data: [result.totalInterest], backgroundColor: 'rgba(154,205,50,0.9)', borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Dollars' } } } }} />
              </div>
            </div>
          </section>
          <FormulaBlock formula="Financed Amount = Price + Sales Tax − Down Payment − Trade-In" explanation="The loan payment is then calculated using the standard fixed-payment loan formula on the financed amount." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['Auto financing cost depends heavily on the amount financed, interest rate, and term length.', 'Longer terms lower monthly payments but usually increase total interest paid.']} />
        </>
      )}
    />
  );
}
