import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@voting-bloc/types'],
};

export default nextConfig;
