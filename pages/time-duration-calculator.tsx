import { useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import CalculatorPageShell from '../components/CalculatorPageShell';
import DetailCardGrid from '../components/DetailCardGrid';
import EmptyResultState from '../components/EmptyResultState';
import FormulaBlock from '../components/FormulaBlock';
import RelatedCalculators from '../components/RelatedCalculators';
import ResultHero from '../components/ResultHero';
import { calculateDuration } from '../calculators/timeDuration';

export default function TimeDurationCalculator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calcSteps, setCalcSteps] = useState<string[]>([]);

  const totals = useMemo(() => {
    if (!result) return null;
    const totalSeconds = result.days * 86400 + result.hours * 3600 + result.minutes * 60 + result.seconds;
    return {
      totalSeconds,
      totalMinutes: totalSeconds / 60,
      totalHours: totalSeconds / 3600,
    };
  }, [result]);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setCalcSteps([]);

    if (!start || !end) {
      setError('Please select both the start and end date/time.');
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      setError('Invalid date/time values.');
      return;
    }

    const res = calculateDuration(startDate, endDate);
    setResult(res);
    const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
    setCalcSteps([
      `Convert the start and end entries into date/time values.`,
      `Find the elapsed milliseconds: |end − start| = ${diffMs.toLocaleString()} ms.`,
      `Break that total into whole days, then the leftover hours, minutes, and seconds.`,
      `Your duration is ${res.days} day(s), ${res.hours} hour(s), ${res.minutes} minute(s), and ${res.seconds} second(s).`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Time Duration Calculator"
      description="Measure elapsed time between two date-and-time entries with a cleaner result summary, detailed totals, and a simple step-by-step explanation."
      left={
        <CalculatorInputPanel
          description="Select the start and end date/time values. The calculator returns the absolute elapsed time between the two moments."
          actions={
            <>
              <Button onClick={handleCalculate}>Calculate duration</Button>
              <button
                type="button"
                onClick={() => {
                  setStart('');
                  setEnd('');
                  setResult(null);
                  setError(null);
                  setCalcSteps([]);
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Clear
              </button>
            </>
          }
          error={error}
        >
          <Input label="Start date & time" type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input label="End date & time" type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        !result || !totals ? (
          <EmptyResultState text="Select two date-and-time values to see the elapsed duration in days, hours, minutes, and seconds." />
        ) : (
          <>
            <ResultHero title="Elapsed duration" value={`${result.days}d ${result.hours}h ${result.minutes}m ${result.seconds}s`} badge={`${totals.totalHours.toFixed(2)} total hours`} />
            <DetailCardGrid items={[
              { title: 'Total hours', value: totals.totalHours.toFixed(2), hint: 'The full duration converted to hours.' },
              { title: 'Total minutes', value: totals.totalMinutes.toFixed(2), hint: 'The full duration converted to minutes.' },
              { title: 'Total seconds', value: totals.totalSeconds.toLocaleString(), hint: 'The full duration converted to seconds.' },
              { title: 'Start', value: new Date(start).toLocaleString(), hint: 'Beginning timestamp.' },
              { title: 'End', value: new Date(end).toLocaleString(), hint: 'Ending timestamp.' },
            ]} />
            <FormulaBlock formula="Elapsed time = |end timestamp − start timestamp|, then convert the difference into days, hours, minutes, and seconds." explanation="The calculator uses absolute time difference, so it still returns a positive duration if the later and earlier inputs are accidentally reversed." />
            <Steps steps={calcSteps} />
            <AboutResult paragraphs={[
              'Time-duration calculations are useful for scheduling, event planning, shift tracking, and turnaround analysis.',
              'Because the result includes both a broken-down format and total hours or minutes, it works well for both human-readable summaries and planning comparisons.',
              'If you only need the date difference without time-of-day detail, use the date calculator or day counter.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Time Calculator', href: '/time-calculator', description: 'Add or subtract hours and minutes for quick scheduling.' },
              { name: 'Hours Calculator', href: '/hours-calculator', description: 'Measure worked hours and subtract breaks.' },
              { name: 'Date Calculator', href: '/date-calculator', description: 'Focus on calendar difference rather than full timestamps.' },
            ]} />
          </>
        )
      }
    />
  );
}
