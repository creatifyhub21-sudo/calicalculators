/**
 * Day counter utilities using date differences. Calculates the number of
 * days between two dates by taking the absolute difference in time and
 * dividing by the number of milliseconds in a day. This aligns with
 * the simple method of summing years and leap years multiplied by 365
 * or 366 days and adding the remaining days【579781160739080†L181-L188】.
 */

/**
 * Returns the absolute number of days between two dates, ignoring
 * times of day.
 */
export function countDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const diffMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}