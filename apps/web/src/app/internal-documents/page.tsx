import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  PieChart,
  FileSpreadsheet,
  FileText,
  KeyRound,
  ArrowRight,
} from 'lucide-react'
import {
  REGISTRATION_DOC,
  SHARE_DOC,
  CONFIRMATION_DOC,
  ACCOUNTS_DOC,
} from '@/lib/certificates-config'

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
      badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    },
    {
      doc: SHARE_DOC,
      icon: PieChart,
      badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    },
    {
      doc: CONFIRMATION_DOC,
      icon: FileText,
      badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    },
    {
      doc: ACCOUNTS_DOC,
      icon: FileSpreadsheet,
      badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 backdrop-blur-md">
            <Lock className="h-3.5 w-3.5" />
            <span>CONFIDENTIAL ARCHIVE • STRICTLY PRIVATE</span>
          </div>

          {/* Exact required title */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Important documents, for Internal Purposes only
          </h1>

          {/* Exact required instruction */}
          <p className="mt-3 text-base font-semibold text-amber-400 sm:text-lg">
            * Please enter the Designated PIN to view the document.
          </p>
        </div>

        {/* Document Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {docsList.map(({ doc, icon: Icon, badgeColor }) => (
            <div
              key={doc.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Subtle top edge accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 group-hover:via-amber-500 to-transparent transition-all" />

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-amber-400 shadow-inner group-hover:border-amber-500/30 group-hover:text-amber-300 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeColor}`}>
                    {doc.badge}
                  </span>
                </div>

                {/* Document Information */}
                <h2 className="mt-4 text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {doc.title}
                </h2>
                <p className="mt-1 text-xs text-slate-400">{doc.subtitle}</p>
                <p className="mt-2 text-[11px] font-mono text-slate-500">{doc.legalReference}</p>
              </div>

              {/* Bottom security status & Action Button */}
              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                    Dedicated 8-Digit PIN
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Rate Limited
                  </span>
                </div>

                <Link
                  href={doc.routePath}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-850 px-4 py-2.5 text-xs font-bold text-white border border-slate-700/80 transition-all group-hover:from-amber-600 group-hover:to-orange-600 group-hover:border-amber-500/50 group-hover:shadow-lg"
                >
                  <span>Open Document</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <p>BharatMart (UK) Limited • Registered in England & Wales • Company No: 16582568</p>
          <p className="mt-1">
            For designated access clearance, contact your compliance officer or internal administration.
          </p>
        </div>
      </div>
    </div>
  )
}
