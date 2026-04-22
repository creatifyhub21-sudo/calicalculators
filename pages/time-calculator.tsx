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
import { parseTime, addTime, formatTime } from '../calculators/time';

export default function TimeCalculator() {
  const [time, setTime] = useState('');
  const [deltaHours, setDeltaHours] = useState('0');
  const [deltaMinutes, setDeltaMinutes] = useState('0');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const parsedTime = parseTime(time);
    const hours = parseInt(deltaHours, 10);
    const minutes = parseInt(deltaMinutes, 10);

    if (!parsedTime) {
      setError('Please enter a valid starting time.');
      return;
    }

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      setError('Please enter valid hour and minute adjustments.');
      return;
    }

    const sign = operation === 'subtract' ? -1 : 1;
    setResult(formatTime(addTime(parsedTime, sign * hours, sign * minutes)));
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Time Calculator"
      description="Add or subtract hours and minutes from a clock time with a premium result layout and wrap-around handling for 24-hour time."
      left={
        <CalculatorInputPanel
          title="Time inputs"
          description="Enter the starting time, choose whether to add or subtract, and then enter the time change."
          actions={<Button onClick={handleCalculate}>Calculate time</Button>}
          error={error}
        >
          <Input label="Start time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Select
            label="Operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            options={[
              { value: 'add', label: 'Add time' },
              { value: 'subtract', label: 'Subtract time' },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Hours" type="number" value={deltaHours} onChange={(e) => setDeltaHours(e.target.value)} />
            <Input label="Minutes" type="number" value={deltaMinutes} onChange={(e) => setDeltaMinutes(e.target.value)} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter a start time and adjustment to see the new clock time." />
        ) : (
          <>
            <ResultHero eyebrow="Time result" title="Resulting time" value={result} />
            <DetailCardGrid
              items={[
                { title: 'Start time', value: time },
                { title: 'Operation', value: operation === 'add' ? 'Add' : 'Subtract' },
                { title: 'Adjustment', value: `${deltaHours}h ${deltaMinutes}m` },
              ]}
            />
            <FormulaBlock
              formula="new time = start time ± duration (wrapped within 24 hours)"
              explanation="The calculator converts the time into total minutes, applies the chosen adjustment, and wraps the result within a 24-hour day."
            />
            <Steps
              steps={[
                `Start with ${time}.`,
                `Convert ${deltaHours}h ${deltaMinutes}m into total minutes.`,
                `${operation === 'add' ? 'Add' : 'Subtract'} the duration from the original time.`,
                `Wrap around the clock if needed to get ${result}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'This tool is useful for scheduling, appointments, departure planning, shift tracking, and travel planning.',
                'Because it wraps within a 24-hour clock, it stays accurate even when the result crosses midnight.'
              ]}
            />
          </>
        )
      }
    />
  );
}
