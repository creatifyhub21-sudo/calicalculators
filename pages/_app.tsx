import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
  {/* Favicon */}
  <link rel="icon" href="/favicon.ico" />

  {/* Title + SEO */}
  <title>CaliCalculators | Premium Online Calculators</title>
  <meta name="description" content="Free online calculators for finance, health, math and more." />

  {/* Google AdSense */}
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3011404436008275"
    crossOrigin="anonymous"
  ></script>
</Head>

      <Component {...pageProps} />

      <SiteFooter />
    </>
  )
}