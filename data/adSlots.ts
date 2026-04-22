export const adSlots = {
  calculators: {
    sidebarTop: process.env.NEXT_PUBLIC_AD_SLOT_CALC_SIDEBAR_TOP || 'demo-calc-sidebar-top',
    sidebarBottom: process.env.NEXT_PUBLIC_AD_SLOT_CALC_SIDEBAR_BOTTOM || 'demo-calc-sidebar-bottom',
    inlinePrimary: process.env.NEXT_PUBLIC_AD_SLOT_CALC_INLINE_PRIMARY || 'demo-calc-inline-primary',
    inlineSecondary: process.env.NEXT_PUBLIC_AD_SLOT_CALC_INLINE_SECONDARY || 'demo-calc-inline-secondary',
  },
  home: {
    heroSidebar: process.env.NEXT_PUBLIC_AD_SLOT_HOME_HERO_SIDEBAR || 'demo-home-hero-sidebar',
    directorySidebar: process.env.NEXT_PUBLIC_AD_SLOT_HOME_DIRECTORY_SIDEBAR || 'demo-home-directory-sidebar',
    heroInline: process.env.NEXT_PUBLIC_AD_SLOT_HOME_HERO_INLINE || 'demo-home-hero-inline',
    directoryInline: process.env.NEXT_PUBLIC_AD_SLOT_HOME_DIRECTORY_INLINE || 'demo-home-directory-inline',
  },
  bmi: {
    sidebarTop: process.env.NEXT_PUBLIC_AD_SLOT_BMI_SIDEBAR_TOP || 'demo-bmi-sidebar-top',
    sidebarBottom: process.env.NEXT_PUBLIC_AD_SLOT_BMI_SIDEBAR_BOTTOM || 'demo-bmi-sidebar-bottom',
    inlinePrimary: process.env.NEXT_PUBLIC_AD_SLOT_BMI_INLINE_PRIMARY || 'demo-bmi-inline-primary',
    inlineSecondary: process.env.NEXT_PUBLIC_AD_SLOT_BMI_INLINE_SECONDARY || 'demo-bmi-inline-secondary',
  },
};
