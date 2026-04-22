export const siteConfig = {
  name: 'CaliCalculators',
  domain: 'calicalculators.com',
  url: 'https://calicalculators.com',
  supportEmail: 'support@calicalculators.com',
  description:
    'Premium online calculators for finance, health, math, and everyday planning with formulas, charts, and clear results.',
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
