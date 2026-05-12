import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About This Site | Lake Michigan Shore Wineries',
  description: 'Learn about this independent, self-funded project dedicated to promoting Southwest Michigan wineries and the Lake Michigan Shore AVA.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
