import { useMemo, useState } from 'react';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import Input from '../components/Input';
import Button from '../components/Button';
import { generatePassword } from '../calculators/password';

export default function PasswordGenerator() {
  const [length, setLength] = useState('12');
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const strength = useMemo(() => {
    const len = parseInt(length, 10) || 0;
    const selected = [includeUpper, includeLower, includeNumbers, includeSymbols].filter(Boolean).length;
    if (len >= 16 && selected >= 3) return 'Strong';
    if (len >= 10 && selected >= 2) return 'Moderate';
    return 'Basic';
  }, [length, includeLower, includeNumbers, includeSymbols, includeUpper]);

  const handleGenerate = () => {
    setError(null);
    setResult(null);

    const len = parseInt(length, 10);
    if (Number.isNaN(len) || len <= 0) {
      setError('Please enter a valid password length.');
      return;
    }
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
      setError('Select at least one character type.');
      return;
    }

    setResult(
      generatePassword({
        length: len,
        includeUpper,
        includeLower,
        includeNumbers,
        includeSymbols,
      })
    );
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Password Generator"
      description="Generate random passwords with a more premium layout, clearer settings, and an instant strength-style summary."
      left={
        <CalculatorInputPanel
          title="Password settings"
          description="Choose the password length and the character types you want to include."
          actions={<Button onClick={handleGenerate}>Generate password</Button>}
          error={error}
        >
          <Input label="Password length" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { checked: includeUpper, setChecked: setIncludeUpper, label: 'Uppercase letters' },
              { checked: includeLower, setChecked: setIncludeLower, label: 'Lowercase letters' },
              { checked: includeNumbers, setChecked: setIncludeNumbers, label: 'Numbers' },
              { checked: includeSymbols, setChecked: setIncludeSymbols, label: 'Symbols' },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={item.checked} onChange={(e) => item.setChecked(e.target.checked)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Choose your settings and generate a random password." />
        ) : (
          <>
            <ResultHero eyebrow="Generated result" title="Password" value={result} badge={strength} badgeClassName={strength === 'Strong' ? 'bg-[#9ACD32]/15 text-[#577c12]' : strength === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'} />
            <DetailCardGrid
              items={[
                { title: 'Length', value: length },
                { title: 'Character groups', value: [includeUpper, includeLower, includeNumbers, includeSymbols].filter(Boolean).length },
                { title: 'Estimated strength', value: strength },
              ]}
            />
            <AboutResult
              paragraphs={[
                'Longer passwords with multiple character types are generally harder to guess or brute-force than short, simple passwords.',
                'This generator gives you a quick random password based on the settings you choose, which is much better than reusing an old password.'
              ]}
            />
          </>
        )
      }
    />
  );
}
