// lib/api/images.ts
// Client to fetch photo gallery images.

export interface GalleryImageApiItem {
  image_id: number;
  image_name: string;
  image_caption: string;
  add_time: string; // YYYY-MM-DD HH:mm:ss
  category_name: string;
}

export interface GalleryImagesResponse {
  success: boolean;
  message: string;
  data: GalleryImageApiItem[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGalleryImages({ limit = 50, offset = 0, signal }: { limit?: number; offset?: number; signal?: AbortSignal } = {}) {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL not set');
  const url = `${BASE_URL}/news/web/images?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
  const res = await fetch(url, { cache: 'no-store', signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Images request failed ${res.status}`);
  const json = (await res.json()) as GalleryImagesResponse;
  if (!json.success) throw new Error(json.message || 'API failure');
  return json.data;
}

export function mapGalleryImagesToPhotos(items: GalleryImageApiItem[]) {
  return items.map(it => ({
    id: it.image_id,
    src: `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${it.image_name}`,
    // Fallback to constructed path if API doesn't supply full URL. Adjust logic if full URL desired.
    alt: it.image_caption || it.category_name || 'Photo',
    title: it.image_caption || 'Untitled',
    author: '',
    date: new Date(it.add_time).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
    category: it.category_name?.replace(/\.$/, '') || 'Gallery'
  }));
}
