const path = require('path')
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@bharatmart/ui',
    '@bharatmart/utils',
    '@bharatmart/database',
    '@bharatmart/services',
    '@bharatmart/types',
    '@bharatmart/validation',
    '@bharatmart/auth',
  ],
  outputFileTracingRoot: path.join(__dirname, '../..'),
  outputFileTracingIncludes: {
    '/**': [
      './secure_documents/**/*',
      './../../packages/database/generated/client/**/*',
      './../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/**/*',
    ],
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'bharatmart-uk.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*(company-registration-certificate|registration-incorporation-certificate|share-certificate|confirmation-statement|accounts-certificate|dummy-accounts-certificate|internal-documents|important-documents|api/certificates/:sub*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
