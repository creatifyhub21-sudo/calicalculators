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
import { calculateBMR } from '../calculators/bmr';

export default function BMRCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    w: parseFloat(weight),
    h: parseFloat(height),
    a: parseInt(age || '0'),
  }), [weight, height, age]);

  const weightKg = weightUnit === 'lb' ? parsed.w / 2.205 : parsed.w;
  const heightCm = heightUnit === 'in' ? parsed.h * 2.54 : parsed.h;

  const calculate = () => {
    setError('');
    if ([parsed.w, parsed.h, parsed.a].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.w <= 0 || parsed.h <= 0 || parsed.a <= 0) return setError('Values must be positive.');
    setResult(Math.round(calculateBMR(weightKg, heightCm, parsed.a, gender)));
  };

  const steps = result !== null ? [
    `Convert body measurements to metric units if needed: weight = ${weightKg.toFixed(2)} kg and height = ${heightCm.toFixed(2)} cm.`,
    gender === 'male'
      ? `Use the male Mifflin–St. Jeor equation: 10×${weightKg.toFixed(2)} + 6.25×${heightCm.toFixed(2)} − 5×${parsed.a} + 5 = ${result}.`
      : `Use the female Mifflin–St. Jeor equation: 10×${weightKg.toFixed(2)} + 6.25×${heightCm.toFixed(2)} − 5×${parsed.a} − 161 = ${result}.`,
    `The result estimates calories burned per day at rest before adding activity.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="BMR Calculator"
      description="Estimate basal metabolic rate using the Mifflin–St. Jeor equation to approximate calories burned at rest."
      left={
        <CalculatorInputPanel
          description="Enter body stats and choose units to estimate resting calorie burn."
          actions={<Button onClick={calculate}>Calculate BMR</Button>}
          error={error}
        >
          <div className="grid grid-cols-2 gap-4">
            <Select label="Weight unit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')} options={[{ value: 'kg', label: 'Kilograms' }, { value: 'lb', label: 'Pounds' }]} />
            <Select label="Height unit" value={heightUnit} onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'in')} options={[{ value: 'cm', label: 'Centimeters' }, { value: 'in', label: 'Inches' }]} />
          </div>
          <Input label={`Weight (${weightUnit})`} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Input label={`Height (${heightUnit})`} type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label="Age (years)" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your resting calorie estimate and explanation will appear here after calculation." /> : (
          <>
            <ResultHero title="Estimated BMR" value={`${result} cal/day`} />
            <DetailCardGrid items={[
              { title: 'Weight used', value: `${weightKg.toFixed(2)} kg` },
              { title: 'Height used', value: `${heightCm.toFixed(2)} cm` },
              { title: 'Age', value: parsed.a },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Resting energy estimate</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['BMR'], datasets: [{ label: 'Calories/day', data: [result], backgroundColor: ['rgba(6,43,82,0.9)'], borderRadius: 10 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Calories per day' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula={gender === 'male' ? 'BMR = 10W + 6.25H − 5A + 5' : 'BMR = 10W + 6.25H − 5A − 161'} explanation="W is weight in kilograms, H is height in centimeters, and A is age in years." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'BMR is an estimate of calories your body uses for basic functions at rest, such as breathing and circulation.',
              'It is a useful starting point for calorie planning, but daily calorie needs are usually higher once movement and exercise are included.',
            ]} />
          </>
        )
      }
    />
  );
}
