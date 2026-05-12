/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/map',
        destination: 'https://map.lakemichiganshore.wine/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
