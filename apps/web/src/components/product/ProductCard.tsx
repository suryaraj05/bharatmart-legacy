import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge, Card, CardContent } from '@bharatmart/ui'
import type { ProductSummary } from '@bharatmart/services'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { FavoriteButton } from '@/components/product/FavoriteButton'
import { shouldHideListedPrice } from '@/lib/product-pricing'

const priceFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

export function ProductCard({ product }: { product: ProductSummary }) {
  const hidePrice = shouldHideListedPrice(product.categorySlug)

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-[#d6c4ad] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(46,21,21,0.08)]">
      <div className="relative aspect-square overflow-hidden bg-[#f9f3ea]">
        <Link
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block"
          href={`/products/${product.slug}`}
        >
          {product.imageUrl ? (
            <Image
              alt={product.name}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              src={product.imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#837561]">
              Image coming soon
            </div>
          )}
        </Link>
        <FavoriteButton
          className="absolute right-2 top-2 z-10 scale-90 sm:right-3 sm:top-3 sm:scale-100"
          item={{
            productId: product.id,
            slug: product.slug,
            name: product.name,
            imageUrl: product.imageUrl,
            priceInPence: product.priceInPence,
            stockQuantity: product.stockQuantity,
            merchantId: product.merchantId,
            merchantName: product.merchantName,
            categorySlug: product.categorySlug,
          }}
        />
        {product.reviewCount > 0 ? (
          <Badge className="absolute bottom-2 left-2 border-0 bg-white/90 text-[10px] text-[#514534] sm:bottom-3 sm:left-3 sm:text-xs">
            <Star className="mr-1 h-3 w-3 fill-[#e8a317] text-[#e8a317]" />
            {product.avgRating.toFixed(1)}
          </Badge>
        ) : null}
      </div>
      <CardContent className="flex flex-1 flex-col p-2.5 sm:p-4">
        <p className="mb-0.5 truncate text-[10px] text-[#837561] sm:mb-1 sm:text-xs">
          {product.merchantName}
        </p>
        <Link className="min-h-0 flex-1" href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1e1b16] hover:text-[#7f5700] sm:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-col gap-1.5 sm:mt-3">
          {hidePrice ? (
            <span className="text-xs font-medium text-[#837561] sm:text-sm">On request</span>
          ) : (
            <span className="text-sm font-bold text-[#a83635] sm:text-base">
              {priceFormatter.format(product.priceInPence / 100)}
            </span>
          )}
          <AddToCartButton
            className="h-8 w-full bg-[#2e6a39] px-2 text-[11px] text-white hover:bg-[#135224] sm:h-9 sm:text-sm"
            item={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: product.imageUrl,
              priceInPence: product.priceInPence,
              stockQuantity: product.stockQuantity,
              merchantId: product.merchantId,
              merchantName: product.merchantName,
              categorySlug: product.categorySlug,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
