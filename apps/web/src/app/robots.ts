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
          '/account-statements',
          '/accounts-certificate',
          '/dummy-accounts-certificate',
          '/financial-statements',
          '/company-accounts',
          '/statement-1',
          '/statement-2',
          '/statement1',
          '/statement2',
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
          '/account-statements',
          '/accounts-certificate',
          '/dummy-accounts-certificate',
          '/financial-statements',
          '/company-accounts',
          '/statement-1',
          '/statement-2',
          '/statement1',
          '/statement2',
          '/internal-documents',
          '/important-documents',
          '/api/certificates/',
          '/api/certificates/*',
        ],
      },
    ],
  }
}
