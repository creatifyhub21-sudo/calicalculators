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
import { add, subtract, multiply, divide } from '../calculators/basicCalculator';

export default function BasicCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setError('Please enter valid numbers in both fields.');
      return;
    }

    const operationMap: Record<string, { label: string; formula: string; compute: () => number }> = {
      add: { label: 'Addition', formula: `${numA} + ${numB}`, compute: () => add(numA, numB) },
      subtract: { label: 'Subtraction', formula: `${numA} − ${numB}`, compute: () => subtract(numA, numB) },
      multiply: { label: 'Multiplication', formula: `${numA} × ${numB}`, compute: () => multiply(numA, numB) },
      divide: { label: 'Division', formula: `${numA} ÷ ${numB}`, compute: () => divide(numA, numB) },
    };

    const chosen = operationMap[operation];
    const value = chosen.compute();

    if (!Number.isFinite(value)) {
      setError('Division by zero is not allowed.');
      return;
    }

    setResult(value);
  };

  const operationLabel =
    operation === 'add' ? 'Addition' : operation === 'subtract' ? 'Subtraction' : operation === 'multiply' ? 'Multiplication' : 'Division';

  return (
    <CalculatorPageShell
      category="Math"
      title="Basic Calculator"
      description="A cleaner everyday arithmetic calculator with premium result cards, a formula display, and a simple step-by-step breakdown."
      left={
        <CalculatorInputPanel
          title="Arithmetic inputs"
          description="Enter two numbers and choose the operation you want to perform."
          actions={<Button onClick={calculate}>Calculate</Button>}
          error={error}
        >
          <Input label="Number 1" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          <Select
            label="Operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            options={[
              { value: 'add', label: 'Add (+)' },
              { value: 'subtract', label: 'Subtract (−)' },
              { value: 'multiply', label: 'Multiply (×)' },
              { value: 'divide', label: 'Divide (÷)' },
            ]}
          />
          <Input label="Number 2" type="number" value={b} onChange={(e) => setB(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter two numbers and choose an operation to see the result instantly." />
        ) : (
          <>
            <ResultHero eyebrow="Arithmetic result" title={operationLabel} value={result.toLocaleString(undefined, { maximumFractionDigits: 10 })} />
            <DetailCardGrid
              items={[
                { title: 'First number', value: a },
                { title: 'Operation', value: operationLabel },
                { title: 'Second number', value: b },
              ]}
            />
            <FormulaBlock
              formula={operation === 'add' ? `${a} + ${b}` : operation === 'subtract' ? `${a} − ${b}` : operation === 'multiply' ? `${a} × ${b}` : `${a} ÷ ${b}`}
              explanation="This calculator performs direct arithmetic with validation for invalid inputs and divide-by-zero cases."
            />
            <Steps
              steps={[
                `Read the first number: ${a}.`,
                `Apply ${operationLabel.toLowerCase()} using the second number: ${b}.`,
                `Final result = ${result.toLocaleString(undefined, { maximumFractionDigits: 10 })}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Basic arithmetic is used everywhere, from quick budgeting and shopping math to homework and estimates.',
                'Giving the result in a premium card layout makes even a simple calculator feel more polished and easier to scan.'
              ]}
            />
          </>
        )
      }
    />
  );
}
