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
import { calculateTip } from '../calculators/tip';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percentage, setPercentage] = useState('15');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<{ tip: number; total: number; perPerson?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    const billNum = parseFloat(bill);
    const percNum = parseFloat(percentage);
    const peopleNum = parseInt(people, 10);
    if (isNaN(billNum) || billNum < 0) return setError('Please enter a valid bill amount.');
    if (isNaN(percNum) || percNum < 0) return setError('Please enter a valid tip percentage.');
    if (isNaN(peopleNum) || peopleNum <= 0) return setError('Number of people must be at least 1.');
    setResult(calculateTip(billNum, percNum, peopleNum));
  };

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="Tip Calculator"
      description="Estimate tip amount, total bill, and how much each person pays when splitting the bill."
      left={
        <CalculatorInputPanel
          description="Enter the bill amount, tip percentage, and number of people."
          actions={<Button onClick={handleCalculate}>Calculate tip</Button>}
          error={error}
        >
          <Input label="Bill amount" type="number" value={bill} onChange={(e) => setBill(e.target.value)} />
          <Input label="Tip percentage" type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
          <Input label="Number of people" type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
        </CalculatorInputPanel>
      }
      right={
        result === null ? (
          <EmptyResultState text="Your tip result and bill split details will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Total bill with tip" value={`$${result.total.toFixed(2)}`} />
            <DetailCardGrid items={[
              { title: 'Tip amount', value: `$${result.tip.toFixed(2)}` },
              { title: 'Per person', value: `$${(result.perPerson ?? result.total).toFixed(2)}` },
              { title: 'Tip %', value: `${percentage}%` },
            ]} />
            <FormulaBlock formula="Tip = Bill × (Tip% ÷ 100); Total = Bill + Tip" explanation="If multiple people are splitting the bill, divide the total by the number of people." />
            <Steps steps={[
              `Find the tip: ${bill || 0} × ${percentage}% = ${result.tip.toFixed(2)}.`,
              `Add the tip to the bill to get a total of ${result.total.toFixed(2)}.`,
              `Split the total by ${people} person/people for ${((result.perPerson ?? result.total)).toFixed(2)} each.`,
            ]} />
            <AboutResult paragraphs={[
              'Tip calculators are useful for dining, services, and any shared payment where gratuity matters.',
              'Rounding up slightly is common when splitting bills to make payment easier.',
            ]} />
          </>
        )
      }
    />
  );
}
