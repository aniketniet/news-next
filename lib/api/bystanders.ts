// lib/api/bystanders.ts
// Client to fetch bystander images.

export interface BystanderApiItem {
  bystander_id: number;
  image_name: string;
  image_caption: string;
  status: number;
  add_ip?: string | null;
  add_by?: string | null;
  add_time: string; // YYYY-MM-DD HH:mm:ss
  update_ip?: string | null;
  update_by?: string | null;
  update_time?: string | null;
  image_url: string;
}

export interface BystandersResponse {
  success: boolean;
  message: string;
  data: BystanderApiItem[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBystanders({ 
  limit = 20, 
  offset = 0, 
  signal,
  noCache = false,
  revalidateSeconds = 300,
}: { 
  limit?: number; 
  offset?: number; 
  signal?: AbortSignal;
  noCache?: boolean;
  revalidateSeconds?: number;
} = {}) {
  try {
    if (!BASE_URL) return [];
    const url = `${BASE_URL}/bystanders?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
    const res = await fetch(url, { 
      cache: noCache ? "no-store" : "force-cache",
      next: noCache ? undefined : { revalidate: revalidateSeconds },
      signal, 
      headers: { Accept: 'application/json' } 
    });
    if (!res.ok) return [];
    const json = (await res.json()) as BystandersResponse;
    if (!json.success) return [];
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    console.error('fetchBystanders error', e);
    return [];
  }
}

export function mapBystandersToGallery(items: BystanderApiItem[]) {
  return items.map(it => ({
    id: it.bystander_id,
    src: it.image_url,
    alt: it.image_caption || 'Bystander Photo',
    title: it.image_caption || 'Untitled',
    caption: it.image_caption || '',
    date: new Date(it.add_time).toLocaleDateString(undefined, { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }),
  }));
}

