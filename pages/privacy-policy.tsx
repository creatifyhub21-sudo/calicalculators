import Head from 'next/head';
import Navbar from '../components/Navbar';
import { absoluteUrl, siteConfig } from '../data/siteConfig';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>{`Privacy Policy | ${siteConfig.name}`}</title>
        <meta name="description" content={`Read the privacy policy for ${siteConfig.name}.`} />
        <link rel="canonical" href={absoluteUrl('/privacy-policy')} />
      </Head>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10">
        <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm prose prose-slate max-w-none">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#062B52]">Privacy Policy</p>
          <h1>Privacy Policy</h1>
          <p><strong>Effective date:</strong> April 19, 2026</p>
          <p>
            {siteConfig.name} respects your privacy. This page explains what information may be collected when you use the website,
            how that information may be used, and what choices you have.
          </p>
          <h2>Information collected</h2>
          <p>
            The website may collect basic analytics information such as page views, browser type, device information,
            referral sources, and interaction data. If you contact the site directly, your email address and message content
            may also be received.
          </p>
          <h2>How information is used</h2>
          <p>
            Information may be used to improve the website, understand traffic patterns, troubleshoot technical issues,
            respond to messages, and maintain site security.
          </p>
          <h2>Cookies and advertising</h2>
          <p>
            The website may use cookies and similar technologies for analytics, site functionality, and advertising.
            If advertising is enabled, third-party vendors such as Google may use cookies to serve ads based on a user&apos;s prior visits.
          </p>
          <h2>Third-party services</h2>
          <p>
            The website may use third-party services such as hosting providers, analytics tools, and advertising networks.
            Those services may process data according to their own privacy policies.
          </p>
          <h2>Data retention</h2>
          <p>
            Information is retained only as long as reasonably necessary for website operations, analytics, security,
            and communication purposes.
          </p>
          <h2>Your choices</h2>
          <p>
            You can limit cookies through your browser settings. You may also contact the site regarding privacy questions
            using the contact information on the contact page.
          </p>
          <h2>Policy updates</h2>
          <p>
            This privacy policy may be updated from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </article>
      </main>
    </>
  );
}
