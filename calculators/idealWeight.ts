/**
 * Calculates the ideal body weight in kilograms using the Devine formula. For
 * men the equation is 50 kg + 2.3 kg per inch over 5 feet; for women it is
 * 45.5 kg + 2.3 kg per inch over 5 feet【358836614634904†L64-L72】. The input height should
 * therefore be expressed in inches.
 *
 * @param heightInInches - Height in inches
 * @param gender - 'male' or 'female'
 * @returns Ideal body weight in kilograms
 */
export function calculateIdealWeight(heightInInches: number, gender: 'male' | 'female'): number {
  const inchesOver60 = heightInInches - 60;
  if (gender === 'male') {
    return 50 + 2.3 * inchesOver60;
  }
  return 45.5 + 2.3 * inchesOver60;
}