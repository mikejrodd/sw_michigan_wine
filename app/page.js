import HomeCards from '@/components/HomeCards';

export const metadata = {
  title: 'Lake Michigan Shore Wineries | Discover Southwest Michigan Wine Country',
  description: 'Explore 27+ wineries in Michigan\'s Lake Michigan Shore and Fennville AVAs. Plan tastings, discover grape varieties, and visit Southwest Michigan wine country.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Lake Michigan Shore Wineries | Discover Southwest Michigan Wine Country',
    description: 'Explore 27+ wineries in Michigan\'s Lake Michigan Shore and Fennville AVAs.',
    url: 'https://www.lakemichiganshore.wine/',
    images: ['/assets/lms_wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lake Michigan Shore Wineries | Southwest Michigan Wine Country',
    description: 'Plan your next wine country trip to the best wineries in Southwest Michigan.',
    images: ['/assets/lms_wide.png'],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lake Michigan Shore Wineries",
    "url": "https://www.lakemichiganshore.wine/",
    "description": "Discover 27+ wineries in Southwest Michigan's Lake Michigan Shore and Fennville AVAs.",
    "publisher": { "@type": "Organization", "name": "Lake Michigan Shore Wineries", "url": "https://www.lakemichiganshore.wine/" }
  };

  const touristSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Lake Michigan Shore Wine Country",
    "description": "A premier wine region in Southwest Michigan featuring 27+ wineries across the Lake Michigan Shore and Fennville AVAs.",
    "url": "https://www.lakemichiganshore.wine/",
    "address": { "@type": "PostalAddress", "addressLocality": "Southwest Michigan", "addressRegion": "MI", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 42.1, "longitude": -86.4 },
    "touristType": ["Wine Tourism", "Wine Tasting", "Vineyard Tours"]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristSchema) }} />
      <HomeCards />
    </>
  );
}
