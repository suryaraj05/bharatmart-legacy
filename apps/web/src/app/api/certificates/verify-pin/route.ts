import { NextRequest, NextResponse } from 'next/server'
import { getCertificateDoc } from '@/lib/certificates-config'
import { checkRateLimit, getClientIp, verifyPin } from '@/lib/certificates-security'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { docId, pin } = body

    if (!docId || typeof docId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Document identifier is required' },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
      )
    }

    const doc = getCertificateDoc(docId)
    if (!doc) {
      return NextResponse.json(
        { success: false, error: 'Requested confidential document does not exist' },
        { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
      )
    }

    const clientIp = getClientIp(req)
    const result = verifyPin(doc, pin, clientIp)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          remainingAttempts: result.remainingAttempts,
          lockoutRemainingSeconds: result.lockoutRemainingSeconds,
        },
        {
          status: result.lockoutRemainingSeconds ? 429 : 401,
          headers: {
            'X-Robots-Tag': 'noindex, nofollow, noarchive',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      )
    }

    const response = NextResponse.json(
      {
        success: true,
        token: result.token,
        doc: {
          id: doc.id,
          title: doc.title,
          subtitle: doc.subtitle,
          legalReference: doc.legalReference,
          pageCount: doc.pageCount,
          hasSubItems: doc.hasSubItems,
          subItems: doc.subItems,
        },
      },
      {
        status: 200,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )

    // Set HTTP-only secure cookie for seamless multi-page fetching
    if (result.token) {
      response.cookies.set(`cert_session_${doc.id}`, result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 60, // 30 minutes
      })
    }

    return response
  } catch (err: unknown) {
    console.error('Error in verify-pin API:', err)
    return NextResponse.json(
      { success: false, error: 'Internal security authentication error' },
      { status: 500, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    )
  }
}

// GET endpoint to check current rate-limit / lockout status
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const docId = searchParams.get('docId')

  if (!docId) {
    return NextResponse.json({ error: 'Missing docId' }, { status: 400 })
  }

  const clientIp = getClientIp(req)
  const status = checkRateLimit(clientIp, docId)

  return NextResponse.json(status, {
    headers: {
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
