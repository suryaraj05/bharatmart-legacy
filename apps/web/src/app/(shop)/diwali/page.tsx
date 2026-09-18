import type { Metadata } from 'next'
import Link from 'next/link'
import { DiwaliEnquiryForm } from '@/components/seasonal/DiwaliEnquiryForm'
import { WHATSAPP_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Diwali Collection - Festival Essentials | BharatMart UK',
  description:
    'Shop authentic Diwali essentials - diyas, pooja kits, rangoli materials, and festive decor delivered across the UK.',
}

/** Legacy Diwali catalogue (ported from bharatmart.uk/diwali.html). */
const catalogue = [
  {
    title: 'Diwali Pooja Kit',
    image: '/seasonal/diwali/navratri-03.jpg',
    description: 'Festive décor essentials to set the mood for Diwali at home.',
  },
  {
    title: 'Diwali Pooja Kit',
    image: '/seasonal/diwali/diwali-pooja-kit-new.jpg',
    description: 'Curated pooja essentials for a complete Diwali ritual at home.',
  },
  {
    title: 'Diwali Rangoli Kit',
    image: '/seasonal/diwali/diwali-rangoli-kit.jpg',
    description: 'Vibrant colours and traditional patterns for festive doorways.',
  },
  {
    title: 'Diwali Special Stencils',
    image: '/seasonal/diwali/stencils-diwali-kit.jpg',
    description: 'Easy stencils for beautiful rangoli designs every time.',
  },
  {
    title: 'Golden Diyas',
    image: '/seasonal/diwali/navratri-05.jpg',
    description: 'Eco-friendly golden diyas to light up your celebration.',
  },
  {
    title: 'Premium Diyas',
    image: '/seasonal/diwali/navratri-06.jpg',
    description: 'Premium diya set for temple and home rituals.',
  },
  {
    title: 'Decorative Diyas',
    image: '/seasonal/diwali/navratri-07.jpg',
    description: 'Decorative diyas for festive tables and rangoli displays.',
  },
  {
    title: 'Decorative Diyas Big Pack',
    image: '/seasonal/diwali/navratri-08.jpg',
    description: 'Larger pack of decorative diyas for bigger gatherings.',
  },
] as const

export default function DiwaliPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#1a1208]">
        <img
          alt="Diwali celebrations with friends lighting diyas"
          className="absolute inset-0 h-full w-full object-cover object-left"
          src="/seasonal/diwali/banner_2.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/55 to-black/85" />
        <div className="relative mx-auto flex min-h-[280px] max-w-7xl items-end px-4 py-10 md:min-h-[360px] md:px-8 md:py-14 lg:px-16">
          <div className="max-w-lg text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#FFD700]">
              Festival of Lights
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold md:text-4xl">
              Diwali Collection
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
              From elegant diyas and traditional pooja kits to vibrant rangoli and festive decor -
              celebrate Diwali authentically across the UK.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex h-10 items-center rounded-full bg-[#a83635] px-5 text-sm font-semibold text-white hover:bg-[#8f2e2d]"
                href={WHATSAPP_URL}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp us
              </a>
              <Link
                className="inline-flex h-10 items-center rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                href="/products?category=rakhi"
              >
                Shop Rakhi too
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-16">
        <section>
          <h2 className="font-heading text-xl font-semibold text-[#1e1b16]">Diwali catalogue</h2>
          <p className="mt-1 text-sm text-[#514534]">
            Browse our classic Diwali essentials — diyas, kits and décor. Message us to order.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {catalogue.map((item, index) => (
              <article
                className="overflow-hidden rounded-2xl border border-[#e8d9c8] bg-[#fffaf4]"
                key={`${item.title}-${index}`}
              >
                <img alt={item.title} className="aspect-square w-full object-cover" src={item.image} />
                <div className="p-4">
                  <h3 className="font-semibold text-[#E65100]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#514534]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-[#e8d9c8] bg-[#fff8f0] p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-[#1e1b16]">Enquire about Diwali</h2>
          <p className="mt-1 text-sm text-[#514534]">
            Tell us what you need - we will help with kits, quantities and UK delivery.
          </p>
          <div className="mt-6">
            <DiwaliEnquiryForm />
          </div>
        </section>
      </div>
    </main>
  )
}
