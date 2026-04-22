import type { GetServerSideProps } from 'next';
import { absoluteUrl } from '../data/siteConfig';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
