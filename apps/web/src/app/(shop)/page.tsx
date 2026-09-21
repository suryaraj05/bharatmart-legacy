import { BannerService } from '@bharatmart/services'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { SeasonalCtaGrid } from '@/components/home/SeasonalCtaGrid'
import { TechConsultationStrip } from '@/components/home/TechConsultationStrip'
import { TrustStrip } from '@/components/home/TrustStrip'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let banners: Awaited<ReturnType<typeof BannerService.getActiveBanners>> = []
  try {
    banners = await BannerService.getActiveBanners()
  } catch (error) {
    console.error('[home] Failed to load banners', error)
  }

  return (
    <main>
      {banners.length > 0 ? <HeroCarousel banners={banners} /> : null}
      <SeasonalCtaGrid />
      <TechConsultationStrip />
      <TrustStrip />
    </main>
  )
}
