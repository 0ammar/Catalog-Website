/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.63',
        port: '5097',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
