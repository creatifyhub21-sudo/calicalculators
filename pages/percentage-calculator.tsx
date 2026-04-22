import { useMemo, useState } from 'react';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { percentageOf, totalFromPartAndPercent, whatPercent } from '../calculators/percentage';

const modeOptions = [
  { value: 'what-percent', label: 'What percent is X of Y?' },
  { value: 'percent-of', label: 'What is X% of Y?' },
  { value: 'find-total', label: 'X is Y% of what total?' },
];

export default function PercentageCalculator() {
  const [mode, setMode] = useState('what-percent');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const labels = useMemo(() => {
    switch (mode) {
      case 'percent-of':
        return { a: 'Percentage', b: 'Total', button: 'Calculate value' };
      case 'find-total':
        return { a: 'Part', b: 'Percentage', button: 'Calculate total' };
      default:
        return { a: 'Part', b: 'Whole', button: 'Calculate percentage' };
    }
  }, [mode]);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const first = parseFloat(a);
    const second = parseFloat(b);

    if (Number.isNaN(first) || Number.isNaN(second)) {
      setError('Please enter valid numbers in both fields.');
      return;
    }

    let value = 0;
    if (mode === 'what-percent') {
      value = whatPercent(first, second);
      if (!Number.isFinite(value)) {
        setError('Whole cannot be 0 when finding a percentage.');
        return;
      }
    } else if (mode === 'percent-of') {
      value = percentageOf(first, second);
    } else {
      value = totalFromPartAndPercent(first, second);
      if (!Number.isFinite(value)) {
        setError('Percentage cannot be 0 when solving for the total.');
        return;
      }
    }

    setResult(value);
  };

  const detailItems = result === null ? [] : mode === 'what-percent'
    ? [
        { title: 'Part', value: a },
        { title: 'Whole', value: b },
        { title: 'Decimal form', value: (result / 100).toFixed(4) },
      ]
    : mode === 'percent-of'
      ? [
          { title: 'Percent used', value: `${parseFloat(a).toFixed(2)}%` },
          { title: 'Total used', value: b },
          { title: 'Decimal form', value: (parseFloat(a) / 100).toFixed(4) },
        ]
      : [
          { title: 'Known part', value: a },
          { title: 'Known percent', value: `${parseFloat(b).toFixed(2)}%` },
          { title: 'Decimal form', value: (parseFloat(b) / 100).toFixed(4) },
        ];

  const formula = mode === 'what-percent'
    ? 'percentage = (part ÷ whole) × 100'
    : mode === 'percent-of'
      ? 'value = (percent ÷ 100) × total'
      : 'total = part ÷ (percent ÷ 100)';

  const steps = result === null ? [] : mode === 'what-percent'
    ? [
        `Take the part value: ${a}.`,
        `Divide it by the whole: ${a} ÷ ${b}.`,
        'Multiply the decimal result by 100.',
        `Final percentage = ${result.toFixed(2)}%.`,
      ]
    : mode === 'percent-of'
      ? [
          `Convert ${a}% into decimal form: ${(parseFloat(a) / 100).toFixed(4)}.`,
          `Multiply by the total: ${(parseFloat(a) / 100).toFixed(4)} × ${b}.`,
          `Final value = ${result.toFixed(2)}.`,
        ]
      : [
          `Convert ${b}% into decimal form: ${(parseFloat(b) / 100).toFixed(4)}.`,
          `Divide the part by that decimal: ${a} ÷ ${(parseFloat(b) / 100).toFixed(4)}.`,
          `Original total = ${result.toFixed(2)}.`,
        ];

  return (
    <CalculatorPageShell
      category="Math"
      title="Percentage Calculator"
      description="Solve the three most common percentage problems with a cleaner premium layout, clearer result cards, and a step-by-step formula walkthrough."
      left={
        <CalculatorInputPanel
          title="Percentage inputs"
          description="Choose the type of percentage question you want to solve, then enter the two required values."
          actions={<Button onClick={handleCalculate}>{labels.button}</Button>}
          error={error}
        >
          <Select label="Calculation type" value={mode} onChange={(e) => setMode(e.target.value)} options={modeOptions} />
          <Input label={labels.a} type="number" value={a} onChange={(e) => setA(e.target.value)} />
          <Input label={labels.b} type="number" value={b} onChange={(e) => setB(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter your values to calculate a percentage, a percentage amount, or the original total." />
        ) : (
          <>
            <ResultHero
              eyebrow="Premium result"
              title={mode === 'what-percent' ? 'Percentage result' : mode === 'percent-of' ? 'Calculated amount' : 'Original total'}
              value={mode === 'what-percent' ? `${result.toFixed(2)}%` : result.toFixed(2)}
            />
            <DetailCardGrid items={detailItems} />
            <FormulaBlock
              formula={formula}
              explanation="This page uses the standard percentage relationships: part-to-whole, percent-of-total, and reverse percentage for solving the original total."
            />
            <Steps steps={steps} />
            <AboutResult
              paragraphs={[
                'Percentages are useful when you want to compare a part against a whole in a normalized way. They make proportions easier to understand at a glance.',
                'This calculator supports the three most common percentage tasks so users do not need separate tools for each scenario.'
              ]}
            />
          </>
        )
      }
    />
  );
}
