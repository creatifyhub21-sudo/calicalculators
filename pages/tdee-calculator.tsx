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
import { calculateBMR, calculateTDEE } from '../calculators/tdee';

const activityOptions = [
  { value: '1.2', label: 'Sedentary (little or no exercise)' },
  { value: '1.375', label: 'Lightly active (1–3 days/week)' },
  { value: '1.55', label: 'Moderately active (3–5 days/week)' },
  { value: '1.725', label: 'Very active (6–7 days/week)' },
  { value: '1.9', label: 'Extra active (athlete / physical job)' },
];

export default function TDEECalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    w: parseFloat(weight),
    h: parseFloat(height),
    a: parseInt(age || '0'),
    factor: parseFloat(activity),
  }), [weight, height, age, activity]);

  const calculate = () => {
    setError('');
    if ([parsed.w, parsed.h, parsed.a].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.w <= 0 || parsed.h <= 0 || parsed.a <= 0) {
      setError('Weight, height, and age must be positive.');
      return;
    }
    const bmr = calculateBMR(parsed.w, parsed.h, parsed.a, gender);
    const tdee = calculateTDEE(bmr, parsed.factor);
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const activityLabel = activityOptions.find((a) => a.value === activity)?.label || '';
  const steps = result ? [
    `Calculate BMR using the Mifflin–St. Jeor equation with your sex, weight, height, and age inputs.`,
    gender === 'male'
      ? `Male BMR = 10×${parsed.w} + 6.25×${parsed.h} − 5×${parsed.a} + 5 = ${result.bmr}.`
      : `Female BMR = 10×${parsed.w} + 6.25×${parsed.h} − 5×${parsed.a} − 161 = ${result.bmr}.`,
    `Choose the activity multiplier for "${activityLabel}", which is ${parsed.factor}.`,
    `Multiply BMR by activity factor: ${result.bmr} × ${parsed.factor} = ${result.tdee}.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="TDEE Calculator"
      description="Estimate total daily energy expenditure by combining your resting calorie needs with your activity level."
      left={
        <CalculatorInputPanel
          description="Enter body metrics and choose an activity level to estimate daily calorie burn."
          actions={<Button onClick={calculate}>Calculate TDEE</Button>}
          error={error}
        >
          <Input label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Input label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label="Age (years)" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
          <Select label="Activity level" value={activity} onChange={(e) => setActivity(e.target.value)} options={activityOptions} />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your BMR, TDEE, activity comparison, and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Estimated TDEE" value={`${result.tdee} cal/day`} badge={`${result.bmr} BMR`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
            <DetailCardGrid items={[
              { title: 'BMR', value: `${result.bmr} cal/day`, hint: 'Estimated calories burned at rest.' },
              { title: 'Activity factor', value: parsed.factor, hint: activityLabel },
              { title: 'TDEE', value: `${result.tdee} cal/day`, hint: 'Estimated total daily energy expenditure.' },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Resting vs active burn</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['BMR', 'TDEE'], datasets: [{ label: 'Calories/day', data: [result.bmr, result.tdee], backgroundColor: ['rgba(6,43,82,0.9)', 'rgba(154,205,50,0.9)'], borderRadius: 8 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Calories per day' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula={gender === 'male' ? 'BMR = 10W + 6.25H − 5A + 5;   TDEE = BMR × Activity Factor' : 'BMR = 10W + 6.25H − 5A − 161;   TDEE = BMR × Activity Factor'} explanation="W is weight in kg, H is height in cm, and A is age in years." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'TDEE is a planning estimate for maintenance calories. Actual calorie needs can vary based on body composition, training, metabolism, and lifestyle.',
              'A common next step is to use TDEE as a baseline, then adjust calories slightly up or down based on whether your goal is maintaining, losing, or gaining weight.',
            ]} />
          </>
        )
      }
    />
  );
}
