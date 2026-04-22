/**
 * Functions to compute the variance and standard deviation of a data set.
 * The population standard deviation σ is the square root of the average
 * squared differences from the mean【23387641531341†L34-L60】. The sample
 * standard deviation uses N−1 in the denominator (Bessel’s correction).
 */

/**
 * Compute the population variance of an array of numbers.
 * @param values - List of numeric values
 * @returns The population variance, or NaN if no values
 */
export function populationVariance(values: number[]): number {
  if (values.length === 0) return NaN;
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return squaredDiffs.reduce((acc, v) => acc + v, 0) / values.length;
}

/**
 * Compute the sample variance using Bessel’s correction (dividing by n−1).
 * @param values - List of numeric values
 * @returns The sample variance, or NaN if fewer than 2 values
 */
export function sampleVariance(values: number[]): number {
  if (values.length < 2) return NaN;
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return squaredDiffs.reduce((acc, v) => acc + v, 0) / (values.length - 1);
}

/**
 * Compute the population standard deviation (σ) of a list of numbers.
 * @param values - List of numeric values
 * @returns The population standard deviation, or NaN if no values
 */
export function populationStandardDeviation(values: number[]): number {
  const variance = populationVariance(values);
  return isNaN(variance) ? NaN : Math.sqrt(variance);
}

/**
 * Compute the sample standard deviation (s) of a list of numbers.
 * @param values - List of numeric values
 * @returns The sample standard deviation, or NaN if fewer than 2 values
 */
export function sampleStandardDeviation(values: number[]): number {
  const variance = sampleVariance(values);
  return isNaN(variance) ? NaN : Math.sqrt(variance);
}