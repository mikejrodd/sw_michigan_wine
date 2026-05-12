import wineryData from '@/data/wineryData.json';
import { getWinerySlug } from '@/lib/slugs';

export default function sitemap() {
  const wineryUrls = wineryData.map(w => ({
    url: `https://www.lakemichiganshore.wine/wineries/${getWinerySlug(w)}`,
    lastModified: w.updated_at ? new Date(w.updated_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: 'https://www.lakemichiganshore.wine/', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.lakemichiganshore.wine/grape-varieties', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lakemichiganshore.wine/avas', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lakemichiganshore.wine/avas/lake-michigan-shore', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.lakemichiganshore.wine/avas/fennville', changeFrequency: 'weekly', priority: 0.9 },
    ...wineryUrls,
  ];
}
