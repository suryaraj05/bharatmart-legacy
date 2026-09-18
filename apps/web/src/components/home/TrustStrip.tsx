import { LockKeyhole, ShieldCheck, Truck } from 'lucide-react'
import { Card } from '@bharatmart/ui'

const benefits = [
  [ShieldCheck, 'Verified Merchants', 'Direct from trusted Indian brands.'],
  [Truck, 'UK-Wide Delivery', 'Express delivery to your doorstep.'],
  [LockKeyhole, 'Secure Checkout', 'Safe and protected online payments.'],
] as const

export function TrustStrip() {
  return (
    <section
      aria-label="Why shop with BharatMart"
      className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-12 lg:px-16"
    >
      <div className="grid gap-3 border-y border-[#d6c4ad] py-5 md:gap-5 md:py-8 md:grid-cols-3">
        {benefits.map(([Icon, title, description]) => (
          <div className="flex items-center gap-3 md:gap-4" key={title}>
            <Card className="flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-[#f4ede4] shadow-none md:h-14 md:w-14">
              <Icon className="h-5 w-5 text-[#7f5700] md:h-7 md:w-7" />
            </Card>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold leading-tight md:text-base">{title}</h2>
              <p className="mt-0.5 text-xs leading-snug text-[#514534] md:text-sm md:leading-normal">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
