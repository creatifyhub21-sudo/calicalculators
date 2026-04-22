/**
 * Calculates basal metabolic rate (BMR) using the Mifflin–St. Jeor equation.
 * See evidence: BMR = (10 × weight) + (6.25 × height) – (5 × age) + s【779774966490929†L189-L214】. The
 * constant s is 5 for males and –161 for females【779774966490929†L189-L214】.
 *
 * @param weightKg - Weight in kilograms
 * @param heightCm - Height in centimeters
 * @param age - Age in years
 * @param gender - Biological sex of the person ('male' or 'female')
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

/**
 * Calculates total daily energy expenditure (TDEE) by multiplying the BMR by
 * a standard activity multiplier. Common multipliers are 1.2 (sedentary), 1.375
 * (lightly active), 1.55 (moderately active), 1.725 (very active) and 1.9
 * (extra active)【779774966490929†L210-L216】.
 *
 * @param bmr - Basal metabolic rate
 * @param activityFactor - Activity multiplier based on exercise level
 * @returns Total daily energy expenditure in calories per day
 */
export function calculateTDEE(bmr: number, activityFactor: number): number {
  return bmr * activityFactor;
}