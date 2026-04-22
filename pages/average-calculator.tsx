
import { useState } from 'react';
import { BarChart } from '../components/ChartComponents';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import Steps from '../components/Steps';
import EmptyResultState from '../components/EmptyResultState';
import Button from '../components/Button';

export default function AverageCalculator(){
 const [nums,setNums]=useState('');
 const [result,setResult]=useState<number|null>(null);

 const calculate=()=>{
   const arr=nums.split(',').map(n=>parseFloat(n.trim())).filter(n=>!isNaN(n));
   if(arr.length===0) return;
   const avg=arr.reduce((a,b)=>a+b,0)/arr.length;
   setResult(avg);
 };

 return (
 <CalculatorPageShell
  category="Math"
  title="Average Calculator"
  description="Find the mean of a list of numbers."
  left={
   <CalculatorInputPanel
    description="Enter numbers separated by commas"
    actions={<Button onClick={calculate}>Calculate</Button>}
   >
    <input className="input" value={nums} onChange={e=>setNums(e.target.value)} placeholder="10, 20, 30"/>
   </CalculatorInputPanel>
  }
  right={
   result===null ? <EmptyResultState text="Result appears here"/> :
   <>
    <ResultHero title="Average" value={result.toFixed(2)}/>
    <DetailCardGrid items={[{title:'Count',value:nums.split(',').length}]}/>
    <BarChart data={{labels:['Average'],datasets:[{data:[result]}]}}/>
    <Steps steps={[
      "Add all numbers",
      "Divide by count",
      `Result = ${result.toFixed(2)}`
    ]}/>
   </>
  }
 />
 );
}
