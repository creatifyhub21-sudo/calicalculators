/**
 * Square footage calculator for rectangular areas. The area of a
 * rectangle is calculated as length × width【577750930273535†L146-L160】. When
 * measurements are not in feet, conversions are applied: 1 inch = 1/12
 * feet and 1 meter ≈ 3.28084 feet. Other units can be extended
 * similarly.
 */

export type LengthUnitSF = 'ft' | 'in' | 'm';

export interface SquareFootageInput {
  length: number;
  width: number;
  unit: LengthUnitSF;
}

export interface SquareFootageResult {
  squareFeet: number;
  squareMeters: number;
}

/**
 * Converts a value to feet based on the unit.
 */
function toFeet(value: number, unit: LengthUnitSF): number {
  switch (unit) {
    case 'ft':
      return value;
    case 'in':
      return value / 12;
    case 'm':
      return value * 3.28084;
    default:
      return value;
  }
}

/**
 * Calculates square footage and square meters from given length and width.
 *
 * @param input Object containing length, width and the unit they are in
 * @returns Area in square feet and square meters
 */
export function calculateSquareFootage(input: SquareFootageInput): SquareFootageResult {
  const lengthFeet = toFeet(input.length, input.unit);
  const widthFeet = toFeet(input.width, input.unit);
  const squareFeet = lengthFeet * widthFeet;
  const squareMeters = squareFeet / 10.7639; // 1 m² = 10.7639 ft²
  return { squareFeet, squareMeters };
}