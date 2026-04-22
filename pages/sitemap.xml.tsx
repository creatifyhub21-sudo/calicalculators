import type { GetServerSideProps } from 'next';
import { calculatorDirectory } from '../data/calculatorDirectory';
import { absoluteUrl } from '../data/siteConfig';

const staticPages = ['/', '/about', '/contact', '/privacy-policy', '/terms'];

function buildSitemap() {
  const urls = [...staticPages, ...calculatorDirectory.map((item) => item.href)];
  const uniqueUrls = Array.from(new Set(urls));
  const lastmod = new Date().toISOString();

  const body = uniqueUrls
    .map(
      (path) => `\n  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
