/**
 * Compute the arithmetic mean (average) of a list of numbers. The
 * arithmetic mean is defined as the sum of all values divided by
 * the number of values【379884516445077†L223-L234】.
 */

/**
 * Calculate the mean of an array of numbers.
 * @param values - Array of numeric values
 * @returns The arithmetic mean or NaN if the array is empty
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return NaN;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}