/**
 * Body fat percentage calculator using the U.S. Navy method.
 *
 * The U.S. Navy body fat formula estimates body fat based on simple
 * circumference measurements and height. For men, the equation is
 * 86.010 × log10(abdomen – neck) – 70.041 × log10(height) + 36.76【82895847015009†L129-L132】.
 * For women, the equation is 163.205 × log10(waist + hip – neck) – 97.684 ×
 * log10(height) – 78.387【82895847015009†L129-L132】. Measurements should be in inches.
 *
 * These formulas require logarithms base 10 (log10). To support both metric
 * and imperial units, the function converts metric values (cm) to inches.
 */

const CM_TO_INCH = 1 / 2.54;

/**
 * Calculates body fat percentage using the U.S. Navy formula.
 *
 * @param params - Measurements and demographic data
 * @param params.gender - 'male' or 'female'
 * @param params.height - Height (cm if metric, inches if imperial)
 * @param params.neck - Neck circumference
 * @param params.waist - Waist or abdomen circumference. For men, this is the abdomen at the navel; for women it is the waist at the narrowest point.
 * @param params.hip - Hip circumference (women only; ignored for men)
 * @param params.units - 'metric' or 'imperial'
 * @returns Estimated body fat percentage (e.g. 18.5 represents 18.5%)
 */
export function calculateBodyFat({
  gender,
  height,
  neck,
  waist,
  hip,
  units = 'imperial',
}: {
  gender: 'male' | 'female';
  height: number;
  neck: number;
  waist: number;
  hip?: number;
  units?: 'metric' | 'imperial';
}): number {
  // Convert all measurements to inches if necessary
  const heightIn = units === 'metric' ? height * CM_TO_INCH : height;
  const neckIn = units === 'metric' ? neck * CM_TO_INCH : neck;
  const waistIn = units === 'metric' ? waist * CM_TO_INCH : waist;
  const hipIn = hip ? (units === 'metric' ? hip * CM_TO_INCH : hip) : undefined;

  if (gender === 'male') {
    const abdomenIn = waistIn; // abdomen measurement for males
    const bodyFat = 86.010 * Math.log10(abdomenIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    return parseFloat(bodyFat.toFixed(2));
  } else {
    if (hipIn === undefined) throw new Error('Hip measurement is required for women.');
    const bodyFat =
      163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    return parseFloat(bodyFat.toFixed(2));
  }
}