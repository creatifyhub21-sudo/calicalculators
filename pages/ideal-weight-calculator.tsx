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
import { calculateIdealWeight } from '../calculators/idealWeight';

export default function IdealWeightCalculator() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{ kg: number; lbs: number; maleKg?: number; femaleKg?: number } | null>(null);
  const [error, setError] = useState('');

  const totalInches = (parseInt(feet || '0') * 12) + parseInt(inches || '0');

  const calculate = () => {
    setError('');
    if (isNaN(totalInches) || totalInches <= 0) {
      setError('Please enter a valid height.');
      return;
    }
    const kg = calculateIdealWeight(totalInches, gender);
    const lbs = kg * 2.20462;
    const maleKg = calculateIdealWeight(totalInches, 'male');
    const femaleKg = calculateIdealWeight(totalInches, 'female');
    setResult({ kg: Number(kg.toFixed(2)), lbs: Number(lbs.toFixed(2)), maleKg: Number(maleKg.toFixed(2)), femaleKg: Number(femaleKg.toFixed(2)) });
  };

  const steps = result ? [
    `Convert your height to total inches: (${feet} × 12) + ${inches} = ${totalInches} inches.`,
    `Find the number of inches above 5 feet: ${totalInches} − 60 = ${totalInches - 60}.`,
    gender === 'male'
      ? `Apply the Devine formula for men: 50 + 2.3 × (${totalInches - 60}) = ${result.kg.toFixed(2)} kg.`
      : `Apply the Devine formula for women: 45.5 + 2.3 × (${totalInches - 60}) = ${result.kg.toFixed(2)} kg.`,
    `Convert kilograms to pounds: ${result.kg.toFixed(2)} × 2.20462 = ${result.lbs.toFixed(2)} lb.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Ideal Weight Calculator"
      description="Estimate ideal body weight from height using the Devine formula, with outputs in kilograms and pounds."
      left={
        <CalculatorInputPanel
          description="Enter your height and choose a biological sex to apply the appropriate Devine formula."
          actions={<Button onClick={calculate}>Calculate ideal weight</Button>}
          error={error}
        >
          <div className="grid grid-cols-2 gap-4">
            <Input label="Height (ft)" type="number" value={feet} onChange={(e) => setFeet(e.target.value)} />
            <Input label="Height (in)" type="number" value={inches} onChange={(e) => setInches(e.target.value)} />
          </div>
          <Select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
          />
        </CalculatorInputPanel>
      }
      right={
        !result ? (
          <EmptyResultState text="Your ideal weight estimate and formula walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Estimated ideal weight" value={`${result.kg.toFixed(2)} kg`} badge={`${result.lbs.toFixed(2)} lb`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
            <DetailCardGrid items={[
              { title: 'Selected formula', value: gender === 'male' ? 'Devine (male)' : 'Devine (female)' },
              { title: 'Male estimate', value: `${result.maleKg!.toFixed(2)} kg` },
              { title: 'Female estimate', value: `${result.femaleKg!.toFixed(2)} kg` },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Comparison by formula input</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{ labels: ['Male Formula', 'Female Formula'], datasets: [{ label: 'Ideal Weight (kg)', data: [result.maleKg, result.femaleKg], backgroundColor: ['rgba(6,43,82,0.88)', 'rgba(154,205,50,0.88)'], borderRadius: 8 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Kilograms' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula={gender === 'male' ? 'Male: 50 kg + 2.3 kg × (inches over 60)' : 'Female: 45.5 kg + 2.3 kg × (inches over 60)'} explanation="The Devine formula starts from a base weight at 5 feet and adds a fixed amount for every inch above that height." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Ideal weight formulas provide reference estimates, not strict health targets. Body composition, frame size, and medical context matter too.',
              'Use this as a general guideline alongside other health markers rather than as a single definitive health measure.',
            ]} />
          </>
        )
      }
    />
  );
}
