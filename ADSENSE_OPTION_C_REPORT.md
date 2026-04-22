# AdSense Option C Implementation Report

## What was added
- Smart adaptive AdSense-ready layout across the shared calculator shell
- Desktop/right-sidebar ad placements for calculator pages
- Medium-screen single ad placement for calculator pages
- Mobile in-content ad placements for calculator pages
- Home page adaptive ad placement next to the scientific calculator section
- AdSense script loader wired globally through the navbar
- Reusable ad slot component with safe placeholder cards before live AdSense IDs are added

## New files
- `components/AdSenseLoader.tsx`
- `components/AdSlot.tsx`
- `data/adSlots.ts`

## Updated files
- `components/Navbar.tsx`
- `components/CalculatorPageShell.tsx`
- `pages/index.tsx`
- `pages/bmi-calculator.tsx`

## How the adaptive behavior works
### Desktop
- calculator pages show a separate right sidebar ad column
- one ad shows on large laptop widths
- two ads show on extra-large desktop widths

### Medium screens
- calculator pages keep a lighter single ad experience
- the main calculator content remains prioritized

### Mobile
- no sidebar ads
- ad slots move into content areas so the calculator layout stays usable

## Important setup step before going live
Add your own AdSense values in environment variables:

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_AD_SLOT_CALC_SIDEBAR_TOP`
- `NEXT_PUBLIC_AD_SLOT_CALC_SIDEBAR_BOTTOM`
- `NEXT_PUBLIC_AD_SLOT_CALC_INLINE_PRIMARY`
- `NEXT_PUBLIC_AD_SLOT_CALC_INLINE_SECONDARY`
- `NEXT_PUBLIC_AD_SLOT_HOME_HERO_SIDEBAR`
- `NEXT_PUBLIC_AD_SLOT_HOME_HERO_INLINE`
- `NEXT_PUBLIC_AD_SLOT_HOME_DIRECTORY_SIDEBAR`
- `NEXT_PUBLIC_AD_SLOT_HOME_DIRECTORY_INLINE`
- `NEXT_PUBLIC_AD_SLOT_BMI_SIDEBAR_TOP`
- `NEXT_PUBLIC_AD_SLOT_BMI_SIDEBAR_BOTTOM`
- `NEXT_PUBLIC_AD_SLOT_BMI_INLINE_PRIMARY`
- `NEXT_PUBLIC_AD_SLOT_BMI_INLINE_SECONDARY`

Until those are added, clean placeholder cards appear so the layout can be tested without broken ad boxes.

## Validation
- Source parse check completed on project files
- Parse issues: 0 in application source files
- Declaration-only files were excluded from the error count
