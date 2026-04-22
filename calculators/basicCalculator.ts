/**
 * Basic arithmetic operations. This module provides simple functions
 * for addition, subtraction, multiplication and division. It is used
 * by the Basic Calculator page to perform user‑requested operations.
 */

/**
 * Add two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtract two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The difference a − b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiply two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divide two numbers. Returns NaN if b is zero.
 * @param a - numerator
 * @param b - denominator
 * @returns The quotient a ÷ b, or NaN if b = 0
 */
export function divide(a: number, b: number): number {
  if (b === 0) return NaN;
  return a / b;
}