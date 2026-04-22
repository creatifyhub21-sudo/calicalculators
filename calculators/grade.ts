/**
 * Calculates a weighted average given an array of scores and their
 * corresponding weights. Each weight should be expressed as a number
 * (e.g. percentage or point value). The formula used is
 * Σ(score_i × weight_i) / Σ(weight_i)【264514725347114†L76-L104】. If the total
 * weight is zero then the result is zero to avoid division by zero.
 *
 * @param items - Array of objects with numeric score and weight properties
 * @returns The weighted average rounded to two decimal places
 */
export function calculateWeightedGrade(items: { score: number; weight: number }[]): number {
  let weightedSum = 0;
  let totalWeight = 0;
  items.forEach((item) => {
    weightedSum += item.score * item.weight;
    totalWeight += item.weight;
  });
  if (totalWeight === 0) {
    return 0;
  }
  const avg = weightedSum / totalWeight;
  return Math.round(avg * 100) / 100;
}