import AVAsMapLoader from '@/components/avas/AVAsMapLoader';

export const metadata = {
  title: 'Southwest Michigan AVAs | Lake Michigan Shore & Fennville Wine Regions',
  description: 'Explore Southwest Michigan\'s two American Viticultural Areas: Lake Michigan Shore AVA and Fennville AVA. Discover the wine regions, growing conditions, and wineries.',
  alternates: { canonical: '/avas' },
  openGraph: {
    title: 'Southwest Michigan AVAs | Lake Michigan Shore & Fennville',
    description: 'Explore Southwest Michigan\'s two American Viticultural Areas and their wineries.',
    url: 'https://www.lakemichiganshore.wine/avas',
    images: ['/assets/lms_wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southwest Michigan AVAs | Lake Michigan Shore & Fennville',
    description: 'Explore Southwest Michigan\'s two American Viticultural Areas and their wineries.',
  },
};

export default function AVAsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AVAsMapLoader />
    </>
  );
}
