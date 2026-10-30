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
  },
}

export default function RegistrationIncorporationCertificatePage() {
  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#1e1b16]">
      <SecureDocumentViewer doc={REGISTRATION_DOC} />
    </div>
  )
}
