import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config;
  },
  images: {
    domains: ['s3.amazonaws.com'],
  },
};

export default withNextIntl(nextConfig);
