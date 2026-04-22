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

export default function SlopeCalculator() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result, setResult] = useState<{ slope: string; rise: number; run: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const ax = parseFloat(x1), ay = parseFloat(y1), bx = parseFloat(x2), by = parseFloat(y2);
    if ([ax, ay, bx, by].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    const rise = by - ay;
    const run = bx - ax;
    if (run === 0) return setResult({ slope: 'Undefined', rise, run });
    setResult({ slope: (rise / run).toFixed(4), rise, run });
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Slope Calculator"
      description="Find the slope of a line from two coordinate points."
      left={
        <CalculatorInputPanel
          description="Enter two points (x₁, y₁) and (x₂, y₂)."
          actions={<Button onClick={calculate}>Calculate slope</Button>}
          error={error}
        >
          <div className="grid grid-cols-2 gap-4">
            <Input label="x₁" type="number" value={x1} onChange={(e) => setX1(e.target.value)} />
            <Input label="y₁" type="number" value={y1} onChange={(e) => setY1(e.target.value)} />
            <Input label="x₂" type="number" value={x2} onChange={(e) => setX2(e.target.value)} />
            <Input label="y₂" type="number" value={y2} onChange={(e) => setY2(e.target.value)} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your slope result and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Slope" value={result.slope} />
            <DetailCardGrid items={[
              { title: 'Rise', value: result.rise },
              { title: 'Run', value: result.run },
            ]} />
            <FormulaBlock formula="Slope (m) = (y₂ - y₁) ÷ (x₂ - x₁)" explanation="Slope describes how steeply a line rises or falls from left to right." />
            <Steps steps={[
              `Find the rise: y₂ - y₁ = ${y2} - ${y1} = ${result.rise}.`,
              `Find the run: x₂ - x₁ = ${x2} - ${x1} = ${result.run}.`,
              result.run === 0 ? 'Because the run is 0, the line is vertical and the slope is undefined.' : `Divide rise by run: ${result.rise} ÷ ${result.run} = ${result.slope}.`,
            ]} />
            <AboutResult paragraphs={[
              'A positive slope rises left to right, a negative slope falls left to right, and zero slope is horizontal.',
              'A vertical line has undefined slope because dividing by zero is not allowed.',
            ]} />
          </>
        )
      }
    />
  );
}
