import { useState } from 'react';
import { BarChart } from '../components/ChartComponents';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProbabilityCalculator() {
  const [favorable, setFavorable] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const f = parseFloat(favorable);
    const t = parseFloat(total);
    if (isNaN(f) || isNaN(t)) return setError('Please enter valid numbers.');
    if (f < 0 || t <= 0 || f > t) return setError('Favorable outcomes must be between 0 and total outcomes.');
    setResult(f / t);
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Probability Calculator"
      description="Calculate simple probability from favorable outcomes and total possible outcomes."
      left={
        <CalculatorInputPanel
          description="Enter the number of favorable outcomes and the total number of possible outcomes."
          actions={<Button onClick={calculate}>Calculate probability</Button>}
          error={error}
        >
          <Input label="Favorable outcomes" type="number" value={favorable} onChange={(e) => setFavorable(e.target.value)} />
          <Input label="Total outcomes" type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your probability result and visual comparison will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Probability" value={`${(result * 100).toFixed(2)}%`} />
            <DetailCardGrid items={[
              { title: 'Decimal form', value: result.toFixed(4) },
              { title: 'Fraction form', value: `${favorable}/${total}` },
              { title: 'Odds against', value: `${Number(total) - Number(favorable)}:${favorable}` },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Chance breakdown</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{
                    labels: ['Favorable', 'Unfavorable'],
                    datasets: [{
                      label: 'Outcomes',
                      data: [Number(favorable), Number(total) - Number(favorable)],
                      backgroundColor: ['rgba(6,43,82,0.9)', 'rgba(154,205,50,0.9)'],
                      borderRadius: 10,
                    }],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { title: { display: true, text: 'Count' } } },
                  }}
                />
              </div>
            </div>
            <FormulaBlock formula="Probability = Favorable Outcomes ÷ Total Outcomes" explanation="The result can be shown as a decimal, fraction, or percentage." />
            <Steps steps={[
              `Take the favorable outcomes: ${favorable}.`,
              `Divide by the total outcomes: ${favorable} ÷ ${total} = ${result.toFixed(4)}.`,
              `Convert to percentage: ${result.toFixed(4)} × 100 = ${(result * 100).toFixed(2)}%.`,
            ]} />
            <AboutResult paragraphs={[
              'Probability measures how likely an event is to happen out of all possible outcomes.',
              'A probability of 0 means impossible, while 1 (or 100%) means certain.',
            ]} />
          </>
        )
      }
    />
  );
}
