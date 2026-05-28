"use client"

import { useEffect, useMemo, useState } from "react"
import { fetchEpaper } from "@/lib/api/epaper"
import Skeleton from "react-loading-skeleton"

type EditionItem = {
  key: string
  location: string
  language: string
  date: string
  pdfUrl: string
}

export function EPaperDownload() {
  const [editions, setEditions] = useState<EditionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchEpaper()
        if (!active) return
        setEditions(flattenEpaper(data))
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

  const visibleEditions = useMemo(() => editions.slice(0, 6), [editions])

  const handleShare = async (edition: EditionItem) => {
    const shareText = `${edition.location} e-paper (${edition.language})`
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Daily Pioneer E-Paper",
          text: shareText,
          url: edition.pdfUrl,
        })
        return
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(edition.pdfUrl)
        window.alert("Link copied to clipboard")
        return
      }
      window.prompt("Copy this e-paper link:", edition.pdfUrl)
    } catch {
      // User may cancel native share sheet; keep silent.
    }
  }

  return (
    <div className="h-full flex flex-col p-3">
      <div className="flex-shrink-0">
        <h3 className="font-semibold text-lg">Daily Pioneer E-Paper</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-black rounded" style={{ width: "20%" }} />
        </div>
      </div>

      <div className="mt-4 flex-1">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md p-3 space-y-2">
                <Skeleton height={16} width={120} />
                <Skeleton height={12} width={160} />
                <Skeleton height={34} />
              </div>
            ))}
          </div>
        )}

        {!loading && error && <div className="text-xs text-red-500">{error}</div>}

        {!loading && !error && visibleEditions.length === 0 && (
          <div className="text-sm text-gray-500">No e-paper editions available.</div>
        )}

        {!loading && !error && visibleEditions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleEditions.map((edition) => (
              <article key={edition.key} className="rounded-md p-3">
                <h4 className="text-sm font-semibold text-gray-900">{edition.location}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {edition.language} • {edition.date}
                </p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={edition.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center flex-1 text-xs font-medium border border-black text-black rounded px-2 py-1.5 hover:bg-black/5"
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => handleShare(edition)}
                    className="inline-flex items-center justify-center flex-1 text-xs font-medium bg-black text-white rounded px-2 py-1.5 hover:bg-black/90"
                  >
                    Share
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function flattenEpaper(
  data: Array<{ language: string; locations: Array<{ location: string; published_date: string; pdf_url: string }> }>
): EditionItem[] {
  if (!Array.isArray(data)) return []

  return data
    .flatMap((lang) =>
      (lang.locations || []).map((loc) => ({
        key: `${lang.language}-${loc.location}-${loc.published_date}`,
        location: loc.location,
        language: lang.language,
        date: loc.published_date,
        pdfUrl: loc.pdf_url,
      }))
    )
    .sort((a, b) => a.location.localeCompare(b.location))
}