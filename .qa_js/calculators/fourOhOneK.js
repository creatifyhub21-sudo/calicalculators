"use strict";
/*
 * 401(k) Calculator
 *
 * This calculator estimates the future value of a 401(k) retirement account
 * given an annual salary, employee contribution percentage, employer match
 * percentage, expected annual return and number of years until retirement.
 * Employer matching programs typically match a percentage of the
 * employee's contributions up to a set limit【440107470633727†L117-L121】.  For
 * simplicity, this calculator assumes the employer matches 100% of the
 * employee's contribution up to the specified employer match percentage of
 * salary.  The future value of the contributions is calculated using the
 * future value of an ordinary annuity formula【649112361559302†L130-L154】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate401k = calculate401k;
/**
 * Calculates the future value of a 401(k) account with employer match.
 *
 * @param salary Annual salary (pre‑tax).
 * @param employeePercent Employee contribution as a percent of salary.
 * @param employerMatchPercent Employer match percent of salary (max they will contribute).
 * @param annualReturn Annual rate of return (percent).
 * @param years Number of years until retirement.
 * @returns Estimated final value of the 401(k) account.
 */
function calculate401k(salary, employeePercent, employerMatchPercent, annualReturn, years) {
    if (salary <= 0 || employeePercent < 0 || employerMatchPercent < 0 || annualReturn < 0 || years < 0) {
        return { finalValue: 0, totalContributions: 0, totalEmployerContributions: 0 };
    }
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    const employeeMonthly = (salary * (employeePercent / 100)) / 12;
    // Employer matches up to the lesser of employeePercent and employerMatchPercent
    const matchedPercent = Math.min(employeePercent, employerMatchPercent);
    const employerMonthly = (salary * (matchedPercent / 100)) / 12;
    const totalMonthly = employeeMonthly + employerMonthly;
    let futureValue;
    if (monthlyRate === 0) {
        futureValue = totalMonthly * months;
    }
    else {
        const pow = Math.pow(1 + monthlyRate, months);
        // Future value of an ordinary annuity: PMT * ((1 + i)^n - 1) / i
        futureValue = totalMonthly * (pow - 1) / monthlyRate;
    }
    const totalContributions = employeeMonthly * months;
    const totalEmployerContributions = employerMonthly * months;
    return { finalValue: futureValue, totalContributions, totalEmployerContributions };
}
