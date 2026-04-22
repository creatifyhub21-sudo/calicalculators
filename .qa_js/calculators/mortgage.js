"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMortgagePayment = calculateMortgagePayment;
exports.amortizationSchedule = amortizationSchedule;
/**
 * Mortgage and loan calculations.
 *
 * A fixed–rate mortgage or loan is repaid in equal monthly installments that
 * include both principal and interest.  The payment is derived from the
 * standard amortization formula used by lenders.  For a loan balance `P`,
 * nominal annual interest rate `r` (as a percentage) and term of `nYears`
 * years, the monthly payment `M` is given by
 *
 * ```
 * M = P × ((i × (1 + i)^N) ÷ ((1 + i)^N – 1))
 * ```
 *
 * where `i = r/100/12` is the monthly interest rate and `N = nYears × 12`
 * is the total number of monthly payments【92893029440427†L372-L387】.
 * This function returns the payment along with the total payment and
 * total interest over the life of the loan.
 *
 * @param principal The loan balance (amount financed)
 * @param annualRate Annual interest rate in percent
 * @param years Loan term in years
 * @returns Object containing monthlyPayment, totalPayment, totalInterest
 */
function calculateMortgagePayment(principal, annualRate, years) {
    const i = annualRate / 100 / 12;
    const N = years * 12;
    if (i === 0) {
        // no interest
        const monthlyPayment = principal / N;
        return {
            monthlyPayment,
            totalPayment: monthlyPayment * N,
            totalInterest: 0,
        };
    }
    const monthlyPayment = principal * ((i * Math.pow(1 + i, N)) / (Math.pow(1 + i, N) - 1));
    const totalPayment = monthlyPayment * N;
    const totalInterest = totalPayment - principal;
    return { monthlyPayment, totalPayment, totalInterest };
}
function amortizationSchedule(principal, annualRate, years) {
    const schedule = [];
    const i = annualRate / 100 / 12;
    const N = years * 12;
    const { monthlyPayment } = calculateMortgagePayment(principal, annualRate, years);
    let balance = principal;
    for (let m = 1; m <= N; m++) {
        const interest = balance * i;
        const principalPortion = monthlyPayment - interest;
        const endingBalance = balance - principalPortion;
        schedule.push({
            month: m,
            beginningBalance: balance,
            interest,
            principal: principalPortion,
            endingBalance,
        });
        balance = endingBalance;
    }
    return schedule;
}
