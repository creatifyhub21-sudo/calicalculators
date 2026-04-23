'use client';
import React, { useState } from 'react';

export default function HomeScientificCalculator() {
  const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput('');

  const calculate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  const buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto">
      
      {/* Display */}
      <div className="bg-slate-100 text-right text-2xl p-4 rounded-xl mb-4">
        {input || '0'}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() =>
              btn === '=' ? calculate() : handleClick(btn)
            }
            className="bg-slate-200 hover:bg-blue-500 hover:text-white transition p-4 rounded-xl text-lg font-semibold"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Clear Button */}
      <button
        onClick={clear}
        className="mt-4 w-full bg-red-400 hover:bg-red-500 text-white p-3 rounded-xl font-semibold"
      >
        Clear
      </button>
    </div>
  );
}