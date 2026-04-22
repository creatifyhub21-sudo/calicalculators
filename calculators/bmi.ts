/**
 * Body mass index (BMI) calculator utilities.
 *
 * BMI is a simple metric used to categorize weight status in adults. It is
 * calculated using weight and height. The CDC provides formulas for both
 * metric and U.S. customary units: BMI equals weight (kg) divided by the
 * square of height in meters, or weight (lb) divided by height (in)^2
 * multiplied by 703【879493917540449†L91-L95】.
 */

/**
 * Computes BMI given weight and height. For metric measurements, weight
 * should be provided in kilograms and height in centimeters. For U.S.
 * measurements, weight is in pounds and height in inches. The function
 * automatically applies the appropriate formula based on the unit.
 *
 * @param weight - Weight of the person (kg if metric, lb if imperial)
 * @param height - Height of the person (cm if metric, in if imperial)
 * @param unit - Measurement system: 'metric' or 'imperial'
 * @returns The calculated BMI as a number
 */
export function calculateBMI(
  weight: number,
  height: number,
  unit: 'metric' | 'imperial' = 'metric',
): number {
  if (unit === 'metric') {
    // convert height from centimeters to meters
    const heightM = height / 100;
    return weight / (heightM * heightM);
  } else {
    // BMI formula for U.S. units multiplies by 703
    return (weight / (height * height)) * 703;
  }
}

/**
 * Returns a BMI category based on the calculated BMI value. Categories are
 * defined using standard cutoffs for adults: underweight (<18.5), normal
 * weight (18.5–24.9), overweight (25–29.9) and obese (≥30).
 *
 * @param bmi - The body mass index value
 * @returns A string describing the weight category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}