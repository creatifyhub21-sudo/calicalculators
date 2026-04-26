import Link from 'next/link';
import { useMemo, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HomeScientificCalculator from '../components/HomeScientificCalculator';
import AdSlot from '../components/AdSlot';
import { calculatorCategories as categories } from '../data/calculatorDirectory';
import { absoluteUrl, siteConfig } from '../data/siteConfig';
import { adSlots } from '../data/adSlots';

const featuredCalculators = [
  '/mortgage-calculator',
  '/bmi-calculator',
  '/calorie-calculator',
  '/percentage-calculator',
  '/retirement-calculator',
  '/time-duration-calculator',
];

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.blurb.toLowerCase().includes(q) ||
            category.name.toLowerCase().includes(q) ||
            item.aliases?.some((alias) => alias.toLowerCase().includes(q))
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const featured = useMemo(
    () =>
      categories
        .flatMap((category) => category.items)
        .filter((item) => featuredCalculators.includes(item.href)),
    []
  );

  const totalCalculators = useMemo(
    () => categories.reduce((sum, category) => sum + category.items.length, 0),
    []
  );

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CaliCalculators Calculator Library',
    description: siteConfig.description,
    url: absoluteUrl('/'),
  };

  return (
    <>
      <Head>
        <title>CaliCalculators | Premium Online Calculators</title>
        <meta
          name="description"
          content="Free online calculators for finance, health, math, fitness, dates, time, and everyday calculations."
        />
        <meta
          name="keywords"
          content="online calculators, free calculators, mortgage calculator, bmi calculator, finance calculator, health calculator, math calculator"
        />
        <meta property="og:title" content="CaliCalculators | Premium Online Calculators" />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/')} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={absoluteUrl('/')} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />
      </Head>

      <Navbar />

      <div className="mx-auto max-w-[1500px] px-5 py-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-[#f5fae8] p-8 shadow-sm">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-[#9ACD32]/30 bg-[#062B52]/5 px-3 py-1 text-sm font-semibold text-[#062B52]">
              Minimalist card-based calculator library
            </div>

            <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
              Fast calculators with clear results, stronger explanations, and a better path from answer to action.
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explore premium financial, health, math, and everyday calculators built to be easy to scan, easy to use, and easy to understand across desktop and mobile.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Search calculators
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try BMI, mortgage, standard deviation, tip..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 shadow-sm outline-none transition focus:border-[#062B52] focus:ring-4 focus:ring-[#9ACD32]/20"
              />
            </div>

            <a
              href="#all-calculators"
              className="inline-flex items-end rounded-2xl bg-[#062B52] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#041f3b]"
            >
              Browse all
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            <InfoCard title="Library size" main={`${totalCalculators}`} text="Premium calculator pages organized into finance, health, math, and everyday workflows." />
            <InfoCard title="What you get" main="Formulas, FAQs, and guides" text="Each calculator is built to explain the answer, not just output a number." />
            <InfoCard title="Best for" main="Scenario comparison" text="Compare inputs faster, understand trade-offs, and move to related tools without losing context." />
            <InfoCard title="Built for" main="Mobile and desktop" text="Clean cards, sticky workflows, and better readability on long calculator pages." />
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px_300px]">
          <div className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full border border-[#062B52]/15 bg-[#062B52]/5 px-3 py-1 text-sm font-semibold text-[#062B52]">
              New on the home screen
            </div>

            <h2 className="text-3xl font-black text-slate-900">Built-in scientific calculator</h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Open the site and start calculating right away. This home screen calculator supports arithmetic,
              trig, logs, powers, roots, degree or radian mode, and quick expression editing.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <SmallCard title="Fast actions" text="Use copy result and PDF download inside calculator result cards across the site." />
              <SmallCard title="Category shortcuts" text="Jump straight to Finance, Math, Health, or Other from the darker top bar." />
              <SmallCard title="Better first impression" text="The homepage now demonstrates a real working calculator instead of only static cards." />
            </div>
          </div>

          <HomeScientificCalculator />

          <div className="hidden xl:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot={adSlots.home.heroSidebar} intent="sidebar" minHeight={280} />
            </div>
          </div>
        </section>

        <div className="mt-8 lg:hidden">
          <AdSlot slot={adSlots.home.heroInline} intent="mobile" minHeight={180} />
        </div>

        <section className="mt-10 rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="mb-5">
            <div className="mb-3 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#062B52] to-[#9ACD32]" />
            <h2 className="text-2xl font-black text-slate-900">Featured calculators</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Start with the most popular workflows, then jump to related tools as your calculation gets more detailed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((item) => (
              <CalculatorCard key={item.name} item={item} label="Featured" />
            ))}
          </div>
        </section>

        <div className="mt-8 hidden lg:block xl:hidden">
          <AdSlot slot={adSlots.home.directoryInline} intent="inline" minHeight={220} />
        </div>

        <div id="all-calculators" className="mt-10 space-y-8">
          {filteredCategories.map((category) => (
            <section
              key={category.name}
              id={category.name.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}
              className="scroll-mt-24 rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm"
            >
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className={`mb-3 h-1.5 w-24 rounded-full bg-gradient-to-r ${category.accent}`} />
                  <h2 className="text-2xl font-black text-slate-900">{category.name}</h2>
                  <p className="mt-2 max-w-3xl text-slate-600">{category.description}</p>
                </div>

                <div className="rounded-full border border-[#9ACD32]/35 bg-[#f6fbe8] px-3 py-1 text-sm font-medium text-[#577c12]">
                  {category.items.length} calculators
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((item) => (
                  <CalculatorCard
                    key={item.name}
                    item={item}
                    label={category.name.replace(' Calculators', '')}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function InfoCard({ title, main, text }: { title: string; main: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#577c12]">{title}</p>
      <p className="mt-2 text-3xl font-black text-slate-900">{main}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function SmallCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm font-semibold uppercase tracking-wide text-[#577c12]">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function CalculatorCard({ item, label }: { item: any; label: string }) {
  return (
    <Link href={item.href}>
      <article className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-[#9ACD32]/40 hover:bg-white hover:shadow-md">
        <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#062B52]">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.blurb}</p>
        <div className="mt-4 text-sm font-semibold text-[#062B52]">Open calculator →</div>
      </article>
    </Link>
  );
}