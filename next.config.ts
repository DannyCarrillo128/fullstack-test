import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/signIn', destination: '/', permanent: true }
    ];
  },
  reactStrictMode: true
};

export default nextConfig;
