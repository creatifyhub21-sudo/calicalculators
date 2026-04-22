import Head from 'next/head';
import Navbar from '../components/Navbar';
import { absoluteUrl, siteConfig } from '../data/siteConfig';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{`About | ${siteConfig.name}`}</title>
        <meta
          name="description"
          content={`Learn about ${siteConfig.name}, a calculator website built to make finance, health, math, and everyday calculations easier to understand.`}
        />
        <link rel="canonical" href={absoluteUrl('/about')} />
      </Head>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">About {siteConfig.name}</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">A cleaner way to use online calculators</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {siteConfig.name} is built to make calculations easier to use, easier to read, and easier to trust.
            The goal is simple: give people fast tools for finance, health, math, and everyday planning without
            clutter, confusion, or hard-to-read results.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Clear results', 'Every calculator is designed to show the answer, supporting details, and extra context in one place.'],
              ['Better usability', 'Sticky input panels, charts, and step-by-step sections help users move from input to result faster.'],
              ['Growing library', 'The site includes calculators across financial, health, math, and daily-use categories and will keep expanding.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-[#062B52] p-6 text-white">
            <h2 className="text-2xl font-bold">What comes next</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100">
              The platform is being prepared for launch, search growth, and future expansion into a mobile app.
              The focus is on making the website useful first, then scaling the brand and tools over time.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
