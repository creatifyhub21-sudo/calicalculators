import { getCalculatorByTitle } from './calculatorDirectory';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  highlights: string[];
  quickTips: string[];
  useCases: string[];
  manualSteps: string[];
  faqs: FAQItem[];
}

function compact(values: Array<string | undefined | null>) {
  return values.filter(Boolean) as string[];
}

function sentenceCaseCategory(category: string) {
  return category === 'Other' ? 'everyday' : category.toLowerCase();
}

const categoryTips: Record<string, string[]> = {
  Financial: [
    'Check the result with at least two different terms or rates to compare trade-offs clearly.',
    'Round money values only for display so small decimal differences do not distort totals.',
    'Use the total-paid and total-interest figures together before making a borrowing or saving decision.',
  ],
  'Fitness & Health': [
    'Treat the output as a planning tool and combine it with age, body composition, and activity context.',
    'Use the same unit system every time so comparisons stay consistent across weeks or months.',
    'Track trends over time instead of relying on one isolated result.',
  ],
  Math: [
    'Enter the full value set carefully because one incorrect number can change the entire result.',
    'Use the displayed formula to verify the output when you need to show your work.',
    'For classes or homework, keep the step-by-step explanation with your final answer.',
  ],
  Other: [
    'Double-check units, dates, and time format before calculating because small entry errors can change the outcome a lot.',
    'Use realistic sample values first to confirm that the setup matches your scenario.',
    'Save or copy the result once it looks right so you can compare later scenarios quickly.',
  ],
};

const categoryUseCases: Record<string, string[]> = {
  Financial: [
    'Compare monthly affordability before committing to a loan or refinance.',
    'Estimate long-term cost before changing rate, term, contribution, or payoff strategy.',
    'Create a clearer budget conversation with a lender, partner, or advisor.',
  ],
  'Fitness & Health': [
    'Set realistic nutrition or body-composition targets based on measurable inputs.',
    'Compare different goals such as maintenance, fat loss, or performance support.',
    'Turn body metrics into a repeatable weekly check-in system.',
  ],
  Math: [
    'Validate homework, exam prep, or engineering-style calculations faster.',
    'See the relationship between the formula, the inputs, and the final result.',
    'Check hand calculations when precision matters.',
  ],
  Other: [
    'Plan schedules, trips, school work, and daily logistics with fewer manual mistakes.',
    'Compare real-world scenarios quickly from a phone or desktop.',
    'Use one clean result screen instead of piecing numbers together manually.',
  ],
};

function buildManualSteps(title: string, category: string) {
  const t = title.toLowerCase();
  if (/(loan|mortgage|refinance|credit|debt|investment|retirement|401|savings|payment|amortization|tax)/.test(t)) {
    return [
      'Write down the main inputs: amount, rate, term, payment, or contribution values.',
      'Convert percentages into decimals and convert annual values into monthly values if the formula requires it.',
      'Apply the core finance formula or amortization relationship using the same time unit throughout.',
      'Check the total paid, principal, and interest relationship to make sure the result is realistic.',
    ];
  }
  if (/(bmi|calorie|bmr|tdee|body fat|macro|protein|heart rate|ideal weight|calories burned)/.test(t)) {
    return [
      'Enter body measurements and choose one unit system before doing any math.',
      'Convert height, weight, or activity values into the formula units when needed.',
      'Apply the main equation and keep at least one extra decimal during intermediate steps.',
      'Interpret the output using the guidance range shown with the result.',
    ];
  }
  if (/(time|date|day|age|duration|zone)/.test(t)) {
    return [
      'Write the start and end date or time in the same format.',
      'Convert hours, minutes, days, or time zones into a single comparable format.',
      'Add or subtract carefully, then convert back into the display format you want.',
      'Review whether weekends, breaks, offsets, or partial days should be included.',
    ];
  }
  if (/(conversion|fuel|gas|square footage|tip|password|gpa|grade)/.test(t)) {
    return [
      'List the raw inputs and confirm units before calculating.',
      'Apply the conversion factor, average, rate, or percentage relationship.',
      'Check whether the result should be rounded for display or kept exact.',
      'Compare with a second scenario if you need a stronger real-world decision.',
    ];
  }
  return [
    'List the known values and note any missing variable you want to solve for.',
    'Substitute the inputs into the displayed formula using consistent units.',
    'Work through the arithmetic step by step before rounding the final value.',
    'Check whether the result makes sense compared with the size of the original inputs.',
  ];
}

function buildFaqs(title: string, category: string, description: string): FAQItem[] {
  const t = title.toLowerCase();
  const categoryLabel = sentenceCaseCategory(category);
  const common = [
    {
      question: `What does the ${title.toLowerCase()} show?`,
      answer: `${description} The result is designed to make the core number easier to understand with formulas, context, and supporting detail.`
    },
    {
      question: `How accurate is this ${title.toLowerCase()}?`,
      answer: `It is accurate for the inputs and formula it uses, but accuracy still depends on entering correct values, choosing the right units, and matching the calculator to your real-world scenario.`
    },
    {
      question: `Can I use this ${title.toLowerCase()} on mobile?`,
      answer: `Yes. The layout is optimized for phones and tablets so you can enter values, review the formula, and compare results on smaller screens.`
    },
  ];

  if (/(loan|mortgage|payment|credit|debt|student loan|auto loan|refinance|amortization)/.test(t)) {
    return [
      { question: `How should I compare results in this ${title.toLowerCase()}?`, answer: 'Run at least two scenarios by changing one variable at a time such as the interest rate, term, or payment amount. That makes it much easier to see what truly lowers the total cost.' },
      { question: 'Why does the total interest change so much when the term changes?', answer: 'A longer term usually lowers the monthly payment but increases the number of payments, which can increase the total interest paid over time.' },
      ...common,
    ];
  }

  if (/(bmi|calorie|bmr|tdee|macro|protein|body fat|heart rate|ideal weight)/.test(t)) {
    return [
      { question: `How should I interpret the ${title.toLowerCase()} result?`, answer: 'Use the number as a planning signal, not as a complete health diagnosis. The surrounding ranges, formulas, and explanation help you place the result in context.' },
      { question: 'Should I recalculate often?', answer: 'Yes, especially when weight, activity level, body measurements, or training goals change. Tracking a trend is usually more useful than looking at one single result.' },
      ...common,
    ];
  }

  if (category === 'Math') {
    return [
      { question: `Does this ${title.toLowerCase()} show the formula?`, answer: 'Yes. The page is built to show the core formula and a step-by-step explanation so the result is easier to verify or learn from.' },
      { question: 'What is the best way to avoid mistakes?', answer: 'Enter values in the correct order, keep units consistent, and avoid rounding until the final step whenever possible.' },
      ...common,
    ];
  }

  return [
    { question: `When should I use this ${title.toLowerCase()}?`, answer: `Use it whenever you need a faster, clearer ${categoryLabel} calculation with less manual work and fewer input mistakes.` },
    { question: 'What should I check before trusting the result?', answer: 'Confirm that the input format, units, and assumptions match your real scenario. Small entry errors can create a noticeably different output.' },
    ...common,
  ];
}

function buildHighlights(title: string, category: string) {
  const directoryItem = getCalculatorByTitle(title);
  return compact([
    'Premium calculator layout',
    'Formula and step-by-step support',
    category === 'Financial' ? 'Scenario comparison ready' : undefined,
    category === 'Fitness & Health' ? 'Goal-planning friendly' : undefined,
    category === 'Math' ? 'Work-checking friendly' : undefined,
    category === 'Other' ? 'Fast everyday workflow' : undefined,
    directoryItem?.blurb,
  ]).slice(0, 4);
}

export function getCalculatorContent(title: string, category: string, description: string): CalculatorContent {
  const directoryItem = getCalculatorByTitle(title);
  const keywords = compact([
    title,
    `${title} online`,
    `${title} free`,
    `${title} with formula`,
    `${title} with steps`,
    directoryItem?.aliases?.[0],
    directoryItem?.category ? `${directoryItem.category} calculator` : undefined,
  ]);

  return {
    metaTitle: `${title} | Free Premium Online Calculator | CaliCalculators`,
    metaDescription: `${description} Use CaliCalculators for a clean layout, quick inputs, formulas, steps, FAQs, and mobile-friendly results.`,
    keywords,
    highlights: buildHighlights(title, category),
    quickTips: categoryTips[category] || categoryTips.Other,
    useCases: categoryUseCases[category] || categoryUseCases.Other,
    manualSteps: buildManualSteps(title, category),
    faqs: buildFaqs(title, category, description),
  };
}
