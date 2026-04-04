import axios from "axios"

export interface RawSearchItem {
  story_id: number
  story_title: string
  published_date: string
  story_year?: number
  image_url_medium?: string | null
  image_name?: string | null
  url_key: string
}

interface SearchResponse {
  success: boolean
  message: string
  data: RawSearchItem[] | SearchResponsePayload
}

interface SearchPagination {
  limit: number
  offset: number
  total: number
  has_more: boolean
  next_offset: number | null
  page: number
}

interface SearchResponsePayload {
  query?: string
  match_type?: string
  pagination?: SearchPagination
  data?: RawSearchItem[]
}

export interface SearchResultItem {
  id: number
  title: string
  publishedDate: string
  year?: number
  image: string
  urlKey: string
}

export interface SearchResultPage {
  items: SearchResultItem[]
  pagination: {
    limit: number
    offset: number
    total: number
    hasMore: boolean
    nextOffset: number | null
    page: number
  }
}

function yearFromPublishedDate(publishedDate: string): number | undefined {
  const derived = new Date(publishedDate).getFullYear()
  if (!Number.isFinite(derived) || derived <= 0) return undefined
  return derived
}

export async function searchNews(
  query: string,
  year: number | undefined,
  limit = 10,
  offset = 0
): Promise<SearchResultPage> {
  if (!query?.trim()) {
    return {
      items: [],
      pagination: {
        limit,
        offset,
        total: 0,
        hasMore: false,
        nextOffset: null,
        page: Math.floor(offset / Math.max(1, limit)) + 1,
      },
    }
  }
  try {
    const { data } = await axios.post<SearchResponse>(
      "/api/news/search",
      { query, year, limit, offset },
      { headers: { "Content-Type": "application/json" } }
    )

    const payload = data?.data
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : []

    const upstreamPagination = !Array.isArray(payload) ? payload?.pagination : undefined
    const resolvedLimit = Number(upstreamPagination?.limit ?? limit) || limit
    const resolvedOffset = Number(upstreamPagination?.offset ?? offset) || offset
    const resolvedTotal = Number(upstreamPagination?.total ?? 0) || 0
    const nextOffsetRaw = upstreamPagination?.next_offset
    const resolvedNextOffset = typeof nextOffsetRaw === "number" && Number.isFinite(nextOffsetRaw)
      ? nextOffsetRaw
      : null
    const resolvedHasMore = typeof upstreamPagination?.has_more === "boolean"
      ? upstreamPagination.has_more
      : (resolvedOffset + list.length) < resolvedTotal
    const resolvedPage = Number(upstreamPagination?.page) || (Math.floor(resolvedOffset / Math.max(1, resolvedLimit)) + 1)
   
    const items = list.map((i) => ({
     
      id: i.story_id,
      title: i.story_title,
      publishedDate: i.published_date,
      year: yearFromPublishedDate(i.published_date) ?? (typeof i.story_year === 'number' && Number.isFinite(i.story_year) ? i.story_year : undefined),
      image: i.image_url_medium || i.image_name || "/news-thumbnail.png",
      urlKey: i.url_key,
    }))

    return {
      items,
      pagination: {
        limit: resolvedLimit,
        offset: resolvedOffset,
        total: resolvedTotal,
        hasMore: resolvedHasMore,
        nextOffset: resolvedNextOffset,
        page: resolvedPage,
      },
    }
  } catch (e) {
    console.error("searchNews error", e)
    return {
      items: [],
      pagination: {
        limit,
        offset,
        total: 0,
        hasMore: false,
        nextOffset: null,
        page: Math.floor(offset / Math.max(1, limit)) + 1,
      },
    }
  }
}
