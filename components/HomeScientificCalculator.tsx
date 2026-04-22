import { useMemo, useState } from 'react';
import { evaluateExpression } from '../calculators/scientificCalculator';

type AngleMode = 'deg' | 'rad';

const buttonRows = [
  ['sin', 'cos', 'tan', '7', '8', '9', '+', 'Back'],
  ['sin-1', 'cos-1', 'tan-1', '4', '5', '6', '−', 'Ans'],
  ['xʸ', 'x³', 'x²', '1', '2', '3', '×', 'M+'],
  ['²√x', '³√x', '√x', '0', '.', 'EXP', '÷', 'M-'],
  ['(', ')', '1/x', '%', 'n!', 'Rnd', 'AC', 'MR'],
  ['π', 'e', 'ln', 'log', '+/-', '=', 'Deg', 'Rad'],
];

export default function HomeScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [lastAnswer, setLastAnswer] = useState('0');
  const [memory, setMemory] = useState(0);
  const [error, setError] = useState('');

  const helperText = useMemo(
    () => (angleMode === 'deg' ? `Deg mode • Memory ${memory}` : `Rad mode • Memory ${memory}`),
    [angleMode, memory]
  );

  const syncExpression = (next: string) => {
    setExpression(next);
    setDisplay(next || '0');
  };

  const evaluateCurrent = () => {
    const source = expression || display;
    const result = evaluateExpression(source, angleMode);
    const next = Number.isFinite(result) ? String(result) : 'Error';
    setDisplay(next);
    setExpression(next);
    setLastAnswer(next);
    return Number(next);
  };

  const applyToken = (token: string) => {
    setError('');
    const map: Record<string, string> = {
      sin: 'sin(',
      cos: 'cos(',
      tan: 'tan(',
      'sin-1': 'asin(',
      'cos-1': 'acos(',
      'tan-1': 'atan(',
      'xʸ': '^',
      'x²': '^2',
      'x³': '^3',
      '²√x': 'sqrt(',
      '³√x': 'cbrt(',
      '√x': 'sqrt(',
      ln: 'ln(',
      log: 'log(',
      '−': '-',
      '×': '*',
      '÷': '/',
      π: 'π',
      e: 'e',
      Ans: lastAnswer,
      Rnd: 'rand()',
      EXP: 'e',
      '1/x': 'recip(',
      '%': '/100',
      'n!': '!',
    };

    if (token === 'Back') {
      syncExpression(expression.slice(0, -1));
      return;
    }
    if (token === 'AC') {
      syncExpression('');
      setError('');
      return;
    }
    if (token === 'Deg') {
      setAngleMode('deg');
      return;
    }
    if (token === 'Rad') {
      setAngleMode('rad');
      return;
    }
    if (token === '+/-') {
      if (!expression) {
        syncExpression('-');
      } else if (expression.startsWith('-')) {
        syncExpression(expression.slice(1));
      } else {
        syncExpression(`-${expression}`);
      }
      return;
    }
    if (token === 'MR') {
      syncExpression(`${expression}${memory}`);
      return;
    }
    if (token === 'M+' || token === 'M-') {
      try {
        const currentValue = evaluateCurrent();
        setMemory((prev) => Number((token === 'M+' ? prev + currentValue : prev - currentValue).toFixed(8)));
      } catch (err: any) {
        setError(err.message || 'Invalid expression');
      }
      return;
    }
    if (token === '=') {
      try {
        evaluateCurrent();
      } catch (err: any) {
        setError(err.message || 'Invalid expression');
      }
      return;
    }

    const append = map[token] ?? token;
    syncExpression(`${expression}${append}`);
  };

  return (
    <section className="rounded-[30px] border border-[#9eb4cb] bg-[#cbd7e4] p-4 shadow-sm sm:p-5">
      <div className="rounded-[18px] border border-[#9eb4cb] bg-[#ebf2f8] p-3 shadow-inner">
        <div className="rounded-md bg-[#2f6295] px-3 py-3 text-right text-4xl font-bold tracking-tight text-white shadow-inner">
          {error ? 'Error' : display || '0'}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#1f3c5a]">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5">
              <input type="radio" name="angle-mode" checked={angleMode === 'deg'} onChange={() => setAngleMode('deg')} />
              Deg
            </label>
            <label className="inline-flex items-center gap-1.5">
              <input type="radio" name="angle-mode" checked={angleMode === 'rad'} onChange={() => setAngleMode('rad')} />
              Rad
            </label>
          </div>
          <div>{helperText}</div>
        </div>

        <div className="mt-4 grid gap-2">
          {buttonRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-8 gap-2">
              {row.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => applyToken(label)}
                  className={`flex min-w-0 items-center justify-center rounded-md border px-1 py-3 text-[0.95rem] font-bold leading-tight shadow-sm transition active:translate-y-px sm:px-2 sm:text-lg ${
                    ['=', 'AC', 'Deg', 'Rad'].includes(label)
                      ? 'border-[#2f6295] bg-[#7fa3cc] text-slate-950 hover:bg-[#95b4d6]'
                      : 'border-[#9eb4cb] bg-[#eef3f8] text-slate-950 hover:bg-white'
                  }`}
                >
                  <span className="block break-words text-center">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-[#9eb4cb] bg-white/70 p-3 text-sm text-slate-700">
          <div className="font-semibold text-[#062B52]">Current expression</div>
          <div className="mt-1 break-all">{expression || 'Start tapping buttons to build an expression.'}</div>
          {error ? <div className="mt-2 font-semibold text-red-600">{error}</div> : null}
        </div>
      </div>
    </section>
  );
}
