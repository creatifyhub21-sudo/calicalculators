import React, { useState, useMemo } from 'react';

export default function Four01kCalculator() {
  const [annualContribution, setAnnualContribution] = useState<number>(0);
  const [annualReturn, setAnnualReturn] = useState<number>(0);
  const [years, setYears] = useState<number>(0);

  // FIXED: typed state with default value
  const [result, setResult] = useState<{ finalValue: number } | null>(null);
  const [error, setError] = useState<string>('');

  const parsed = useMemo(() => {
    return {
      contribution: Number(annualContribution),
      rate: Number(annualReturn),
      years: Number(years),
    };
  }, [annualContribution, annualReturn, years]);

  const calculate = () => {
    setError('');

    const { contribution, rate, years } = parsed;

    if (contribution <= 0 || rate <= 0 || years <= 0) {
      setError('Please enter valid positive values');
      setResult(null);
      return;
    }

    let futureValue = 0;

    for (let i = 0; i < years; i++) {
      futureValue = (futureValue + contribution) * (1 + rate / 100);
    }

    setResult({ finalValue: futureValue });
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>401k Calculator</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Annual Contribution</label>
        <input
          type="number"
          value={annualContribution}
          onChange={(e) => setAnnualContribution(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Annual Return (%)</label>
        <input
          type="number"
          value={annualReturn}
          onChange={(e) => setAnnualReturn(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Years</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
      </div>

      <button onClick={calculate}>Calculate</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <p>
          Final Value: <strong>${result.finalValue.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
}