import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import { evaluateExpression } from '../calculators/scientificCalculator';

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);
    if (!expression.trim()) {
      setError('Please enter a mathematical expression.');
      return;
    }
    try {
      setResult(String(evaluateExpression(expression)));
    } catch (err: any) {
      setError(err.message || 'Invalid expression');
    }
  };

  const normalized = expression.replace(/\^/g, '**').replace(/π/g, 'PI').replace(/\bpi\b/gi, 'PI').replace(/\be\b/gi, 'E');

  return (
    <CalculatorPageShell
      category="Math"
      title="Scientific Calculator"
      description="Evaluate advanced expressions with powers, roots, logs, trigonometry, parentheses, and constants such as π and e."
      left={
        <CalculatorInputPanel
          description="Type a mathematical expression using operators, functions, and parentheses."
          actions={<Button onClick={calculate}>Evaluate expression</Button>}
          error={error}
        >
          <Input label="Expression" value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="e.g. sin(PI/2) + log(10) + 3^2" />
          <FormulaBlock title="Supported syntax" formula="sin, cos, tan, log, sqrt, +, -, *, /, ^, (), PI, E" explanation="The caret symbol ^ is automatically interpreted as exponentiation." />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your evaluated answer and expression details will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Expression result" value={result} />
            <DetailCardGrid items={[
              { title: 'Original expression', value: expression, hint: 'Exactly what you typed into the calculator.' },
              { title: 'Normalized expression', value: normalized, hint: 'Internal representation used before evaluation.' },
            ]} columns="sm:grid-cols-2" />
            <FormulaBlock title="How this calculator works" formula="Evaluate(normalized expression inside Math context)" explanation="Common math functions are resolved through the JavaScript Math library after normalizing symbols such as ^, π, pi, and e." />
            <AboutResult paragraphs={[
              'Because scientific calculator expressions can vary widely, there is not one universal step-by-step algebraic walkthrough for every input. Instead, this page shows the normalized form used for evaluation.',
              'If an expression fails, check parentheses, function spelling, and whether every operator has numbers on both sides where needed.',
            ]} />
          </>
        )
      }
    />
  );
}
