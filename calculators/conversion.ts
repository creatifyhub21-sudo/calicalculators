/**
 * Conversion utilities for length, weight and temperature.
 *
 * Length conversions are based on the exact equivalence 1 inch = 2.54
 * centimeters【812578849390646†L60-L67】. Weight conversions use 1 kilogram
 * = 2.205 pounds【688676765789446†L96-L102】. Temperature conversions
 * use °F = °C × 9/5 + 32 and °C = (°F − 32) × 5/9【977501573968828†L95-L117】
 *【977501573968828†L389-L394】.
 */

export type ConversionCategory = 'length' | 'weight' | 'temperature';
export type LengthUnit = 'inch' | 'cm';
export type WeightUnit = 'kg' | 'lb';
export type TemperatureUnit = 'c' | 'f';

/**
 * Converts a value within a specified category from one unit to another.
 *
 * @param category The conversion category ('length', 'weight', 'temperature')
 * @param value The numeric value to convert
 * @param fromUnit The unit of the input value
 * @param toUnit The unit to convert to
 * @returns The converted value, or null if unsupported units
 */
export function convert(
  category: ConversionCategory,
  value: number,
  fromUnit: string,
  toUnit: string,
): number | null {
  if (category === 'length') {
    return convertLength(value, fromUnit as LengthUnit, toUnit as LengthUnit);
  }
  if (category === 'weight') {
    return convertWeight(value, fromUnit as WeightUnit, toUnit as WeightUnit);
  }
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit as TemperatureUnit, toUnit as TemperatureUnit);
  }
  return null;
}

/** Length conversion */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  // First convert to centimeters
  let cm: number;
  if (from === 'inch') {
    cm = value * 2.54;
  } else {
    cm = value;
  }
  // Then convert to target
  if (to === 'inch') {
    return cm / 2.54;
  }
  return cm;
}

/** Weight conversion */
export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  let kg: number;
  if (from === 'lb') {
    kg = value * 0.45359237; // exact reciprocal of 2.205 approx
  } else {
    kg = value;
  }
  if (to === 'lb') {
    return kg * 2.20462262;
  }
  return kg;
}

/** Temperature conversion */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  let celsius: number;
  if (from === 'f') {
    celsius = (value - 32) * (5 / 9);
  } else {
    celsius = value;
  }
  if (to === 'f') {
    return celsius * (9 / 5) + 32;
  }
  return celsius;
}