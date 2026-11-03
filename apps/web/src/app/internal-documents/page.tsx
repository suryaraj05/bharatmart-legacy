import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Lock,
  FileCheck2,
  PieChart,
  FileText,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react'
import {
  REGISTRATION_DOC,
  SHARE_DOC,
  CONFIRMATION_DOC,
  ACCOUNTS_DOC,
} from '@/lib/certificates-config'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = {
  title: 'Important Documents | Internal Purposes Only',
  description: 'Internal confidential company certificates and corporate documents for BharatMart (UK) Limited.',
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

export default function InternalDocumentsHubPage() {
  const docsList = [
    {
      doc: REGISTRATION_DOC,
      icon: FileCheck2,
      badgeColor: 'border-[#d6c4ad] bg-[#fffaf4] text-[#7f5700]',
    },
    {
      doc: SHARE_DOC,
      icon: PieChart,
      badgeColor: 'border-[#d6c4ad] bg-[#fffaf4] text-[#7f5700]',
    },
    {
      doc: CONFIRMATION_DOC,
      icon: FileText,
      badgeColor: 'border-[#d6c4ad] bg-[#fffaf4] text-[#7f5700]',
    },
    {
      doc: ACCOUNTS_DOC,
      icon: FileSpreadsheet,
      badgeColor: 'border-[#d6c4ad] bg-[#fffaf4] text-[#7f5700]',
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#fff8f0] text-[#1e1b16]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6c4ad] bg-[#f4ede4] px-4 py-1.5 text-xs font-semibold text-[#7f5700] shadow-sm">
            <Lock className="h-3.5 w-3.5" />
            <span>CONFIDENTIAL ARCHIVE • FOR INTERNAL PURPOSES ONLY</span>
          </div>

          {/* Exact required title */}
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-[#7f5700] md:text-5xl">
            Important documents, for Internal Purposes only
          </h1>

          {/* Exact required instruction */}
          <p className="mt-3 text-base font-semibold text-[#514534] md:text-lg">
            * Please enter the Designated PIN to view the document.
          </p>
        </div>

        {/* Document Cards Grid - 4 Columns in Light Theme */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docsList.map(({ doc, icon: Icon, badgeColor }) => (
            <div
              key={doc.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d6c4ad] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7f5700] hover:shadow-xl"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ede4] text-[#7f5700] shadow-sm transition-colors group-hover:bg-[#7f5700] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${badgeColor}`}>
                    {doc.badge}
                  </span>
                </div>

                {/* Document Information */}
                <h2 className="mt-5 font-heading text-lg font-bold text-[#1e1b16] transition-colors group-hover:text-[#7f5700]">
                  {doc.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#514534]">{doc.subtitle}</p>
                <p className="mt-3 font-mono text-[11px] text-[#837561]">{doc.legalReference}</p>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-[#e8e2d9] pt-5">
                <Link
                  href={doc.routePath}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7f5700] px-4 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#6a4900] hover:shadow-md"
                >
                  <span>Open Document</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Notice info */}
        <div className="mt-14 border-t border-[#d6c4ad] pt-8 text-center text-xs text-[#837561]">
          <p>
            <strong className="font-semibold text-[#514534]">Bharat Mart Limited</strong> • Registered in England & Wales • Company No: 16582568
          </p>
          <p className="mt-1">
            For designated access clearance, contact internal administration.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
