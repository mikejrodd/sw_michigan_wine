import LmsAVAContent from '@/components/avas/LmsAVAContent';

export const metadata = {
  title: 'Lake Michigan Shore AVA | History, Wineries & Grape Varieties',
  description: 'Explore Michigan\'s Lake Michigan Shore AVA. Learn about its history, growing conditions, 20+ wineries, and the grape varieties that thrive in Southwest Michigan.',
  alternates: { canonical: '/avas/lake-michigan-shore' },
  openGraph: {
    title: 'Lake Michigan Shore AVA | History, Wineries & Grape Varieties',
    description: 'Explore the Lake Michigan Shore AVA — history, growing conditions, wineries, and must-try wines.',
    url: 'https://www.lakemichiganshore.wine/avas/lake-michigan-shore',
    images: ['/assets/lms_wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lake Michigan Shore AVA | Southwest Michigan Wine Region',
    description: 'History, growing conditions, wineries, and grape varieties of the Lake Michigan Shore AVA.',
    images: ['/assets/lms_wide.png'],
  },
};

export default function LmsAVAPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 2, "name": "AVAs", "item": "https://www.lakemichiganshore.wine/avas" },
      { "@type": "ListItem", "position": 3, "name": "Lake Michigan Shore", "item": "https://www.lakemichiganshore.wine/avas/lake-michigan-shore" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <LmsAVAContent />
    </>
  );
}
