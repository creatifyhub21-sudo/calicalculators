import Link from 'next/link';
import AdSenseLoader from './AdSenseLoader';
import { siteConfig } from '../data/siteConfig';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Browse', href: '/#all-calculators' },
  { label: 'Finance', href: '/#financial-calculators' },
  { label: 'Math', href: '/#math-calculators' },
  { label: 'Health', href: '/#fitness-health-calculators' },
  { label: 'Other', href: '/#other-calculators' },
];

export default function Navbar() {
  return (
    <>
      <AdSenseLoader />
      <nav className="sticky top-0 z-20 border-b border-[#0f3a67] bg-[#062B52]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-white">
          {siteConfig.name}
        </Link>
        <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-100">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[#c8e56a]">{item.label}</a>
          ))}
        </div>
      </div>
    </nav>
    </>
  );
}
