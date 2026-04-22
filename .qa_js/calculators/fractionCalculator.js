"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyFraction = simplifyFraction;
exports.addFractions = addFractions;
exports.subtractFractions = subtractFractions;
exports.multiplyFractions = multiplyFractions;
exports.divideFractions = divideFractions;
/**
 * Calculates the greatest common divisor (GCD) of two numbers using the
 * Euclidean algorithm. The GCD is always non‑negative.
 */
function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}
/**
 * Reduces a fraction to its simplest form by dividing the numerator and
 * denominator by their greatest common divisor.
 */
function simplifyFraction(frac) {
    const divisor = gcd(frac.numerator, frac.denominator);
    return {
        numerator: frac.numerator / divisor,
        denominator: frac.denominator / divisor,
    };
}
/**
 * Adds two fractions and returns the result in simplest form.
 */
function addFractions(a, b) {
    const numerator = a.numerator * b.denominator + b.numerator * a.denominator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}
/**
 * Subtracts the second fraction from the first and returns the result in simplest form.
 */
function subtractFractions(a, b) {
    const numerator = a.numerator * b.denominator - b.numerator * a.denominator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}
/**
 * Multiplies two fractions and returns the result in simplest form.
 */
function multiplyFractions(a, b) {
    const numerator = a.numerator * b.numerator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}
/**
 * Divides the first fraction by the second and returns the result in simplest form.
 * Throws an error if division by zero would occur.
 */
function divideFractions(a, b) {
    const numerator = a.numerator * b.denominator;
    const denominator = a.denominator * b.numerator;
    if (denominator === 0)
        throw new Error('Division by zero');
    return simplifyFraction({ numerator, denominator });
}
