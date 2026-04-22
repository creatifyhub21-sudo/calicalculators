/**
 * Functions for calculating age and date differences.
 *
 * The age calculation follows the long subtraction method described by
 * CalculatorSoup's age calculator. The algorithm subtracts the birth
 * date from the reference date component‑wise, borrowing months and
 * years where necessary. This yields a result in years, months and
 * days【579781160739080†L190-L203】. A second method converts the
 * difference into total days using the number of years and leap years
 * then adds remaining days【579781160739080†L181-L188】, but here we
 * rely on JavaScript's Date API and the long subtraction method.
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

/**
 * Calculates the age difference between two dates in years, months and days.
 *
 * @param birthDate The earlier date (e.g. date of birth)
 * @param referenceDate The later date (e.g. today)
 * @returns An object containing the difference in years, months and days.
 */
export function calculateAge(birthDate: Date, referenceDate: Date): AgeResult {
  let start = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  let end = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  // Ensure start is not after end
  if (start > end) {
    // swap
    [start, end] = [end, start];
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Borrow days from previous month if needed
  if (days < 0) {
    // Move end one month back
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  // Borrow months from previous year if needed
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

/**
 * Calculates the number of days between two dates. The result is the
 * absolute number of days between the dates, ignoring the time of day.
 *
 * @param startDate The start date
 * @param endDate The end date
 * @returns Number of days between the dates
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const diffMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}