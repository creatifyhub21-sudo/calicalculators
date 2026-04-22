# Phase 5 Fix Report

## Fixes completed

### 1. Auto-scroll to results across calculators
- Added shared auto-scroll event dispatch in `components/Button.tsx`
- Added shared auto-scroll listener in `components/CalculatorPageShell.tsx`
- Added the same listener to `pages/bmi-calculator.tsx` for the custom BMI layout
- Result: when users click calculate/generate/convert/evaluate buttons, the page smoothly scrolls to the result section automatically

### 2. Homepage scientific calculator button overflow fix
- Updated `components/HomeScientificCalculator.tsx`
- Tightened button typography and spacing
- Added centered flex layout and break-safe text wrapper inside each key
- Result: labels like Ans, Rad, Back stay inside their boxes on smaller widths
