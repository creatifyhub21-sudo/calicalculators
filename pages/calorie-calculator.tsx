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
import { calculateDailyCalories, weightGoalAdjustments } from '../calculators/dailyCalorie';

const activityOptions = [
  { value: '1.2', label: 'Sedentary' },
  { value: '1.375', label: 'Lightly active' },
  { value: '1.55', label: 'Moderately active' },
  { value: '1.725', label: 'Very active' },
  { value: '1.9', label: 'Extra active' },
];

export default function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState<keyof typeof weightGoalAdjustments>('maintain');
  const [result, setResult] = useState<{ maintenance: number; goal: number; bmr: number } | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    w: parseFloat(weight),
    h: parseFloat(height),
    a: parseInt(age || '0'),
    factor: parseFloat(activity),
  }), [weight, height, age, activity]);

  const calculate = () => {
    setError('');
    if ([parsed.w, parsed.h, parsed.a, parsed.factor].some((v) => isNaN(v))) {
      setError('Please enter valid numbers.');
      return;
    }
    if (parsed.w <= 0 || parsed.h <= 0 || parsed.a <= 0) {
      setError('Weight, height, and age must be positive.');
      return;
    }
    const weightKg = weightUnit === 'lb' ? parsed.w / 2.205 : parsed.w;
    const heightCm = heightUnit === 'in' ? parsed.h * 2.54 : parsed.h;
    const bmr = calculateBMR(weightKg, heightCm, parsed.a, gender);
    const { maintenance, goalCalories } = calculateDailyCalories(bmr, parsed.factor, goal);
    setResult({ maintenance: Math.round(maintenance), goal: Math.round(goalCalories), bmr: Math.round(bmr) });
  };

  const goalLabel = goal === 'maintain' ? 'Maintain weight' : goal;
  const steps = result ? [
    `Convert your measurements to metric if needed, because the BMR formula uses kilograms and centimeters.`,
    gender === 'male'
      ? `Male BMR = 10×weight + 6.25×height − 5×age + 5 = ${result.bmr}.`
      : `Female BMR = 10×weight + 6.25×height − 5×age − 161 = ${result.bmr}.`,
    `Multiply BMR by your activity factor (${parsed.factor}) to estimate maintenance calories: ${result.maintenance} cal/day.`,
    `Apply the selected goal adjustment (${weightGoalAdjustments[goal]} calories/day) to get the target calorie level: ${result.goal} cal/day.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Calorie Calculator"
      description="Estimate daily calories to maintain, lose, or gain weight using BMR, activity level, and a simple goal adjustment."
      left={
        <CalculatorInputPanel
          description="Enter body stats, choose units, and select an activity level and goal."
          actions={<Button onClick={calculate}>Calculate calories</Button>}
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
          <Select label="Activity level" value={activity} onChange={(e) => setActivity(e.target.value)} options={activityOptions} />
          <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value as keyof typeof weightGoalAdjustments)} options={Object.keys(weightGoalAdjustments).map((k) => ({ value: k, label: k }))} />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your calorie targets, comparison chart, and formula walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Target daily calories" value={`${result.goal} cal/day`} badge={goalLabel} badgeClassName="bg-[#9ACD32]/15 text-[#577c12]" />
            <DetailCardGrid items={[
              { title: 'Maintenance calories', value: `${result.maintenance} cal/day` },
              { title: 'BMR', value: `${result.bmr} cal/day` },
              { title: 'Daily adjustment', value: `${weightGoalAdjustments[goal]} cal/day`, hint: 'Goal-based change applied to maintenance calories.' },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Calorie comparison</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['BMR', 'Maintenance', 'Goal'], datasets: [{ label: 'Calories/day', data: [result.bmr, result.maintenance, result.goal], backgroundColor: ['rgba(6,43,82,0.88)', 'rgba(80,120,180,0.85)', 'rgba(154,205,50,0.9)'], borderRadius: 8 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Calories per day' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula={gender === 'male' ? 'BMR = 10W + 6.25H − 5A + 5; Maintenance = BMR × Activity; Goal = Maintenance ± Adjustment' : 'BMR = 10W + 6.25H − 5A − 161; Maintenance = BMR × Activity; Goal = Maintenance ± Adjustment'} explanation="The goal adjustment uses a simple daily calorie change for maintenance, gradual loss, or gradual gain." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'This is a planning estimate, not a medical prescription. Real calorie needs vary by metabolism, muscle mass, training volume, and daily movement.',
              'The goal calorie target is based on a simple adjustment from maintenance calories and is best used as a starting point to monitor and refine over time.',
            ]} />
          </>
        )
      }
    />
  );
}
