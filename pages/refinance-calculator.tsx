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
import { calculateRefinance } from '../calculators/refinance';

export default function RefinanceCalculator() {
  const [balance, setBalance] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [currentYears, setCurrentYears] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newYears, setNewYears] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [result, setResult] = useState<{ currentPayment: number; newPayment: number; monthlySavings: number; breakEvenMonths: number | null } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({
    b: parseFloat(balance), cr: parseFloat(currentRate), cy: parseFloat(currentYears),
    nr: parseFloat(newRate), ny: parseFloat(newYears), c: parseFloat(closingCosts)
  }), [balance, currentRate, currentYears, newRate, newYears, closingCosts]);

  const calculate = () => {
    setError('');
    if ([parsed.b, parsed.cr, parsed.cy, parsed.nr, parsed.ny, parsed.c].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.b <= 0 || parsed.cy <= 0 || parsed.ny <= 0 || parsed.cr < 0 || parsed.nr < 0 || parsed.c < 0) return setError('Balance and years must be positive. Rates and closing costs cannot be negative.');
    setResult(calculateRefinance(parsed.b, parsed.cr, parsed.cy, parsed.nr, parsed.ny, parsed.c));
  };

  const steps = result ? [
    `Calculate the current monthly payment using the current balance, rate, and remaining term.`,
    `Calculate the new payment using the refinance rate and new term, including closing costs in the financed balance.`,
    `Subtract the new payment from the current payment to find monthly savings.`,
    result.breakEvenMonths !== null ? `Divide closing costs by monthly savings to estimate the break-even point: about ${result.breakEvenMonths.toFixed(1)} months.` : `Because the refinance does not reduce monthly payment, there is no break-even month based on monthly savings.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Refinance Calculator"
      description="Compare current mortgage cost to a potential refinance and estimate monthly savings and break-even timing."
      left={<CalculatorInputPanel description="Enter current loan details and the proposed refinance terms." actions={<Button onClick={calculate}>Calculate refinance</Button>} error={error}>
        <Input label="Current balance ($)" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <Input label="Current annual rate (%)" type="number" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} />
        <Input label="Years remaining" type="number" value={currentYears} onChange={(e) => setCurrentYears(e.target.value)} />
        <Input label="New annual rate (%)" type="number" value={newRate} onChange={(e) => setNewRate(e.target.value)} />
        <Input label="New term (years)" type="number" value={newYears} onChange={(e) => setNewYears(e.target.value)} />
        <Input label="Closing costs ($)" type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your refinance comparison and break-even analysis will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated monthly savings" value={`$${result.monthlySavings.toFixed(2)}`} badge={result.breakEvenMonths !== null ? `${result.breakEvenMonths.toFixed(1)} mo break-even` : 'No break-even'} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
          <DetailCardGrid items={[
            { title: 'Current payment', value: `$${result.currentPayment.toFixed(2)}` },
            { title: 'New payment', value: `$${result.newPayment.toFixed(2)}` },
            { title: 'Closing costs', value: `$${parsed.c.toFixed(2)}` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Current vs refinance payment</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Current Loan', 'Refinanced Loan'], datasets: [{ label: 'Monthly Payment', data: [result.currentPayment, result.newPayment], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Dollars per month' } } } }} />
            </div>
          </div>
          <FormulaBlock formula="Break-even months = Closing Costs ÷ Monthly Savings" explanation="This only applies when the refinance lowers your monthly payment." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['A refinance can reduce monthly cost, shorten the term, or both, but closing costs matter.', 'A lower monthly payment is not always better if the new term is much longer or if the refinance adds significant cost.']} />
        </>
      )}
    />
  );
}
