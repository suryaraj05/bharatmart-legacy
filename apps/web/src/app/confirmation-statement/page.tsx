import type { Metadata } from 'next'
import { CONFIRMATION_DOC } from '@/lib/certificates-config'
import { SecureDocumentViewer } from '@/components/certificates/SecureDocumentViewer'

export const metadata: Metadata = {
  title: 'Confirmation Statement | Confidential Document',
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

export default function ConfirmationStatementPage() {
  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#1e1b16]">
      <SecureDocumentViewer doc={CONFIRMATION_DOC} />
    </div>
  )
}
