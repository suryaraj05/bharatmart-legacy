import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function TechConsultationStrip() {
  return (
    <section
      aria-labelledby="tech-consultation-heading"
      className="mx-auto max-w-7xl px-4 pb-6 pt-1 md:px-8 md:pb-10 lg:px-16"
    >
      <Link
        className="group relative flex overflow-hidden rounded-2xl border border-[#e8d9c8] bg-[#1a1208] shadow-sm transition hover:border-[#d6c4ad] hover:shadow-md"
        href="/ai-consultation"
      >
        <img
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-55 transition duration-500 group-hover:scale-[1.03]"
          src="/seasonal/tech/consultation-banner.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208]/95 via-[#1a1208]/80 to-[#1a1208]/35" />

        <div className="relative flex w-full flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6 md:p-8">
          <div className="min-w-0 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFD700] sm:text-xs">
              Bharat Mart
            </p>
            <h2
              className="mt-1.5 font-heading text-lg font-semibold text-white sm:text-xl md:text-2xl"
              id="tech-consultation-heading"
            >
              AI and Technology Consultation
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-white/85 sm:text-sm sm:leading-6">
              Indian AI and software experts for UK businesses - about a quarter of typical market
              rates, without travel or setup in India.
            </p>
          </div>

          <span className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#e8a317] px-5 text-sm font-semibold text-[#5b3d00] transition group-hover:bg-[#ffdeae] sm:self-center">
            Learn more
            <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </section>
  )
}
