// lib/api/categories.ts

// Minimal strongly‑typed client for the category news endpoint.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface Story {
    story_id: number;
    story_title: string;
    story_date?: string;          // Some new endpoints may omit
    published_date: string;      // YYYY-MM-DD
    image_name: string | null;
    
    url_key: string;
    category_id?: number;        // In section arrays often 0 / omitted
    section_id?: number;
    category_name?: string;
    section_name?: string;
    author_name?: string;
    image_url_big: string | null;
    image_url_medium: string | null;
    video_name?: string | null;
    video_type?: string | null;
    video_embed?: string;
}

export interface CategoryNewsData {
    Opinion: Story[];
    Analysis?: Story[]; 
    section: {
        Business?: Story[];
        World?: Story[];
        Sports?: Story[];
        Technology?: Story[];
        Impact?: Story[];
        [k: string]: Story[] | undefined;
    };
}

export interface CategoryNewsResponse {
    success: boolean;
    message: string;
    data: CategoryNewsData;
}

export interface NormalizedCategories {
    opinion: Story[];
    analysis: Story[];
    business: Story[];
    world: Story[];
    sports: Story[];
    technology: Story[];
    impact: Story[];
    entertainment: Story[];
    travel: Story[];
    healthFitness: Story[];
    all: Story[]; // All stories flattened (unique by story_id)
}

export class CategoryNewsError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
    }
}

function dedupeStories(...lists: (Story[] | undefined)[]): Story[] {
    const map = new Map<number, Story>();
    for (const list of lists) {
        if (!list) continue;
        for (const s of list) {
            if (!map.has(s.story_id)) map.set(s.story_id, s);
        }
    }
    return Array.from(map.values()).sort(
        (a, b) => b.published_date.localeCompare(a.published_date)
    );
}

export function normalizeCategoryNews(data: CategoryNewsData): NormalizedCategories {
    console.log("Normalizing Category News Data:", data);
    const opinion = data.Opinion || [];
    const analysis = data.Analysis || [];
    const business = data.section?.Business || [];
    const world = data.section?.World || [];
    const sports = data.section?.Sports || [];
    const technology = data.section?.Technology || [];
    const impact = data.section?.Impact || [];
    const entertainment = data.section?.Entertainment || [];
    const travel = data.section?.Travel || [];
    const healthFitness = data.section?.["Health & Fitness"] || [];
    const all = dedupeStories(opinion, analysis, business, world, sports, technology, impact, entertainment, travel, healthFitness);
    return { opinion, analysis, business, world, sports, technology, impact, all, entertainment, travel, healthFitness };
}

  
export interface FetchCategoryNewsOptions {
    limit?: number;
    offset?: number;
    /**
     * Set to true to bypass any fetch cache (Next.js or browser).
     */
    noCache?: boolean;
    /**
     * Abort signal (optional).
     */
    signal?: AbortSignal;
}

export async function fetchCategoryNews(
    opts: FetchCategoryNewsOptions = {}
): Promise<{ raw: CategoryNewsResponse; normalized: NormalizedCategories; }> {
    const {
        limit = 12,
        offset = 0,
        noCache = false,
        signal
    } = opts;

    const url = `${BASE_URL}/news/web/categorynews?limit=${encodeURIComponent(
        limit
    )}&offset=${encodeURIComponent(offset)}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        cache: noCache ? 'no-store' : 'force-cache',
        // For Next.js 13+ you could add: next: { revalidate: 300 }
        signal
    });

    console.log(`Fetched Category News from ${url}:`, res);

    if (!res.ok) {
        throw new CategoryNewsError(`Request failed (${res.status})`, res.status);
    }

    let json: unknown;
    try {
        json = await res.json();
    } catch {
        throw new CategoryNewsError('Invalid JSON');
    }

    // Runtime guard (light)
    if (
        typeof json !== 'object' ||
        json === null ||
        !('data' in json) ||
        !('success' in json)
    ) {
        throw new CategoryNewsError('Unexpected response shape');
    }

    const raw = json as CategoryNewsResponse;
    console.log("Fetched Category News Response:", raw);

    if (!raw.success) {
        throw new CategoryNewsError(raw.message || 'API reported failure');
    }

    const normalized = normalizeCategoryNews(raw.data);
    return { raw, normalized };
}

// Convenience helper returning only normalized structure.
export async function getCategoriesNormalized(
    options?: FetchCategoryNewsOptions
): Promise<NormalizedCategories> {
    const { normalized } = await fetchCategoryNews(options);
    return normalized;
}

