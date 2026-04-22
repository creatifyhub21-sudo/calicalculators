/**
 * Calories burned calculator utilities using MET values.
 *
 * The energy expenditure of physical activities can be estimated using
 * metabolic equivalents of task (METs). A widely used formula converts
 * METs, body weight and duration into calories burned: calories = duration
 * (minutes) × (MET × 3.5 × weight in kg) / 200. This relationship is
 * reported by calories.info【292951162654914†L118-L120】 and other fitness
 * authorities.
 */

/**
 * Calculates calories burned during an activity.
 *
 * @param weight - Body weight
 * @param weightUnit - 'kg' or 'lb'
 * @param met - The MET value of the activity
 * @param duration - Duration of the activity
 * @param durationUnit - 'minutes' or 'hours'
 * @returns Estimated calories burned
 */
export function calculateCaloriesBurned(
  weight: number,
  weightUnit: 'kg' | 'lb',
  met: number,
  duration: number,
  durationUnit: 'minutes' | 'hours' = 'minutes',
): number {
  // Convert weight to kilograms
  const weightKg = weightUnit === 'lb' ? weight / 2.205 : weight;
  // Convert duration to minutes
  const durationMinutes = durationUnit === 'hours' ? duration * 60 : duration;
  const calories = (durationMinutes * (met * 3.5 * weightKg)) / 200;
  return parseFloat(calories.toFixed(2));
}