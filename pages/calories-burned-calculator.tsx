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
import { calculateCaloriesBurned } from '../calculators/caloriesBurned';

export default function CaloriesBurnedCalculator() {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [met, setMet] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState<'minutes' | 'hours'>('minutes');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({ w: parseFloat(weight), m: parseFloat(met), d: parseFloat(duration) }), [weight, met, duration]);
  const weightKg = weightUnit === 'lb' ? parsed.w / 2.205 : parsed.w;
  const durationMinutes = durationUnit === 'hours' ? parsed.d * 60 : parsed.d;

  const calculate = () => {
    setError('');
    if ([parsed.w, parsed.m, parsed.d].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.w <= 0 || parsed.m <= 0 || parsed.d <= 0) return setError('Values must be positive.');
    setResult(calculateCaloriesBurned(parsed.w, weightUnit, parsed.m, parsed.d, durationUnit));
  };

  const steps = result !== null ? [
    `Convert weight to kilograms if needed: ${weightKg.toFixed(2)} kg.`,
    `Convert duration to minutes if needed: ${durationMinutes.toFixed(2)} minutes.`,
    `Apply the MET calorie formula: minutes × (MET × 3.5 × weight in kg) ÷ 200.`,
    `The estimated calories burned are ${result.toFixed(2)} calories.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Calories Burned Calculator"
      description="Estimate calories burned during an activity using body weight, MET value, and duration."
      left={
        <CalculatorInputPanel
          description="Enter body weight, activity MET value, and duration."
          actions={<Button onClick={calculate}>Calculate calories burned</Button>}
          error={error}
        >
          <Input label={`Weight (${weightUnit})`} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Select label="Weight unit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')} options={[{ value: 'kg', label: 'Kilograms' }, { value: 'lb', label: 'Pounds' }]} />
          <Input label="MET value" type="number" value={met} onChange={(e) => setMet(e.target.value)} />
          <Input label={`Duration (${durationUnit === 'minutes' ? 'min' : 'hr'})`} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Select label="Duration unit" value={durationUnit} onChange={(e) => setDurationUnit(e.target.value as 'minutes' | 'hours')} options={[{ value: 'minutes', label: 'Minutes' }, { value: 'hours', label: 'Hours' }]} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your calorie burn estimate and activity breakdown will appear here after calculation." /> : (
          <>
            <ResultHero title="Estimated calories burned" value={`${result.toFixed(2)} cal`} />
            <DetailCardGrid items={[
              { title: 'Weight used', value: `${weightKg.toFixed(2)} kg` },
              { title: 'Duration used', value: `${durationMinutes.toFixed(2)} min` },
              { title: 'MET value', value: parsed.m.toFixed(2) },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Burn estimate</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart data={{ labels: ['Calories Burned'], datasets: [{ label: 'Calories', data: [result], backgroundColor: ['rgba(6,43,82,0.9)'], borderRadius: 10 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Calories' } } } }} />
              </div>
            </div>
            <FormulaBlock formula="Calories = Minutes × (MET × 3.5 × Weight in kg) ÷ 200" explanation="MET values represent how intense an activity is compared with resting metabolism." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Calories burned during exercise depend on body size, effort level, and actual exercise intensity, so this is still an estimate.',
              'Using a more accurate MET value for the activity usually improves the estimate.',
            ]} />
          </>
        )
      }
    />
  );
}
