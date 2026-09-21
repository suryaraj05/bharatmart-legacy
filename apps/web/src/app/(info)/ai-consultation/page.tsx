import Link from 'next/link'
import {
  BrainCircuit,
  Building2,
  Code2,
  Lightbulb,
  LineChart,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@bharatmart/ui'
import {
  CONTACT_EMAIL,
  getContactMailtoHref,
  getWhatsAppSupportUrl,
} from '@/lib/contact'

export const metadata = {
  title: 'AI & Technology Consultation',
  description:
    'Access professional Indian AI and software experts for your UK business at a fraction of typical market rates, without travelling or setting up offshore.',
}

const services = [
  {
    title: 'Web & Mobile App Development or Modernisation',
    body: 'Build new products or bring older apps up to modern standards - cleanly, quickly, and easy to maintain.',
    icon: Code2,
  },
  {
    title: 'AI Transformation',
    body: 'Useful AI fitted to your day-to-day work: automation, assistants, data insights, and better customer experiences.',
    icon: BrainCircuit,
  },
  {
    title: 'Technology Transformation Advice',
    body: 'Straightforward guidance on what to upgrade, what to keep, and how to change systems without stopping the business.',
    icon: Lightbulb,
  },
  {
    title: 'Business Strategy',
    body: 'Match technology choices to growth goals so money goes where it helps the business most.',
    icon: LineChart,
  },
  {
    title: 'ERP',
    body: 'Choose, implement, or improve ERP systems so operations, finance, and inventory stay aligned.',
    icon: Building2,
  },
] as const

export default function AiConsultationPage() {
  const whatsappUrl = getWhatsAppSupportUrl(
    'Hi BharatMart - I would like to talk about AI and Technology Consultation for my business.',
  )
  const mailtoUrl = getContactMailtoHref({
    subject: 'AI and Technology Consultation',
    body: 'Hi Bharat Mart team,\n\nI would like to discuss AI and Technology Consultation for my business.\n\n',
  })

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          alt="Modern office overlooking a city skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          src="/seasonal/tech/consultation-banner.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208]/90 via-[#1a1208]/70 to-[#1a1208]/25" />
        <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-end px-4 py-12 md:min-h-[420px] md:px-8 md:py-16 lg:px-16">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFD700]">
              Bharat Mart Technology
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight md:text-5xl">
              AI and Technology Consultation
            </h1>
            <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">
              Get professional Indian AI and software experts for your business, for about a
              quarter of typical market rates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 bg-[#e8a317] px-6 font-semibold text-[#5b3d00] hover:bg-[#ffdeae]"
              >
                <a href={whatsappUrl} rel="noreferrer" target="_blank">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Talk on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                className="h-11 border-white/35 bg-white/10 px-6 font-semibold text-white backdrop-blur hover:bg-white/20"
                variant="outline"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Email the team
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/75">
              Or write directly to{' '}
              <a className="font-semibold text-[#FFD700] underline underline-offset-2" href={mailtoUrl}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f0] px-4 py-14 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:gap-16">
          <div>
            <h2 className="border-l-4 border-[#7f5700] pl-5 font-heading text-2xl font-semibold text-[#a83635] md:text-3xl">
              Why this exists
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[#514534]">
              <p>
                Software and technology services in the UK are expensive. That is why so many
                companies open outsourcing bases in India - to lower technology spend while still
                hiring skilled professionals.
              </p>
              <p>
                We do the same work for you while you stay in the UK. You do not need to travel,
                and you do not need to set up a company in India. We connect your business with
                Indian AI and engineering talent so you can upgrade systems, modernise products,
                and move faster - on a smaller budget and a quicker timeline.
              </p>
              <p>
                We build the bridge between UK businesses and strong Indian technology teams,
                without the usual cost or complexity.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#e8d9c8] bg-white p-7 shadow-[0_4px_16px_rgba(46,21,21,0.05)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7f5700]">The offer</p>
            <p className="mt-3 font-heading text-4xl font-semibold text-[#a83635] md:text-5xl">
              ~1/4
            </p>
            <p className="mt-2 text-sm font-medium text-[#1e1b16]">of typical UK market rates</p>
            <p className="mt-4 text-sm leading-6 text-[#514534]">
              Same quality of Indian AI and software expertise. No travel. No India company setup.
              Faster delivery on a tighter budget.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#514534]">
              <li className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a317]" />
                Stay based in the UK
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a317]" />
                Work with vetted Indian specialists
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a317]" />
                Scope what you need - nothing extra
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[#f9f3ea] px-4 py-14 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold text-[#1e1b16] md:text-3xl">
              Services
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-[#7f5700]" />
            <p className="mt-4 text-sm leading-6 text-[#514534] md:text-base">
              Practical help across product, AI, and operations - shaped around what your business
              actually needs.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, body, icon: Icon }, index) => (
              <li
                className="group rounded-2xl border border-[#e8d9c8] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d6c4ad] hover:shadow-[0_12px_28px_rgba(46,21,21,0.08)] md:p-7"
                key={title}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4ede4] text-[#7f5700] transition group-hover:bg-[#ffdeae]/70">
                    <Icon aria-hidden className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-sm font-semibold text-[#d6c4ad]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#1e1b16]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#514534]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#fff8f0] px-4 py-14 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#e8d9c8] bg-white p-7 md:p-10">
            <blockquote className="max-w-3xl">
              <p className="text-lg leading-8 text-[#514534] md:text-xl md:leading-9">
                Technology should help a business grow, not drain its budget. Our job is to make
                serious AI and software capability reachable for UK teams that want quality without
                the full UK price tag.
              </p>
            </blockquote>
            <div className="mt-8 flex items-center gap-4 border-t border-[#f0e6da] pt-6">
              <div
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a83635] font-heading text-sm font-semibold text-white"
              >
                U
              </div>
              <div>
                <p className="font-semibold text-[#1e1b16]">Uday K</p>
                <p className="text-sm text-[#514534]">
                  Cofounder, Head of Technology · Bharat Mart
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#a83635] px-4 py-16 text-white md:px-8 md:py-20 lg:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-[#ffdeae]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full border-8 border-[#ffdeae]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Ready to talk?</h2>
          <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">
            Tell us what you are building or fixing. We will come back with a clear next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              className="h-12 bg-[#e8a317] px-8 text-base font-semibold text-[#5b3d00] hover:bg-[#ffdeae]"
            >
              <a href={whatsappUrl} rel="noreferrer" target="_blank">
                Start a conversation
              </a>
            </Button>
            <Button
              asChild
              className="h-12 border-2 border-[#e8a317] bg-transparent px-8 text-base font-semibold text-[#e8a317] hover:bg-[#e8a317]/10"
              variant="outline"
            >
              <Link href="/contact">Contact page</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
