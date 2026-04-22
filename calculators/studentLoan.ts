/*
 * Student Loan Calculator
 *
 * This module computes the monthly payment and total cost of a student loan.
 * Many student loans allow for a deferment period during which payments are
 * postponed but interest may still accrue.  To account for this, the
 * function below optionally increases the principal by the accrued
 * interest during a deferment before calculating the standard loan
 * payment using the annuity formula PMT = PV * r (1+r)^n / ((1+r)^n - 1).
 * The general loan repayment formula is referenced from CalculatorSoup
 * and other financial textbooks【352387729657649†L145-L160】.
 */

/**
 * Calculates student loan payment information.
 * @param principal Initial loan amount (before deferment).
 * @param annualRate Annual interest rate (percent).
 * @param years Loan term in years (after deferment).
 * @param defermentMonths Optional number of months during which payments are deferred but interest accrues.
 * @returns Monthly payment, total payment and total interest.
 */
export function calculateStudentLoan(
  principal: number,
  annualRate: number,
  years: number,
  defermentMonths = 0
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  if (principal <= 0 || annualRate < 0 || years <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }
  const monthlyRate = annualRate / 100 / 12;
  // Accrue interest during deferment
  let effectivePrincipal = principal;
  for (let i = 0; i < defermentMonths; i++) {
    effectivePrincipal += effectivePrincipal * monthlyRate;
  }
  const n = years * 12;
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = effectivePrincipal / n;
  } else {
    const pow = Math.pow(1 + monthlyRate, n);
    monthlyPayment = (effectivePrincipal * monthlyRate * pow) / (pow - 1);
  }
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;
  return { monthlyPayment, totalPayment, totalInterest };
}