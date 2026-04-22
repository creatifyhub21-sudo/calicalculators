/**
 * Functions for computing powers and working with exponents. An exponent
 * indicates how many times a base is multiplied by itself; for example,
 * 8² = 8 × 8 = 64【436126424381800†L9-L15】.
 */

/**
 * Raise a base to a given exponent.
 * @param base - The base number
 * @param exponent - The exponent (power)
 * @returns base^exponent
 */
export function power(base: number, exponent: number): number {
  return base ** exponent;
}