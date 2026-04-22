/**
 * Functions related to logarithms. A logarithm is the inverse of an
 * exponential: if b^x = y then log_b(y) = x【526767821390032†L127-L144】.
 * Logs are defined for positive bases (b > 0, b ≠ 1) and positive arguments.
 */

/**
 * Compute the logarithm of a value with respect to a given base.
 * If base is not provided or equal to Math.E, the natural logarithm is returned.
 * Uses the change‑of‑base formula: log_b(x) = ln(x) / ln(b).
 *
 * @param value - The argument of the log (must be > 0)
 * @param base - The base of the logarithm (must be > 0 and ≠ 1)
 * @returns The logarithm of the value to the given base, or NaN for invalid inputs
 */
export function logarithm(value: number, base: number = Math.E): number {
  if (value <= 0 || base <= 0 || base === 1) return NaN;
  if (base === Math.E) {
    return Math.log(value);
  }
  return Math.log(value) / Math.log(base);
}