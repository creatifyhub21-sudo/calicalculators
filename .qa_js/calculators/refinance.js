"use strict";
/*
 * Refinance Calculator
 *
 * This module computes how a mortgage refinance may impact monthly payments
 * and how long it takes for the refinance to break even.  The break‑even
 * point is defined as the number of months required for the monthly
 * savings to recoup the closing costs of the new loan.  According to
 * Freedom Mortgage, the break‑even point is calculated by dividing
 * closing costs by the monthly savings【864505815847912†L195-L199】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRefinance = calculateRefinance;
/**
 * Calculates the monthly payment for a fixed‑rate loan.
 * @param principal The loan balance.
 * @param annualRate The annual interest rate (percent).
 * @param years Number of years for the loan term.
 */
function monthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const n = years * 12;
    if (monthlyRate === 0) {
        return principal / n;
    }
    const pow = Math.pow(1 + monthlyRate, n);
    return (principal * monthlyRate * pow) / (pow - 1);
}
/**
 * Computes refinance metrics for a mortgage.
 *
 * @param balance Current outstanding mortgage balance.
 * @param currentRate Current annual interest rate (percent).
 * @param currentYears Remaining years on the existing loan.
 * @param newRate Proposed new annual interest rate (percent).
 * @param newYears Number of years for the new loan term.
 * @param closingCosts The cost to refinance (closing costs).
 */
function calculateRefinance(balance, currentRate, currentYears, newRate, newYears, closingCosts) {
    const currentPayment = monthlyPayment(balance, currentRate, currentYears);
    const newPayment = monthlyPayment(balance + closingCosts, newRate, newYears);
    const monthlySavings = currentPayment - newPayment;
    let breakEvenMonths = null;
    if (monthlySavings > 0) {
        breakEvenMonths = closingCosts / monthlySavings;
    }
    return { currentPayment, newPayment, monthlySavings, breakEvenMonths };
}
