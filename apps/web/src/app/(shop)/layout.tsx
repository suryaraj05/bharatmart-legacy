import { SiteHeader } from '@/components/layout/SiteHeader'
import { ConditionalSiteFooter } from '@/components/layout/ConditionalSiteFooter'
import { ConditionalWhatsAppFloat } from '@/components/layout/ConditionalWhatsAppFloat'
import { DemoCartHydrator } from '@/components/cart/DemoCartHydrator'
import { PendingActionHydrator } from '@/components/cart/PendingActionHydrator'
import { PostcodeBanner } from '@/components/location/PostcodeBanner'
import { getCustomerLocation } from '@/lib/customer-location'
import { getCurrentUser } from '@/auth'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const location = await getCustomerLocation(user?.id)

  // Postcode popup temporarily hidden; banner still offers optional postcode entry.
  const showBanner = location.status !== 'set'

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#fff8f0] text-[#1e1b16]">
      <DemoCartHydrator />
      <PendingActionHydrator />
      <SiteHeader location={location} />
      {showBanner ? <PostcodeBanner location={location} /> : null}
      {children}
      <ConditionalSiteFooter />
      <ConditionalWhatsAppFloat />
    </div>
  )
}
