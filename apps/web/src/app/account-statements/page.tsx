import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Lock,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import { STATEMENT_1_DOC, STATEMENT_2_DOC } from '@/lib/certificates-config'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = {
  title: 'Account Statements | Internal Documents',
  description: 'Internal confidential company account statements for BharatMart (UK) Limited.',
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

export default function AccountStatementsDirectoryPage() {
  const statementList = [
    {
      doc: STATEMENT_1_DOC,
      period: '01/08/2026 – 31/10/2026',
      pages: '6 Pages',
    },
    {
      doc: STATEMENT_2_DOC,
      period: '15/07/2025 – 31/07/2026',
      pages: '6 Pages',
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#fff8f0] text-[#1e1b16]">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/internal-documents"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6c4ad] bg-[#f4ede4] px-3.5 py-1.5 text-xs font-semibold text-[#514534] transition-colors hover:bg-[#eee7de] hover:text-[#1e1b16]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Documents</span>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6c4ad] bg-[#f4ede4] px-4 py-1.5 text-xs font-semibold text-[#7f5700] shadow-sm">
            <Lock className="h-3.5 w-3.5" />
            <span>CONFIDENTIAL ARCHIVE • FOR INTERNAL PURPOSES ONLY</span>
          </div>

          <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-[#7f5700] md:text-4xl">
            Account Statements
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#514534]">
            * Please enter the Designated PIN to view each document.
          </p>
        </div>

        {/* Two Separate Lists / Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {statementList.map(({ doc, period, pages }) => (
            <div
              key={doc.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d6c4ad] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7f5700] hover:shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ede4] text-[#7f5700] shadow-sm transition-colors group-hover:bg-[#7f5700] group-hover:text-white">
                    <FileSpreadsheet className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[#d6c4ad] bg-[#fffaf4] px-2.5 py-0.5 text-[10px] font-semibold text-[#7f5700]">
                    {doc.badge}
                  </span>
                </div>

                <h2 className="mt-5 font-heading text-lg font-bold text-[#1e1b16] transition-colors group-hover:text-[#7f5700]">
                  {doc.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-[#514534]">
                  Period: <span className="font-semibold text-[#1e1b16]">{period}</span>
                </p>
                <p className="mt-1 text-xs text-[#514534]">
                  {pages} • Formal Management & Banking Records
                </p>
                <p className="mt-3 font-mono text-[11px] text-[#837561]">{doc.legalReference}</p>
              </div>

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

        {/* Security Notice */}
        <div className="mt-12 flex items-center justify-center gap-2 text-center text-xs text-[#837561]">
          <ShieldCheck className="h-4 w-4 text-[#7f5700]" />
          <span>8-Digit PIN Protected • Anti-Screenshot DRM Active • Zero Google Indexing</span>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
