export type MarketingNavChild = {
  label: string
  href: string
  comingSoon?: boolean
}

export type MarketingNavItem = {
  label: string
  href?: string
  comingSoon?: boolean
  children?: MarketingNavChild[]
}

/** Primary header links (legacy Bharatmart nav). */
export const HEADER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'AI & Tech', href: '/ai-consultation' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
] as const

/** Static marketing category tree for the seasonal storefront. */
export const MARKETING_NAV: MarketingNavItem[] = [
  {
    label: 'Festive Collections',
    children: [
      { label: 'Diwali', href: '/diwali' },
      { label: 'Rakhi', href: '/products?category=rakhi' },
      { label: 'Ganesh', href: '/products?category=ganesh' },
    ],
  },
  {
    label: 'Seasonal Stuff',
    children: [{ label: 'Mangoes', href: '/mangoes' }],
  },
  {
    label: 'AI and Technology Consultation',
    href: '/ai-consultation',
  },
  { label: 'Homemade Foods', comingSoon: true },
  { label: 'Indian Clothing', comingSoon: true },
  { label: 'Indian Groceries', comingSoon: true },
  { label: 'Rice', comingSoon: true },
  { label: 'Organic Store', comingSoon: true },
  { label: 'Ayurveda', comingSoon: true },
]

export const SEASONAL_CTAS = [
  {
    title: 'Diwali',
    description: 'Diyas, pooja kits, rangoli and festive decor for the Festival of Lights.',
    href: '/diwali',
    image: '/seasonal/diwali/banner_2.png',
    accent: '#B3472C',
  },
  {
    title: 'Rakhi',
    description: 'Authentic rakhis and gift sets for Raksha Bandhan.',
    href: '/products?category=rakhi',
    image: '/seasonal/rakhi/rakhi_hot_selling.jpeg',
    accent: '#C2185B',
  },
  {
    title: 'Ganesh',
    description: 'Previous-year Ganesh idols - currently out of stock.',
    href: '/products?category=ganesh',
    image: '/gallery/01.jpg',
    accent: '#6A1B9A',
  },
  {
    title: 'Mangoes',
    description: '2026 sold out for customers - 2027 distributors welcome.',
    href: '/mangoes',
    image: '/seasonal/mangoes/bharatmart_booking_form_mangoes.jpeg',
    accent: '#F9A825',
  },
] as const
