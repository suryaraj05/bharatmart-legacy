import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/company-registration-certificate',
          '/registration-incorporation-certificate',
          '/incorporation-certificate',
          '/share-certificate',
          '/confirmation-statement',
          '/accounts-certificate',
          '/dummy-accounts-certificate',
          '/internal-documents',
          '/important-documents',
          '/api/certificates/',
          '/api/certificates/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        disallow: [
          '/company-registration-certificate',
          '/registration-incorporation-certificate',
          '/incorporation-certificate',
          '/share-certificate',
          '/confirmation-statement',
          '/accounts-certificate',
          '/dummy-accounts-certificate',
          '/internal-documents',
          '/important-documents',
          '/api/certificates/',
          '/api/certificates/*',
        ],
      },
    ],
  }
}
