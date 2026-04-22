"use strict";
/*
 * Payment Calculator
 *
 * This module provides a simple wrapper around the generic loan payment
 * calculation defined in loan.ts.  It allows users to determine the
 * monthly payment for a loan given a principal, annual interest rate
 * and term in years.  The formula derives from the present value of
 * an annuity and is documented in loan.ts【876820532177635†L545-L556】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayment = calculatePayment;
const loan_1 = require("./loan");
function calculatePayment(principal, annualRate, years) {
    return (0, loan_1.calculateLoanPayment)(principal, annualRate, years);
}
