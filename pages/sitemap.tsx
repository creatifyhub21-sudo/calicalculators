import Head from 'next/head';
import Link from 'next/link';
import { calculatorCategories } from '../data/calculatorDirectory';
import { siteConfig } from '../data/siteConfig';

const staticPages = [
  { name: 'Home', href: '/', description: 'Main homepage with featured calculators and categories.' },
  { name: 'About', href: '/about', description: 'Learn about CaliCalculators and the tools we offer.' },
  { name: 'Contact', href: '/contact', description: 'Get in touch for support, feedback, or business questions.' },
  { name: 'Privacy Policy', href: '/privacy-policy', description: 'How information is handled on the website.' },
  { name: 'Terms', href: '/terms', description: 'Website terms and conditions.' },
  { name: 'XML Sitemap', href: '/sitemap.xml', description: 'Search-engine sitemap for Google and other crawlers.' },
];

export default function SitemapPage() {
  return (
    <>
      <Head>
        <title>HTML Sitemap | {siteConfig.name}</title>
        <meta
          name="description"
          content="Browse every calculator and important page on CaliCalculators in one place."
        />
        <link rel="canonical" href={`${siteConfig.url}/sitemap`} />
      </Head>

      <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6f9d17]">
              Site navigation
            </p>
            <h1 className="text-4xl font-black tracking-tight text-[#062B52] sm:text-5xl">
              HTML Sitemap
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Browse every major page on {siteConfig.name}. Use this page to quickly find calculators by
              category, or open the XML sitemap for search engines.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sitemap.xml"
                className="rounded-full border border-[#062B52] px-4 py-2 text-sm font-semibold text-[#062B52] transition hover:bg-[#062B52] hover:text-white"
              >
                Open XML sitemap
              </Link>
              <Link
                href="/"
                className="rounded-full border border-[#9ACD32] px-4 py-2 text-sm font-semibold text-[#062B52] transition hover:bg-[#f4f8e8]"
              >
                Back to homepage
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-tight text-[#062B52]">Important pages</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {staticPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#9ACD32] hover:bg-white hover:shadow-sm"
                >
                  <div className="text-lg font-bold text-[#062B52]">{page.name}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{page.description}</p>
                  <div className="mt-3 text-sm font-semibold text-[#6f9d17]">{page.href}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            {calculatorCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6f9d17]">
                      Calculator category
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-[#062B52]">
                      {category.name}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                      {category.description}
                    </p>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                    {category.items.length} calculators
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#9ACD32] hover:bg-white hover:shadow-sm"
                    >
                      <div className="text-lg font-bold text-[#062B52]">{item.name}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.blurb}</p>
                      <div className="mt-3 text-sm font-semibold text-[#6f9d17]">{item.href}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
