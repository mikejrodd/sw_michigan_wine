import GrapeVarietiesContent from '@/components/GrapeVarietiesContent';

export const metadata = {
  title: 'Southwest Michigan Grape Varieties | Lake Michigan Shore Wineries',
  description: 'Explore vinifera and hybrid grape varieties grown in Southwest Michigan\'s Lake Michigan Shore AVA. Riesling, Pinot Noir, Cabernet Franc, Chambourcin, and more.',
  alternates: { canonical: '/grape-varieties' },
  openGraph: {
    title: 'Southwest Michigan Grape Varieties | Lake Michigan Shore Wineries',
    description: 'Discover the vinifera and hybrid grape varieties thriving in Southwest Michigan wine country.',
    url: 'https://www.lakemichiganshore.wine/grape-varieties',
    images: ['/assets/variety_images/riesling.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southwest Michigan Grape Varieties',
    description: 'Explore vinifera and hybrid grapes grown in the Lake Michigan Shore AVA.',
    images: ['/assets/variety_images/riesling.jpg'],
  },
};

export default function GrapeVarietiesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lakemichiganshore.wine/" },
      { "@type": "ListItem", "position": 2, "name": "Grape Varieties", "item": "https://www.lakemichiganshore.wine/grape-varieties" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <GrapeVarietiesContent />
    </>
  );
}
