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
import { calculateGasMileage } from '../calculators/gasMileage';

export default function GasMileageCalculator() {
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<'mi' | 'km'>('mi');
  const [fuelUsed, setFuelUsed] = useState('');
  const [fuelUnit, setFuelUnit] = useState<'gal' | 'l'>('gal');
  const [result, setResult] = useState<{ mpg?: number; kml?: number; lper100km?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    const distNum = parseFloat(distance);
    const fuelNum = parseFloat(fuelUsed);
    if (isNaN(distNum) || distNum <= 0) return setError('Please enter a valid distance.');
    if (isNaN(fuelNum) || fuelNum <= 0) return setError('Please enter a valid fuel amount.');
    setResult(calculateGasMileage({ distance: distNum, distanceUnit, fuelUsed: fuelNum, fuelUnit }));
  };

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Gas Mileage Calculator"
      description="Estimate vehicle fuel efficiency in common mileage and fuel-consumption units."
      left={
        <CalculatorInputPanel
          description="Enter distance traveled and fuel used, then choose the correct units."
          actions={<Button onClick={handleCalculate}>Calculate mileage</Button>}
          error={error}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
            <Select label="Distance unit" value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as any)} options={[{ value: 'mi', label: 'Miles' }, { value: 'km', label: 'Kilometers' }]} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Fuel used" type="number" value={fuelUsed} onChange={(e) => setFuelUsed(e.target.value)} />
            <Select label="Fuel unit" value={fuelUnit} onChange={(e) => setFuelUnit(e.target.value as any)} options={[{ value: 'gal', label: 'Gallons' }, { value: 'l', label: 'Liters' }]} />
          </div>
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your fuel-efficiency results will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Gas mileage result" value={result.mpg !== undefined ? `${result.mpg.toFixed(2)} mpg` : result.kml !== undefined ? `${result.kml.toFixed(2)} km/L` : `${result.lper100km!.toFixed(2)} L/100km`} />
            <DetailCardGrid items={[
              ...(result.mpg !== undefined ? [{ title: 'Miles per gallon', value: result.mpg.toFixed(2) }] : []),
              ...(result.kml !== undefined ? [{ title: 'Kilometers per liter', value: result.kml.toFixed(2) }] : []),
              ...(result.lper100km !== undefined ? [{ title: 'Liters per 100 km', value: result.lper100km.toFixed(2) }] : []),
            ]} />
            <FormulaBlock formula="Mileage = Distance ÷ Fuel Used" explanation="The calculator converts the result into the most common fuel-efficiency units based on your chosen measurement system." />
            <Steps steps={[
              `Use distance ${distance} ${distanceUnit} and fuel ${fuelUsed} ${fuelUnit}.`,
              'Divide distance by fuel used to estimate efficiency.',
              'Convert the result into related units such as mpg, km/L, or L/100 km where available.',
            ]} />
            <AboutResult paragraphs={[
              'Fuel efficiency can vary based on traffic, terrain, speed, load, weather, and vehicle condition.',
              'Comparing multiple units can help when reading fuel data from different countries or vehicle specs.',
            ]} />
          </>
        )
      }
    />
  );
}
