import { useMemo, useState } from 'react';
import { BarChart } from '../components/ChartComponents';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import { calculateIncomeTax, FilingStatus } from '../calculators/incomeTax';

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState('');
  const [status, setStatus] = useState<FilingStatus>('single');
  const [result, setResult] = useState<{ taxableIncome: number; tax: number; effectiveRate: number } | null>(null);
  const [error, setError] = useState('');
  const parsedIncome = parseFloat(income);

  const standardDeduction = status === 'single' ? 16100 : status === 'married' ? 32200 : 24150;

  const calculate = () => {
    setError('');
    if (isNaN(parsedIncome)) return setError('Please enter a valid number.');
    if (parsedIncome < 0) return setError('Income cannot be negative.');
    setResult(calculateIncomeTax(parsedIncome, status));
  };

  const steps = result ? [
    `Start with gross income of $${parsedIncome.toFixed(2)}.`,
    `Subtract the standard deduction for ${status} filing status: $${standardDeduction.toFixed(2)}.`,
    `The remaining taxable income is $${result.taxableIncome.toFixed(2)}.`,
    `Apply the progressive tax brackets to each portion of taxable income to estimate total federal tax.`,
    `Divide estimated tax by gross income to find the effective tax rate of ${result.effectiveRate.toFixed(2)}%.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="Income Tax Calculator (2026)"
      description="Estimate U.S. federal income tax, taxable income, and effective tax rate based on gross income and filing status."
      left={<CalculatorInputPanel description="Choose a filing status and enter your gross income." actions={<Button onClick={calculate}>Estimate tax</Button>} error={error}>
        <Input label="Gross income ($)" type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        <Select label="Filing status" value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)} options={[
          { label: 'Single', value: 'single' },
          { label: 'Married filing jointly', value: 'married' },
          { label: 'Head of household', value: 'head' },
        ]} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your tax estimate and income breakdown will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated federal tax" value={`$${result.tax.toFixed(2)}`} badge={`${result.effectiveRate.toFixed(2)}% effective rate`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
          <DetailCardGrid items={[
            { title: 'Taxable income', value: `$${result.taxableIncome.toFixed(2)}` },
            { title: 'Gross income', value: `$${parsedIncome.toFixed(2)}` },
            { title: 'Standard deduction', value: `$${standardDeduction.toFixed(2)}` },
          ]} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Income breakdown</h3>
            <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <BarChart data={{ labels: ['Gross Income'], datasets: [{ label: 'Standard Deduction', data: [standardDeduction], backgroundColor: 'rgba(154,205,50,0.9)', borderRadius: 8 }, { label: 'Estimated Tax', data: [result.tax], backgroundColor: 'rgba(220,90,90,0.85)', borderRadius: 8 }, { label: 'After Tax Before Other Deductions', data: [Math.max(parsedIncome - result.tax - standardDeduction, 0)], backgroundColor: 'rgba(6,43,82,0.9)', borderRadius: 8 }] }} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: 'Dollars' } } }, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
          <FormulaBlock formula="Taxable Income = Gross Income − Standard Deduction" explanation="Federal tax is then computed progressively, meaning different income layers are taxed at different rates." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['This calculator estimates federal income tax only and does not include state tax, payroll tax, credits, or itemized deductions.', 'Progressive tax systems apply each tax rate only to the income inside that bracket, not to your entire income.']} />
        </>
      )}
    />
  );
}
