"use strict";
/**
 * Basic arithmetic operations. This module provides simple functions
 * for addition, subtraction, multiplication and division. It is used
 * by the Basic Calculator page to perform user‑requested operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
/**
 * Add two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The sum of a and b
 */
function add(a, b) {
    return a + b;
}
/**
 * Subtract two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The difference a − b
 */
function subtract(a, b) {
    return a - b;
}
/**
 * Multiply two numbers.
 * @param a - first operand
 * @param b - second operand
 * @returns The product of a and b
 */
function multiply(a, b) {
    return a * b;
}
/**
 * Divide two numbers. Returns NaN if b is zero.
 * @param a - numerator
 * @param b - denominator
 * @returns The quotient a ÷ b, or NaN if b = 0
 */
function divide(a, b) {
    if (b === 0)
        return NaN;
    return a / b;
}
