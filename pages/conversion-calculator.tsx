import { useMemo, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
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
import { convert, ConversionCategory } from '../calculators/conversion';

const categoryOptions = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
];
const lengthUnits = [
  { value: 'inch', label: 'Inch' },
  { value: 'cm', label: 'Centimeter' },
];
const weightUnits = [
  { value: 'kg', label: 'Kilogram' },
  { value: 'lb', label: 'Pound' },
];
const temperatureUnits = [
  { value: 'c', label: 'Celsius' },
  { value: 'f', label: 'Fahrenheit' },
];

function unitLabel(unit: string) {
  const map: Record<string, string> = { inch: 'in', cm: 'cm', kg: 'kg', lb: 'lb', c: '°C', f: '°F' };
  return map[unit] ?? unit;
}

function unitName(unit: string) {
  const map: Record<string, string> = { inch: 'inches', cm: 'centimeters', kg: 'kilograms', lb: 'pounds', c: 'Celsius', f: 'Fahrenheit' };
  return map[unit] ?? unit;
}

export default function ConversionCalculator() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('inch');
  const [toUnit, setToUnit] = useState('cm');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calcSteps, setCalcSteps] = useState<string[]>([]);

  const unitsForCategory = (cat: ConversionCategory) => {
    if (cat === 'length') return lengthUnits;
    if (cat === 'weight') return weightUnits;
    return temperatureUnits;
  };

  const formulaText = useMemo(() => {
    if (category === 'length') return 'Length conversions use the exact relationship 1 inch = 2.54 centimeters.';
    if (category === 'weight') return 'Weight conversions use 1 pound = 0.45359237 kilograms.';
    return 'Temperature conversions use °F = (°C × 9/5) + 32 and °C = (°F − 32) × 5/9.';
  }, [category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as ConversionCategory;
    setCategory(cat);
    const units = unitsForCategory(cat);
    setFromUnit(units[0].value);
    setToUnit(units[1].value);
    setResult(null);
    setError(null);
    setCalcSteps([]);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setCalcSteps([]);
    const num = parseFloat(value);
    if (isNaN(num)) {
      setError('Please enter a valid numeric value.');
      return;
    }
    const converted = convert(category, num, fromUnit, toUnit);
    if (converted === null || !isFinite(converted)) {
      setError('Unsupported conversion.');
      return;
    }
    setResult(converted);

    const rounded = converted.toFixed(4);
    if (category === 'temperature') {
      if (fromUnit === 'c' && toUnit === 'f') {
        setCalcSteps([
          `Start with ${num} °C.`,
          `Multiply by 9/5: ${num} × 9/5 = ${(num * 9 / 5).toFixed(4)}.`,
          `Add 32 to convert to Fahrenheit: ${(num * 9 / 5).toFixed(4)} + 32 = ${rounded} °F.`,
        ]);
      } else if (fromUnit === 'f' && toUnit === 'c') {
        setCalcSteps([
          `Start with ${num} °F.`,
          `Subtract 32: ${num} − 32 = ${(num - 32).toFixed(4)}.`,
          `Multiply by 5/9 to convert to Celsius: ${(num - 32).toFixed(4)} × 5/9 = ${rounded} °C.`,
        ]);
      } else {
        setCalcSteps([`The selected units are the same, so the value stays ${rounded} ${unitLabel(toUnit)}.`]);
      }
      return;
    }

    setCalcSteps([
      `Start with ${num} ${unitName(fromUnit)}.`,
      `Apply the conversion relationship for the ${category} category.`,
      `The converted value is ${rounded} ${unitName(toUnit)}.`,
    ]);
  };

  const convertedLabel = result === null ? '' : `${result.toFixed(4)} ${unitLabel(toUnit)}`;

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Conversion Calculator"
      description="Convert common length, weight, and temperature values with a cleaner interface, result summary, formula guidance, and visual comparison."
      left={
        <CalculatorInputPanel
          description="Choose a category, enter a value, then pick the source and target units."
          actions={
            <>
              <Button onClick={handleCalculate}>Convert value</Button>
              <button
                type="button"
                onClick={() => {
                  setValue('');
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
          <Select label="Category" value={category} onChange={handleCategoryChange} options={categoryOptions} />
          <Input label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 25" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="From" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} options={unitsForCategory(category)} />
            <Select label="To" value={toUnit} onChange={(e) => setToUnit(e.target.value)} options={unitsForCategory(category)} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Choose your conversion settings and enter a value to see the converted result, formula note, and visual comparison." />
        ) : (
          <>
            <ResultHero title="Converted value" value={convertedLabel} badge={`${parseFloat(value || '0').toFixed(4)} ${unitLabel(fromUnit)} input`} />

            <DetailCardGrid
              items={[
                { title: 'Category', value: category.charAt(0).toUpperCase() + category.slice(1), hint: 'The conversion family used.' },
                { title: 'From unit', value: unitName(fromUnit), hint: 'Original measurement unit.' },
                { title: 'To unit', value: unitName(toUnit), hint: 'Target measurement unit.' },
              ]}
            />

            <PremiumSection
              eyebrow="Visual comparison"
              title="Input vs converted value"
              description="This chart compares the numeric input and converted output. The numbers may be on different scales because the units are different."
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[300px]">
                  <BarChart
                    data={{
                      labels: [`Input (${unitLabel(fromUnit)})`, `Converted (${unitLabel(toUnit)})`],
                      datasets: [
                        {
                          label: 'Value',
                          data: [parseFloat(value), result],
                          backgroundColor: ['rgba(6,43,82,0.85)', 'rgba(154,205,50,0.8)'],
                          borderRadius: 10,
                        },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }}
                  />
                </div>
              </div>
            </PremiumSection>

            <FormulaBlock formula={formulaText} explanation="The calculator uses direct unit relationships rather than approximate mental math, which makes it useful for quick checks and repeated conversions." />
            <Steps steps={calcSteps} />
            <AboutResult paragraphs={[
              'Unit conversion is often simple multiplication or division by a fixed factor. Temperature is the common exception because it requires both scaling and offset adjustment.',
              'Keeping the category-specific unit lists grouped together reduces mistakes and makes the tool easier to scan than a one-size-fits-all converter.',
              'For very large or very small values, the most important thing is choosing the correct units and direction before converting.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Distance Calculator', href: '/distance-calculator', description: 'Measure distances after converting inputs into convenient units.' },
              { name: 'Fuel Cost Calculator', href: '/fuel-cost-calculator', description: 'Use distance and fuel-price values after unit conversion.' },
              { name: 'Gas Mileage Calculator', href: '/gas-mileage-calculator', description: 'Compare fuel-efficiency values in multiple unit systems.' },
            ]} />
          </>
        )
      }
    />
  );
}
