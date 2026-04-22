/**
 * Probability helper functions. Probability is the ratio of
 * favourable outcomes to total outcomes【461313071838001†L114-L119】. This
 * module includes functions for calculating simple probability as well
 * as combining probabilities of independent events.
 */

/**
 * Calculate the probability of an event as a fraction between 0 and 1.
 * Probability(Event) = favorable outcomes / total outcomes【461313071838001†L114-L119】.
 * Returns NaN if total outcomes is zero or negative.
 *
 * @param favorable - Number of favorable outcomes
 * @param total - Total number of outcomes
 */
export function simpleProbability(favorable: number, total: number): number {
  if (total <= 0) return NaN;
  return favorable / total;
}

/**
 * For independent events A and B, the probability of both events occurring
 * is the product of their probabilities: P(A ∩ B) = P(A) × P(B)【461313071838001†L114-L119】.
 *
 * @param probA - Probability of event A
 * @param probB - Probability of event B
 */
export function intersectionIndependent(probA: number, probB: number): number {
  return probA * probB;
}

/**
 * The probability of the union of two events is P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
 * If the events are mutually exclusive, the intersection term is 0.
 *
 * @param probA - Probability of event A
 * @param probB - Probability of event B
 * @param intersection - Probability of intersection (defaults to probA × probB for independent events)
 */
export function union(probA: number, probB: number, intersection?: number): number {
  const inter = intersection !== undefined ? intersection : probA * probB;
  return probA + probB - inter;
}