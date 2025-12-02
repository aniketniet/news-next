import axios from 'axios'
import { cache } from 'react'

// Page list item
export interface PageListItem {
    page_id: number
    page_name: string
    url_key: string
    update_time: string
    show_bottom?: number // Add this field
    status?: string // Make this optional
}

// Full page shape
export interface PageApiFull {
    page_id: number
    page_name: string
    page_content: string
    page_fixed: number
    show_bottom: number
    url_key: string
    status: string
    position: number
    add_ip: string
    add_by: string
    add_time: string
    update_ip: string
    update_by: string
    update_time: string
    meta_title: string
    meta_keyword: string
    meta_description: string
}

interface PageApiEnvelope<T = PageApiFull> {
    success: boolean
    message: string
    data: T
}

// List envelope when API returns array in data
interface PageListEnvelope<T = PageListItem[]> {
    success: boolean
    message: string
    data: T
}

const BASE = `${process.env.NEXT_PUBLIC_API_URL}`

// Cache for pages data - prevents repeated API calls
let pagesCache: PageListItem[] | null = null
let pagesCacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fetch all pages for footer navigation - with caching
export const fetchPages = cache(async (): Promise<PageListItem[]> => {
    // Return cached data if still valid
    const now = Date.now()
    if (pagesCache && (now - pagesCacheTime) < CACHE_DURATION) {
        return pagesCache
    }

    try {
        const { data } = await axios.get<PageListEnvelope>(
            `${BASE}/pages`,
            { timeout: 15000 }
        )

        const arr = Array.isArray(data?.data) ? data.data : []
        
        // Update cache
        pagesCache = arr
        pagesCacheTime = now
        
        return arr
    } catch (e) {
        console.error('fetchPages error', e)
        // Return cached data if available, otherwise empty array
        return pagesCache || []
    }
})

// Fetch a single page by URL key
export async function fetchPage(urlKey: string): Promise<PageApiFull | null> {
    try {
        const { data } = await axios.get<PageApiEnvelope>(
            `${BASE}/page/${urlKey}`,
            { timeout: 15000 }
        )

        if (data?.success && data?.data) {
            return data.data
        }
        
        return null
    } catch (e) {
        console.error('fetchPage error', e)
        return null
    }
}