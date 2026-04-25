import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
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