/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.10.24",
        port: "3033",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
