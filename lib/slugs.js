import wineryData from '@/data/wineryData.json';

export function getWinerySlug(winery) {
  return winery.slug || winery.name.toLowerCase().replace(/ /g, '-');
}

export function findWineryBySlug(slug) {
  return wineryData.find(w => getWinerySlug(w) === slug)
    || wineryData.find(w => w.name.toLowerCase().replace(/ /g, '-') === slug);
}
