/**
 * Generic loan calculations.  A conventional installment loan has the same
 * mathematical form as a mortgage.  The payment formula is derived from the
 * present value of an annuity: the present value (loan amount) equals the
 * sum of discounted future payments【876820532177635†L545-L556】.  Solving this
 * equation for the periodic payment yields
 *
 * ```
 * PMT = P × \frac{i(1 + i)^N}{(1 + i)^N - 1}
 * ```
 *
 * where `P` is the loan balance, `i` is the periodic interest rate
 * (annual rate divided by number of payments per year) and `N` is the total
 * number of payments【92893029440427†L372-L387】.  This function returns the payment
 * and cost summary for any loan.
 *
 * @param principal The loan amount
 * @param annualRate Annual interest rate as percentage
 * @param years Loan term in years
 * @returns Object with monthlyPayment, totalPayment and totalInterest
 */
export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  years: number,
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  const i = annualRate / 100 / 12;
  const N = years * 12;
  if (i === 0) {
    const monthlyPayment = principal / N;
    return {
      monthlyPayment,
      totalPayment: monthlyPayment * N,
      totalInterest: 0,
    };
  }
  const monthlyPayment =
    principal * ((i * Math.pow(1 + i, N)) / (Math.pow(1 + i, N) - 1));
  const totalPayment = monthlyPayment * N;
  const totalInterest = totalPayment - principal;
  return { monthlyPayment, totalPayment, totalInterest };
}