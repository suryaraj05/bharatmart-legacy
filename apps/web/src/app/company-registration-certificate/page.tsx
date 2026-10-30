import type { Metadata } from 'next'
import { REGISTRATION_DOC } from '@/lib/certificates-config'
import { SecureDocumentViewer } from '@/components/certificates/SecureDocumentViewer'

export const metadata: Metadata = {
  title: 'Registration/ Incorporation Certificate | Confidential Document',
  description: 'Internal document for BharatMart (UK) Limited. Access restricted.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
}

export default function CompanyRegistrationCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SecureDocumentViewer doc={REGISTRATION_DOC} />
    </div>
  )
}
