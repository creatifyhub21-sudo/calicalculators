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
import { calculateProteinRange } from '../calculators/protein';

export default function ProteinCalculator() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [activity, setActivity] = useState<'sedentary' | 'normal' | 'active' | 'athlete'>('normal');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const [error, setError] = useState('');
  const parsedWeight = parseFloat(weight);
  const weightKg = unit === 'lb' ? parsedWeight / 2.205 : parsedWeight;

  const calculate = () => {
    setError('');
    if (isNaN(parsedWeight) || parsedWeight <= 0) return setError('Please enter a valid positive weight.');
    setResult(calculateProteinRange(parsedWeight, unit, activity));
  };

  const steps = result ? [
    `Convert body weight to kilograms if needed: ${weightKg.toFixed(2)} kg.`,
    `Choose the protein range multiplier for activity level "${activity}".`,
    `Multiply body weight by the lower and upper multipliers to estimate the daily protein range.`,
    `This gives a suggested range of ${result.min.toFixed(2)} g to ${result.max.toFixed(2)} g per day.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Protein Intake Calculator"
      description="Estimate a daily protein intake range from body weight and activity level."
      left={
        <CalculatorInputPanel
          description="Enter body weight and choose your activity level."
          actions={<Button onClick={calculate}>Calculate protein</Button>}
          error={error}
        >
          <Input label={`Weight (${unit})`} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Select label="Weight unit" value={unit} onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')} options={[{ value: 'kg', label: 'Kilograms' }, { value: 'lb', label: 'Pounds' }]} />
          <Select label="Activity level" value={activity} onChange={(e) => setActivity(e.target.value as any)} options={[
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'normal', label: 'Normal' },
            { value: 'active', label: 'Active' },
            { value: 'athlete', label: 'Athlete' },
          ]} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your protein intake range and activity comparison will appear here after calculation." /> : (
          <>
            <ResultHero title="Recommended protein range" value={`${result.min.toFixed(2)} - ${result.max.toFixed(2)} g/day`} />
            <DetailCardGrid items={[
              { title: 'Weight used', value: `${weightKg.toFixed(2)} kg` },
              { title: 'Lower target', value: `${result.min.toFixed(2)} g/day` },
              { title: 'Upper target', value: `${result.max.toFixed(2)} g/day` },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Protein target range</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['Lower Target', 'Upper Target'], datasets: [{ label: 'Grams/day', data: [result.min, result.max], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)'], borderRadius: 8 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Grams per day' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula="Protein Range = Body Weight (kg) × Activity-Based Multiplier" explanation="More active people usually benefit from a higher protein target than sedentary adults." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Protein needs vary with training, calorie intake, age, and body-composition goals.',
              'This calculator gives a useful planning range rather than one exact required number.',
            ]} />
          </>
        )
      }
    />
  );
}
