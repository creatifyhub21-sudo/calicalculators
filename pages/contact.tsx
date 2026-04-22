import Head from 'next/head';
import Navbar from '../components/Navbar';
import { absoluteUrl, siteConfig } from '../data/siteConfig';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>{`Contact | ${siteConfig.name}`}</title>
        <meta name="description" content={`Contact ${siteConfig.name} for support, feedback, calculator suggestions, or business inquiries.`} />
        <link rel="canonical" href={absoluteUrl('/contact')} />
      </Head>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Contact</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Get in touch</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            For support, feedback, bug reports, calculator suggestions, or partnership inquiries, use the contact details below.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">Email</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Primary support address for launch.</p>
              <a href={`mailto:${siteConfig.supportEmail}`} className="mt-4 inline-flex rounded-xl bg-[#062B52] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#041f3b]">
                {siteConfig.supportEmail}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">What to include</h2>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                <li>Calculator name or page URL</li>
                <li>Short description of the issue or suggestion</li>
                <li>Device or browser if you are reporting a bug</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Update this email address before launch if you want a different inbox for site support.
          </p>
        </div>
      </main>
    </>
  );
}
