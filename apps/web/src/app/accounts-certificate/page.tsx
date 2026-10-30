import type { Metadata } from 'next'
import { ACCOUNTS_DOC } from '@/lib/certificates-config'
import { SecureDocumentViewer } from '@/components/certificates/SecureDocumentViewer'

export const metadata: Metadata = {
  title: 'Accounts Certificate (Dummy Specimen) | Confidential Document',
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

export default function AccountsCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SecureDocumentViewer doc={ACCOUNTS_DOC} />
    </div>
  )
}
