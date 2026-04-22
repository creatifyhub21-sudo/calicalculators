import React, { useId } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = '',
  disabled = false,
}) => {
  const generatedId = useId();
  const selectId = `select-${generatedId}`;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label htmlFor={selectId} className="text-sm font-semibold text-slate-700">{label}</label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
