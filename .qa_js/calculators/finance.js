"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.futureValue = futureValue;
exports.retirementSavings = retirementSavings;
/**
 * Calculates the future value of an investment with periodic contributions.
 * It uses the standard compound interest formula for present value growth
 * plus the future value of an annuity: FV = PV(1 + i)^n + R[(1 + i)^n – 1]/i.
 * Here i is the periodic interest rate and n is the number of periods.
 */
function futureValue(pv, monthlyContrib, annualRate, years) {
    const i = annualRate / 100 / 12;
    const n = years * 12;
    if (n <= 0)
        return pv;
    if (i === 0) {
        return pv + monthlyContrib * n;
    }
    const fvPv = pv * Math.pow(1 + i, n);
    const fvContrib = monthlyContrib * (Math.pow(1 + i, n) - 1) / i;
    return fvPv + fvContrib;
}
/**
 * Calculates the projected savings by the time a person reaches retirement.
 */
function retirementSavings(currentAge, retirementAge, currentSavings, monthlyContrib, annualRate) {
    const years = Math.max(0, retirementAge - currentAge);
    return futureValue(currentSavings, monthlyContrib, annualRate, years);
}
