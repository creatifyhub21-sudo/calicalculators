/*
 * Payment Calculator
 *
 * This module provides a simple wrapper around the generic loan payment
 * calculation defined in loan.ts.  It allows users to determine the
 * monthly payment for a loan given a principal, annual interest rate
 * and term in years.  The formula derives from the present value of
 * an annuity and is documented in loan.ts【876820532177635†L545-L556】.
 */

import { calculateLoanPayment } from './loan';

export function calculatePayment(
  principal: number,
  annualRate: number,
  years: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  return calculateLoanPayment(principal, annualRate, years);
}