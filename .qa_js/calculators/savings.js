"use strict";
/*
 * Savings Calculator
 *
 * This module computes the future value of a savings account with an
 * initial deposit and regular contributions.  The future value is the sum
 * of the compounded principal and the future value of an annuity.  The
 * formula for an ordinary annuity's future value is FV = PMT/i * ((1+i)^n - 1)【649112361559302†L130-L154】,
 * where PMT is the contribution per period, i is the periodic interest rate
 * and n is the number of periods.  The principal grows according to the
 * standard compound interest formula【346524532220194†L80-L97】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSavings = calculateSavings;
/**
 * Calculates future savings with contributions.
 *
 * @param principal Initial deposit.
 * @param monthlyContribution Regular contribution amount per month.
 * @param annualRate Annual interest rate (percent).
 * @param years Number of years to save.
 * @returns Final amount, total contributions and interest earned.
 */
function calculateSavings(principal, monthlyContribution, annualRate, years) {
    if (principal < 0 || monthlyContribution < 0 || annualRate < 0 || years < 0) {
        return { finalAmount: 0, totalContributions: 0, interestEarned: 0 };
    }
    const monthlyRate = annualRate / 100 / 12;
    const n = years * 12;
    // Future value of principal
    const futurePrincipal = principal * Math.pow(1 + monthlyRate, n);
    // Future value of monthly contributions
    let futureContributions;
    if (monthlyRate === 0) {
        futureContributions = monthlyContribution * n;
    }
    else {
        futureContributions = monthlyContribution * (Math.pow(1 + monthlyRate, n) - 1) / monthlyRate;
    }
    const finalAmount = futurePrincipal + futureContributions;
    const totalContributions = principal + monthlyContribution * n;
    const interestEarned = finalAmount - totalContributions;
    return { finalAmount, totalContributions, interestEarned };
}
