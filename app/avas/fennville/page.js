import FennvilleAVAContent from '@/components/avas/FennvilleAVAContent';

export const metadata = {
  title: 'Fennville AVA – Wineries, Grapes & Must-Try Wines in Southwest Michigan',
  description: 'Explore Michigan\'s Fennville AVA. Learn about its growing conditions, discover local wineries, and find must-try bottles from this unique corner of the Lake Michigan Shore.',
  alternates: { canonical: '/avas/fennville' },
  openGraph: {
    title: 'Fennville AVA – Wineries, Grapes & Must-Try Wines',
    description: 'Explore the Fennville AVA — growing conditions, wineries, and must-try wines in Southwest Michigan.',
    url: 'https://www.lakemichiganshore.wine/avas/fennville',
    images: ['/assets/fennville_wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fennville AVA | Southwest Michigan Wine Region',
    description: 'Discover wineries, grapes, and must-try wines in Michigan\'s Fennville AVA.',
    images: ['/assets/fennville_wide.png'],
  },
};

export default function FennvilleAVAPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" },
      { "@type": "ListItem", "position": 3, "name": "Fennville", "item": "https://www.lakemichiganshore.wine/avas/fennville" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <FennvilleAVAContent />
    </>
  );
}
