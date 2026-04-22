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
import { TIME_ZONES, convertTimeZone } from '../calculators/timeZone';

export default function TimeZoneCalculator() {
  const [dateTime, setDateTime] = useState('');
  const [fromIndex, setFromIndex] = useState('12');
  const [toIndex, setToIndex] = useState('7');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDateTime = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleConvert = () => {
    setError(null);
    setResult(null);

    if (!dateTime) {
      setError('Please select a date and time.');
      return;
    }

    const [datePart, timePart] = dateTime.split('T');
    if (!datePart || !timePart) {
      setError('Please use a valid date-time value.');
      return;
    }

    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    if ([year, month, day, hour, minute].some((value) => Number.isNaN(value))) {
      setError('Please use a valid date-time value.');
      return;
    }

    const sourceDate = new Date(year, month - 1, day, hour, minute);
    const fromOffset = TIME_ZONES[parseInt(fromIndex, 10)].offset;
    const toOffset = TIME_ZONES[parseInt(toIndex, 10)].offset;
    const converted = convertTimeZone(sourceDate, fromOffset, toOffset);

    setResult(formatDateTime(converted));
  };

  const zoneOptions = TIME_ZONES.map((tz, idx) => ({ value: String(idx), label: tz.label }));

  return (
    <CalculatorPageShell
      category="Other"
      title="Time Zone Calculator"
      description="Convert a date and time from one UTC offset to another with a cleaner card-based layout and clearer timezone details."
      left={
        <CalculatorInputPanel
          title="Time zone inputs"
          description="Select a date and time, then choose the source and target time zones."
          actions={<Button onClick={handleConvert}>Convert time</Button>}
          error={error}
        >
          <Input label="Date and time" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
          <Select label="From time zone" value={fromIndex} onChange={(e) => setFromIndex(e.target.value)} options={zoneOptions} />
          <Select label="To time zone" value={toIndex} onChange={(e) => setToIndex(e.target.value)} options={zoneOptions} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Choose a date, time, source zone, and target zone to convert across time zones." />
        ) : (
          <>
            <ResultHero eyebrow="Conversion result" title="Converted date and time" value={result} />
            <DetailCardGrid
              items={[
                { title: 'Original date-time', value: dateTime.replace('T', ' ') },
                { title: 'From zone', value: TIME_ZONES[parseInt(fromIndex, 10)].label },
                { title: 'To zone', value: TIME_ZONES[parseInt(toIndex, 10)].label },
              ]}
            />
            <FormulaBlock
              formula="target time = source time − source UTC offset + target UTC offset"
              explanation="The source time is first converted to UTC, then the target offset is applied to produce the destination local time."
            />
            <Steps
              steps={[
                `Start with ${dateTime.replace('T', ' ')} in ${TIME_ZONES[parseInt(fromIndex, 10)].label}.`,
                'Convert the source time into UTC by removing the source offset.',
                `Apply the target offset for ${TIME_ZONES[parseInt(toIndex, 10)].label}.`,
                `Final converted time = ${result}.`,
              ]}
            />
            <AboutResult
              paragraphs={[
                'Time-zone conversion is useful for meetings, flights, global teams, and scheduling across regions.',
                'This version uses UTC offsets, which keeps the calculation simple and predictable.'
              ]}
            />
          </>
        )
      }
    />
  );
}
