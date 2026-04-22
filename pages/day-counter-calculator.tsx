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
import { countDays } from '../calculators/dayCounter';

export default function DayCounterCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setDays(null);

    if (!startDate || !endDate) {
      setError('Please choose both dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError('Please enter valid dates.');
      return;
    }

    setDays(countDays(start, end));
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Day Counter"
      description="Count the absolute number of days between two calendar dates using a more polished premium-style layout."
      left={
        <CalculatorInputPanel
          title="Day counter inputs"
          description="Select two dates. This tool counts the distance between them regardless of which date comes first."
          actions={<Button onClick={handleCalculate}>Count days</Button>}
          error={error}
        >
          <Input label="First date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="Second date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        days === null ? (
          <EmptyResultState text="Choose two dates to count the number of days between them." />
        ) : (
          <>
            <ResultHero eyebrow="Counter result" title="Days between dates" value={`${days} day${days === 1 ? '' : 's'}`} />
            <DetailCardGrid items={[{ title: 'First date', value: startDate }, { title: 'Second date', value: endDate }, { title: 'Absolute gap', value: days }]} />
            <FormulaBlock
              formula="days = |date 2 − date 1| ÷ 86,400,000"
              explanation="The calculation compares the two dates, ignores the time of day, and converts the absolute millisecond difference into days."
            />
            <Steps steps={[`Normalize both dates to calendar dates only.`, 'Subtract one date from the other.', 'Take the absolute value so the order does not matter.', `Final count = ${days} day${days === 1 ? '' : 's'}.`]} />
            <AboutResult paragraphs={['A day counter is useful for travel, deadlines, events, subscriptions, and planning gaps between milestones.', 'Unlike the date difference tool, this version always returns the absolute distance between the two dates.']} />
          </>
        )
      }
    />
  );
}
