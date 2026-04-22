"use strict";
/**
 * Compute the slope of a line given two points. The slope m is defined as
 * the rise over the run: m = (y₂ − y₁) / (x₂ − x₁)【802758357652739†L45-L79】.
 * If the x‑coordinates are the same, the slope is undefined (vertical line).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSlope = calculateSlope;
/**
 * Calculate the slope of the line passing through (x1, y1) and (x2, y2).
 * @param x1 - x‑coordinate of first point
 * @param y1 - y‑coordinate of first point
 * @param x2 - x‑coordinate of second point
 * @param y2 - y‑coordinate of second point
 * @returns An object containing the slope (null if undefined) and a flag indicating vertical line
 */
function calculateSlope(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0) {
        // Vertical line: slope undefined
        return { slope: null, vertical: true };
    }
    return { slope: dy / dx, vertical: false };
}
