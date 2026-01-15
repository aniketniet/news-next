import axios from 'axios';
import Cookies from 'js-cookie';

export interface BookmarkItem {
  id: number;
  user_id: number;
  story_id: number;
  created_at: string;
  updated_at: string;
  story_title: string;
  story_date: string;
  published_date: string;
  url_key: string;
  image_name?: string | null;
  story_content?: string;
  [key: string]: any;
}

interface BookmarksApiResponse {
  success: boolean;
  message: string;
  data: BookmarkItem[];
}

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://103.119.171.20';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return Cookies.get('auth_token') || null;
}

export async function fetchBookmarks(): Promise<BookmarkItem[]> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    // Check if BASE already includes /api
    const apiPath = BASE.includes('/api') ? '/bookmarks' : '/api/bookmarks';
    const { data } = await axios.get<BookmarksApiResponse>(
      `${BASE}${apiPath}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        timeout: 15000,
      }
    );

    if (!data?.success || !Array.isArray(data.data)) {
      return [];
    }

    // Sort by created_at desc (latest first)
    return [...data.data].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (e: any) {
    console.error('fetchBookmarks error', e);
    if (e?.response?.status === 401) {
      throw new Error('Authentication required');
    }
    throw new Error(e?.response?.data?.message || 'Failed to fetch bookmarks');
  }
}

export async function addBookmark(storyId: string | number): Promise<{ success: boolean; message: string }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const formData = new URLSearchParams();
    formData.append('story_id', String(storyId));

    // Check if BASE already includes /api
    const apiPath = BASE.includes('/api') ? '/bookmark/news' : '/api/bookmark/news';
    const { data } = await axios.post(
      `${BASE}${apiPath}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        timeout: 15000,
      }
    );

    return {
      success: data?.success ?? true,
      message: data?.message || 'Bookmark added successfully',
    };
  } catch (e: any) {
    console.error('addBookmark error', e);
    if (e?.response?.status === 401) {
      throw new Error('Authentication required');
    }
    throw new Error(e?.response?.data?.message || 'Failed to add bookmark');
  }
}

export async function removeBookmark(bookmarkId: number): Promise<{ success: boolean; message: string }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    // Check if BASE already includes /api
    const apiPath = BASE.includes('/api') ? `/bookmark/${bookmarkId}` : `/api/bookmark/${bookmarkId}`;
    const { data } = await axios.delete(
      `${BASE}${apiPath}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 15000,
      }
    );

    return {
      success: data?.success ?? true,
      message: data?.message || 'Bookmark removed successfully',
    };
  } catch (e: any) {
    console.error('removeBookmark error', e);
    if (e?.response?.status === 401) {
      throw new Error('Authentication required');
    }
    throw new Error(e?.response?.data?.message || 'Failed to remove bookmark');
  }
}

