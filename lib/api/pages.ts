import axios from 'axios'

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

// Fetch all pages for footer navigation
export async function fetchPages(): Promise<PageListItem[]> {
    try {
        const { data } = await axios.get<PageListEnvelope>(
            `${BASE}/pages`,
            { timeout: 15000 }
        )

        const arr = Array.isArray(data?.data) ? data.data : []
        console.log(arr,"arr");
        // Filter pages that should be shown in the footer (show_bottom = 1)
        return arr
    } catch (e) {
        console.error('fetchPages error', e)
        return []
    }
}

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