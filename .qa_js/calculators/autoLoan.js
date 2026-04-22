"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAutoLoan = calculateAutoLoan;
const loan_1 = require("./loan");
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
function calculateAutoLoan(price, downPayment, tradeIn, taxRate, annualRate, years) {
    const taxablePrice = price;
    const taxAmount = (taxRate / 100) * taxablePrice;
    const financedAmount = Math.max(0, price + taxAmount - downPayment - tradeIn);
    const paymentResult = (0, loan_1.calculateLoanPayment)(financedAmount, annualRate, years);
    return { financedAmount, ...paymentResult };
}
