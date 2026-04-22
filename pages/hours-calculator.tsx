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
import { calculateHours } from '../calculators/hours';

export default function HoursCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakHours, setBreakHours] = useState('0');
  const [breakMinutes, setBreakMinutes] = useState('0');
  const [result, setResult] = useState<{ hours: number; minutes: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const bh = parseInt(breakHours, 10) || 0;
    const bm = parseInt(breakMinutes, 10) || 0;
    const breakTotal = bh * 60 + bm;
    const hoursResult = calculateHours(startTime, endTime, breakTotal);

    if (!hoursResult) {
      setError('Please enter valid start and end times.');
      return;
    }

    setResult(hoursResult);
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Hours Calculator"
      description="Calculate worked time between two clock times with optional break deduction, midnight crossover support, and premium result cards."
      left={
        <CalculatorInputPanel
          title="Worked time inputs"
          description="Enter a start time, end time, and optional unpaid break."
          actions={<Button onClick={handleCalculate}>Calculate hours</Button>}
          error={error}
        >
          <Input label="Start time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <Input label="End time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Break hours" type="number" value={breakHours} onChange={(e) => setBreakHours(e.target.value)} />
            <Input label="Break minutes" type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Enter your start and end times to calculate total worked hours." />
        ) : (
          <>
            <ResultHero eyebrow="Hours result" title="Net worked time" value={`${result.hours}h ${result.minutes}m`} />
            <DetailCardGrid
              items={[
                { title: 'Start time', value: startTime },
                { title: 'End time', value: endTime },
                { title: 'Break deducted', value: `${breakHours}h ${breakMinutes}m` },
              ]}
            />
            <FormulaBlock
              formula="net time = (end − start, adjusted for midnight) − break"
              explanation="Times are converted into minutes, midnight crossover is handled automatically, and the optional break is subtracted from the total."
            />
            <Steps
              steps={[
                `Convert ${startTime} and ${endTime} into total minutes.`,
                'If the end time is earlier than the start time, treat it as crossing midnight.',
                `Subtract the break of ${breakHours}h ${breakMinutes}m.`,
                `Final net time = ${result.hours}h ${result.minutes}m.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'This kind of calculator is useful for time cards, shift estimates, and payroll prep when you need a quick net-hours answer.',
                'Supporting midnight rollover makes it useful for overnight shifts too.'
              ]}
            />
          </>
        )
      }
    />
  );
}
