import { useMemo, useState } from 'react';
import { PieChart } from '../components/ChartComponents';
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
import { calculateMacroGrams } from '../calculators/macro';

export default function MacroCalculator() {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [result, setResult] = useState<{ carbs: number; protein: number; fat: number } | null>(null);
  const [error, setError] = useState('');
  const parsed = useMemo(() => ({ cals: parseFloat(calories), c: parseFloat(carbs), p: parseFloat(protein), f: parseFloat(fat) }), [calories, carbs, protein, fat]);

  const calculate = () => {
    setError('');
    if ([parsed.cals, parsed.c, parsed.p, parsed.f].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (parsed.cals <= 0) return setError('Calories must be positive.');
    try {
      const { carbsGrams, proteinGrams, fatGrams } = calculateMacroGrams(parsed.cals, parsed.c, parsed.p, parsed.f);
      setResult({ carbs: carbsGrams, protein: proteinGrams, fat: fatGrams });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const steps = result ? [
    `Convert the calorie percentages into calorie amounts based on ${parsed.cals} total calories.`,
    `Carbs and protein use 4 calories per gram, so divide their calories by 4.`,
    `Fat uses 9 calories per gram, so divide fat calories by 9.`,
    `This gives ${result.carbs.toFixed(2)} g carbs, ${result.protein.toFixed(2)} g protein, and ${result.fat.toFixed(2)} g fat.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Fitness & Health"
      title="Macro Calculator"
      description="Turn a daily calorie target and macro percentages into grams of carbs, protein, and fat."
      left={
        <CalculatorInputPanel
          description="Enter total calories and the desired percentage split for each macronutrient."
          actions={<Button onClick={calculate}>Calculate macros</Button>}
          error={error}
        >
          <Input label="Total calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
          <Input label="Carbs (%)" type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          <Input label="Protein (%)" type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />
          <Input label="Fat (%)" type="number" value={fat} onChange={(e) => setFat(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? <EmptyResultState text="Your macro gram targets and macro split chart will appear here after calculation." /> : (
          <>
            <ResultHero title="Daily macro plan" value={`${parsed.cals.toFixed(0)} calories`} />
            <DetailCardGrid items={[
              { title: 'Carbs', value: `${result.carbs.toFixed(2)} g` },
              { title: 'Protein', value: `${result.protein.toFixed(2)} g` },
              { title: 'Fat', value: `${result.fat.toFixed(2)} g` },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Macro calorie split</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <PieChart
                  data={{ labels: ['Carbs', 'Protein', 'Fat'], datasets: [{ data: [parsed.c, parsed.p, parsed.f], backgroundColor: ['rgba(6,43,82,0.9)','rgba(154,205,50,0.9)','rgba(220,180,70,0.9)'], borderWidth: 0 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
            </div>
            <FormulaBlock formula="Carb grams = (Calories × Carb%) ÷ 4; Protein grams = (Calories × Protein%) ÷ 4; Fat grams = (Calories × Fat%) ÷ 9" explanation="The percentages should add up to 100% for a complete macro distribution." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'Macro plans are often used for meal planning, sports nutrition, and body composition goals.',
              'The best macro split depends on goals, training volume, preferences, and how well you can follow the plan consistently.',
            ]} />
          </>
        )
      }
    />
  );
}
