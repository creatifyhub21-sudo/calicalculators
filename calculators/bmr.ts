/**
 * Basal metabolic rate (BMR) utilities.
 *
 * BMR represents the number of calories your body burns at rest. The
 * Mifflin–St. Jeor equation is widely considered the most reliable
 * predictive equation for estimating BMR. It uses weight, height,
 * age and biological sex to compute the value【586058749258986†L76-L80】. The
 * calculation differs slightly between males and females: for men,
 * BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age + 5; for women,
 * BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age – 161【586058749258986†L76-L80】.
 */

/**
 * Computes BMR using the Mifflin–St. Jeor equation.
 *
 * @param weightKg - Weight in kilograms
 * @param heightCm - Height in centimeters
 * @param age - Age in years
 * @param gender - 'male' or 'female'
 * @returns The basal metabolic rate in calories per day
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
): number {
  const s = gender === 'male' ? 5 : -161;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + s;
}