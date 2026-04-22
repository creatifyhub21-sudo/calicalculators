import Head from "next/head";

export default function AdSenseLoader() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client) return null;

  return (
    <Head>
      <script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
    </Head>
  );
}