import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const baseUrl = 'https://calicalculators.com';

  const pagesDir = path.join(process.cwd(), 'pages');

  function getAllPages(dir) {
    return fs.readdirSync(dir).flatMap((file) => {
      const fullPath = path.join(dir, file);

      // If folder → go inside
      if (fs.statSync(fullPath).isDirectory()) {
        return getAllPages(fullPath);
      }

      // Only take .js or .tsx
      if (!file.endsWith('.js') && !file.endsWith('.tsx')) return [];

      // REMOVE unwanted files
      if (
        file.startsWith('_') || // _app, _document
        file.includes('api') ||
        file.includes('sitemap') ||
        file.includes('robots') ||
        file.includes('404') ||
        file.includes('500')
      ) return [];

      // Convert file path → URL
      const route = fullPath
        .replace(pagesDir, '')
        .replace(/\.js|\.tsx/, '')
        .replace(/\/index$/, '');

      return route === '' ? '/' : route;
    });
  }

  const pages = getAllPages(pagesDir);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(sitemap);
}