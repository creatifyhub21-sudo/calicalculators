/**
 * Heart rate utilities.
 *
 * For cardiovascular exercise, it’s helpful to know your maximum and
 * target heart rate. The American Heart Association states that maximum
 * heart rate can be estimated as 220 minus age【798476359275158†L595-L603】. Target
 * heart rate zones for moderate-intensity exercise are about 50–70% of
 * maximum, and vigorous exercise zones are about 70–85% of maximum【798476359275158†L595-L603】.
 */

/**
 * Calculates the age-predicted maximum heart rate.
 *
 * @param age - Age in years
 * @returns Estimated maximum heart rate in beats per minute
 */
export function calculateMaxHeartRate(age: number): number {
  return 220 - age;
}

/**
 * Calculates target heart rate zones for moderate and vigorous exercise.
 *
 * @param age - Age in years
 * @returns An object with moderate and vigorous target heart rate ranges
 */
export function calculateTargetHeartRateZones(age: number): {
  moderateMin: number;
  moderateMax: number;
  vigorousMin: number;
  vigorousMax: number;
} {
  const maxHR = calculateMaxHeartRate(age);
  const moderateMin = Math.round(maxHR * 0.5);
  const moderateMax = Math.round(maxHR * 0.7);
  const vigorousMin = Math.round(maxHR * 0.7);
  const vigorousMax = Math.round(maxHR * 0.85);
  return { moderateMin, moderateMax, vigorousMin, vigorousMax };
}