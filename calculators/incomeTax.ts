/*
 * Income Tax Calculator (U.S. Federal 2026)
 *
 * This module estimates U.S. federal income tax liability for tax year 2026
 * using the inflation‑adjusted tax brackets published by Jackson Hewitt and
 * the Tax Foundation.  The tax brackets are progressive, meaning each
 * bracket applies only to income within its range.  Standard deduction
 * amounts for 2026 are used to compute taxable income: $16,100 for single
 * filers, $32,200 for married filing jointly, and $24,150 for heads of
 * household【821913305203437†L293-L304】.  The bracket boundaries for
 * single, married filing jointly and head of household statuses are
 * derived from Jackson Hewitt's summary of the 2026 brackets【770318482586822†L281-L299】【770318482586822†L310-L317】.
 */

export type FilingStatus = 'single' | 'married' | 'head';

interface TaxBracket {
  rate: number; // expressed as decimal
  cap: number | null; // upper bound of taxable income for this bracket (null for no cap)
}

// Define the tax brackets for each filing status. Each bracket includes
// the marginal rate and the upper bound (inclusive).  Values are in
// taxable income dollars after the standard deduction.
const BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, cap: 12_400 },
    { rate: 0.12, cap: 50_400 },
    { rate: 0.22, cap: 105_700 },
    { rate: 0.24, cap: 201_775 },
    { rate: 0.32, cap: 256_225 },
    { rate: 0.35, cap: 640_600 },
    { rate: 0.37, cap: null },
  ],
  married: [
    { rate: 0.10, cap: 24_800 },
    { rate: 0.12, cap: 100_800 },
    { rate: 0.22, cap: 211_400 },
    { rate: 0.24, cap: 403_550 },
    { rate: 0.32, cap: 512_450 },
    { rate: 0.35, cap: 768_700 },
    { rate: 0.37, cap: null },
  ],
  head: [
    { rate: 0.10, cap: 17_700 },
    { rate: 0.12, cap: 67_450 },
    { rate: 0.22, cap: 105_700 },
    { rate: 0.24, cap: 201_750 },
    { rate: 0.32, cap: 256_200 },
    { rate: 0.35, cap: 640_600 },
    { rate: 0.37, cap: null },
  ],
};

// Standard deduction amounts for each filing status
const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
  head: 24_150,
};

/**
 * Computes federal income tax for 2026.
 *
 * @param income Gross income.
 * @param status Filing status ('single', 'married', 'head').
 * @returns Taxable income, tax owed and effective tax rate.
 */
export function calculateIncomeTax(
  income: number,
  status: FilingStatus
): { taxableIncome: number; tax: number; effectiveRate: number } {
  if (income <= 0) {
    return { taxableIncome: 0, tax: 0, effectiveRate: 0 };
  }
  const deduction = STANDARD_DEDUCTION[status];
  const taxableIncome = Math.max(0, income - deduction);
  let remaining = taxableIncome;
  let tax = 0;
  let lowerBound = 0;
  for (const bracket of BRACKETS[status]) {
    if (remaining <= 0) break;
    const cap = bracket.cap;
    const upper = cap ?? remaining; // if no cap, treat as remaining
    const taxableAtThisRate = cap === null ? remaining : Math.min(remaining, upper - lowerBound);
    tax += taxableAtThisRate * bracket.rate;
    remaining -= taxableAtThisRate;
    lowerBound = upper;
  }
  const effectiveRate = tax / income;
  return { taxableIncome, tax, effectiveRate };
}