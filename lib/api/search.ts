import axios from "axios"

const BASE = `${process.env.NEXT_PUBLIC_API_URL}`

export interface RawSearchItem {
  story_id: number
  story_title: string
  published_date: string
  image_url_medium?: string | null
  image_name?: string | null
  url_key: string
}

interface SearchResponse {
  success: boolean
  message: string
  data: RawSearchItem[]
}

export interface SearchResultItem {
  id: number
  title: string
  publishedDate: string
  image: string
  urlKey: string
}

export async function searchNews(query: string, limit = 10, offset = 0): Promise<SearchResultItem[]> {
  if (!query?.trim()) return []
  try {
    const body = new URLSearchParams()
    body.set("query", query)
    body.set("limit", String(limit))
    body.set("offset", String(offset))

    const { data } = await axios.post<SearchResponse>(`${BASE}/news/search`, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 15000,
    })

    const items = (data?.data ?? []) as RawSearchItem[]
    return items.map((i) => ({
      id: i.story_id,
      title: i.story_title,
      publishedDate: i.published_date,
      image: i.image_url_medium || i.image_name || "/news-thumbnail.png",
      urlKey: i.url_key,
    }))
  } catch (e) {
    console.error("searchNews error", e)
    return []
  }
}
