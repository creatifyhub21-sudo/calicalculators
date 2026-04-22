"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateExpression = evaluateExpression;
/**
 * Evaluates a mathematical expression using JavaScript's Math API. The
 * expression may include numeric constants, basic arithmetic operators
 * (+, −, ×, ÷), exponentiation via ^, parentheses and common mathematical
 * functions. All Math functions (e.g. sin, cos, tan, log, sqrt) and
 * constants (e.g. PI, E) are available without the `Math.` prefix due to
 * the use of a `with (Math)` context. The evaluator normalizes certain
 * symbols such as `^` to `**` for exponentiation and `π` or `pi` to `PI`.
 *
 * **Security note:** This helper uses the `Function` constructor to
 * dynamically evaluate the provided expression. In a production
 * environment you should take care to validate and sanitize input or use
 * a dedicated math parser library. Here it suffices for a controlled
 * calculator context.
 *
 * @param expr - A string containing the mathematical expression to evaluate
 * @returns The numeric result of the expression
 * @throws Error if the expression cannot be evaluated or results in
 *         a non‑finite number
 */
function evaluateExpression(expr) {
    // Replace caret with JavaScript's exponent operator
    let normalized = expr.replace(/\^/g, '**');
    // Replace unicode pi character and plain 'pi' with Math.PI
    normalized = normalized.replace(/π/g, 'PI');
    normalized = normalized.replace(/\bpi\b/gi, 'PI');
    // Replace lowercase e with Euler's number when it stands alone
    normalized = normalized.replace(/\be\b/gi, 'E');
    try {
        // Use a with(Math) scope so that sin, cos, etc. are resolved on Math
        const fn = new Function(`'use strict'; return (function() { with (Math) { return (${normalized}); } })();`);
        const result = fn();
        if (typeof result !== 'number' || !isFinite(result)) {
            throw new Error('Result is not a finite number');
        }
        return result;
    }
    catch {
        throw new Error('Invalid expression');
    }
}
