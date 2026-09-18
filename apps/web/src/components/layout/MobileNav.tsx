'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Heart, Home, Menu, Package, ShoppingCart, UserCircle } from 'lucide-react'
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@bharatmart/ui'
import { cn } from '@bharatmart/utils'
import { HEADER_LINKS, MARKETING_NAV } from '@/lib/marketing-nav'
import { BecomeSellerButton } from '@/components/layout/BecomeSellerButton'

const baseLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products?category=rakhi', label: 'Rakhi shop', icon: Package },
  { href: '/wishlist', label: 'Favourites', icon: Heart },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
] as const

export function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const links = baseLinks

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation"
          className="h-9 w-9 shrink-0 md:hidden"
          size="icon"
          variant="ghost"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[280px] border-[#d6c4ad] bg-[#fff8f0] p-0" side="left">
        <SheetHeader className="border-b border-[#d6c4ad] px-6 py-5 text-left">
          <SheetTitle className="font-heading text-xl text-[#7f5700]">Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-col px-3 py-4">
          {links.map(({ href, label, icon: Icon }) => {
            const pathOnly = href.split('?')[0] ?? href
            const active = href === '/' ? pathname === '/' : pathname === pathOnly
            return (
              <Link
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition',
                  active
                    ? 'bg-[#f4ede4] text-[#7f5700]'
                    : 'text-[#514534] hover:bg-[#f4ede4] hover:text-[#7f5700]',
                )}
                href={href}
                key={href}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}

          <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#837561]">
            Categories
          </p>
          {MARKETING_NAV.map((item) => {
            if (item.comingSoon && !item.children?.length) {
              return (
                <span
                  className="flex items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm text-[#837561]"
                  key={item.label}
                >
                  {item.label}
                  <span className="text-[10px] font-semibold uppercase text-[#a83635]">Soon</span>
                </span>
              )
            }

            if (item.children?.length) {
              const isOpen = expanded === item.label
              return (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-[#514534] transition hover:bg-[#f4ede4]"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 transition', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen
                    ? item.children.map((child) =>
                        child.comingSoon ? (
                          <span
                            className="flex items-center justify-between py-2 pl-6 pr-3 text-sm text-[#837561]"
                            key={child.label}
                          >
                            {child.label}
                            <span className="text-[10px] font-semibold uppercase text-[#a83635]">
                              Soon
                            </span>
                          </span>
                        ) : (
                          <Link
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm text-[#514534] transition hover:bg-[#f4ede4] hover:text-[#7f5700]"
                            href={child.href}
                            key={child.label}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ),
                      )
                    : null}
                </div>
              )
            }

            return item.href ? (
              <Link
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#514534] transition hover:bg-[#f4ede4] hover:text-[#7f5700]"
                href={item.href}
                key={item.label}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : null
          })}

          <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#837561]">
            Company
          </p>
          {HEADER_LINKS.filter((link) => link.href !== '/').map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium transition',
                  active
                    ? 'bg-[#f4ede4] text-[#7f5700]'
                    : 'text-[#514534] hover:bg-[#f4ede4] hover:text-[#7f5700]',
                )}
                href={href}
                key={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            )
          })}

          <div className="my-3 border-t border-[#d6c4ad]" />
          {isSignedIn ? (
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#514534] transition hover:bg-[#f4ede4] hover:text-[#7f5700]"
              href="/account"
              onClick={() => setOpen(false)}
            >
              <UserCircle className="h-4 w-4" />
              My account
            </Link>
          ) : (
            <>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#514534] transition hover:bg-[#f4ede4] hover:text-[#7f5700]"
                href="/login"
                onClick={() => setOpen(false)}
              >
                <UserCircle className="h-4 w-4" />
                Sign in
              </Link>
              <Link
                className="mt-2 flex items-center justify-center rounded-lg bg-[#7f5700] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#604100]"
                href="/register"
                onClick={() => setOpen(false)}
              >
                Sign up
              </Link>
              <div className="mt-4 px-3">
                <BecomeSellerButton className="w-full" onOpen={() => setOpen(false)} />
              </div>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
