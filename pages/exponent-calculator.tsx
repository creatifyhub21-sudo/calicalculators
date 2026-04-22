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
import { power } from '../calculators/exponent';

export default function ExponentCalculator() {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const b = parseFloat(base);
    const e = parseFloat(exponent);

    if (Number.isNaN(b) || Number.isNaN(e)) {
      setError('Please enter a valid base and exponent.');
      return;
    }

    setResult(power(b, e));
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Exponent Calculator"
      description="Raise a number to any power with a cleaner formula block, clearer output, and a short explanation of what the exponent means."
      left={
        <CalculatorInputPanel
          title="Exponent inputs"
          description="Enter the base number and the exponent you want to apply."
          actions={<Button onClick={handleCalculate}>Calculate power</Button>}
          error={error}
        >
          <Input label="Base" type="number" value={base} onChange={(e) => setBase(e.target.value)} />
          <Input label="Exponent" type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter a base and exponent to calculate the power." />
        ) : (
          <>
            <ResultHero eyebrow="Power result" title="Exponent value" value={result.toLocaleString(undefined, { maximumFractionDigits: 10 })} />
            <DetailCardGrid
              items={[
                { title: 'Base', value: base },
                { title: 'Exponent', value: exponent },
                { title: 'Expression', value: `${base}^${exponent}` },
              ]}
            />
            <FormulaBlock
              formula="result = base^exponent"
              explanation="An exponent tells you how many times the base is multiplied by itself. Fractional and negative exponents are also supported by JavaScript math operations."
            />
            <Steps
              steps={[
                `Take the base: ${base}.`,
                `Apply the exponent: ${exponent}.`,
                `Final result = ${result.toLocaleString(undefined, { maximumFractionDigits: 10 })}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Exponents are used in finance, science, engineering, and growth models because they describe repeated multiplication compactly.',
                'A premium result layout makes this tool feel much more complete than a plain single-number output.'
              ]}
            />
          </>
        )
      }
    />
  );
}
