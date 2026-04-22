import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import RelatedCalculators from './RelatedCalculators';
import QuickTipsSection from './QuickTipsSection';
import UseCasesSection from './UseCasesSection';
import ManualMethodCard from './ManualMethodCard';
import FAQSection from './FAQSection';
import ResultActions from './ResultActions';
import AdSlot from './AdSlot';
import { getCalculatorByTitle, getRelatedCalculators } from '../data/calculatorDirectory';
import { absoluteUrl } from '../data/siteConfig';
import { adSlots } from '../data/adSlots';
import { getCalculatorContent } from '../data/calculatorContent';

interface CalculatorPageShellProps {
  category: string;
  title: string;
  description: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function CalculatorPageShell({
  category,
  title,
  description,
  left,
  right,
}: CalculatorPageShellProps) {
  const metadata = getCalculatorByTitle(title);
  const canonicalPath = metadata?.href || '/';
  const content = getCalculatorContent(title, category, description);
  const pageTitle = content.metaTitle;
  const relatedItems = getRelatedCalculators(title, category, 6);
  const url = absoluteUrl(canonicalPath);
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    description,
    url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: category, item: url },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };
  useEffect(() => {
    const handleAutoScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId || 'calculator-result-content';
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.addEventListener('calculator:scrollToResult', handleAutoScroll as EventListener);
    return () => window.removeEventListener('calculator:scrollToResult', handleAutoScroll as EventListener);
  }, []);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords.join(', ')} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={url} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <Navbar />
      <div className="mx-auto max-w-[1500px] px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)_260px] xl:grid-cols-[400px_minmax(0,1fr)_300px] lg:items-start">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:hidden">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Link href="/" className="font-semibold text-slate-500 transition hover:text-[#062B52]">Home</Link>
                  <span className="text-slate-300">/</span>
                  <span className="font-semibold text-slate-500">{category}</span>
                  <span className="text-slate-300">/</span>
                  <span className="font-semibold text-[#062B52]">{title}</span>
                </div>
                <h1 className="mt-4 text-3xl font-black text-slate-900">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
              {left}
              <div className="hidden rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm lg:block">
                <div className="font-semibold uppercase tracking-wide text-[#062B52]">Quick page flow</div>
                <p className="mt-2 leading-6">Enter values on the left, calculate instantly, then review results, charts, formulas, and FAQs in the center while ads stay visually separate on the right.</p>
              </div>
              <div className="lg:hidden">
                <AdSlot slot={adSlots.calculators.inlinePrimary} intent="mobile" minHeight={180} />
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-[#f5fae8] p-6 shadow-sm lg:block xl:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href="/" className="font-semibold text-slate-500 transition hover:text-[#062B52]">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-slate-500">{category}</span>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-[#062B52]">{title}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {['Free to use', 'Formula shown', 'Step-by-step results', 'Fast mobile-friendly layout'].map((item) => (
                  <div
                    key={item}
                    className="inline-flex rounded-full border border-[#9ACD32]/35 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#062B52] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">{category}</p>
                <h1 className="mt-2 text-4xl font-black text-slate-900 sm:text-5xl">{title}</h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {content.highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                    <div className="text-sm font-semibold uppercase tracking-wide text-[#577c12]">Why this helps</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <ResultActions title={title} targetId="calculator-result-content" />
            <div id="calculator-result-content" className="space-y-6 scroll-mt-28">
              {right}
            </div>
            <div className="lg:hidden">
              <AdSlot slot={adSlots.calculators.inlineSecondary} intent="mobile" minHeight={180} />
            </div>
            <div className="hidden lg:block xl:hidden">
              <AdSlot slot={adSlots.calculators.inlinePrimary} intent="inline" minHeight={220} />
            </div>
            <QuickTipsSection items={content.quickTips} />
            <UseCasesSection items={content.useCases} />
            <ManualMethodCard title={title} steps={content.manualSteps} />
            <FAQSection items={content.faqs} />
            <RelatedCalculators
              items={relatedItems}
              title="Related calculators"
              description="Jump to nearby tools in the same workflow, compare scenarios, or validate the numbers from a different angle."
            />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot={adSlots.calculators.sidebarTop} intent="sidebar" minHeight={280} />
              <div className="hidden xl:block">
                <AdSlot slot={adSlots.calculators.sidebarBottom} intent="sidebar" minHeight={320} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
