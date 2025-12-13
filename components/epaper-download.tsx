"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchEpaper, type EpaperLanguage } from "@/lib/api/epaper"
import Skeleton from "react-loading-skeleton"

type DelhiEdition = {
  pdfUrl: string
  language: string
  date: string
}

export function EPaperDownload() {
  const [delhi, setDelhi] = useState<DelhiEdition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchEpaper()
        if (!active) return
        const preferred = pickDelhiEdition(data)
        setDelhi(preferred)
      } catch (e: any) {
        if (!active) return
        setError(e?.message || "Failed to load e-paper")
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="h-full flex flex-col">
      {/* Header with progress bar */}
      <div className="px-3 py-2 flex-shrink-0">
        <h3 className="font-semibold text-lg">Daily Pioneer E-Paper</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-black rounded" style={{ width: "20%" }} />
        </div>
      </div>

      {/* Content area with fixed structure */}
      <div className="flex-1 flex flex-col p-3 min-h-0">
        {/* Image container - takes remaining space but allows button to stay visible */}
        <div className="flex-1 flex items-center justify-center mb-3 min-h-0">
          <div className="relative w-full h-full max-w-xs">
            {loading ? (
              <Skeleton height="100%" width="100%" />
            ) : (
              <Image
                src="/e-paper.jpg"
                alt="Daily Pioneer E-paper front page"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 320px"
                priority={false}
              />
            )}
          </div>
        </div>

        {/* Bottom section - fixed height */}
        <div className="flex-shrink-0 space-y-3">
          {loading && (
            <div className="space-y-2">
              <Skeleton height={14} width={160} />
              <Skeleton height={40} />
            </div>
          )}
          
          {error && !loading && (
            <div className="text-xs text-red-500">{error}</div>
          )}

          {delhi ? (
            <>
              <div className="text-sm text-gray-600">
                Delhi — {delhi.language} • {delhi.date}
              </div>
              <Link
                href={delhi.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-full justify-center text-black border border-black font-medium py-2 rounded hover:bg-black/90 transition-colors"
              >
                Download PDF
              </Link>
            </>
          ) : (
            !loading && !error && (
              <div className="text-sm text-gray-500">Delhi edition not available</div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

function pickDelhiEdition(data: EpaperLanguage[]): DelhiEdition | null {
  if (!Array.isArray(data) || data.length === 0) return null
  const normEq = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()

  // Prefer English Delhi if available
  const english = data.find((d) => normEq(d.language, "English Edition"))
  const englishDelhi = english?.locations.find((l) => normEq(l.location, "Delhi"))
  if (englishDelhi) {
    return { pdfUrl: englishDelhi.pdf_url, language: "English", date: englishDelhi.published_date }
  }
  // Fallback to any Delhi across languages (e.g., Hindi)
  for (const lang of data) {
    const match = lang.locations.find((l) => normEq(l.location, "Delhi"))
    if (match) return { pdfUrl: match.pdf_url, language: lang.language, date: match.published_date }
  }
  return null
}