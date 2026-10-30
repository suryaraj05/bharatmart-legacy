import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getCertificateDoc } from '@/lib/certificates-config'
import { verifyViewingToken } from '@/lib/certificates-security'

export const dynamic = 'force-dynamic'

function findPageFile(docId: string, fileName: string): string | null {
  const candidateRoots = [
    path.join(process.cwd(), 'secure_documents', 'pages'),
    path.join(process.cwd(), 'apps', 'web', 'secure_documents', 'pages'),
    path.join(__dirname, '..', '..', '..', '..', 'secure_documents', 'pages'),
    path.join(__dirname, '..', '..', '..', '..', '..', 'apps', 'web', 'secure_documents', 'pages'),
  ]

  for (const root of candidateRoots) {
    const fullPath = path.join(root, docId, fileName)
    if (fs.existsSync(fullPath)) {
      return fullPath
    }
  }

  return null
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const docId = searchParams.get('docId')
    const pageNum = parseInt(searchParams.get('page') || '1', 10)
    const subItemId = searchParams.get('subItem') || ''

    if (!docId) {
      return new NextResponse('Missing docId', { status: 400 })
    }

    const doc = getCertificateDoc(docId)
    if (!doc) {
      return new NextResponse('Confidential document not found', { status: 404 })
    }

    // Check token from query param or from cookie
    let token = searchParams.get('token')
    if (!token) {
      const cookie = req.cookies.get(`cert_session_${doc.id}`)
      token = cookie?.value || ''
    }

    const isValid = verifyViewingToken(token, doc.id)
    if (!isValid) {
      return new NextResponse('Unauthorized: Valid 8-digit PIN session token required', {
        status: 401,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    }

    // Determine target filename
    let targetFileName = `page_${pageNum}.webp`
    if (doc.hasSubItems && doc.subItems && doc.subItems.length > 0) {
      const activeSub = doc.subItems.find((s) => s.id === subItemId) || doc.subItems[0]
      if (activeSub) {
        targetFileName = `${activeSub.filePrefix}_${pageNum}.webp`
      }
    }

    const filePath = findPageFile(doc.id, targetFileName)
    if (!filePath) {
      console.error(`Page not found on disk for ${doc.id}/${targetFileName}`)
      return new NextResponse('Document page not found', { status: 404 })
    }

    const buffer = await fs.promises.readFile(filePath)

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
        'Content-Disposition': 'inline; filename="confidential_view.bin"',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err: unknown) {
    console.error('Error serving confidential page:', err)
    return new NextResponse('Internal document delivery error', { status: 500 })
  }
}
