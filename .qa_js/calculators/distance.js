"use strict";
/**
 * Functions for calculating distance between points. In two dimensions,
 * the distance between (x₁,y₁) and (x₂,y₂) is given by
 * d = √[(x₂ − x₁)² + (y₂ − y₁)²]【855736018803758†L10-L26】. In three
 * dimensions, include the z‑coordinates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance2D = distance2D;
exports.distance3D = distance3D;
/**
 * Calculate the Euclidean distance between two points in 2D space.
 * @param x1 - x‑coordinate of the first point
 * @param y1 - y‑coordinate of the first point
 * @param x2 - x‑coordinate of the second point
 * @param y2 - y‑coordinate of the second point
 * @returns The distance between the points
 */
function distance2D(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.hypot(dx, dy);
}
/**
 * Calculate the Euclidean distance between two points in 3D space.
 * @param x1 - x‑coordinate of the first point
 * @param y1 - y‑coordinate of the first point
 * @param z1 - z‑coordinate of the first point
 * @param x2 - x‑coordinate of the second point
 * @param y2 - y‑coordinate of the second point
 * @param z2 - z‑coordinate of the second point
 * @returns The distance between the points
 */
function distance3D(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.hypot(dx, dy, dz);
}
