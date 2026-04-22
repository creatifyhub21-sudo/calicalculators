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
import { calculateFuelCost } from '../calculators/fuelCost';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<'mi' | 'km'>('mi');
  const [efficiency, setEfficiency] = useState('');
  const [efficiencyUnit, setEfficiencyUnit] = useState<'mpg' | 'kmpl' | 'lper100km'>('mpg');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState<'perGallon' | 'perLiter'>('perGallon');
  const [result, setResult] = useState<{ fuelNeeded: number; cost: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calcSteps, setCalcSteps] = useState<string[]>([]);

  const details = useMemo(() => {
    if (!result) return null;
    const distNum = parseFloat(distance);
    return {
      costPerDistance: distNum > 0 ? result.cost / distNum : 0,
    };
  }, [result, distance]);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setCalcSteps([]);
    const distNum = parseFloat(distance);
    const effNum = parseFloat(efficiency);
    const priceNum = parseFloat(price);

    if (isNaN(distNum) || distNum <= 0) {
      setError('Please enter a valid trip distance.');
      return;
    }
    if (isNaN(effNum) || effNum <= 0) {
      setError('Please enter a valid fuel efficiency.');
      return;
    }
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Please enter a valid fuel price.');
      return;
    }

    const res = calculateFuelCost({ distance: distNum, distanceUnit, efficiency: effNum, efficiencyUnit, price: priceNum, priceUnit });
    setResult(res);
    setCalcSteps([
      `Convert the trip distance into a compatible base unit for the fuel-efficiency formula.`,
      `Fuel needed = distance ÷ fuel efficiency, adjusted for the selected efficiency unit (${efficiencyUnit}).`,
      `Total cost = fuel needed × fuel price, using ${priceUnit === 'perGallon' ? 'price per gallon' : 'price per liter'} for the final multiplication.`,
      `For your inputs, the trip uses ${res.fuelNeeded.toFixed(2)} fuel units and costs ${res.cost.toFixed(2)} in currency units.`,
    ]);
  };

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Fuel Cost Calculator"
      description="Estimate trip fuel consumption and total travel cost with multiple efficiency formats, cleaner summaries, and a simple cost breakdown chart."
      left={
        <CalculatorInputPanel
          description="Enter trip distance, vehicle efficiency, and fuel price. This tool supports miles or kilometers and several common efficiency formats."
          actions={
            <>
              <Button onClick={handleCalculate}>Estimate fuel cost</Button>
              <button
                type="button"
                onClick={() => {
                  setDistance('');
                  setEfficiency('');
                  setPrice('');
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g. 300" />
            <Select label="Distance unit" value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as 'mi' | 'km')} options={[{ value: 'mi', label: 'Miles' }, { value: 'km', label: 'Kilometers' }]} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Fuel efficiency" type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} placeholder="e.g. 28" />
            <Select
              label="Efficiency unit"
              value={efficiencyUnit}
              onChange={(e) => setEfficiencyUnit(e.target.value as 'mpg' | 'kmpl' | 'lper100km')}
              options={[
                { value: 'mpg', label: 'Miles per gallon' },
                { value: 'kmpl', label: 'Kilometers per liter' },
                { value: 'lper100km', label: 'Liters per 100 km' },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Fuel price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 4.59" />
            <Select label="Price unit" value={priceUnit} onChange={(e) => setPriceUnit(e.target.value as 'perGallon' | 'perLiter')} options={[{ value: 'perGallon', label: 'Price per gallon' }, { value: 'perLiter', label: 'Price per liter' }]} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        !result || !details ? (
          <EmptyResultState text="Enter trip details to see fuel needed, total cost, and a simple visual comparison of the result." />
        ) : (
          <>
            <ResultHero title="Estimated trip cost" value={`$${result.cost.toFixed(2)}`} badge={`${result.fuelNeeded.toFixed(2)} fuel units`} />
            <DetailCardGrid
              items={[
                { title: 'Fuel needed', value: result.fuelNeeded.toFixed(2), hint: 'The estimated amount of fuel consumed for the trip.' },
                { title: 'Cost per distance unit', value: `$${details.costPerDistance.toFixed(3)}`, hint: 'Approximate cost per mile or kilometer entered.' },
                { title: 'Distance', value: `${distance} ${distanceUnit}`, hint: 'Trip distance used in the estimate.' },
                { title: 'Efficiency format', value: efficiencyUnit, hint: 'The fuel-efficiency system applied to the calculation.' },
              ]}
            />
            <PremiumSection eyebrow="Trip breakdown" title="Fuel used vs money spent" description="The chart compares the fuel quantity and total trip cost so you can scan both at a glance.">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-[300px]">
                  <BarChart
                    data={{
                      labels: ['Fuel needed', 'Trip cost'],
                      datasets: [{ label: 'Trip estimate', data: [result.fuelNeeded, result.cost], backgroundColor: ['rgba(154,205,50,0.8)', 'rgba(6,43,82,0.85)'], borderRadius: 10 }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }}
                  />
                </div>
              </div>
            </PremiumSection>
            <FormulaBlock formula="Fuel needed = distance ÷ fuel efficiency; total cost = fuel needed × fuel price." explanation="The calculator first normalizes the distance, efficiency, and fuel-price units so the final estimate stays consistent even when you mix miles, kilometers, gallons, and liters." />
            <Steps steps={calcSteps} />
            <AboutResult paragraphs={[
              'Trip fuel cost depends on three main levers: how far you drive, how efficient the vehicle is, and what you pay for fuel.',
              'This calculator is especially useful for comparing route choices, checking delivery-trip profitability, or estimating commuting costs before you travel.',
              'For more accurate planning, remember that traffic, terrain, speed, weather, towing, and idling can change real-world fuel use.'
            ]} />
            <RelatedCalculators items={[
              { name: 'Gas Mileage Calculator', href: '/gas-mileage-calculator', description: 'Measure vehicle efficiency from actual fuel-use data.' },
              { name: 'Conversion Calculator', href: '/conversion-calculator', description: 'Convert distance and volume units before planning a trip.' },
              { name: 'Distance Calculator', href: '/distance-calculator', description: 'Check route distance before estimating fuel cost.' },
            ]} />
          </>
        )
      }
    />
  );
}
