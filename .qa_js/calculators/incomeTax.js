"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIncomeTax = calculateIncomeTax;
// Define the tax brackets for each filing status. Each bracket includes
// the marginal rate and the upper bound (inclusive).  Values are in
// taxable income dollars after the standard deduction.
const BRACKETS = {
    single: [
        { rate: 0.10, cap: 12400 },
        { rate: 0.12, cap: 50400 },
        { rate: 0.22, cap: 105700 },
        { rate: 0.24, cap: 201775 },
        { rate: 0.32, cap: 256225 },
        { rate: 0.35, cap: 640600 },
        { rate: 0.37, cap: null },
    ],
    married: [
        { rate: 0.10, cap: 24800 },
        { rate: 0.12, cap: 100800 },
        { rate: 0.22, cap: 211400 },
        { rate: 0.24, cap: 403550 },
        { rate: 0.32, cap: 512450 },
        { rate: 0.35, cap: 768700 },
        { rate: 0.37, cap: null },
    ],
    head: [
        { rate: 0.10, cap: 17700 },
        { rate: 0.12, cap: 67450 },
        { rate: 0.22, cap: 105700 },
        { rate: 0.24, cap: 201750 },
        { rate: 0.32, cap: 256200 },
        { rate: 0.35, cap: 640600 },
        { rate: 0.37, cap: null },
    ],
};
// Standard deduction amounts for each filing status
const STANDARD_DEDUCTION = {
    single: 16100,
    married: 32200,
    head: 24150,
};
/**
 * Computes federal income tax for 2026.
 *
 * @param income Gross income.
 * @param status Filing status ('single', 'married', 'head').
 * @returns Taxable income, tax owed and effective tax rate.
 */
function calculateIncomeTax(income, status) {
    if (income <= 0) {
        return { taxableIncome: 0, tax: 0, effectiveRate: 0 };
    }
    const deduction = STANDARD_DEDUCTION[status];
    const taxableIncome = Math.max(0, income - deduction);
    let remaining = taxableIncome;
    let tax = 0;
    let lowerBound = 0;
    for (const bracket of BRACKETS[status]) {
        if (remaining <= 0)
            break;
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
