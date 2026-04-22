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
import { calculateSquareFootage } from '../calculators/squareFootage';

export default function SquareFootageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState<'ft' | 'in' | 'm'>('ft');
  const [result, setResult] = useState<{ squareFeet: number; squareMeters: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const len = parseFloat(length);
    const wid = parseFloat(width);

    if (Number.isNaN(len) || len <= 0 || Number.isNaN(wid) || wid <= 0) {
      setError('Please enter valid positive numbers for length and width.');
      return;
    }

    setResult(calculateSquareFootage({ length: len, width: wid, unit }));
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Square Footage Calculator"
      description="Calculate rectangular area with a premium-style result block, unit conversion support, and a simple formula explanation."
      left={
        <CalculatorInputPanel
          title="Area inputs"
          description="Enter the rectangle dimensions and choose the measurement unit."
          actions={<Button onClick={handleCalculate}>Calculate area</Button>}
          error={error}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
            <Input label="Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
          <Select
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'ft' | 'in' | 'm')}
            options={[
              { value: 'ft', label: 'Feet' },
              { value: 'in', label: 'Inches' },
              { value: 'm', label: 'Meters' },
            ]}
          />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter the dimensions of a rectangular space to calculate the area." />
        ) : (
          <>
            <ResultHero eyebrow="Area result" title="Square footage" value={`${result.squareFeet.toFixed(2)} ft²`} />
            <DetailCardGrid
              items={[
                { title: 'Square feet', value: result.squareFeet.toFixed(2) },
                { title: 'Square meters', value: result.squareMeters.toFixed(2) },
                { title: 'Input unit', value: unit },
              ]}
            />
            <FormulaBlock
              formula="area = length × width"
              explanation="The raw area is calculated first, then converted into square feet and square meters so the result is easy to reuse in different contexts."
            />
            <Steps
              steps={[
                `Use length = ${length} and width = ${width}.`,
                'Convert the dimensions into feet when needed.',
                'Multiply length by width to get total area.',
                `Final area = ${result.squareFeet.toFixed(2)} ft² (${result.squareMeters.toFixed(2)} m²).`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Square-foot calculations are useful for flooring, paint estimates, landscaping, roofing prep, and room planning.',
                'Providing both square feet and square meters makes the tool more useful for both US and metric users.'
              ]}
            />
          </>
        )
      }
    />
  );
}
