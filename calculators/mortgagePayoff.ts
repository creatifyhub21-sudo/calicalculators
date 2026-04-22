/*
 * Mortgage Payoff Calculator
 */
export function calculateMortgagePayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): { months: number; totalInterest: number } {
  if (balance <= 0 || annualRate < 0 || monthlyPayment <= 0) {
    return { months: 0, totalInterest: 0 };
  }

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return {
      months: Math.ceil(balance / monthlyPayment),
      totalInterest: 0,
    };
  }

  if (monthlyPayment <= balance * monthlyRate) {
    return { months: Infinity, totalInterest: Infinity };
  }

  const numerator = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate));
  const denominator = Math.log(1 + monthlyRate);
  const months = Math.ceil(numerator / denominator);

  let remaining = balance;
  let totalInterest = 0;
  for (let i = 0; i < months && remaining > 0; i++) {
    const interest = remaining * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, remaining);
    remaining = Math.max(0, remaining - principal);
    totalInterest += interest;
  }
  return { months, totalInterest };
}
