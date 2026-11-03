import type { Metadata } from 'next'
import { STATEMENT_1_DOC } from '@/lib/certificates-config'
import { SecureDocumentViewer } from '@/components/certificates/SecureDocumentViewer'

export const metadata: Metadata = {
  title: 'Account Statement 1 | BharatMart (UK) Limited',
  description: 'Confidential Internal Account Statement (01/08/2026 – 31/10/2026). For Internal Authorized Personnel Only.',
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

export default function AccountStatement1Page() {
  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#1e1b16]">
      <SecureDocumentViewer doc={STATEMENT_1_DOC} />
    </div>
  )
}
