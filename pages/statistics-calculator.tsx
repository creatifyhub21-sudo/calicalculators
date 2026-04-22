import { useMemo, useState } from 'react';
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
import { calculateStatistics } from '../calculators/statistics';

export default function StatisticsCalculator() {
  const [numbers, setNumbers] = useState('');
  const [stats, setStats] = useState<ReturnType<typeof calculateStatistics> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const values = useMemo(
    () =>
      numbers
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => Number(item))
        .filter((item) => !Number.isNaN(item)),
    [numbers]
  );

  const calculate = () => {
    setError(null);
    setStats(null);

    if (values.length === 0) {
      setError('Enter at least one valid number, separated by commas or spaces.');
      return;
    }

    setStats(calculateStatistics(values));
  };

  return (
    <CalculatorPageShell
      category="Math"
      title="Statistics Calculator"
      description="Get the main descriptive statistics for a dataset with a cleaner premium layout and richer summary cards."
      left={
        <CalculatorInputPanel
          title="Dataset input"
          description="Paste numbers separated by commas or spaces to calculate summary statistics."
          actions={<Button onClick={calculate}>Calculate statistics</Button>}
          error={error}
        >
          <Input label="Numbers" type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="12, 14, 18, 18, 20" />
        </CalculatorInputPanel>
      }
      right={
        stats === null ? (
          <EmptyResultState text="Enter a dataset to see count, mean, median, mode, range, variance, and standard deviation." />
        ) : (
          <>
            <ResultHero eyebrow="Statistics result" title="Mean" value={stats.mean.toFixed(4)} />
            <DetailCardGrid
              items={[
                { title: 'Count', value: stats.count },
                { title: 'Sum', value: stats.sum.toFixed(4) },
                { title: 'Median', value: stats.median.toFixed(4) },
                { title: 'Mode', value: stats.mode.join(', ') || 'None' },
                { title: 'Range', value: stats.range.toFixed(4) },
                { title: 'Population std. dev.', value: stats.populationStdDev.toFixed(4) },
                { title: 'Sample std. dev.', value: stats.sampleStdDev.toFixed(4) },
                { title: 'Minimum', value: stats.min.toFixed(4) },
                { title: 'Maximum', value: stats.max.toFixed(4) },
              ]}
            />
            <FormulaBlock
              formula="mean = sum of values ÷ number of values"
              explanation="This calculator also derives median, mode, range, population variance, sample variance, and both standard deviations from the same dataset."
            />
            <Steps
              steps={[
                `Parse the dataset into ${stats.count} valid number${stats.count === 1 ? '' : 's'}.`,
                'Sort and summarize the values.',
                'Calculate central tendency metrics such as mean, median, and mode.',
                'Calculate spread metrics such as range, variance, and standard deviation.',
              ]}
            />
            <AboutResult
              paragraphs={[
                'Descriptive statistics help you understand the center and spread of a dataset quickly.',
                'This richer layout makes the tool feel more premium because the user can scan the main takeaways instead of reading a plain raw object result.'
              ]}
            />
          </>
        )
      }
    />
  );
}
