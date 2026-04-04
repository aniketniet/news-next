"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { searchNews, type SearchResultItem, type SearchResultPage } from "@/lib/api/search"

export const dynamic = "force-dynamic"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const q = useMemo(() => (searchParams.get("q") || "").trim(), [searchParams])
  const year = useMemo(() => {
    const raw = searchParams.get("year")
    const y = raw ? Number(raw) : undefined
    if (!y || Number.isNaN(y)) return undefined
    return Math.min(2025, Math.max(2011, y))
  }, [searchParams])
  const limit = useMemo(() => Number(searchParams.get("limit") ?? 10) || 10, [searchParams])
  const offset = useMemo(() => Number(searchParams.get("offset") ?? 0) || 0, [searchParams])
  const run = useMemo(() => searchParams.get("run") || "", [searchParams])

  const [results, setResults] = useState<SearchResultItem[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [nextOffset, setNextOffset] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const cacheRef = useRef<Map<string, SearchResultPage>>(new Map())

  const page = useMemo(() => Math.floor(offset / Math.max(1, limit)) + 1, [offset, limit])

  const goToOffset = (nextOffsetValue: number) => {
    const next = new URLSearchParams(searchParams.toString())
    next.set("offset", String(Math.max(0, nextOffsetValue)))
    next.set("limit", String(limit))
    next.set("run", "1")
    router.push(`/search?${next.toString()}`)
  }

  useEffect(() => {
    let cancelled = false
    const clearRunParam = () => {
      if (!run) return
      const next = new URLSearchParams(searchParams.toString())
      next.delete("run")
      router.replace(`/search?${next.toString()}`)
    }

    if (!q) {
      setResults([])
      setHasMore(false)
      setNextOffset(null)
      setTotal(0)
      setIsLoading(false)
      return
    }

    const cacheKey = `${q}::${year ?? ""}::${limit}::${offset}`
    const cached = cacheRef.current.get(cacheKey)
    if (cached) {
      setResults(cached.items)
      setHasMore(cached.pagination.hasMore)
      setNextOffset(cached.pagination.nextOffset)
      setTotal(cached.pagination.total)
      setIsLoading(false)
      clearRunParam()
      return
    }

    // Try session cache (survives back/forward + reload)
    try {
      const sessionKey = `search:${cacheKey}`
      const raw = sessionStorage.getItem(sessionKey)
      if (raw) {
        const parsed = JSON.parse(raw) as SearchResultPage
        cacheRef.current.set(cacheKey, parsed)
        setResults(parsed.items)
        setHasMore(parsed.pagination.hasMore)
        setNextOffset(parsed.pagination.nextOffset)
        setTotal(parsed.pagination.total)
        setIsLoading(false)
        clearRunParam()
        return
      }
    } catch {
      // ignore session cache errors
    }

    // Do not hit API unless user explicitly submitted (run param)
    if (!run) {
      setResults([])
      setHasMore(false)
      setNextOffset(null)
      setTotal(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    void (async () => {
      const data = await searchNews(q, year, limit, offset)
      if (cancelled) return
      cacheRef.current.set(cacheKey, data)
      setResults(data.items)
      setHasMore(data.pagination.hasMore)
      setNextOffset(data.pagination.nextOffset)
      setTotal(data.pagination.total)
      setIsLoading(false)

      try {
        sessionStorage.setItem(`search:${cacheKey}`, JSON.stringify(data))
      } catch {
        // ignore
      }

      // Remove run param so refresh/back doesn't auto-rehit API
      clearRunParam()
    })()

    return () => {
      cancelled = true
    }
  }, [q, year, limit, offset, run, router, searchParams])

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <h1 className="text-2xl font-bold mb-4">Search results for: <span className="text-gray-600">{q || ""}</span></h1>
          {!!q && isLoading && (
            <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-700" aria-live="polite">
                  Searching news for <span className="font-semibold">“{q}”</span>
                  {year ? <span className="text-gray-500"> ({year})</span> : null}
                </p>
              </div>
            </div>
          )}
          {!q && (
            <p className="text-gray-600">Type a query in the header search box to find news.</p>
          )}
          {!!q && !isLoading && results.length === 0 && (
            <p className="text-gray-600">No results found.</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <li key={`${item.id}-${item.urlKey}`} className="border  overflow-hidden bg-white hover:shadow transition-shadow">
                <Link
                  href={
                    item.urlKey && item.year
                      ? `/news/slug-lite/${item.urlKey}?year=${encodeURIComponent(String(item.year))}`
                      : `/news/${item.urlKey || item.id}`
                  }
                  className="block"
                >
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image src={item.image || "/news-thumbnail.png"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(item.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {!!q && !isLoading && results.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToOffset(Math.max(0, offset - limit))}
                disabled={offset <= 0}
                className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page}
                {total > 0 ? ` • ${total} results` : ""}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (typeof nextOffset === "number") {
                    goToOffset(nextOffset)
                    return
                  }
                  goToOffset(offset + limit)
                }}
                disabled={!hasMore}
                className="px-4 py-2 border border-gray-900 bg-gray-900 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
