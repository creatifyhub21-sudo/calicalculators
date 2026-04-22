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

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<{ x1: string; x2: string; discriminant: number } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const av = parseFloat(a);
    const bv = parseFloat(b);
    const cv = parseFloat(c);
    if ([av, bv, cv].some((v) => isNaN(v))) return setError('Please enter valid numbers.');
    if (av === 0) return setError('a cannot be 0 in a quadratic equation.');
    const d = bv * bv - 4 * av * cv;
    if (d >= 0) {
      const x1 = (-bv + Math.sqrt(d)) / (2 * av);
      const x2 = (-bv - Math.sqrt(d)) / (2 * av);
      setResult({ x1: x1.toFixed(4), x2: x2.toFixed(4), discriminant: d });
    } else {
      const real = (-bv / (2 * av)).toFixed(4);
      const imag = (Math.sqrt(-d) / (2 * av)).toFixed(4);
      setResult({ x1: `${real} + ${imag}i`, x2: `${real} - ${imag}i`, discriminant: d });
    }
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Quadratic Formula Calculator"
      description="Solve equations of the form ax² + bx + c = 0 using the quadratic formula."
      left={
        <CalculatorInputPanel
          description="Enter the coefficients a, b, and c."
          actions={<Button onClick={calculate}>Solve quadratic</Button>}
          error={error}
        >
          <Input label="a" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          <Input label="b" type="number" value={b} onChange={(e) => setB(e.target.value)} />
          <Input label="c" type="number" value={c} onChange={(e) => setC(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your roots, discriminant, and step-by-step solution will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Roots of the equation" value={`x₁ = ${result.x1}`} badge={`x₂ = ${result.x2}`} badgeClassName="bg-[#062B52]/10 text-[#062B52]" />
            <DetailCardGrid items={[
              { title: 'Discriminant', value: result.discriminant.toFixed(4) },
              { title: 'Nature of roots', value: result.discriminant > 0 ? 'Two real roots' : result.discriminant === 0 ? 'One repeated real root' : 'Two complex roots' },
            ]} />
            <FormulaBlock formula="x = (-b ± √(b² - 4ac)) ÷ 2a" explanation="The discriminant b² - 4ac determines whether the roots are real or complex." />
            <Steps steps={[
              `Compute the discriminant: b² - 4ac = (${b})² - 4(${a})(${c}) = ${result.discriminant.toFixed(4)}.`,
              `Substitute a, b, and the discriminant into the quadratic formula.`,
              `Simplify to get x₁ = ${result.x1} and x₂ = ${result.x2}.`,
            ]} />
            <AboutResult paragraphs={[
              'The quadratic formula works for any quadratic equation as long as a is not zero.',
              'A positive discriminant gives two real roots, zero gives one repeated root, and a negative discriminant gives complex roots.',
            ]} />
          </>
        )
      }
    />
  );
}
