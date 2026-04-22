import { siteConfig } from '../data/siteConfig';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-slate-900">{siteConfig.name}</div>
          <p className="mt-1 max-w-2xl leading-6">
            Clean online calculators for finance, math, health, and everyday use.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {footerLinks.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[#062B52]">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
