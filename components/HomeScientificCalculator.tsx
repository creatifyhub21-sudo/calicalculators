'use client';

import React from 'react';

type AngleMode = 'Deg' | 'Rad';

export default function HomeScientificCalculator() {
  const [expression, setExpression] = React.useState('');
  const [display, setDisplay] = React.useState('0');
  const [angleMode, setAngleMode] = React.useState('Deg' as AngleMode);
  const [memory, setMemory] = React.useState(0);
  const [lastAnswer, setLastAnswer] = React.useState('0');

  const append = (value: string) => {
    setExpression((prev) => prev + value);
    setDisplay((prev) => (prev === '0' ? value : prev + value));
  };

  const clearAll = () => {
    setExpression('');
    setDisplay('0');
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
    setDisplay((prev) => {
      const next = prev.slice(0, -1);
      return next || '0';
    });
  };

  const toRadians = (value: number) => {
    return angleMode === 'Deg' ? (value * Math.PI) / 180 : value;
  };

  const safeEval = (raw: string) => {
    let expr = raw;

    expr = expr.replace(/÷/g, '/').replace(/×/g, '*');
    expr = expr.replace(/π/g, 'Math.PI');
    expr = expr.replace(/\be\b/g, 'Math.E');

    expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
    expr = expr.replace(/ln\(/g, 'Math.log(');
    expr = expr.replace(/log\(/g, 'Math.log10(');

    expr = expr.replace(/sin\(([^()]+)\)/g, (_, a) => `Math.sin(${toRadiansExpression(a)})`);
    expr = expr.replace(/cos\(([^()]+)\)/g, (_, a) => `Math.cos(${toRadiansExpression(a)})`);
    expr = expr.replace(/tan\(([^()]+)\)/g, (_, a) => `Math.tan(${toRadiansExpression(a)})`);

    expr = expr.replace(/\^/g, '**');

    return Function(`"use strict"; return (${expr})`)();
  };

  const toRadiansExpression = (valueExpr: string) => {
    if (angleMode === 'Deg') {
      return `((${valueExpr})*Math.PI/180)`;
    }
    return `(${valueExpr})`;
  };

  const calculate = () => {
    try {
      const result = safeEval(expression);
      if (!Number.isFinite(result)) {
        setDisplay('Error');
        return;
      }
      const formatted = String(Number(result.toFixed(12)));
      setExpression(formatted);
      setDisplay(formatted);
      setLastAnswer(formatted);
    } catch {
      setDisplay('Error');
    }
  };

  const buttonClass =
    'h-14 rounded-xl border border-slate-300 bg-white text-slate-900 text-xl font-semibold shadow-sm hover:bg-slate-100 transition';
  const actionClass =
    'h-14 rounded-xl border border-blue-300 bg-blue-100 text-blue-900 text-xl font-semibold shadow-sm hover:bg-blue-200 transition';
  const equalClass =
    'h-14 rounded-xl border border-blue-700 bg-blue-700 text-white text-xl font-semibold shadow-sm hover:bg-blue-800 transition';

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-xl">
      <div className="mb-4 rounded-2xl bg-blue-900 px-4 py-4 text-right text-white shadow-inner">
        <div className="text-sm opacity-80 min-h-5">{expression || ' '}</div>
        <div className="text-4xl font-bold break-all">{display}</div>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm font-medium text-slate-700">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={angleMode === 'Deg'}
              onChange={() => setAngleMode('Deg')}
            />
            Deg
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={angleMode === 'Rad'}
              onChange={() => setAngleMode('Rad')}
            />
            Rad
          </label>
        </div>
        <div>
          {angleMode} mode • Memory {memory}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <button className={buttonClass} onClick={() => append('sin(')}>sin</button>
        <button className={buttonClass} onClick={() => append('cos(')}>cos</button>
        <button className={buttonClass} onClick={() => append('tan(')}>tan</button>
        <button className={actionClass} onClick={() => append('(')}>(</button>
        <button className={actionClass} onClick={() => append(')')}>)</button>

        <button className={buttonClass} onClick={() => append('log(')}>log</button>
        <button className={buttonClass} onClick={() => append('ln(')}>ln</button>
        <button className={buttonClass} onClick={() => append('sqrt(')}>√</button>
        <button className={buttonClass} onClick={() => append('^2')}>x²</button>
        <button className={buttonClass} onClick={() => append('^3')}>x³</button>

        <button className={buttonClass} onClick={() => append('7')}>7</button>
        <button className={buttonClass} onClick={() => append('8')}>8</button>
        <button className={buttonClass} onClick={() => append('9')}>9</button>
        <button className={buttonClass} onClick={() => append('÷')}>÷</button>
        <button className={actionClass} onClick={backspace}>Back</button>

        <button className={buttonClass} onClick={() => append('4')}>4</button>
        <button className={buttonClass} onClick={() => append('5')}>5</button>
        <button className={buttonClass} onClick={() => append('6')}>6</button>
        <button className={buttonClass} onClick={() => append('×')}>×</button>
        <button className={actionClass} onClick={() => setDisplay(lastAnswer) || setExpression(lastAnswer)}>Ans</button>

        <button className={buttonClass} onClick={() => append('1')}>1</button>
        <button className={buttonClass} onClick={() => append('2')}>2</button>
        <button className={buttonClass} onClick={() => append('3')}>3</button>
        <button className={buttonClass} onClick={() => append('-')}>-</button>
        <button
          className={actionClass}
          onClick={() => {
            const current = Number(display || 0);
            setMemory((m) => m + current);
          }}
        >
          M+
        </button>

        <button className={buttonClass} onClick={() => append('0')}>0</button>
        <button className={buttonClass} onClick={() => append('.')}>.</button>
        <button className={buttonClass} onClick={() => append('π')}>π</button>
        <button className={buttonClass} onClick={() => append('+')}>+</button>
        <button
          className={actionClass}
          onClick={() => {
            const current = Number(display || 0);
            setMemory((m) => m - current);
          }}
        >
          M-
        </button>

        <button className={buttonClass} onClick={() => append('e')}>e</button>
        <button className={actionClass} onClick={() => append('^')}>xʸ</button>
        <button className={actionClass} onClick={() => append('%')}>%</button>
        <button className={equalClass} onClick={calculate}>=</button>
        <button className={actionClass} onClick={() => {
          const mem = String(memory);
          setExpression(mem);
          setDisplay(mem);
        }}>
          MR
        </button>
      </div>

      <button
        onClick={clearAll}
        className="mt-4 h-14 w-full rounded-xl border border-red-300 bg-red-100 text-red-800 text-xl font-semibold hover:bg-red-200 transition"
      >
        Clear
      </button>
    </div>
  );
}