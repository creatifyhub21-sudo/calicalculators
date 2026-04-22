import Head from 'next/head';
import Navbar from '../components/Navbar';
import { absoluteUrl, siteConfig } from '../data/siteConfig';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>{`Terms of Use | ${siteConfig.name}`}</title>
        <meta name="description" content={`Read the terms of use for ${siteConfig.name}.`} />
        <link rel="canonical" href={absoluteUrl('/terms')} />
      </Head>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10">
        <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm prose prose-slate max-w-none">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Terms of Use</p>
          <h1>Terms of Use</h1>
          <p><strong>Effective date:</strong> April 19, 2026</p>
          <p>
            By using {siteConfig.name}, you agree to these terms. If you do not agree, do not use the website.
          </p>
          <h2>Website purpose</h2>
          <p>
            {siteConfig.name} provides calculator tools and general informational content for convenience and educational use.
            Results are estimates and should not be treated as legal, tax, medical, financial, or professional advice.
          </p>
          <h2>No guarantee of accuracy</h2>
          <p>
            While the site is built to provide useful and accurate calculations, no guarantee is made that all information,
            formulas, or outputs are error-free, complete, or suitable for every situation.
          </p>
          <h2>User responsibility</h2>
          <p>
            You are responsible for reviewing your inputs and independently verifying important results before making decisions
            based on the website&apos;s calculations.
          </p>
          <h2>Intellectual property</h2>
          <p>
            The website design, branding, text, and original content may not be copied, republished, or redistributed without permission,
            except where otherwise allowed by law.
          </p>
          <h2>External services</h2>
          <p>
            The website may include third-party analytics, ads, or external links. Those third parties operate under their own terms and policies.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} is not liable for any direct, indirect, incidental,
            or consequential damages resulting from the use of the website.
          </p>
          <h2>Changes to these terms</h2>
          <p>
            These terms may be updated at any time. Continued use of the website after changes are posted means you accept the updated terms.
          </p>
        </article>
      </main>
    </>
  );
}
