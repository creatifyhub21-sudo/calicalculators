# Layout Upgrade Report

Completed improvements:

- Reworked the shared calculator page shell so the input panel sits at the top-left on desktop instead of below a long header section.
- Added a true two-column calculator workflow across the shared shell:
  - left: sticky inputs
  - right: title, highlights, result tools, results, tips, FAQ, related calculators
- Added a compact mobile title card so mobile still has context without a huge top section.
- Added `Back to inputs` inside the result tools card.
- Added `calculator-input-panel` anchor support for smooth jump-back behavior.
- Updated the custom BMI page to match the same left-sticky / right-results layout.
- Preserved the existing auto-scroll-to-results behavior after calculate.

Files updated:

- `components/CalculatorPageShell.tsx`
- `components/CalculatorInputPanel.tsx`
- `components/ResultActions.tsx`
- `pages/bmi-calculator.tsx`

Validation:

- Full source parse check completed
- Parse errors: 0
