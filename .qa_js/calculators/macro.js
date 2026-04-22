"use strict";
/**
 * Macro nutrient calculator utilities.
 *
 * Macronutrients (carbohydrates, proteins and fats) contribute different
 * amounts of energy: carbohydrates and proteins provide roughly 4 calories
 * per gram, while fats provide about 9 calories per gram【762261693210519†L106-L112】. The
 * Dietary Guidelines for Americans recommend that adults consume 45–65% of
 * their daily calories from carbohydrates, 20–35% from fats, and 10–35% from
 * proteins【794880068241882†L440-L455】. This function converts percentages into gram
 * quantities given a total caloric intake.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMacroGrams = calculateMacroGrams;
/**
 * Calculates grams of carbohydrates, protein and fat based on a total
 * calorie target and desired macronutrient distribution.
 *
 * @param totalCalories - The total number of calories per day
 * @param carbsPercent - Percentage of calories from carbohydrates (0–100)
 * @param proteinPercent - Percentage of calories from protein (0–100)
 * @param fatPercent - Percentage of calories from fat (0–100)
 * @returns An object with grams of carbs, protein and fat
 */
function calculateMacroGrams(totalCalories, carbsPercent, proteinPercent, fatPercent) {
    // Ensure percentages sum to 100 (within a tolerance)
    const totalPercent = carbsPercent + proteinPercent + fatPercent;
    if (Math.abs(totalPercent - 100) > 0.5) {
        throw new Error('Macronutrient percentages must sum to 100');
    }
    const carbsCalories = (totalCalories * carbsPercent) / 100;
    const proteinCalories = (totalCalories * proteinPercent) / 100;
    const fatCalories = (totalCalories * fatPercent) / 100;
    const carbsGrams = parseFloat((carbsCalories / 4).toFixed(2));
    const proteinGrams = parseFloat((proteinCalories / 4).toFixed(2));
    const fatGrams = parseFloat((fatCalories / 9).toFixed(2));
    return { carbsGrams, proteinGrams, fatGrams };
}
