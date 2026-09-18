import Link from 'next/link'
import { SEASONAL_CTAS } from '@/lib/marketing-nav'

export function SeasonalCtaGrid() {
  return (
    <section
      aria-labelledby="seasonal-heading"
      className="mx-auto max-w-7xl px-4 pb-5 pt-3 md:px-8 md:pb-8 md:pt-6 lg:px-16"
    >
      <div className="mb-3 md:mb-5">
        <h2
          className="font-heading text-base font-semibold md:text-xl lg:text-2xl"
          id="seasonal-heading"
        >
          Seasonal Collections
        </h2>
        <p className="mt-0.5 text-xs text-[#514534] md:mt-1 md:text-sm">
          Festival essentials and seasonal favourites delivered across the UK.
        </p>
      </div>

      {/* Mobile: compact horizontal strip so the hero stays dominant */}
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {SEASONAL_CTAS.map((item) => (
          <Link
            className="group relative w-[min(42vw,11.5rem)] shrink-0 overflow-hidden rounded-xl border border-[#e8d9c8] bg-[#fffaf4] shadow-sm transition hover:border-[#d6c4ad] hover:shadow-md sm:w-auto sm:max-w-none sm:rounded-2xl"
            href={item.href}
            key={item.title}
          >
            {'comingSoon' in item && item.comingSoon ? (
              <span className="absolute right-2 top-2 z-10 rounded-full bg-[#7f5700]/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Soon
              </span>
            ) : null}
            <div className="aspect-[5/4] overflow-hidden bg-[#f4ede4] sm:aspect-[4/3]">
              <img
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={item.image}
              />
            </div>
            <div className="p-2.5 sm:p-5">
              <h3
                className="font-heading text-sm font-semibold sm:text-lg"
                style={{ color: item.accent }}
              >
                {item.title}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#514534] sm:mt-1 sm:line-clamp-none sm:text-sm sm:leading-normal">
                {item.description}
              </p>
              <span className="mt-1.5 inline-block text-[11px] font-semibold text-[#7f5700] group-hover:underline sm:mt-3 sm:text-sm">
                {'comingSoon' in item && item.comingSoon ? 'Coming soon →' : 'Explore →'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
