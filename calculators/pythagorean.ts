/**
 * Functions related to the Pythagorean theorem. In a right‑angled triangle
 * with legs a and b and hypotenuse c, the squares of the legs sum to the
 * square of the hypotenuse: a² + b² = c²【853146258665059†L21-L39】.
 */

/**
 * Calculate the hypotenuse given the two legs using the Pythagorean theorem.
 * @param a - Length of one leg
 * @param b - Length of the other leg
 * @returns The length of the hypotenuse c
 */
export function calculateHypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

/**
 * Calculate a missing leg (a or b) given the hypotenuse and the other leg.
 * @param leg - Length of the known leg
 * @param hypotenuse - Length of the hypotenuse
 * @returns Length of the missing leg
 */
export function calculateLeg(leg: number, hypotenuse: number): number {
  if (hypotenuse <= leg) return NaN;
  return Math.sqrt(hypotenuse * hypotenuse - leg * leg);
}