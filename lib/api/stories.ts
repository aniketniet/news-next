import axios from 'axios'

// Small item (used in trending / recent / related)
export interface StoryListItem {
    story_id: number
    story_title: string
    published_date: string
    image_url_medium: string | null
    url_key: string
}

// Full story shape (add every field you showed)
export interface StoryApiFull {
    story_id: number
    story_title: string
    story_content: string
    story_date: string
    published_date: string
    image_url_big: string | null
    image_url_medium: string | null
    video_name?: string | null
    video_type?: string | null
    video_embed?: string | null
    external_url?: string | null
    url_key: string
    meta_title?: string | null
    meta_keyword?: string | null
    meta_description?: string | null
    story_tags?: string | null
    category_id?: number
    section_id?: number
    author_id?: number
    category_name?: string
    section_name?: string
    author_name?: string
    trending_news?: StoryListItem[]
    recent_news?: StoryListItem[]
    related_articles?: StoryListItem[]
}

interface StoryApiEnvelope<T = StoryApiFull> {
    success: boolean
    message: string
    data: T
}

// List envelope when API returns array in data
interface StoryListEnvelope<T = StoryApiFull[]> {
    success: boolean
    message: string
    data: T
}

const BASE = `${process.env.NEXT_PUBLIC_API_URL}`

// If you only want the raw/full API object (ALL fields)
export async function fetchStoryFull(identifier: string): Promise<StoryApiFull | null> {
    try {
        const { data } = await axios.get<StoryApiEnvelope | StoryApiFull>(
            `${BASE}/stories/web/${identifier}`,
            { timeout: 15000 }
        )

        console.log(data,"data");

        const raw: StoryApiFull = (data as StoryApiEnvelope).data
            ? (data as StoryApiEnvelope<StoryApiFull>).data
            : (data as StoryApiFull)

        return raw?.story_id ? raw : null
    } catch (e) {
        console.error('fetchStoryFull error', e)
        return null
    }
}

// (Optional) keep old mapped version if other code depends on it
export interface StoryMapped {
    id: number
    title: string
    authorName: string
    contentHtml: string
    publishedDate: string
    urlKey: string
    imageName?: string | null
    metaTitle?: string | null
    metaKeywords?: string | null
    metaDescription?: string | null
    tags?: string[]
    // extra arrays if you still want them mapped
    trending?: StoryListItem[]
    recent?: StoryListItem[]
    related?: StoryListItem[]
}

export async function fetchStory(identifier: string): Promise<StoryMapped | null> {
    const raw = await fetchStoryFull(identifier)
    // console.log(raw,"raw");
    if (!raw) return null
    return {
        id: raw.story_id,
        title: raw.story_title,
        contentHtml: raw.story_content || '<p>No content available.</p>',
        authorName: raw.author_name || 'Staff Reporter',
        publishedDate: raw.published_date || raw.story_date,
        urlKey: raw.url_key,
        imageName: raw.image_url_big ?? null,
        metaTitle: raw.meta_title ?? null,
        metaKeywords: raw.meta_keyword ?? null,
        metaDescription: raw.meta_description ?? null,
        tags: raw.story_tags ? raw.story_tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        trending: raw.trending_news ?? [],
        recent: raw.recent_news ?? [],
        related: raw.related_articles ?? []
    }
}

// Summary shape for listings
export interface StorySummary {
    id: number
    title: string
    category?: string
    author?: string
    publishedDate: string
    image?: string | null
    image_url_medium?: string | null
    urlKey: string
    // Optional media fields for hero/video rendering
    video_name?: string | null
    video_embed?: string | null
    external_url?: string | null
    video_type?: string | null
}

interface ListEnvelope<T = any[]> {
    success: boolean
    message: string
    data: T
}

export async function fetchSectionList(sectionId: number, { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<StorySummary[]> {
    try {
        const { data } = await axios.get<ListEnvelope>(
            `${BASE}/news/section/${sectionId}?limit=${limit}&offset=${offset}`,
            { timeout: 15000 }
        )
        const arr = Array.isArray(data?.data) ? data.data : []
        return arr.map((item: any) => ({
            id: item.story_id,
            title: item.story_title,
            category: item.section_name || item.category_name || undefined,
            author: item.author_name || undefined,
            publishedDate: item.published_date || item.story_date,
            image: item.image_name ? `${item.image_name}` : null,
            image_url_medium: item.image_url_medium || null,
            urlKey: item.url_key,
        }))
    } catch (e) {
        console.error('fetchSectionList error', e)
        return []
    }
}

export async function fetchCategoryList(categoryId: number, { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<StorySummary[]> {
    try {
        const { data } = await axios.get<ListEnvelope>(
            `${BASE}/news/category/${categoryId}?limit=${limit}&offset=${offset}`,
            { timeout: 15000 }
        )
        const arr = Array.isArray(data?.data) ? data.data : []
        return arr.map((item: any) => ({
            id: item.story_id,
            title: item.story_title,
            category: item.category_name || item.section_name || undefined,
            author: item.author_name || undefined,
            publishedDate: item.published_date || item.story_date,
            image: item.image_name ? `${item.image_name}` : null,
            image_url_medium: item.image_url_medium || null,
            urlKey: item.url_key,
        }))
    } catch (e) {
        console.error('fetchCategoryList error', e)
        return []
    }
}
// Return both latest_news and top_stories
export interface StoriesGrouped {
    latest: StorySummary[]
    top: StorySummary[]
    stateEditions?: Record<string, StorySummary[]>
}

interface TopStoriesApiResponse {
    success: boolean
    message: string
    data: {
        latest_news?: Partial<StoryApiFull>[] // lighter objects
        top_stories?: StoryApiFull[]
    state_editions?: Record<string, any[]>
    }
}

export async function fetchStories(
    { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<StoriesGrouped> {
    try {
        const { data } = await axios.get<TopStoriesApiResponse>(
            `${BASE}/news/web/top-stories?limit=${limit}&offset=${offset}`,
            { timeout: 15000 }
        )
        console.log(data,"data");
    const latestRaw = data?.data?.latest_news ?? []
    const topRaw = data?.data?.top_stories ?? []
    const stateRaw = data?.data?.state_editions ?? {}

    

        const mapItem = (item: any): StorySummary => ({
            id: item.story_id,
            title: item.story_title,
            category: item.section_name || item.category_name,
            author: item.author_name,
            publishedDate: item.published_date || item.story_date,
            image: item.image_url_big ?? null,
            image_url_medium: item.image_url_medium ?? null,
            urlKey: item.url_key,
            video_name: item.video_name ?? null,
            video_embed: item.video_embed ?? null,
            external_url: item.external_url ?? null,
            video_type: item.video_type ?? null,
        })

        const mapStateEditions: Record<string, StorySummary[]> = {}
        try {
            Object.entries(stateRaw).forEach(([state, arr]) => {
                if (Array.isArray(arr)) {
                    mapStateEditions[state] = arr.map((item: any) => ({
                        id: item.story_id,
                        title: item.story_title,
                        category: state, // use state name as category label
                        publishedDate: item.published_date,
                        image: null,
                        image_url_medium: null,
                        author: undefined,
                        urlKey: item.url_key
                    }))
                }
            })
        } catch (err) {
            console.warn('state editions mapping error', err)
        }

        return {
            latest: latestRaw.map(mapItem),
            top: topRaw.map(mapItem),
            stateEditions: mapStateEditions
        }
    } catch (e) {
        console.error('fetchStories error', e)
        return { latest: [], top: [], stateEditions: {} }
    }
}
