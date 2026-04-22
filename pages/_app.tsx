import SiteFooter from '../components/SiteFooter';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * Custom App component used by Next.js. It ensures that Tailwind CSS styles
 * are applied across all pages by importing the global stylesheet once.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Component {...pageProps} />
    <SiteFooter />
  </>);
}

export default MyApp;