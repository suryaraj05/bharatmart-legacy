function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

const fallbackWhatsApp = '447901241275'

export function getWhatsAppSupportNumber() {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER?.trim()
  return fromEnv && fromEnv.length > 0 ? fromEnv : `+${fallbackWhatsApp}`
}

export function getWhatsAppSupportUrl(message?: string) {
  const digits = digitsOnly(getWhatsAppSupportNumber()) || fallbackWhatsApp
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_NUMBER = getWhatsAppSupportNumber()
export const WHATSAPP_URL = getWhatsAppSupportUrl()
export const INSTAGRAM_URL = 'https://www.instagram.com/bharatmart_uk'
export const CONTACT_EMAIL = 'info@bharatmart.uk'
export const CONTACT_EMAIL_HREF = 'mailto:info@bharatmart.uk'

/** Prefills subject/body where a mail client is available. */
export function getContactMailtoHref(options?: { subject?: string; body?: string }) {
  const params = new URLSearchParams()
  if (options?.subject) params.set('subject', options.subject)
  if (options?.body) params.set('body', options.body)
  const query = params.toString()
  return query ? `${CONTACT_EMAIL_HREF}?${query}` : CONTACT_EMAIL_HREF
}
