/**
 * Functions for calculating distance between points. In two dimensions,
 * the distance between (x₁,y₁) and (x₂,y₂) is given by
 * d = √[(x₂ − x₁)² + (y₂ − y₁)²]【855736018803758†L10-L26】. In three
 * dimensions, include the z‑coordinates.
 */

/**
 * Calculate the Euclidean distance between two points in 2D space.
 * @param x1 - x‑coordinate of the first point
 * @param y1 - y‑coordinate of the first point
 * @param x2 - x‑coordinate of the second point
 * @param y2 - y‑coordinate of the second point
 * @returns The distance between the points
 */
export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
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
export function distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  return Math.hypot(dx, dy, dz);
}