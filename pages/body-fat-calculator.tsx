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
import { calculateBodyFat } from '../calculators/bodyFat';

const categories = (bf: number, gender: 'male' | 'female') => {
  if (gender === 'male') {
    if (bf < 6) return 'Essential fat';
    if (bf < 14) return 'Athletic';
    if (bf < 18) return 'Fitness';
    if (bf < 25) return 'Average';
    return 'High';
  }
  if (bf < 14) return 'Essential fat';
  if (bf < 21) return 'Athletic';
  if (bf < 25) return 'Fitness';
  if (bf < 32) return 'Average';
  return 'High';
};

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [units, setUnits] = useState<'metric' | 'imperial'>('imperial');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const parsed = useMemo(() => ({
    h: parseFloat(height), n: parseFloat(neck), w: parseFloat(waist), hp: hip ? parseFloat(hip) : undefined,
  }), [height, neck, waist, hip]);

  const calculate = () => {
    setError('');
    if (isNaN(parsed.h) || isNaN(parsed.n) || isNaN(parsed.w) || (gender === 'female' && (parsed.hp === undefined || isNaN(parsed.hp)))) {
      return setError('Please enter valid numbers.');
    }
    if (parsed.h <= 0 || parsed.n <= 0 || parsed.w <= 0 || (gender === 'female' && parsed.hp! <= 0)) {
      return setError('Values must be positive.');
    }
    try {
      setResult(calculateBodyFat({ gender, height: parsed.h, neck: parsed.n, waist: parsed.w, hip: parsed.hp, units }));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const category = result !== null ? categories(result, gender) : '';
  const steps = result !== null ? [
    `Convert measurements to inches if metric units were entered.`,
    gender === 'male'
      ? `Use the male U.S. Navy formula based on abdomen, neck, and height measurements.`
      : `Use the female U.S. Navy formula based on waist, hip, neck, and height measurements.`,
    `Evaluate the logarithmic formula to estimate a body fat percentage of ${result.toFixed(2)}%.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Body Fat Calculator"
      description="Estimate body fat percentage using the U.S. Navy circumference method."
      left={
        <CalculatorInputPanel
          description="Enter height and body measurements. Women also need hip circumference."
          actions={<Button onClick={calculate}>Calculate body fat</Button>}
          error={error}
        >
          <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
          <Select label="Units" value={units} onChange={(e) => setUnits(e.target.value as 'metric' | 'imperial')} options={[{ value: 'metric', label: 'Metric (cm)' }, { value: 'imperial', label: 'Imperial (in)' }]} />
          <Input label={`Height (${units === 'metric' ? 'cm' : 'in'})`} type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label={`Neck (${units === 'metric' ? 'cm' : 'in'})`} type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
          <Input label={`Waist (${units === 'metric' ? 'cm' : 'in'})`} type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
          {gender === 'female' ? <Input label={`Hip (${units === 'metric' ? 'cm' : 'in'})`} type="number" value={hip} onChange={(e) => setHip(e.target.value)} /> : null}
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your body fat estimate and category comparison will appear here after calculation." /> : (
          <>
            <ResultHero title="Estimated body fat" value={`${result.toFixed(2)}%`} badge={category} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
            <DetailCardGrid items={[
              { title: 'Gender formula', value: gender === 'male' ? 'Male Navy formula' : 'Female Navy formula' },
              { title: 'Units entered', value: units },
              { title: 'Category', value: category },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Body fat percentage</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['Body Fat %'], datasets: [{ label: 'Percent', data: [result], backgroundColor: ['rgba(154,205,50,0.9)'], borderRadius: 10 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 45, title: { display: true, text: 'Percent' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula={gender === 'male' ? '86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76' : '163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387'} explanation="The U.S. Navy method uses circumference measurements and height rather than direct body composition scanning." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Body fat percentage gives more body-composition context than weight alone, but it is still an estimate.',
              'Circumference-based methods are sensitive to measurement technique, so it helps to measure consistently each time.',
            ]} />
          </>
        )
      }
    />
  );
}
