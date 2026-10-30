'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  AlertTriangle,
  KeyRound,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { CertificateDoc, DocumentSubItem } from '@/lib/certificates-config'

interface SecureDocumentViewerProps {
  doc: CertificateDoc
}

export function SecureDocumentViewer({ doc }: SecureDocumentViewerProps) {
  // Authentication states
  const [pinDigits, setPinDigits] = useState<string[]>(Array(8).fill(''))
  const [showPin, setShowPin] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0)
  const [remainingAttempts, setRemainingAttempts] = useState<number>(5)

  // Viewer states
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSubItem, setActiveSubItem] = useState<DocumentSubItem | null>(() => {
    if (doc.hasSubItems && doc.subItems && doc.subItems.length > 0) {
      return doc.subItems[0] ?? null
    }
    return null
  })
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const [isWindowBlurred, setIsWindowBlurred] = useState(false)
  const [isSecurityAlert, setIsSecurityAlert] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watermarkDate, setWatermarkDate] = useState<string>('')

  // DOM Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Current total pages for active document or sub-item
  const totalPages = activeSubItem ? activeSubItem.pageCount : doc.pageCount

  // Format countdown string
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Update real-time timestamp for dynamic watermark
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setWatermarkDate(
        now.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setAuthError(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [lockoutSeconds])

  // Inactivity auto-lock (15 minutes)
  const resetInactivity = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    if (isUnlocked) {
      inactivityTimerRef.current = setTimeout(() => {
        handleLock()
        setIsSecurityAlert('Session auto-locked due to 15 minutes of inactivity.')
      }, 15 * 60 * 1000)
    }
  }, [isUnlocked])

  useEffect(() => {
    window.addEventListener('mousemove', resetInactivity)
    window.addEventListener('keydown', resetInactivity)
    window.addEventListener('touchstart', resetInactivity)
    resetInactivity()

    return () => {
      window.removeEventListener('mousemove', resetInactivity)
      window.removeEventListener('keydown', resetInactivity)
      window.removeEventListener('touchstart', resetInactivity)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }
  }, [resetInactivity])

  // Anti-Screenshot / Focus Loss detection
  useEffect(() => {
    const handleBlur = () => {
      if (isUnlocked) {
        setIsWindowBlurred(true)
      }
    }

    const handleFocus = () => {
      setIsWindowBlurred(false)
    }

    const handleVisibilityChange = () => {
      if (document.hidden && isUnlocked) {
        setIsWindowBlurred(true)
      } else {
        setIsWindowBlurred(false)
      }
    }

    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isUnlocked])

  // Comprehensive Anti-Copy / Anti-Download / Anti-Print Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen detection
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        if (navigator.clipboard) {
          navigator.clipboard.writeText('')
        }
        setIsSecurityAlert('Screenshots are prohibited. Clipboard cleared for security.')
        setTimeout(() => setIsSecurityAlert(null), 4000)
        return
      }

      // Intercept Ctrl/Cmd + combinations
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase()
        if (key === 's') {
          e.preventDefault()
          setIsSecurityAlert('Saving confidential documents is prohibited by company policy.')
          setTimeout(() => setIsSecurityAlert(null), 4000)
        } else if (key === 'p') {
          e.preventDefault()
          setIsSecurityAlert('Printing confidential documents is strictly prohibited.')
          setTimeout(() => setIsSecurityAlert(null), 4000)
        } else if (key === 'c') {
          e.preventDefault()
          setIsSecurityAlert('Copying contents is disabled for confidential documents.')
          setTimeout(() => setIsSecurityAlert(null), 4000)
        } else if (key === 'u') {
          e.preventDefault()
          setIsSecurityAlert('Source inspection disabled.')
          setTimeout(() => setIsSecurityAlert(null), 4000)
        }
      }

      // F12 DevTools warning
      if (e.key === 'F12') {
        e.preventDefault()
        setIsSecurityAlert('Developer tools disabled on confidential documents.')
        setTimeout(() => setIsSecurityAlert(null), 4000)
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setIsSecurityAlert('Context menu is disabled on confidential documents.')
      setTimeout(() => setIsSecurityAlert(null), 3000)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('contextmenu', handleContextMenu)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  // Check rate limit on mount
  useEffect(() => {
    fetch(`/api/certificates/verify-pin?docId=${encodeURIComponent(doc.id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isLocked && data.lockoutRemainingSeconds) {
          setLockoutSeconds(data.lockoutRemainingSeconds)
          setAuthError(`Security lockout in effect. Please wait ${data.lockoutRemainingSeconds}s.`)
        } else if (typeof data.remainingAttempts === 'number') {
          setRemainingAttempts(data.remainingAttempts)
        }
      })
      .catch(() => {})
  }, [doc.id])

  // PIN Input Handlers
  const handlePinChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const newDigits = [...pinDigits]
    newDigits[index] = digit
    setPinDigits(newDigits)
    setAuthError(null)

    if (digit && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDownPin = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'Enter') {
      handleVerify(pinDigits.join(''))
    }
  }

  const handlePastePin = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8)
    if (!text) return
    const newDigits = [...pinDigits]
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      if (ch) newDigits[i] = ch
    }
    setPinDigits(newDigits)
    const nextIdx = Math.min(7, text.length)
    inputRefs.current[nextIdx]?.focus()
    if (text.length === 8) {
      handleVerify(text)
    }
  }

  // Verification request
  const handleVerify = async (fullPin?: string) => {
    const pin = fullPin || pinDigits.join('')
    if (pin.length !== 8) {
      setAuthError('Please enter the full 8-digit PIN.')
      return
    }

    if (lockoutSeconds > 0) {
      setAuthError(`Locked out. Try again in ${formatCountdown(lockoutSeconds)}.`)
      return
    }

    setIsVerifying(true)
    setAuthError(null)

    try {
      const res = await fetch('/api/certificates/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId: doc.id, pin }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        if (data.lockoutRemainingSeconds) {
          setLockoutSeconds(data.lockoutRemainingSeconds)
        }
        if (typeof data.remainingAttempts === 'number') {
          setRemainingAttempts(data.remainingAttempts)
        }
        setAuthError(data.error || 'Authentication failed. Please check the 8-digit PIN.')
        setIsVerifying(false)
        return
      }

      // Success
      setToken(data.token)
      setIsUnlocked(true)
      setIsVerifying(false)
      setCurrentPage(1)
    } catch {
      setAuthError('Network communication error. Please try again.')
      setIsVerifying(false)
    }
  }

  // Lock Document
  const handleLock = () => {
    setIsUnlocked(false)
    setToken(null)
    setPinDigits(Array(8).fill(''))
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  // Render Page onto Canvas with Dynamic Watermarks
  const renderPageToCanvas = useCallback(async () => {
    if (!isUnlocked || !canvasRef.current) return

    setIsLoadingPage(true)
    setPageError(null)

    try {
      const subParam = activeSubItem ? `&subItem=${encodeURIComponent(activeSubItem.id)}` : ''
      const tokenParam = token ? `&token=${encodeURIComponent(token)}` : ''
      const url = `/api/certificates/page?docId=${encodeURIComponent(doc.id)}&page=${currentPage}${subParam}${tokenParam}`

      const res = await fetch(url)
      if (!res.ok) {
        if (res.status === 401) {
          handleLock()
          setAuthError('Session expired. Please re-enter your 8-digit PIN.')
          return
        }
        throw new Error(`Failed to load page image (Status ${res.status})`)
      }

      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)

      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) {
          URL.revokeObjectURL(objectUrl)
          return
        }

        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) {
          URL.revokeObjectURL(objectUrl)
          return
        }

        // Set high-res canvas dimensions
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        // Draw document page
        ctx.drawImage(img, 0, 0)

        // Draw Dynamic Semi-Transparent Watermark Grid directly into canvas pixels
        ctx.save()
        ctx.rotate((-28 * Math.PI) / 180)
        ctx.font = 'bold 36px sans-serif'
        ctx.fillStyle = 'rgba(168, 54, 53, 0.14)'
        ctx.textAlign = 'center'

        const text1 = 'CONFIDENTIAL • INTERNAL PURPOSES ONLY'
        const text2 = 'BHARATMART (UK) LIMITED • DO NOT DISTRIBUTE'
        const text3 = `OFFICIAL VIEW • ${watermarkDate || new Date().toISOString()}`

        const stepX = 650
        const stepY = 280
        const startX = -canvas.width
        const endX = canvas.width * 2
        const startY = -canvas.height
        const endY = canvas.height * 2

        for (let y = startY; y < endY; y += stepY) {
          for (let x = startX; x < endX; x += stepX) {
            ctx.fillText(text1, x, y)
            ctx.font = '600 24px sans-serif'
            ctx.fillStyle = 'rgba(81, 69, 52, 0.16)'
            ctx.fillText(text2, x, y + 36)
            ctx.font = '500 18px sans-serif'
            ctx.fillStyle = 'rgba(168, 54, 53, 0.12)'
            ctx.fillText(text3, x, y + 68)
            ctx.font = 'bold 36px sans-serif'
            ctx.fillStyle = 'rgba(168, 54, 53, 0.14)'
          }
        }
        ctx.restore()

        // Immediate cleanup of blob URL to prevent memory inspection
        URL.revokeObjectURL(objectUrl)
        setIsLoadingPage(false)
      }

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        setPageError('Error rendering document page onto secure canvas.')
        setIsLoadingPage(false)
      }

      img.src = objectUrl
    } catch (err: unknown) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Error fetching secure document.'
      setPageError(msg)
      setIsLoadingPage(false)
    }
  }, [isUnlocked, doc.id, currentPage, activeSubItem, token, watermarkDate])

  useEffect(() => {
    if (isUnlocked) {
      renderPageToCanvas()
    }
  }, [isUnlocked, currentPage, activeSubItem, renderPageToCanvas])

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false))
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-[85vh] w-full select-none bg-[#fff8f0] font-sans text-[#1e1b16]"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {/* Print Shield Injected CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * {
                visibility: hidden !important;
                display: none !important;
              }
              body::before {
                content: 'CONFIDENTIAL DOCUMENT: Printing is strictly prohibited under company non-disclosure policy.' !important;
                display: block !important;
                visibility: visible !important;
                color: #a83635 !important;
                font-size: 24pt !important;
                font-weight: bold !important;
                text-align: center !important;
                margin-top: 150px !important;
              }
            }
          `,
        }}
      />

      {/* Floating Security Banner */}
      {isSecurityAlert && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 transform rounded-full border border-[#ffa39e] bg-[#fff1f0] px-6 py-2.5 text-sm font-medium text-[#cf1322] shadow-xl backdrop-blur-md transition-all">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#cf1322]" />
            <span>{isSecurityAlert}</span>
          </div>
        </div>
      )}

      {/* Anti-Screen-Capture / Window Blurred Shield in Light Theme */}
      {isUnlocked && isWindowBlurred && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#fff8f0]/95 p-6 text-center backdrop-blur-xl">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d6c4ad] bg-[#f4ede4] text-[#7f5700] shadow-sm">
            <ShieldAlert className="h-10 w-10 animate-pulse" />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-[#1e1b16]">
            Confidential Document Hidden
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#514534]">
            To prevent unauthorized screen capture or viewing, content is concealed while this window
            is inactive.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#d6c4ad] bg-white px-4 py-2 text-xs font-semibold text-[#7f5700] shadow-sm">
            <div className="h-2 w-2 animate-ping rounded-full bg-[#7f5700]" />
            Click here to return focus and resume viewing
          </div>
        </div>
      )}

      {/* UNLOCKED: SECURE DOCUMENT VIEWER (LIGHT THEME) */}
      {isUnlocked ? (
        <div className="flex min-h-[85vh] flex-col">
          {/* Top Control Bar in Light Theme */}
          <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-[#d6c4ad] bg-white px-4 py-3 shadow-sm md:px-6">
            {/* Title & Document Badge */}
            <div className="flex items-center gap-3">
              <Link
                href="/internal-documents"
                className="flex items-center gap-1.5 rounded-lg border border-[#d6c4ad] bg-[#f4ede4] px-3 py-1.5 text-xs font-medium text-[#514534] transition-colors hover:bg-[#eee7de] hover:text-[#1e1b16]"
                title="Back to Important Documents"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Docs</span>
              </Link>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-sm font-bold tracking-wide text-[#1e1b16] sm:text-base">
                    {doc.title}
                  </h1>
                  <span className="hidden items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200 sm:inline-flex">
                    <ShieldCheck className="h-3 w-3" />
                    Verified PIN
                  </span>
                </div>
                <p className="text-[11px] text-[#837561]">{doc.legalReference}</p>
              </div>
            </div>

            {/* Sub-item selector (if applicable, e.g. Share Certificates) */}
            {doc.hasSubItems && doc.subItems && (
              <div className="flex items-center gap-1.5 rounded-xl border border-[#d6c4ad] bg-[#f4ede4] p-1">
                {doc.subItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubItem(sub)
                      setCurrentPage(1)
                    }}
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                      activeSubItem?.id === sub.id
                        ? 'bg-[#7f5700] text-white shadow-sm font-semibold'
                        : 'text-[#514534] hover:text-[#1e1b16]'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* Page Navigation & Zoom Tools */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Pagination (if multi-page) */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1 rounded-lg border border-[#d6c4ad] bg-[#fffaf4] px-1 py-0.5">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="rounded p-1 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16] disabled:opacity-30"
                    title="Previous Page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-2 text-xs font-medium text-[#1e1b16]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="rounded p-1 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16] disabled:opacity-30"
                    title="Next Page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 rounded-lg border border-[#d6c4ad] bg-[#fffaf4] px-1 py-0.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
                  className="rounded p-1 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16]"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-1.5 text-xs font-semibold text-[#514534] hover:text-[#1e1b16]"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.15))}
                  className="rounded p-1 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16]"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              {/* Rotate */}
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="rounded-lg border border-[#d6c4ad] bg-[#fffaf4] p-1.5 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16]"
                title="Rotate View"
              >
                <RotateCw className="h-4 w-4" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="hidden rounded-lg border border-[#d6c4ad] bg-[#fffaf4] p-1.5 text-[#514534] hover:bg-[#f4ede4] hover:text-[#1e1b16] sm:inline-flex"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>

              {/* Lock / Exit Button */}
              <button
                onClick={handleLock}
                className="flex items-center gap-1.5 rounded-lg border border-[#ffa39e] bg-[#fff1f0] px-3 py-1.5 text-xs font-semibold text-[#cf1322] transition-colors hover:bg-[#ffccc7]"
                title="Lock Document and Terminate Session"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Lock Document</span>
              </button>
            </div>
          </header>

          {/* Security Notice Sub-strip */}
          <div className="flex items-center justify-between border-b border-[#e8e2d9] bg-[#f9f3ea] px-4 py-1.5 text-[11px] text-[#514534]">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="font-medium">Protected Session Active • Strictly Confidential</span>
            </div>
            <div className="hidden sm:block text-[#837561]">
              Direct downloads, screen capture, and printing are disabled.
            </div>
          </div>

          {/* Canvas Document Stage in Warm Parchment Background */}
          <main className="relative flex flex-1 items-center justify-center overflow-auto bg-[#eee7de] p-4 sm:p-8">
            {isLoadingPage && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7f5700]/20 border-t-[#7f5700]" />
                <p className="mt-3 text-xs font-semibold text-[#514534]">
                  Decrypting & rendering secure canvas...
                </p>
              </div>
            )}

            {pageError ? (
              <div className="flex max-w-md flex-col items-center rounded-2xl border border-[#ffa39e] bg-white p-8 text-center shadow-lg">
                <AlertTriangle className="h-10 w-10 text-[#cf1322]" />
                <h3 className="mt-3 font-heading text-lg font-bold text-[#1e1b16]">Page Render Error</h3>
                <p className="mt-1 text-sm text-[#514534]">{pageError}</p>
                <button
                  onClick={() => renderPageToCanvas()}
                  className="mt-5 rounded-xl bg-[#7f5700] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#6a4900]"
                >
                  Retry Loading
                </button>
              </div>
            ) : (
              <div
                className="relative transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* HTML5 Canvas Element */}
                <canvas
                  ref={canvasRef}
                  className="rounded-lg border border-[#d6c4ad] shadow-2xl bg-white"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    pointerEvents: 'none', // Prevents drag/copy directly from canvas
                  }}
                />

                {/* Transparent Shield Overlay to prevent inspect/drag */}
                <div
                  className="absolute inset-0 cursor-default"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            )}
          </main>
        </div>
      ) : (
        /* LOCKED: PIN VERIFICATION SCREEN IN LIGHT THEME */
        <div className="flex min-h-[85vh] items-center justify-center p-4 sm:p-6 bg-[#fff8f0]">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#d6c4ad] bg-white p-6 sm:p-10 shadow-lg">
            {/* Top Golden Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7f5700]" />

            {/* Back link */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/internal-documents"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#514534] transition-colors hover:text-[#7f5700]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Important Documents</span>
              </Link>

              <span className="inline-flex items-center gap-1 rounded-full border border-[#d6c4ad] bg-[#f4ede4] px-3 py-1 text-[11px] font-semibold text-[#7f5700]">
                <Lock className="h-3 w-3" />
                PIN Restricted
              </span>
            </div>

            {/* Header with requested exact wording */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6c4ad] bg-[#f4ede4] text-[#7f5700] shadow-sm">
                <KeyRound className="h-7 w-7" />
              </div>

              {/* Exact user-requested prominent statement */}
              <h1 className="mt-5 font-heading text-xl font-bold tracking-tight text-[#7f5700] sm:text-2xl">
                Important documents, for Internal Purposes only
              </h1>

              {/* Exact user-requested prompt */}
              <p className="mt-2 text-sm font-semibold text-[#514534]">
                * Please enter the Designated PIN to view the document.
              </p>

              {/* Document Identity Banner */}
              <div className="mt-6 rounded-xl border border-[#d6c4ad] bg-[#fffaf4] p-4 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#7f5700] uppercase">
                      Target Document
                    </span>
                    <h2 className="font-heading text-base font-bold text-[#1e1b16] sm:text-lg">{doc.title}</h2>
                    <p className="mt-0.5 text-xs text-[#514534]">{doc.subtitle}</p>
                    <p className="mt-1 text-[11px] font-mono text-[#837561]">{doc.legalReference}</p>
                  </div>
                  <span className="rounded-full border border-[#d6c4ad] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#7f5700]">
                    {doc.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Error / Lockout Alert */}
            {authError && (
              <div className="mt-5 rounded-xl border border-[#ffa39e] bg-[#fff1f0] p-3.5 text-xs text-[#cf1322]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#cf1322]" />
                  <span className="font-semibold">{authError}</span>
                </div>
              </div>
            )}

            {/* Lockout Countdown Timer */}
            {lockoutSeconds > 0 && (
              <div className="mt-4 rounded-xl border border-[#ffe58f] bg-[#fffbe6] p-4 text-center">
                <p className="text-xs font-semibold text-[#d48806]">Rate Limit Activated — Temporary Lockout</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#d48806]">
                  {formatCountdown(lockoutSeconds)}
                </p>
                <p className="mt-1 text-[11px] text-[#837561]">
                  Security lockout will automatically clear once the timer reaches zero.
                </p>
              </div>
            )}

            {/* 8-Digit PIN Input Form */}
            <div className="mt-6">
              <label className="block text-center text-xs font-bold tracking-wider text-[#514534] uppercase">
                Designated 8-Digit PIN
              </label>

              {/* 8 Split Input Boxes */}
              <div
                className="mt-3 flex justify-center gap-1.5 sm:gap-2.5"
                onPaste={handlePastePin}
              >
                {pinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      if (el) inputRefs.current[idx] = el
                    }}
                    type={showPin ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    disabled={isVerifying || lockoutSeconds > 0}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDownPin(idx, e)}
                    className="h-12 w-9 rounded-xl border-2 border-[#d6c4ad] bg-white text-center font-mono text-xl font-bold text-[#1e1b16] transition-all focus:border-[#7f5700] focus:ring-2 focus:ring-[#7f5700]/20 focus:outline-none disabled:opacity-40 sm:h-14 sm:w-11 sm:text-2xl"
                  />
                ))}
              </div>

              {/* Visibility and Clear controls */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-[#514534]">
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="flex items-center gap-1.5 font-medium hover:text-[#7f5700]"
                >
                  {showPin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showPin ? 'Hide PIN' : 'Reveal PIN'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPinDigits(Array(8).fill(''))
                    inputRefs.current[0]?.focus()
                  }}
                  className="font-medium hover:text-[#7f5700]"
                >
                  Clear All
                </button>
              </div>

              {/* Open Document Action Button */}
              <button
                type="button"
                disabled={
                  isVerifying || lockoutSeconds > 0 || pinDigits.join('').length !== 8
                }
                onClick={() => handleVerify()}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7f5700] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#6a4900] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isVerifying ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Opening Document...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-4 w-4" />
                    <span>Open Document</span>
                  </>
                )}
              </button>
            </div>

            {/* Rate Limiting & Security Notice Footer */}
            <div className="mt-8 border-t border-[#e8e2d9] pt-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#514534]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#7f5700]" />
                <span>
                  Anti-Brute Force Protection Active • {remainingAttempts} attempts allowed before
                  lockout
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#837561]">
                This document is confidential. Access is logged. Unauthorized distribution or copying
                is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
