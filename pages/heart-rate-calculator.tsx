import { useMemo, useState } from 'react';
import { BarChart } from '../components/ChartComponents';
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
import { calculateMaxHeartRate, calculateTargetHeartRateZones } from '../calculators/heartRate';

export default function HeartRateCalculator() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ max: number; moderateMin: number; moderateMax: number; vigorousMin: number; vigorousMax: number } | null>(null);
  const [error, setError] = useState('');
  const parsedAge = parseInt(age || '0');

  const calculate = () => {
    setError('');
    if (isNaN(parsedAge) || parsedAge <= 0) return setError('Please enter a valid positive age.');
    const max = calculateMaxHeartRate(parsedAge);
    const zones = calculateTargetHeartRateZones(parsedAge);
    setResult({ max, ...zones });
  };

  const steps = result ? [
    `Estimate max heart rate with the age-based formula: 220 − ${parsedAge} = ${result.max} bpm.`,
    `Find the moderate zone as 50% to 70% of max heart rate: ${result.moderateMin} to ${result.moderateMax} bpm.`,
    `Find the vigorous zone as 70% to 85% of max heart rate: ${result.vigorousMin} to ${result.vigorousMax} bpm.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Heart Rate Calculator"
      description="Estimate age-based maximum heart rate and target training zones for moderate and vigorous exercise."
      left={
        <CalculatorInputPanel
          description="Enter age to estimate your max heart rate and common training zones."
          actions={<Button onClick={calculate}>Calculate heart rate</Button>}
          error={error}
        >
          <Input label="Age (years)" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your max heart rate and target zones will appear here after calculation." /> : (
          <>
            <ResultHero title="Estimated max heart rate" value={`${result.max} bpm`} />
            <DetailCardGrid items={[
              { title: 'Moderate zone', value: `${result.moderateMin} - ${result.moderateMax} bpm` },
              { title: 'Vigorous zone', value: `${result.vigorousMin} - ${result.vigorousMax} bpm` },
              { title: 'Age', value: parsedAge },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Training zone ranges</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{
                    labels: ['Moderate Min', 'Moderate Max', 'Vigorous Min', 'Vigorous Max'],
                    datasets: [{ label: 'BPM', data: [result.moderateMin, result.moderateMax, result.vigorousMin, result.vigorousMax], backgroundColor: ['rgba(154,205,50,0.8)','rgba(154,205,50,0.95)','rgba(6,43,82,0.75)','rgba(6,43,82,0.95)'], borderRadius: 8 }],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: 'Beats per minute' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula="Max HR ≈ 220 − Age" explanation="Moderate intensity is typically about 50–70% of max heart rate, while vigorous intensity is about 70–85%." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'These zones are broad estimates meant for general training guidance, not a medical diagnosis.',
              'Actual training zones can differ based on fitness level, medications, and testing method.',
            ]} />
          </>
        )
      }
    />
  );
}
