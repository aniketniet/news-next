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

// Extended payload variant when API returns both images and videos in a single response
export interface VideoApiItem {
  story_id: number;
  category_id: number;
  story_title: string;
  story_date: string;
  published_date: string;
  story_location?: string | null;
  image_name?: string;
  video_type?: string; // FILE | YOUTUBE | etc.
  video_name?: string; // file name or youtube id
  video_embed?: string;
  external_url?: string | null;
  is_feature?: number; // 1 for featured
  like_count?: number;
  url_key?: string;
  status?: string;
  position?: number;
  add_time?: string;
  update_time?: string;
  category_name?: string;
}

export interface GalleryImagesAndVideosResponse {
  success: boolean;
  message: string;
  data: {
    images: GalleryImageApiItem[];
    videos: VideoApiItem[];
  };
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

// New: fetch images and videos (if API provides combined payload). Safely handles legacy array shape.
export async function fetchGalleryAssets({ limit = 50, offset = 0, signal }: { limit?: number; offset?: number; signal?: AbortSignal } = {}) {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL not set');
  const url = `${BASE_URL}/news/web/images?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
  const res = await fetch(url, { cache: 'no-store', signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Images request failed ${res.status}`);
  const json: any = await res.json();
  if (!json?.success) throw new Error(json?.message || 'API failure');
  // Shape guard: if data is an array, it's only images; otherwise expect { images, videos }
  if (Array.isArray(json.data)) {
    return { images: json.data as GalleryImageApiItem[], videos: [] as VideoApiItem[] };
  }
  const data = json.data as { images?: GalleryImageApiItem[]; videos?: VideoApiItem[] };
  return { images: data.images || [], videos: data.videos || [] };
}

export function mapVideosToSectionItems(videos: VideoApiItem[]) {
  const base = process.env.NEXT_PUBLIC_API_UPLOADS_URL || '';
  const extractFirstUrl = (embed?: string) => {
    if (!embed) return undefined;
    const match = embed.match(/https?:\/\/[^\s"']+/);
    return match ? match[0] : undefined;
  };
  return videos.map(v => {
    const poster = v.image_name ? `https://www.dailypioneer.com/uploads/vgallery/${v.image_name}` : '/video-news.png';
    const fileSrc = v.video_name ? `https://www.dailypioneer.com/uploads/vgallery/${v.video_name}` : undefined;
    const embedUrl = v.external_url || extractFirstUrl(v.video_embed);
    const href = embedUrl || fileSrc || '#';
    const sourceType: 'file' | 'embed' = fileSrc ? 'file' : 'embed';
    return {
      id: String(v.story_id),
      title: v.story_title,
      image: poster,
      duration: '', // API doesn't provide duration; leave blank for now
      featured: v.is_feature === 1,
      href,
      poster,
      src: fileSrc,
      embed: embedUrl,
      sourceType,
    };
  });
}
