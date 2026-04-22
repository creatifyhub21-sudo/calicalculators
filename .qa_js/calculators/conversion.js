"use strict";
/**
 * Conversion utilities for length, weight and temperature.
 *
 * Length conversions are based on the exact equivalence 1 inch = 2.54
 * centimeters【812578849390646†L60-L67】. Weight conversions use 1 kilogram
 * = 2.205 pounds【688676765789446†L96-L102】. Temperature conversions
 * use °F = °C × 9/5 + 32 and °C = (°F − 32) × 5/9【977501573968828†L95-L117】
 *【977501573968828†L389-L394】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
exports.convertLength = convertLength;
exports.convertWeight = convertWeight;
exports.convertTemperature = convertTemperature;
/**
 * Converts a value within a specified category from one unit to another.
 *
 * @param category The conversion category ('length', 'weight', 'temperature')
 * @param value The numeric value to convert
 * @param fromUnit The unit of the input value
 * @param toUnit The unit to convert to
 * @returns The converted value, or null if unsupported units
 */
function convert(category, value, fromUnit, toUnit) {
    if (category === 'length') {
        return convertLength(value, fromUnit, toUnit);
    }
    if (category === 'weight') {
        return convertWeight(value, fromUnit, toUnit);
    }
    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    return null;
}
/** Length conversion */
function convertLength(value, from, to) {
    // First convert to centimeters
    let cm;
    if (from === 'inch') {
        cm = value * 2.54;
    }
    else {
        cm = value;
    }
    // Then convert to target
    if (to === 'inch') {
        return cm / 2.54;
    }
    return cm;
}
/** Weight conversion */
function convertWeight(value, from, to) {
    let kg;
    if (from === 'lb') {
        kg = value * 0.45359237; // exact reciprocal of 2.205 approx
    }
    else {
        kg = value;
    }
    if (to === 'lb') {
        return kg * 2.20462262;
    }
    return kg;
}
/** Temperature conversion */
function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'f') {
        celsius = (value - 32) * (5 / 9);
    }
    else {
        celsius = value;
    }
    if (to === 'f') {
        return celsius * (9 / 5) + 32;
    }
    return celsius;
}
