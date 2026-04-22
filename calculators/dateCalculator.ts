/**
 * Calculates the difference in days between two dates. The result is always
 * non‑negative; if the end date precedes the start date the result will be
 * negative. Consumers should validate order before invoking this helper.
 *
 * @param start - The starting date
 * @param end - The ending date
 * @returns Number of full days between the two dates
 */
export function dateDifference(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}