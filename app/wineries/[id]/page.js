import { readFile } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import wineryData from '@/data/wineryData.json';
import { getWinerySlug, findWineryBySlug } from '@/lib/slugs';
import WineryPageClient from '@/components/WineryPageClient';

export function generateStaticParams() {
  return wineryData.map((winery) => ({
    id: getWinerySlug(winery),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const winery = findWineryBySlug(id);
  if (!winery) return {};
  return {
    title: `${winery.name} | Lake Michigan Shore Wineries`,
    description: `Visit ${winery.name} in ${winery.address}. Explore wines, hours, and plan your trip to this ${winery.ava} AVA winery in Southwest Michigan.`,
    alternates: { canonical: `/wineries/${id}` },
    openGraph: {
      title: `${winery.name} | Lake Michigan Shore Wineries`,
      description: `Visit ${winery.name} in ${winery.ava} AVA, Southwest Michigan.`,
      url: `https://www.lakemichiganshore.wine/wineries/${id}`,
      images: [winery.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${winery.name} | Lake Michigan Shore Wineries`,
      description: `Visit ${winery.name} in ${winery.ava} AVA, Southwest Michigan.`,
    },
  };
}

export default async function WineryPage({ params }) {
  const { id } = await params;
  const winery = findWineryBySlug(id);
  if (!winery) notFound();

  let description = '';
  if (winery.description && winery.description.endsWith('.md')) {
    try {
      const mdPath = path.join(process.cwd(), 'public', winery.description);
      description = await readFile(mdPath, 'utf-8');
    } catch {
      description = winery.description;
    }
  } else {
    description = winery.description || '';
  }

  const winerySchema = {
    "@context": "https://schema.org",
    "@type": "Winery",
    "name": winery.name,
    "url": winery.website,
    "telephone": winery.phone || undefined,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": winery.address,
      "addressRegion": "MI",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": winery.position[0],
      "longitude": winery.position[1]
    },
    "image": winery.image ? `https://www.lakemichiganshore.wine${winery.image}` : undefined,
    "sameAs": winery.website
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 2, "name": "Wineries", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 3, "name": winery.name, "item": `https://www.lakemichiganshore.wine/wineries/${id}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(winerySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WineryPageClient winery={winery} description={description} />
    </>
  );
}
