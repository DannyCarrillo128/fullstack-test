import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/signIn', destination: '/', permanent: true }
    ];
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL
  },
  reactStrictMode: true
};

export default nextConfig;
