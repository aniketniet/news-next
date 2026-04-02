import axios from "axios"

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

export async function searchNews(
  query: string,
  year: number | undefined,
  limit = 10,
  offset = 0
): Promise<SearchResultItem[]> {
  if (!query?.trim()) return []
  try {
    const { data } = await axios.post<SearchResponse>(
      "/api/news/search",
      { query, year, limit, offset },
      { headers: { "Content-Type": "application/json" } }
    )

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
