import crypto from 'crypto'
import { CertificateDoc, getExpectedPin } from './certificates-config'

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes
const TOKEN_VALIDITY_MS = 30 * 60 * 1000 // 30 minutes viewing session
const AUTH_SECRET = process.env.CERT_AUTH_SECRET || 'bharatmart-internal-confidential-cert-key-2026'

interface RateLimitRecord {
  failedAttempts: number
  lockedUntil: number | null
  lastAttemptAt: number
}

// In-memory rate limiting map keyed by `${clientIp}:${docId}`
const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodic cleanup of stale rate-limit entries (older than 1 hour)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.lastAttemptAt > 60 * 60 * 1000) {
        rateLimitStore.delete(key)
      }
    }
  }, 10 * 60 * 1000).unref?.()
}

export interface VerifyPinResult {
  success: boolean
  token?: string
  error?: string
  remainingAttempts?: number
  lockoutRemainingSeconds?: number
}

export function checkRateLimit(clientIp: string, docId: string): { isLocked: boolean; lockoutRemainingSeconds: number; remainingAttempts: number } {
  const key = `${clientIp}:${docId}`
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record) {
    return { isLocked: false, lockoutRemainingSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS }
  }

  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000)
    return { isLocked: true, lockoutRemainingSeconds: remainingSeconds, remainingAttempts: 0 }
  }

  // If lockout expired, reset
  if (record.lockedUntil && record.lockedUntil <= now) {
    rateLimitStore.delete(key)
    return { isLocked: false, lockoutRemainingSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS }
  }

  const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - record.failedAttempts)
  return { isLocked: false, lockoutRemainingSeconds: 0, remainingAttempts: remaining }
}

export function recordFailedAttempt(clientIp: string, docId: string): { isLocked: boolean; lockoutRemainingSeconds: number; remainingAttempts: number } {
  const key = `${clientIp}:${docId}`
  const now = Date.now()
  let record = rateLimitStore.get(key)

  if (!record) {
    record = { failedAttempts: 1, lockedUntil: null, lastAttemptAt: now }
  } else {
    record.failedAttempts += 1
    record.lastAttemptAt = now
  }

  if (record.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS
    rateLimitStore.set(key, record)
    return {
      isLocked: true,
      lockoutRemainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      remainingAttempts: 0,
    }
  }

  rateLimitStore.set(key, record)
  const remaining = MAX_FAILED_ATTEMPTS - record.failedAttempts
  return {
    isLocked: false,
    lockoutRemainingSeconds: 0,
    remainingAttempts: remaining,
  }
}

export function resetRateLimit(clientIp: string, docId: string) {
  const key = `${clientIp}:${docId}`
  rateLimitStore.delete(key)
}

function safeEqualString(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export function createViewingToken(docId: string): string {
  const now = Date.now()
  const payload = {
    docId,
    exp: now + TOKEN_VALIDITY_MS,
    iat: now,
    nonce: crypto.randomBytes(16).toString('hex'),
  }

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(payloadB64).digest('base64url')
  return `${payloadB64}.${signature}`
}

export function verifyViewingToken(token: string, docId: string): boolean {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const payloadB64 = parts[0]
  const signature = parts[1]
  if (!payloadB64 || !signature) return false

  const expectedSig = crypto.createHmac('sha256', AUTH_SECRET).update(payloadB64).digest('base64url')
  if (!safeEqualString(signature, expectedSig)) {
    return false
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
    if (!payload || typeof payload !== 'object') return false
    if (payload.docId !== docId) {
      const isAccountsMatch =
        (payload.docId === 'account-statements' && docId === 'accounts-certificate') ||
        (payload.docId === 'accounts-certificate' && docId === 'account-statements')
      if (!isAccountsMatch) return false
    }
    if (!payload.exp || typeof payload.exp !== 'number') return false
    if (Date.now() > payload.exp) return false
    return true
  } catch {
    return false
  }
}

export function verifyPin(doc: CertificateDoc, submittedPin: string, clientIp: string): VerifyPinResult {
  const limit = checkRateLimit(clientIp, doc.id)
  if (limit.isLocked) {
    return {
      success: false,
      error: `Too many failed attempts. Access is locked for ${limit.lockoutRemainingSeconds} seconds.`,
      lockoutRemainingSeconds: limit.lockoutRemainingSeconds,
      remainingAttempts: 0,
    }
  }

  const cleanPin = (submittedPin || '').trim()
  if (!/^\d{8}$/.test(cleanPin)) {
    const failed = recordFailedAttempt(clientIp, doc.id)
    return {
      success: false,
      error: `Please enter a valid 8-digit numeric PIN.`,
      remainingAttempts: failed.remainingAttempts,
      lockoutRemainingSeconds: failed.lockoutRemainingSeconds,
    }
  }

  const expectedPin = getExpectedPin(doc)
  const isMatch = safeEqualString(cleanPin, expectedPin)

  if (!isMatch) {
    const failed = recordFailedAttempt(clientIp, doc.id)
    if (failed.isLocked) {
      return {
        success: false,
        error: `Security lockout activated. You have exceeded maximum failed attempts. Please wait 15 minutes.`,
        lockoutRemainingSeconds: failed.lockoutRemainingSeconds,
        remainingAttempts: 0,
      }
    }
    return {
      success: false,
      error: `Incorrect 8-digit PIN. ${failed.remainingAttempts} attempt(s) remaining before security lockout.`,
      remainingAttempts: failed.remainingAttempts,
      lockoutRemainingSeconds: 0,
    }
  }

  // Success: Clear failed attempts and generate short-lived signed viewing token
  resetRateLimit(clientIp, doc.id)
  const token = createViewingToken(doc.id)
  return {
    success: true,
    token,
  }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim()
    if (firstIp) return firstIp
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return '127.0.0.1'
}
