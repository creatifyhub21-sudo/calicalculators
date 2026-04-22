/**
 * Functions for performing basic percentage calculations. A percentage
 * expresses a part as a fraction of a whole multiplied by 100. To find
 * what percent one number is of another, divide the part by the whole
 * and multiply by 100【283975563986930†L100-L104】. To compute the value
 * corresponding to a percentage of a given total, multiply the percent
 * (in decimal form) by the total【283975563986930†L100-L104】.
 */

/**
 * Calculate what percentage the part is of the whole. Returns NaN if
 * the whole is zero.
 *
 * @param part - The part value
 * @param whole - The whole value
 * @returns The percentage (0–100) representing part of whole
 */
export function whatPercent(part: number, whole: number): number {
  if (whole === 0) return NaN;
  return (part / whole) * 100;
}

/**
 * Calculate the value that represents a given percentage of a total.
 * For example, 20% of 50 is 10 because 0.20 × 50 = 10【283975563986930†L100-L104】.
 *
 * @param percent - The percentage (0–100)
 * @param total - The total value
 * @returns The value corresponding to the percentage of the total
 */
export function percentageOf(percent: number, total: number): number {
  return (percent / 100) * total;
}

/**
 * Calculate the original total when a part and its percentage are known.
 * For example, if 30 is 20% of the whole, the whole is 150 because
 * 30 ÷ 0.20 = 150.
 *
 * @param part - The part value
 * @param percent - The percentage (0–100)
 * @returns The total value corresponding to the given part and percentage
 */
export function totalFromPartAndPercent(part: number, percent: number): number {
  if (percent === 0) return NaN;
  return part / (percent / 100);
}