import { useMemo, useState } from 'react';
import { LineChart, PieChart } from '../components/ChartComponents';
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
import { calculate401k } from '../calculators/fourOhOneK';

export default function FourOhOneKCalculator() {
  const [salary, setSalary] = useState('');
  const [employeePercent, setEmployeePercent] = useState('');
  const [employerPercent, setEmployerPercent] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ finalValue: number; totalContributions: number; totalEmployerContributions: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ s: parseFloat(salary), e: parseFloat(employeePercent), er: parseFloat(employerPercent), r: parseFloat(annualReturn), y: parseFloat(years) }), [salary, employeePercent, employerPercent, annualReturn, years]);

  const calculate = () => {
    setError('');
    if ([parsed.s, parsed.e, parsed.er, parsed.r, parsed.y].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.s <= 0 || parsed.e < 0 || parsed.er < 0 || parsed.r < 0 || parsed.y < 0) return setError('Salary must be positive and other values cannot be negative.');
    setResult(calculate401k(parsed.s, parsed.e, parsed.er, parsed.r, parsed.y));
  };

  const matchedPercent = Math.min(parsed.e || 0, parsed.er || 0);
  const employeeMonthly = parsed.s * (parsed.e / 100) / 12 || 0;
  const employerMonthly = parsed.s * (matchedPercent / 100) / 12 || 0;

  const series = useMemo(() => {
    if (!result) return [];
    const yrs = Math.max(1, Math.ceil(parsed.y));
    return Array.from({ length: yrs + 1 }, (_, i) => {
      const partial = calculate401k(parsed.s, parsed.e, parsed.er, parsed.r, i);
      return { year: i, value: partial.finalValue };
    });
  }, [result, parsed]);

  const steps = result ? [
    `Convert the employee contribution percentage into a monthly dollar contribution: $${employeeMonthly.toFixed(2)} per month.`,
    `Match the employee contribution up to the employer match limit, which gives an employer contribution of about $${employerMonthly.toFixed(2)} per month.`,
    `Grow the combined monthly contributions at the assumed annual return over ${parsed.y} years.`,
    `Estimate a final 401(k) value of $${result.finalValue.toFixed(2)}.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Financial"
      title="401(k) Calculator"
      description="Estimate how a retirement account can grow from employee contributions, employer match, and compound returns."
      left={<CalculatorInputPanel description="Enter salary, contribution rates, expected return, and years until retirement." actions={<Button onClick={calculate}>Calculate 401(k)</Button>} error={error}>
        <Input label="Annual salary ($)" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <Input label="Employee contribution (%)" type="number" value={employeePercent} onChange={(e) => setEmployeePercent(e.target.value)} />
        <Input label="Employer match (%)" type="number" value={employerPercent} onChange={(e) => setEmployerPercent(e.target.value)} />
        <Input label="Expected annual return (%)" type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
        <Input label="Years to retirement" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      </CalculatorInputPanel>}
      right={!result ? <EmptyResultState text="Your retirement account projection and contribution breakdown will appear here after calculation." /> : (
        <>
          <ResultHero title="Estimated 401(k) value" value={`$${result.finalValue.toFixed(2)}`} />
          <DetailCardGrid items={[
            { title: 'Employee contributions', value: `$${result.totalContributions.toFixed(2)}` },
            { title: 'Employer contributions', value: `$${result.totalEmployerContributions.toFixed(2)}` },
            { title: 'Matched percent', value: `${matchedPercent.toFixed(2)}%` },
          ]} />
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Projected growth</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <LineChart data={{ labels: series.map((s) => String(s.year)), datasets: [{ label: '401(k) Value', data: series.map((s) => Number(s.value.toFixed(2))), borderColor: 'rgb(6,43,82)', backgroundColor: 'rgba(154,205,50,0.25)', fill: true, tension: 0.25, pointRadius: 3 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Years' } }, y: { title: { display: true, text: 'Account Value ($)' } } } }} />
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Contribution mix</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <PieChart data={{ labels: ['Employee Contributions', 'Employer Contributions', 'Growth'], datasets: [{ data: [result.totalContributions, result.totalEmployerContributions, Math.max(result.finalValue - result.totalContributions - result.totalEmployerContributions, 0)], backgroundColor: ['rgba(6,43,82,0.9)','rgba(80,120,180,0.85)','rgba(154,205,50,0.9)'], borderWidth: 0 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            </div>
          </section>
          <FormulaBlock formula="Future Value of Monthly Contributions + Employer Match + Compounded Growth" explanation="This estimate assumes constant salary, constant contribution rates, and constant annual return over time." />
          <Steps steps={steps} />
          <AboutResult paragraphs={['Employer match can meaningfully boost retirement savings growth, especially over long periods.', 'This calculator is a planning model and does not account for contribution limits, changing salary, or taxes.']} />
        </>
      )}
    />
  );
}
