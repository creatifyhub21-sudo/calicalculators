Final fixes completed

What was fixed
- The left calculator input area now stays in a sticky desktop panel with its own internal scroll.
- The input panel uses a viewport-based max height so users can reach lower fields and the calculate button immediately without losing the right-side result area.
- The calculate action area inside the input panel now stays visible near the bottom while scrolling the form on desktop.
- Fraction calculator compact input boxes were adjusted so entered values remain visible inside the small side-by-side boxes.
- Shared input component now supports per-page input sizing overrides and better shrinking behavior in narrow grids.

Files updated
- components/CalculatorInputPanel.tsx
- components/Input.tsx
- pages/fraction-calculator.tsx

Validation
- Source files checked: 199
- Parse errors: 0
