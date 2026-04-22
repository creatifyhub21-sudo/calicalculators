/*
 * Debt Payoff Calculator
 */
export function calculateDebtPayoff(
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
  const months = Math.ceil(
    Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) /
      Math.log(1 + monthlyRate)
  );
  let remaining = balance;
  let totalInterest = 0;
  let count = 0;
  while (remaining > 0 && count < months) {
    const interest = remaining * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, remaining);
    remaining = Math.max(0, remaining - principal);
    totalInterest += interest;
    count++;
  }
  return { months, totalInterest };
}
