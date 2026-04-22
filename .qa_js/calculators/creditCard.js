"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCreditCardPayoff = calculateCreditCardPayoff;
/*
 * Credit Card Payoff Calculator
 */
function calculateCreditCardPayoff(balance, aprPercent, monthlyPayment) {
    if (balance <= 0 || aprPercent < 0 || monthlyPayment <= 0) {
        return { months: 0, totalInterest: 0 };
    }
    const monthlyRate = aprPercent / 100 / 12;
    if (monthlyRate === 0) {
        return {
            months: Math.ceil(balance / monthlyPayment),
            totalInterest: 0,
        };
    }
    if (monthlyPayment <= balance * monthlyRate) {
        return { months: Infinity, totalInterest: Infinity };
    }
    let remaining = balance;
    let totalInterest = 0;
    let months = 0;
    while (remaining > 0 && months < 1200) {
        const interest = remaining * monthlyRate;
        const principal = monthlyPayment - interest;
        if (principal <= 0) {
            return { months: Infinity, totalInterest: Infinity };
        }
        remaining = Math.max(0, remaining - Math.min(principal, remaining));
        totalInterest += interest;
        months += 1;
    }
    if (months >= 1200 && remaining > 0) {
        return { months: Infinity, totalInterest: Infinity };
    }
    return { months, totalInterest };
}
