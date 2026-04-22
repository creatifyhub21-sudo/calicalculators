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

export default function PythagoreanCalculator() {
  const [mode, setMode] = useState<'c'|'a'|'b'>('c');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const av = parseFloat(a), bv = parseFloat(b), cv = parseFloat(c);
    if (mode === 'c') {
      if (isNaN(av) || isNaN(bv) || av <= 0 || bv <= 0) return setError('Enter valid positive values for a and b.');
      setResult(Math.sqrt(av * av + bv * bv));
    } else if (mode === 'a') {
      if (isNaN(bv) || isNaN(cv) || bv <= 0 || cv <= 0 || cv <= bv) return setError('For side a, c must be greater than b.');
      setResult(Math.sqrt(cv * cv - bv * bv));
    } else {
      if (isNaN(av) || isNaN(cv) || av <= 0 || cv <= 0 || cv <= av) return setError('For side b, c must be greater than a.');
      setResult(Math.sqrt(cv * cv - av * av));
    }
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Pythagorean Theorem Calculator"
      description="Solve for a missing side of a right triangle using a² + b² = c²."
      left={
        <CalculatorInputPanel
          description="Choose which side you want to solve for and enter the other two sides."
          actions={<Button onClick={calculate}>Calculate side</Button>}
          error={error}
        >
          <Select
            label="Solve for"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'c'|'a'|'b')}
            options={[
              { value: 'c', label: 'Hypotenuse (c)' },
              { value: 'a', label: 'Leg a' },
              { value: 'b', label: 'Leg b' },
            ]}
          />
          <Input label="a" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          <Input label="b" type="number" value={b} onChange={(e) => setB(e.target.value)} />
          <Input label="c" type="number" value={c} onChange={(e) => setC(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your missing side and formula walkthrough will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Calculated side" value={result.toFixed(4)} />
            <DetailCardGrid items={[
              { title: 'Solved for', value: mode },
              { title: 'Triangle type', value: 'Right triangle' },
            ]} />
            <FormulaBlock formula={mode === 'c' ? 'c = √(a² + b²)' : mode === 'a' ? 'a = √(c² - b²)' : 'b = √(c² - a²)'} explanation="The Pythagorean theorem relates the two legs of a right triangle to the hypotenuse." />
            <Steps steps={[
              mode === 'c' ? `Square a and b, add them, and take the square root.` : `Square the hypotenuse and the known leg, subtract, and take the square root.`,
              `The missing side is ${result.toFixed(4)}.`,
            ]} />
            <AboutResult paragraphs={[
              'The Pythagorean theorem applies only to right triangles.',
              'It is one of the most common tools in geometry, trigonometry, surveying, and construction.',
            ]} />
          </>
        )
      }
    />
  );
}
