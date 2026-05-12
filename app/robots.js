export default function robots() {
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Mobile', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.lakemichiganshore.wine/sitemap.xml',
  };
}
