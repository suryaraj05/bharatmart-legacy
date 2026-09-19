import Link from 'next/link'
import {
  BrainCircuit,
  Building2,
  Code2,
  Lightbulb,
  LineChart,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@bharatmart/ui'
import { CONTACT_EMAIL_HREF, getWhatsAppSupportUrl } from '@/lib/contact'

export const metadata = {
  title: 'AI & Technology Consultation',
  description:
    'Access professional Indian AI and software experts for your UK business at a fraction of typical market rates — without travelling or setting up offshore.',
}

const services = [
  {
    title: 'Web & Mobile App Development or Modernisation',
    body: 'Build new products or bring legacy apps up to modern standards — cleanly, quickly, and maintainably.',
    icon: Code2,
  },
  {
    title: 'AI Transformation',
    body: 'Practical AI that fits your workflows: automation, assistants, data insights, and smarter customer experiences.',
    icon: BrainCircuit,
  },
  {
    title: 'Technology Transformation Advice',
    body: 'Clear guidance on what to upgrade, what to keep, and how to sequence change without disrupting the business.',
    icon: Lightbulb,
  },
  {
    title: 'Business Strategy',
    body: 'Align technology choices with growth goals so spend goes where it actually moves the needle.',
    icon: LineChart,
  },
  {
    title: 'ERP',
    body: 'Select, implement, or refine ERP systems so operations, finance, and inventory stay in sync.',
    icon: Building2,
  },
] as const

export default function AiConsultationPage() {
  const whatsappUrl = getWhatsAppSupportUrl(
    'Hi BharatMart — I would like to talk about AI and Technology Consultation for my business.',
  )

  return (
    <main>
      <section className="relative overflow-hidden bg-[#1a1208]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,163,23,0.22),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,54,53,0.28),_transparent_50%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#FFD700]">
            Bharat Mart Technology
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-semibold text-white md:text-5xl md:leading-tight">
            AI and Technology Consultation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            Get professional Indian AI and software experts for your business — for about a
            quarter of typical market rates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 bg-[#e8a317] px-6 font-semibold text-[#5b3d00] hover:bg-[#ffdeae]"
            >
              <a href={whatsappUrl} rel="noreferrer" target="_blank">
                <MessageCircle className="mr-2 h-4 w-4" />
                Talk to us on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className="h-11 border-white/40 bg-white/10 px-6 font-semibold text-white hover:bg-white/20"
              variant="outline"
            >
              <a href={CONTACT_EMAIL_HREF}>Email the team</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <h2 className="font-heading text-2xl font-semibold text-[#1e1b16] md:text-3xl">
          Why this exists
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-[#514534]">
          <p>
            Software and technology services in the UK are expensive. That is why so many
            companies open outsourcing bases in India — to lower technology spend while still
            hiring skilled professionals.
          </p>
          <p>
            We do the same work for you while you stay in the UK. You do not need to travel, and
            you do not need to set up a company in India. We connect your business with Indian AI
            and engineering talent so you can upgrade systems, modernise products, and move faster —
            on a leaner budget and on a quicker timeline.
          </p>
          <p>
            In short: we build the bridge between UK businesses and high-quality Indian technology
            capability, without the usual cost or complexity.
          </p>
        </div>
      </section>

      <section className="border-y border-[#e8d9c8] bg-[#fffaf4]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16">
          <h2 className="font-heading text-2xl font-semibold text-[#1e1b16] md:text-3xl">
            Services
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#514534] md:text-base">
            Practical support across product, AI, and operations — scoped to what your business
            actually needs.
          </p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, body, icon: Icon }) => (
              <li key={title}>
                <Icon aria-hidden className="h-6 w-6 text-[#7f5700]" />
                <h3 className="mt-3 font-heading text-lg font-semibold text-[#1e1b16]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#514534]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <blockquote className="max-w-3xl border-l-4 border-[#7f5700] pl-6">
          <p className="text-lg leading-8 text-[#514534] md:text-xl">
            Technology should help a business grow — not drain its budget. Our job is to make
            serious AI and software capability reachable for UK teams that want quality without the
            full UK price tag.
          </p>
          <footer className="mt-5 text-sm text-[#1e1b16]">
            <p className="font-semibold">Uday K</p>
            <p className="text-[#514534]">Cofounder, Head of Technology · Bharat Mart</p>
          </footer>
        </blockquote>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="h-11 bg-[#a83635] px-6 text-white hover:bg-[#8f2e2d]">
            <a href={whatsappUrl} rel="noreferrer" target="_blank">
              Start a conversation
            </a>
          </Button>
          <Button
            asChild
            className="h-11 border-[#d6c4ad] bg-transparent px-6 text-[#7f5700] hover:bg-[#f4ede4]"
            variant="outline"
          >
            <Link href="/contact">Contact page</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
