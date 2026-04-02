import axios from 'axios'

/** In-memory TTL cache so header / ticker don’t hit the API on every mount or StrictMode double-run. */
const BREAKING_TTL_MS = 5 * 60 * 1000
const breakingCache = new Map<string, { data: BreakingStoryRaw[]; expires: number }>()

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
  const key = `${limit}:${offset}`
  const now = Date.now()
  const hit = breakingCache.get(key)
  if (hit && hit.expires > now) return hit.data

  const url = `${process.env.NEXT_PUBLIC_API_URL}/news/breaking?limit=${limit}&offset=${offset}`
  try {
    const { data } = await axios.get<BreakingNewsResponse | BreakingStoryRaw[]>(url, { timeout: 15000 })
    let out: BreakingStoryRaw[] = []
    if (Array.isArray(data)) out = data
    else if ((data as BreakingNewsResponse).data && Array.isArray((data as BreakingNewsResponse).data)) {
      out = (data as BreakingNewsResponse).data as BreakingStoryRaw[]
    }
    breakingCache.set(key, { data: out, expires: now + BREAKING_TTL_MS })
    return out
  } catch (e) {
    console.error('Failed to load breaking news', e)
    return []
  }
}

export interface BreakingSimpleItem { id: number; title: string; urlKey: string }

export function mapBreakingTitles(items: BreakingStoryRaw[]): BreakingSimpleItem[] {
  return items
    .filter(i => !!i.story_title)
    .map(i => ({ id: i.story_id, title: i.story_title, urlKey: i.url_key }))
}
