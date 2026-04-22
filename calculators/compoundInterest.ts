/*
 * Compound Interest Calculator
 *
 * This module computes the future value of an investment using the
 * compound interest formula.  The formula for compound interest is
 * A = P(1 + r/n)^(n t) where P is the principal, r is the annual
 * interest rate, n is the number of compounding periods per year,
 * and t is the number of years【346524532220194†L80-L97】.  The interest
 * earned is A - P.
 */

/**
 * Calculates the future value and interest earned using compound interest.
 *
 * @param principal The initial amount of money invested.
 * @param annualRate Annual interest rate as percentage.
 * @param compoundingPerYear Number of times the interest is compounded per year.
 * @param years Number of years the money is invested.
 * @returns An object with the final amount and interest earned.
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  compoundingPerYear: number,
  years: number
): { finalAmount: number; interestEarned: number } {
  if (principal <= 0 || annualRate < 0 || compoundingPerYear <= 0 || years < 0) {
    return { finalAmount: principal, interestEarned: 0 };
  }
  const r = annualRate / 100;
  const n = compoundingPerYear;
  const t = years;
  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = finalAmount - principal;
  return { finalAmount, interestEarned };
}