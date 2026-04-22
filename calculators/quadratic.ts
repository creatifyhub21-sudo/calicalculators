/**
 * Functions to solve quadratic equations of the form ax² + bx + c = 0. The
 * quadratic formula expresses the roots as x = (−b ± √(b² − 4ac)) / (2a)【401846318818803†L162-L176】.
 * The discriminant Δ = b² − 4ac determines the number and type of roots: if Δ > 0
 * there are two distinct real roots; if Δ = 0 there is one repeated real root;
 * if Δ < 0 there are two complex conjugate roots【401846318818803†L162-L185】.
 */

export interface QuadraticSolution {
  discriminant: number;
  roots: (number | string)[];
  real: boolean;
}

/**
 * Solve the quadratic equation a x² + b x + c = 0 using the quadratic formula.
 * @param a - Quadratic coefficient (must not be zero)
 * @param b - Linear coefficient
 * @param c - Constant term
 * @returns An object containing the discriminant, array of roots, and
 *          a boolean indicating whether the roots are real numbers.
 */
export function solveQuadratic(a: number, b: number, c: number): QuadraticSolution {
  if (a === 0) {
    // Degenerate case: linear equation bx + c = 0
    const root = b !== 0 ? -c / b : NaN;
    return { discriminant: NaN, roots: [root], real: true };
  }
  const discriminant = b * b - 4 * a * c;
  const denom = 2 * a;
  if (discriminant > 0) {
    const sqrtDisc = Math.sqrt(discriminant);
    const root1 = (-b + sqrtDisc) / denom;
    const root2 = (-b - sqrtDisc) / denom;
    return { discriminant, roots: [root1, root2], real: true };
  } else if (discriminant === 0) {
    const root = -b / denom;
    return { discriminant, roots: [root], real: true };
  } else {
    // Complex roots
    const realPart = -b / denom;
    const imaginaryPart = Math.sqrt(-discriminant) / denom;
    const root1 = `${realPart} + ${imaginaryPart}i`;
    const root2 = `${realPart} - ${imaginaryPart}i`;
    return { discriminant, roots: [root1, root2], real: false };
  }
}