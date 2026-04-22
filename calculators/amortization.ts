/**
 * Represents a single row in an amortization schedule. Each payment shows
 * how much is applied to interest, how much reduces principal and the
 * remaining balance after the payment.
 */
export interface AmortizationRow {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

/**
 * Generates an amortization schedule for a fixed‑rate loan. The monthly payment
 * is calculated using the standard formula R = P×r / [1 - (1 + r)^{-n}]
 *【78977932228343†L55-L60】, where P is principal, r is monthly interest rate and n
 * is the total number of payments. Each row of the schedule is then
 * calculated by subtracting the interest portion from the payment to find
 * principal paid and updating the balance accordingly.
 *
 * @param principal - Initial loan amount
 * @param annualRate - Annual interest rate in percent
 * @param years - Duration of the loan in years
 * @returns An object containing the monthly payment and an array of schedule rows
 */
export function amortizationSchedule(
  principal: number,
  annualRate: number,
  years: number,
): { payment: number; schedule: AmortizationRow[] } {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  const payment = monthlyRate === 0
    ? principal / totalPayments
    : principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  let balance = principal;
  const schedule: AmortizationRow[] = [];
  for (let period = 1; period <= totalPayments; period++) {
    const interestPortion = balance * monthlyRate;
    let principalPortion = payment - interestPortion;
    balance -= principalPortion;
    // adjust last payment for rounding errors
    if (period === totalPayments) {
      principalPortion += balance;
      balance = 0;
    }
    schedule.push({
      period,
      payment,
      interest: interestPortion,
      principal: principalPortion,
      balance: Math.max(balance, 0),
    });
  }
  return { payment, schedule };
}