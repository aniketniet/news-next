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
