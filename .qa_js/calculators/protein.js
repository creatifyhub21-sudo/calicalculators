"use strict";
/**
 * Protein intake calculator utilities.
 *
 * The Recommended Dietary Allowance (RDA) for protein is approximately
 * 0.8 grams per kilogram of body weight per day【823567037917869†L101-L104】. Many sources
 * suggest a range of 0.8–1 gram per kilogram for adults, with higher
 * intakes (up to ~1.6 g/kg) beneficial for active individuals or those
 * seeking muscle gain【16293256943156†L76-L88】. This module provides a simple
 * function to recommend a daily protein range based on body weight and
 * activity level.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProteinRange = calculateProteinRange;
/**
 * Calculates a recommended protein intake range based on weight and
 * activity level. Weight may be provided in kilograms or pounds.
 *
 * @param weight - Body weight
 * @param unit - 'kg' or 'lb'
 * @param activity - 'sedentary' | 'normal' | 'active' | 'athlete'
 * @returns An object with minimum and maximum grams of protein per day
 */
function calculateProteinRange(weight, unit = 'kg', activity = 'normal') {
    // Convert weight to kilograms if provided in pounds
    const weightKg = unit === 'lb' ? weight / 2.205 : weight;
    // Base RDA range (0.8–1 g/kg) for sedentary to normal adults
    let min = 0.8;
    let max = 1.0;
    // Increase recommended range for more active individuals
    switch (activity) {
        case 'normal':
            min = 0.8;
            max = 1.2;
            break;
        case 'active':
            min = 1.2;
            max = 1.6;
            break;
        case 'athlete':
            min = 1.4;
            max = 2.0;
            break;
        case 'sedentary':
            min = 0.8;
            max = 1.0;
            break;
        default:
            break;
    }
    const minGrams = parseFloat((weightKg * min).toFixed(2));
    const maxGrams = parseFloat((weightKg * max).toFixed(2));
    return { min: minGrams, max: maxGrams };
}
