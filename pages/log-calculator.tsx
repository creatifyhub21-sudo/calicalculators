import { useState } from 'react';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import Input from '../components/Input';
import Button from '../components/Button';
import { logarithm } from '../calculators/logarithm';

export default function LogCalculator() {
  const [value, setValue] = useState('');
  const [base, setBase] = useState('10');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const val = parseFloat(value);
    const parsedBase = base.trim().toLowerCase() === 'e' ? Math.E : parseFloat(base);

    if (Number.isNaN(val) || val <= 0) {
      setError('Value must be a positive number.');
      return;
    }

    if (Number.isNaN(parsedBase) || parsedBase <= 0 || parsedBase === 1) {
      setError('Base must be greater than 0 and cannot equal 1.');
      return;
    }

    const output = logarithm(val, parsedBase);
    if (!Number.isFinite(output)) {
      setError('Unable to calculate the logarithm with those inputs.');
      return;
    }

    setResult(output);
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Log Calculator"
      description="Calculate logarithms for custom bases with a polished premium result panel and a clear change-of-base explanation."
      left={
        <CalculatorInputPanel
          title="Log inputs"
          description="Enter the value you want to evaluate and the logarithm base. Use e for the natural logarithm."
          actions={<Button onClick={handleCalculate}>Calculate log</Button>}
          error={error}
        >
          <Input label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          <Input label="Base" type="text" value={base} onChange={(e) => setBase(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter a positive value and a valid base to calculate a logarithm." />
        ) : (
          <>
            <ResultHero eyebrow="Log result" title="Logarithm" value={result.toLocaleString(undefined, { maximumFractionDigits: 10 })} />
            <DetailCardGrid
              items={[
                { title: 'Value', value },
                { title: 'Base', value: base },
                { title: 'Natural log used', value: base.trim().toLowerCase() === 'e' ? 'Yes' : 'No' },
              ]}
            />
            <FormulaBlock
              formula="log_b(x) = ln(x) ÷ ln(b)"
              explanation="This calculator uses the change-of-base formula, which lets any logarithm be calculated from natural logs."
            />
            <Steps
              steps={[
                `Use x = ${value} and b = ${base}.`,
                'Take the natural logarithm of both the value and the base.',
                'Divide ln(x) by ln(b).',
                `Final logarithm = ${result.toLocaleString(undefined, { maximumFractionDigits: 10 })}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Logarithms are the inverse of exponents. They answer the question: to what power must the base be raised to produce the given value?',
                'They are common in algebra, pH calculations, sound intensity, finance, and exponential growth models.'
              ]}
            />
          </>
        )
      }
    />
  );
}
