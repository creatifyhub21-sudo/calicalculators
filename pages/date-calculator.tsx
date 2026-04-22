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
import { dateDifference } from '../calculators/dateCalculator';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDifference = () => {
    setError(null);
    setDays(null);

    if (!startDate || !endDate) {
      setError('Please select both dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError('Please enter valid dates.');
      return;
    }

    if (end < start) {
      setError('End date should be the same as or after the start date.');
      return;
    }

    setDays(dateDifference(start, end));
  };

  return (
    <CalculatorPageShell
      category="Other"
      title="Date Difference Calculator"
      description="Find the number of days between two dates with a cleaner result layout, formula explanation, and easy-to-read detail cards."
      left={
        <CalculatorInputPanel
          title="Date inputs"
          description="Pick a start date and an end date to measure the gap between them."
          actions={<Button onClick={calculateDifference}>Calculate difference</Button>}
          error={error}
        >
          <Input label="Start date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="End date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        days === null ? (
          <EmptyResultState text="Choose two dates to calculate the elapsed number of days." />
        ) : (
          <>
            <ResultHero eyebrow="Date result" title="Elapsed days" value={`${days} day${days === 1 ? '' : 's'}`} />
            <DetailCardGrid
              items={[
                { title: 'Start date', value: startDate },
                { title: 'End date', value: endDate },
                { title: 'Full-day difference', value: days },
              ]}
            />
            <FormulaBlock
              formula="days = (end date − start date) ÷ 86,400,000"
              explanation="The calculator compares the two dates in milliseconds and converts the difference into full days."
            />
            <Steps
              steps={[
                `Start date: ${startDate}.`,
                `End date: ${endDate}.`,
                'Subtract the earlier date from the later date.',
                `Convert the time difference into days to get ${days}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Date difference calculations are helpful for planning projects, tracking deadlines, measuring lead times, or counting days until an event.',
                'This result counts full elapsed days between the two selected calendar dates.'
              ]}
            />
          </>
        )
      }
    />
  );
}
