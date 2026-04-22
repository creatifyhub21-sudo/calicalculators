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

export default function DistanceCalculator() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result, setResult] = useState<{ distance: number; dx: number; dy: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const ax = parseFloat(x1), ay = parseFloat(y1), bx = parseFloat(x2), by = parseFloat(y2);
    if ([ax, ay, bx, by].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    const dx = bx - ax;
    const dy = by - ay;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setResult({ distance, dx, dy });
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Distance Calculator"
      description="Find the distance between two points in a 2D coordinate plane."
      left={
        <CalculatorInputPanel
          description="Enter two points (x₁, y₁) and (x₂, y₂)."
          actions={<Button onClick={calculate}>Calculate distance</Button>}
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
          <EmptyResultState text="Your distance result and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Distance" value={result.distance.toFixed(4)} />
            <DetailCardGrid items={[
              { title: 'Δx', value: result.dx },
              { title: 'Δy', value: result.dy },
            ]} />
            <FormulaBlock formula="Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]" explanation="This comes from the Pythagorean theorem applied to horizontal and vertical changes." />
            <Steps steps={[
              `Find horizontal change: x₂ - x₁ = ${x2} - ${x1} = ${result.dx}.`,
              `Find vertical change: y₂ - y₁ = ${y2} - ${y1} = ${result.dy}.`,
              `Square both changes, add them, then take the square root to get ${result.distance.toFixed(4)}.`,
            ]} />
            <AboutResult paragraphs={[
              'Distance measures the straight-line length between two points.',
              'This is useful in coordinate geometry, mapping, graphing, and physics problems.',
            ]} />
          </>
        )
      }
    />
  );
}
