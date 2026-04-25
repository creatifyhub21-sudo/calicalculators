export async function getServerSideProps({ res }) {
  const response = await fetch('https://calicalculators.com/api/sitemap');
  const data = await response.text();

  res.setHeader('Content-Type', 'text/xml');
  res.write(data);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}