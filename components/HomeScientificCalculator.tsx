import * as React from 'react';

type AngleMode = 'deg' | 'rad';

export default function HomeScientificCalculator() {
  const [expression, setExpression] = React.useState('');
  const [display, setDisplay] = React.useState('0');
  const [angleMode, setAngleMode] = React.useState<AngleMode>('deg');
  const [lastAnswer, setLastAnswer] = React.useState('0');
  const [memory, setMemory] = React.useState(0);
  const [error, setError] = React.useState('');

  const handleInput = (value: string) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression('');
    setDisplay('0');
    setError('');
  };

  const handleCalculate = () => {
    try {
      // ⚠️ simple eval for now (we improve later)
      const result = eval(expression || '0');
      setDisplay(String(result));
      setLastAnswer(String(result));
      setError('');
    } catch {
      setError('Invalid Expression');
    }
  };

  return (
    <div className="p-4 rounded-xl border bg-white shadow-md">
      <div className="mb-3 text-right text-xl font-semibold">
        {error ? error : display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('+')}>+</button>

        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>

        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('*')}>×</button>

        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleInput('/')}>÷</button>

        <button onClick={handleClear} className="col-span-4 bg-red-100">
          Clear
        </button>
      </div>
    </div>
  );
}