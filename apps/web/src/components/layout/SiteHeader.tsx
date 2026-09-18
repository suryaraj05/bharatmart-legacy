import Link from 'next/link'
import { AuthService } from '@bharatmart/services'
import { CartLink } from '@/components/cart/CartLink'
import { CategoriesNav } from '@/components/layout/CategoriesNav'
import { HeaderAuthNav } from '@/components/layout/HeaderAuthNav'
import { HeaderLinks } from '@/components/layout/HeaderLinks'
import { MobileNav } from '@/components/layout/MobileNav'
import { WishlistLink } from '@/components/wishlist/WishlistLink'
import { LocationChip } from '@/components/location/LocationChip'
import { BecomeSellerButton } from '@/components/layout/BecomeSellerButton'
import { getCurrentUser } from '@/auth'
import type { CustomerLocation } from '@/lib/customer-location-types'

export async function SiteHeader({ location }: { location?: CustomerLocation }) {
  const user = await getCurrentUser()
  const profile = user ? await AuthService.getProfile(user.id) : null

  return (
    <header className="sticky top-0 z-50 isolate w-full overflow-x-clip border-b border-black/5 bg-[#fff8f0] shadow-[0_4px_12px_rgba(0,0,0,0.04)] [background-color:#fff8f0]">
      <div className="flex h-14 w-full items-center justify-between gap-1 pl-2 pr-1.5 sm:gap-2 sm:px-3 md:h-20 md:gap-3 md:px-4 lg:px-5">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <MobileNav isSignedIn={Boolean(user)} />
          <Link className="flex min-w-0 shrink items-center justify-center bg-transparent" href="/">
            <img
              alt="BharatMart"
              src="/bharatmart-logo.png"
              className="block h-9 w-auto max-w-[120px] bg-transparent object-contain sm:h-11 sm:max-w-[132px] md:h-14 md:max-w-[160px]"
              width={217}
              height={98}
            />
          </Link>
          <CategoriesNav />
          <HeaderLinks />
          {location ? <LocationChip location={location} /> : null}
        </div>

        <nav className="flex shrink-0 items-center gap-0 sm:gap-1 md:gap-2">
          {/* Favourites stay in the mobile menu; keep icon from md up */}
          <div className="hidden md:block">
            <WishlistLink />
          </div>
          <CartLink />
          {/* Auth CTAs live in the hamburger on small screens */}
          <div className="hidden md:block">
            <HeaderAuthNav displayName={profile?.name ?? null} isSignedIn={Boolean(user)} />
          </div>
          {!user ? <BecomeSellerButton className="ml-1 hidden lg:inline-flex" /> : null}
        </nav>
      </div>
    </header>
  )
}
