export type CalculatorDirectoryItem = {
  name: string;
  href: string;
  blurb: string;
  category: string;
  aliases?: string[];
};

export type CalculatorCategory = {
  name: string;
  description: string;
  accent: string;
  items: CalculatorDirectoryItem[];
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: 'Financial Calculators',
    description: 'Loans, mortgages, debt payoff, investing, retirement, taxes, and savings tools.',
    accent: 'from-[#062B52] to-[#0b4a8b]',
    items: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator', blurb: 'Estimate monthly mortgage payments and interest.', category: 'Financial' },
      { name: 'Loan Calculator', href: '/loan-calculator', blurb: 'Calculate fixed monthly payments for a standard loan.', category: 'Financial' },
      { name: 'Auto Loan Calculator', href: '/auto-loan-calculator', blurb: 'See car loan payments, totals, and financing cost.', category: 'Financial' },
      { name: 'Mortgage Payoff Calculator', href: '/mortgage-payoff-calculator', blurb: 'Compare payoff timelines and extra-payment impact.', category: 'Financial' },
      { name: 'Refinance Calculator', href: '/refinance-calculator', blurb: 'Check whether refinancing could save money.', category: 'Financial' },
      { name: 'Credit Card Calculator', href: '/credit-card-calculator', blurb: 'Estimate payoff time, interest, and monthly payment.', category: 'Financial', aliases: ['Credit Card Payoff Calculator'] },
      { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', blurb: 'Plan how to eliminate balances faster.', category: 'Financial' },
      { name: 'Student Loan Calculator', href: '/student-loan-calculator', blurb: 'Project payments and total borrowing cost.', category: 'Financial' },
      { name: 'Payment Calculator', href: '/payment-calculator', blurb: 'Solve for loan payment amount from basic inputs.', category: 'Financial' },
      { name: 'Compound Interest Calculator', href: '/compound-interest-calculator', blurb: 'Visualize long-term growth from compounding.', category: 'Financial' },
      { name: 'Investment Calculator', href: '/investment-calculator', blurb: 'Model future value with deposits and returns.', category: 'Financial' },
      { name: 'Retirement Calculator', href: '/retirement-calculator', blurb: 'Estimate retirement savings and monthly income.', category: 'Financial' },
      { name: '401(k) Calculator', href: '/401k-calculator', blurb: 'See how contributions and matches can grow.', category: 'Financial', aliases: ['401K Calculator'] },
      { name: 'Savings Calculator', href: '/savings-calculator', blurb: 'Track growth of recurring savings contributions.', category: 'Financial' },
      { name: 'Income Tax Calculator', href: '/income-tax-calculator', blurb: 'Estimate taxes and after-tax income.', category: 'Financial', aliases: ['Income Tax Calculator (2026)'] },
      { name: 'Amortization Calculator', href: '/amortization-calculator', blurb: 'Detailed payment schedule with principal and interest.', category: 'Financial' },
    ],
  },
  {
    name: 'Fitness & Health Calculators',
    description: 'Body metrics, calorie needs, macros, target weight, and health planning tools.',
    accent: 'from-[#6f9d17] to-[#9ACD32]',
    items: [
      { name: 'BMI Calculator', href: '/bmi-calculator', blurb: 'Body mass index with ranges, chart, and healthy-weight context.', category: 'Fitness & Health' },
      { name: 'Calorie Calculator', href: '/calorie-calculator', blurb: 'Estimate daily calorie needs based on goals.', category: 'Fitness & Health' },
      { name: 'BMR Calculator', href: '/bmr-calculator', blurb: 'Basal metabolic rate estimate from body metrics.', category: 'Fitness & Health' },
      { name: 'TDEE Calculator', href: '/tdee-calculator', blurb: 'Total daily energy expenditure with activity levels.', category: 'Fitness & Health' },
      { name: 'Body Fat Calculator', href: '/body-fat-calculator', blurb: 'Estimate body fat percentage using body measurements.', category: 'Fitness & Health' },
      { name: 'Macro Calculator', href: '/macro-calculator', blurb: 'Split calories into protein, carbs, and fat targets.', category: 'Fitness & Health' },
      { name: 'Protein Calculator', href: '/protein-calculator', blurb: 'Recommended daily protein intake guidance.', category: 'Fitness & Health', aliases: ['Protein Intake Calculator'] },
      { name: 'Calories Burned Calculator', href: '/calories-burned-calculator', blurb: 'Estimate burn from common physical activities.', category: 'Fitness & Health' },
      { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator', blurb: 'Compare ideal-weight formulas for your height.', category: 'Fitness & Health' },
      { name: 'Heart Rate Calculator', href: '/heart-rate-calculator', blurb: 'Target heart-rate zones for training.', category: 'Fitness & Health' },
    ],
  },
  {
    name: 'Math Calculators',
    description: 'Core math, algebra, statistics, probability, and geometry utilities.',
    accent: 'from-[#062B52] to-[#9ACD32]',
    items: [
      { name: 'Date Calculator', href: '/date-calculator', blurb: 'Count the time between two dates.', category: 'Math', aliases: ['Date Difference Calculator'] },
      { name: 'Fraction Calculator', href: '/fraction-calculator', blurb: 'Add, subtract, multiply, and divide fractions.', category: 'Math' },
      { name: 'Scientific Calculator', href: '/scientific-calculator', blurb: 'Advanced functions for powers, logs, and trig.', category: 'Math' },
      { name: 'Percentage Calculator', href: '/percentage-calculator', blurb: 'Find percentages, totals, and percent change.', category: 'Math' },
      { name: 'Basic Calculator', href: '/basic-calculator', blurb: 'Fast arithmetic for everyday use.', category: 'Math' },
      { name: 'Average Calculator', href: '/average-calculator', blurb: 'Compute the arithmetic mean from a list of values.', category: 'Math', aliases: ['Average Calculator (Mean)'] },
      { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator', blurb: 'Measure spread with formulas and visual support.', category: 'Math' },
      { name: 'Probability Calculator', href: '/probability-calculator', blurb: 'Simple probability from favorable vs total outcomes.', category: 'Math' },
      { name: 'Statistics Calculator', href: '/statistics-calculator', blurb: 'Mean, median, mode, variance, range, and more.', category: 'Math' },
      { name: 'Mean, Median, Mode, Range Calculator', href: '/mean-median-mode-range-calculator', blurb: 'The most-used summary stats in one place.', category: 'Math', aliases: ['Mean, Median, Mode & Range Calculator'] },
      { name: 'Quadratic Formula Calculator', href: '/quadratic-formula-calculator', blurb: 'Solve ax² + bx + c = 0 with steps.', category: 'Math' },
      { name: 'Slope Calculator', href: '/slope-calculator', blurb: 'Calculate line slope from two points.', category: 'Math' },
      { name: 'Pythagorean Theorem Calculator', href: '/pythagorean-theorem-calculator', blurb: 'Find a missing triangle side instantly.', category: 'Math' },
      { name: 'Distance Calculator', href: '/distance-calculator', blurb: 'Distance between points in coordinate space.', category: 'Math' },
      { name: 'Exponent Calculator', href: '/exponent-calculator', blurb: 'Raise numbers to powers and view results.', category: 'Math' },
      { name: 'Log Calculator', href: '/log-calculator', blurb: 'Calculate logs for common and custom bases.', category: 'Math' },
    ],
  },
  {
    name: 'Other Calculators',
    description: 'Useful everyday tools for dates, time, travel, grades, and conversions.',
    accent: 'from-[#9ACD32] to-[#d4e98d]',
    items: [
      { name: 'Age Calculator', href: '/age-calculator', blurb: 'Age in years, months, and days.', category: 'Other' },
      { name: 'Time Calculator', href: '/time-calculator', blurb: 'Add or subtract time values quickly.', category: 'Other' },
      { name: 'Hours Calculator', href: '/hours-calculator', blurb: 'Track worked hours and subtract breaks.', category: 'Other' },
      { name: 'Conversion Calculator', href: '/conversion-calculator', blurb: 'Unit conversions across common categories.', category: 'Other' },
      { name: 'Tip Calculator', href: '/tip-calculator', blurb: 'Split bills and tips with ease.', category: 'Other' },
      { name: 'Password Generator', href: '/password-generator', blurb: 'Create stronger random passwords.', category: 'Other' },
      { name: 'Time Zone Calculator', href: '/time-zone-calculator', blurb: 'Convert times between time zones.', category: 'Other' },
      { name: 'Fuel Cost Calculator', href: '/fuel-cost-calculator', blurb: 'Trip fuel use and estimated cost.', category: 'Other' },
      { name: 'Gas Mileage Calculator', href: '/gas-mileage-calculator', blurb: 'Mileage efficiency in multiple units.', category: 'Other' },
      { name: 'Square Footage Calculator', href: '/square-footage-calculator', blurb: 'Area estimate for rooms and surfaces.', category: 'Other' },
      { name: 'Day Counter', href: '/day-counter-calculator', blurb: 'Count days between dates.', category: 'Other' },
      { name: 'Time Duration Calculator', href: '/time-duration-calculator', blurb: 'Measure elapsed time precisely.', category: 'Other' },
      { name: 'GPA Calculator', href: '/gpa-calculator', blurb: 'Compute grade point average from courses.', category: 'Other' },
      { name: 'Grade Calculator', href: '/grade-calculator', blurb: 'See average score and current grade standing.', category: 'Other' },
    ],
  },
];

export const calculatorDirectory = calculatorCategories.flatMap((category) => category.items);

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function getCalculatorByTitle(title: string) {
  const target = normalize(title);
  return calculatorDirectory.find((item) => {
    if (normalize(item.name) === target) return true;
    return item.aliases?.some((alias) => normalize(alias) === target);
  });
}

export function getRelatedCalculators(title: string, category?: string, count = 6) {
  const current = getCalculatorByTitle(title);
  const currentHref = current?.href;
  const targetCategory = category || current?.category;
  const sameCategory = calculatorDirectory.filter(
    (item) => item.href !== currentHref && item.category === targetCategory
  );
  const crossCategory = calculatorDirectory.filter(
    (item) => item.href !== currentHref && item.category !== targetCategory
  );
  return [...sameCategory, ...crossCategory].slice(0, count).map((item) => ({
    name: item.name,
    href: item.href,
    description: item.blurb,
  }));
}
