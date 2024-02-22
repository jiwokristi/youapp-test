/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
