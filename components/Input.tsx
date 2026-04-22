import React, { useId } from 'react';

interface InputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  disabled?: boolean;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  min,
  max,
  step,
  disabled = false,
  inputClassName = '',
}) => {
  const generatedId = useId();
  const inputId = `input-${generatedId}`;
  const isNumeric = type === 'number';

  return (
    <div className={`min-w-0 flex flex-col space-y-2 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        inputMode={isNumeric ? 'decimal' : undefined}
        autoComplete="off"
        className={`min-w-0 h-14 rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${inputClassName}`}
      />
    </div>
  );
};

export default Input;
