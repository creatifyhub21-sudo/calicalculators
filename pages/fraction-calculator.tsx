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
import Select from '../components/Select';
import Button from '../components/Button';
import {
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  Fraction,
} from '../calculators/fractionCalculator';

export default function FractionCalculator() {
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<{ frac: Fraction; decimal: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const numerator1 = parseInt(n1);
    const denominator1 = parseInt(d1);
    const numerator2 = parseInt(n2);
    const denominator2 = parseInt(d2);
    if ([numerator1, denominator1, numerator2, denominator2].some((v) => isNaN(v))) {
      return setError('Please enter valid integers.');
    }
    if (denominator1 === 0 || denominator2 === 0) {
      return setError('Denominators cannot be zero.');
    }
    try {
      let frac: Fraction;
      const a = { numerator: numerator1, denominator: denominator1 };
      const b = { numerator: numerator2, denominator: denominator2 };
      switch (operation) {
        case 'add':
          frac = addFractions(a, b);
          break;
        case 'subtract':
          frac = subtractFractions(a, b);
          break;
        case 'multiply':
          frac = multiplyFractions(a, b);
          break;
        default:
          frac = divideFractions(a, b);
      }
      setResult({ frac, decimal: frac.numerator / frac.denominator });
    } catch (e: any) {
      setError(e.message || 'Could not calculate fraction result.');
    }
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Fraction Calculator"
      description="Add, subtract, multiply, or divide two fractions and view both simplified and decimal results."
      left={
        <CalculatorInputPanel
          description="Enter two fractions and choose an operation."
          actions={<Button onClick={calculate}>Calculate fractions</Button>}
          error={error}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Fraction 1</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Numerator" type="number" value={n1} onChange={(e) => setN1(e.target.value)} inputClassName="h-12 px-3 text-base text-center" />
                <Input label="Denominator" type="number" value={d1} onChange={(e) => setD1(e.target.value)} inputClassName="h-12 px-3 text-base text-center" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Fraction 2</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Numerator" type="number" value={n2} onChange={(e) => setN2(e.target.value)} inputClassName="h-12 px-3 text-base text-center" />
                <Input label="Denominator" type="number" value={d2} onChange={(e) => setD2(e.target.value)} inputClassName="h-12 px-3 text-base text-center" />
              </div>
            </div>
          </div>
          <Select
            label="Operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            options={[
              { value: 'add', label: 'Add' },
              { value: 'subtract', label: 'Subtract' },
              { value: 'multiply', label: 'Multiply' },
              { value: 'divide', label: 'Divide' },
            ]}
          />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your fraction result and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Fraction result" value={`${result.frac.numerator}/${result.frac.denominator}`} badge={result.decimal.toFixed(4)} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
            <DetailCardGrid items={[
              { title: 'Decimal value', value: result.decimal.toFixed(4) },
              { title: 'Operation', value: operation },
            ]} />
            <FormulaBlock formula="Operate on numerators/denominators, then simplify" explanation="The exact arithmetic depends on the selected operation, then the result is reduced to lowest terms." />
            <Steps steps={[
              'Read the two input fractions.',
              `Apply the ${operation} operation to the fractions.`,
              `Simplify the result to ${result.frac.numerator}/${result.frac.denominator}.`,
              `Convert to decimal form: ${result.decimal.toFixed(4)}.`,
            ]} />
            <AboutResult paragraphs={[
              'Fractions represent parts of a whole and are often preferred over rounded decimals in exact arithmetic.',
              'Keeping the simplified fraction helps preserve exactness in later calculations.',
            ]} />
          </>
        )
      }
    />
  );
}
