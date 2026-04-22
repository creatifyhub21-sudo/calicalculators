/**
 * Functions to compute common summary statistics for a dataset, including
 * mean, median, mode, range, count, min, max, sum, variance and standard
 * deviation. Definitions:
 *  – Mean: sum of all values divided by the count【379884516445077†L223-L234】.
 *  – Median: middle value when sorted; if even count, average of two
 *    middle values【298228047221839†L152-L162】.
 *  – Mode: value(s) that occur most frequently【298228047221839†L142-L146】.
 *  – Range: difference between the largest and smallest values【298228047221839†L170-L176】.
 */

import { populationVariance, sampleVariance, populationStandardDeviation, sampleStandardDeviation } from './stdDeviation';

/** Helper: sort numeric array ascending. */
function sortNumbers(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

/** Compute the mean of an array. */
function mean(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

/** Compute the median of an array. */
function median(values: number[]): number {
  const sorted = sortNumbers(values);
  const len = sorted.length;
  const middle = Math.floor(len / 2);
  if (len % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

/** Compute the mode(s) of an array. Returns an array of modes (can be multiple). */
function mode(values: number[]): number[] {
  const counts: Record<number, number> = {};
  values.forEach((v) => {
    counts[v] = (counts[v] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(counts));
  return Object.keys(counts)
    .filter((k) => counts[Number(k)] === maxCount)
    .map((k) => Number(k));
}

/** Compute the range (max - min). */
function range(values: number[]): number {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - min;
}

export interface StatisticsSummary {
  count: number;
  sum: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  populationVariance: number;
  populationStdDev: number;
  sampleVariance: number;
  sampleStdDev: number;
}

/**
 * Compute a summary of statistics for a dataset.
 * @param values - Array of numbers
 */
export function calculateStatistics(values: number[]): StatisticsSummary {
  if (values.length === 0) {
    return {
      count: 0,
      sum: 0,
      min: NaN,
      max: NaN,
      mean: NaN,
      median: NaN,
      mode: [],
      range: NaN,
      populationVariance: NaN,
      populationStdDev: NaN,
      sampleVariance: NaN,
      sampleStdDev: NaN,
    };
  }
  const count = values.length;
  const sum = values.reduce((acc, v) => acc + v, 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const meanVal = mean(values);
  const medianVal = median(values);
  const modeVal = mode(values);
  const rangeVal = range(values);
  const popVar = populationVariance(values);
  const popStd = populationStandardDeviation(values);
  const samVar = sampleVariance(values);
  const samStd = sampleStandardDeviation(values);
  return {
    count,
    sum,
    min: minVal,
    max: maxVal,
    mean: meanVal,
    median: medianVal,
    mode: modeVal,
    range: rangeVal,
    populationVariance: popVar,
    populationStdDev: popStd,
    sampleVariance: samVar,
    sampleStdDev: samStd,
  };
}

/**
 * Compute mean, median, mode and range specifically.
 * Provided as a convenience wrapper around calculateStatistics.
 * @param values - Array of numbers
 */
export function calculateMeanMedianModeRange(values: number[]) {
  const stats = calculateStatistics(values);
  return {
    mean: stats.mean,
    median: stats.median,
    mode: stats.mode,
    range: stats.range,
  };
}