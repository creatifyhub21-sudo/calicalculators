export default function handler(req, res) {
  const baseUrl = 'https://calicalculators.com';

  const pages = [
    '',
    '/bmi-calculator',
    '/age-calculator',
    '/percentage-calculator',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map((page) => `
      <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `).join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(sitemap);
}