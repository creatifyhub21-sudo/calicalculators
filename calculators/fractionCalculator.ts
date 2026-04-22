/**
 * Represents a mathematical fraction with a numerator and denominator.
 */
export interface Fraction {
  numerator: number;
  denominator: number;
}

/**
 * Calculates the greatest common divisor (GCD) of two numbers using the
 * Euclidean algorithm. The GCD is always non‑negative.
 */
function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/**
 * Reduces a fraction to its simplest form by dividing the numerator and
 * denominator by their greatest common divisor.
 */
export function simplifyFraction(frac: Fraction): Fraction {
  const divisor = gcd(frac.numerator, frac.denominator);
  return {
    numerator: frac.numerator / divisor,
    denominator: frac.denominator / divisor,
  };
}

/**
 * Adds two fractions and returns the result in simplest form.
 */
export function addFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.denominator + b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;
  return simplifyFraction({ numerator, denominator });
}

/**
 * Subtracts the second fraction from the first and returns the result in simplest form.
 */
export function subtractFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.denominator - b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;
  return simplifyFraction({ numerator, denominator });
}

/**
 * Multiplies two fractions and returns the result in simplest form.
 */
export function multiplyFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.numerator;
  const denominator = a.denominator * b.denominator;
  return simplifyFraction({ numerator, denominator });
}

/**
 * Divides the first fraction by the second and returns the result in simplest form.
 * Throws an error if division by zero would occur.
 */
export function divideFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.denominator;
  const denominator = a.denominator * b.numerator;
  if (denominator === 0) throw new Error('Division by zero');
  return simplifyFraction({ numerator, denominator });
}