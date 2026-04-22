/**
 * Converts a letter grade into its corresponding grade point on a 4.0 scale.
 * The mapping follows common U.S. university conventions: A = 4.0, A− = 3.7,
 * B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3,
 * D = 1.0, D− = 0.7 and anything else (including F) = 0【813216153601377†L520-L559】.
 *
 * @param letter - The letter grade (case‑insensitive)
 * @returns A numeric grade point value
 */
export function letterToPoints(letter: string): number {
  const grade = letter.trim().toUpperCase();
  switch (grade) {
    case 'A+':
    case 'A':
      return 4.0;
    case 'A-':
      return 3.7;
    case 'B+':
      return 3.3;
    case 'B':
      return 3.0;
    case 'B-':
      return 2.7;
    case 'C+':
      return 2.3;
    case 'C':
      return 2.0;
    case 'C-':
      return 1.7;
    case 'D+':
      return 1.3;
    case 'D':
      return 1.0;
    case 'D-':
      return 0.7;
    default:
      return 0;
  }
}

/**
 * Computes the grade point average (GPA) for a set of courses. GPA is
 * calculated as the sum of (grade points × credit hours) divided by the
 * total credit hours attempted【813216153601377†L520-L559】. The result is rounded to
 * two decimal places.
 *
 * @param courses - An array of objects each containing the credit hours
 *                  and letter grade for a course
 * @returns A number representing the GPA
 */
export function calculateGPA(courses: { credits: number; grade: string }[]): number {
  let totalPoints = 0;
  let totalCredits = 0;
  courses.forEach((course) => {
    const credits = course.credits;
    const points = letterToPoints(course.grade);
    totalPoints += credits * points;
    totalCredits += credits;
  });
  if (totalCredits === 0) {
    return 0;
  }
  const gpa = totalPoints / totalCredits;
  // Round to two decimal places for presentation
  return Math.round(gpa * 100) / 100;
}