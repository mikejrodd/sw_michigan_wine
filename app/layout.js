import ThemeRegistry from '@/providers/ThemeRegistry';
import DrawerProvider from '@/providers/DrawerProvider';
import Layout from '@/components/Navigation/Layout';
import './globals.css';

export const metadata = {
  title: 'Lake Michigan Shore Wineries | Michigan Wine Country',
  description: 'Explore 27+ wineries in Michigan\'s Lake Michigan Shore and Fennville AVAs. Plan tastings, discover grape varieties, and visit Southwest Michigan wine country.',
  metadataBase: new URL('https://www.lakemichiganshore.wine'),
  alternates: { canonical: '/' },
  keywords: 'Michigan wine, Lake Michigan Shore AVA, Michigan wineries, Michigan vineyards, Michigan wine tasting, Michigan grapes, wine country, wine trails in Michigan',
  openGraph: {
    type: 'website',
    title: 'Lake Michigan Shore Wineries | Michigan Wine Country',
    description: 'Discover 27+ wineries in Southwest Michigan\'s Lake Michigan Shore and Fennville AVAs. Plan tastings, tours, and more.',
    url: 'https://www.lakemichiganshore.wine/',
    siteName: 'Lake Michigan Shore Wineries',
    images: ['/assets/lms_wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lake Michigan Shore Wineries | Michigan Wine Country',
    description: 'Plan your next wine country trip to the best wineries in Southwest Michigan.',
    images: ['/assets/lms_wide.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <DrawerProvider>
            <Layout>{children}</Layout>
          </DrawerProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
