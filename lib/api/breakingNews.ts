import axios from 'axios'

export interface BreakingStoryRaw {
  story_id: number
  story_title: string
  story_date: string
  published_date: string
  status: number
  url_key: string
}

export interface BreakingNewsResponse {
  success?: boolean
  message?: string
  data?: BreakingStoryRaw[]
}

// Fetch breaking news from remote API
// https://shopninja.in/pioneer/public/api/news/breaking'

export async function fetchBreakingNews(limit = 10, offset = 0): Promise<BreakingStoryRaw[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/news/breaking?limit=${limit}&offset=${offset}`
  try {
    const { data } = await axios.get<BreakingNewsResponse | BreakingStoryRaw[]>(url, { timeout: 15000 })
    if (Array.isArray(data)) return data
    if ((data as BreakingNewsResponse).data && Array.isArray((data as BreakingNewsResponse).data)) {
      return (data as BreakingNewsResponse).data as BreakingStoryRaw[]
    }
    // Some APIs may directly return object with no data wrapper
    return []
  } catch (e) {
    console.error('Failed to load breaking news', e)
    return []
  }
}

export function mapBreakingTitles(items: BreakingStoryRaw[]): string[] {
  return items.map(i => i.story_title).filter(Boolean)
}
