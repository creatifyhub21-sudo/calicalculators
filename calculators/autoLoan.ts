import { calculateLoanPayment } from './loan';

/**
 * Calculates auto loan details.  In an auto loan the financed amount is
 * typically the vehicle price minus any down payment and trade-in value.
 * Some jurisdictions require that sales tax be paid on the vehicle price; if
 * so, the loan balance will include the tax.  The monthly payment is
 * calculated using the standard loan formula【92893029440427†L372-L387】.
 *
 * @param price Vehicle purchase price
 * @param downPayment Amount paid up front
 * @param tradeIn Value of any trade-in applied to the purchase
 * @param taxRate Sales tax rate as a percent (e.g. 7.5 for 7.5%).  Set to 0 if tax is paid in cash.
 * @param annualRate Annual loan interest rate percentage
 * @param years Term of the loan in years
 * @returns Object with financedAmount, monthlyPayment, totalPayment, totalInterest
 */
export function calculateAutoLoan(
  price: number,
  downPayment: number,
  tradeIn: number,
  taxRate: number,
  annualRate: number,
  years: number,
): {
  financedAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const taxablePrice = price;
  const taxAmount = (taxRate / 100) * taxablePrice;
  const financedAmount = Math.max(0, price + taxAmount - downPayment - tradeIn);
  const paymentResult = calculateLoanPayment(financedAmount, annualRate, years);
  return { financedAmount, ...paymentResult };
}