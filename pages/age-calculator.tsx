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
import PremiumSection from '../components/PremiumSection';
import RelatedCalculators from '../components/RelatedCalculators';
import ResultHero from '../components/ResultHero';
import { BarChart } from '../components/ChartComponents';
import { calculateAge, daysBetween } from '../calculators/age';

function addYears(date: Date, years: number) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
const [refDate, setRefDate] = useState('');
const [result, setResult] = useState(
  null as
    | {
        years: number;
        months: number;
        days: number;
        totalDays: number;
      }
    | null
);
const [error, setError] = useState(null as string | null);
const [calcSteps, setCalcSteps] = useState([] as string[]);
  const details = useMemo(() => {
    if (!result || !birthDate) return null;
    const birth = new Date(birthDate);
    const reference = refDate ? new Date(refDate) : new Date();
    const totalDays = daysBetween(birth, reference);

    const nextBirthday = new Date(reference.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < reference) {
      nextBirthday.setFullYear(reference.getFullYear() + 1);
    }
    const daysUntilNextBirthday = daysBetween(reference, nextBirthday);
    const lastBirthday = addYears(birth, result.years);
    const totalMonths = result.years * 12 + result.months;

    return {
      totalDays,
      totalMonths,
      daysUntilNextBirthday,
      reference,
      birth,
      lastBirthday,
      nextBirthday,
    };
  }, [result, birthDate, refDate]);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setCalcSteps([]);

    if (!birthDate) {
      setError('Please enter your date of birth.');
      return;
    }

    const birth = new Date(birthDate);
    const reference = refDate ? new Date(refDate) : new Date();

    if (isNaN(birth.getTime()) || isNaN(reference.getTime())) {
      setError('Invalid dates provided.');
      return;
    }

    if (birth > reference) {
      setError('Date of birth cannot be after the reference date.');
      return;
    }

    const age = calculateAge(birth, reference);
    setResult(age);

    setCalcSteps([
      `Start with the birth date ${formatDate(birth)} and the reference date ${formatDate(reference)}.`,
      `Subtract the birth year from the reference year: ${reference.getFullYear()} − ${birth.getFullYear()} = ${reference.getFullYear() - birth.getFullYear()}.`,
      `Compare the month and day values. When the reference month/day is earlier than the birth month/day, borrow one month or one year as needed.`,
      `After adjusting borrowed months and days, the exact age is ${age.years} year(s), ${age.months} month(s), and ${age.days} day(s).`,
      `The full calendar difference between the two dates is ${daysBetween(birth, reference)} total day(s).`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Age Calculator"
      description="Calculate exact age in years, months, and days, review total days lived, and see the next-birthday countdown in a cleaner premium layout."
      left={
        <CalculatorInputPanel
          description="Enter a date of birth and an optional reference date. Leave the reference date empty to calculate age as of today."
          actions={
            <>
              <Button onClick={handleCalculate}>Calculate age</Button>
              <button
                type="button"
                onClick={() => {
                  setBirthDate('');
                  setRefDate('');
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
          <Input label="Date of birth" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          <Input label="Reference date" type="date" value={refDate} onChange={(e) => setRefDate(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        !result || !details ? (
          <EmptyResultState text="Enter a birth date and optional reference date to see the age breakdown, visual summary, and calculation steps." />
        ) : (
          <>
            <ResultHero
              title="Exact age"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              badge={`${details.totalDays.toLocaleString()} days total`}
            />

            <DetailCardGrid
              items={[
                { title: 'Years', value: result.years, hint: 'Whole years completed.' },
                { title: 'Total months', value: details.totalMonths, hint: 'Years converted into months plus extra months.' },
                { title: 'Days until next birthday', value: details.daysUntilNextBirthday, hint: 'Countdown from the reference date.' },
                { title: 'Next birthday', value: formatDate(details.nextBirthday), hint: 'Upcoming birthday based on the birth month and day.' },
                { title: 'Birth date', value: formatDate(details.birth), hint: 'Starting point of the age calculation.' },
                { title: 'Reference date', value: formatDate(details.reference), hint: 'Date used for the calculation.' },
              ]}
            />

            <PremiumSection
              eyebrow="Visual breakdown"
              title="How the age is split"
              description="This chart shows the relative size of the year, month, and day parts of your exact age result."
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[320px]">
                  <BarChart
                    data={{
                      labels: ['Years', 'Months', 'Days'],
                      datasets: [
                        {
                          label: 'Age breakdown',
                          data: [result.years, result.months, result.days],
                          backgroundColor: ['rgba(6,43,82,0.85)', 'rgba(154,205,50,0.8)', 'rgba(59,130,246,0.75)'],
                          borderRadius: 10,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </div>
            </PremiumSection>

            <FormulaBlock
              formula="Age = reference date − birth date, then borrow months or days when the calendar components do not subtract evenly."
              explanation="Age is not just a division by 365. The calculator compares years, months, and days directly so the result matches the real calendar."
            />

            <Steps steps={calcSteps} />

            <AboutResult
              paragraphs={[
                'This result shows the exact calendar age between the birth date and the selected reference date. Years, months, and days are handled separately so the answer matches what people typically mean by age.',
                'The total days lived is useful for milestone tracking, while the next-birthday countdown gives a quick forward-looking reference.',
                'If you leave the reference date blank, the calculator uses the current date, which makes it useful as a day-to-day age checker.'
              ]}
            />

            <RelatedCalculators
              items={[
                { name: 'Date Calculator', href: '/date-calculator', description: 'Find the time between two dates with a broader date-difference view.' },
                { name: 'Day Counter', href: '/day-counter-calculator', description: 'Count exact days between dates for scheduling and planning.' },
                { name: 'Time Duration Calculator', href: '/time-duration-calculator', description: 'Measure elapsed days, hours, minutes, and seconds.' },
              ]}
            />
          </>
        )
      }
    />
  );
}
