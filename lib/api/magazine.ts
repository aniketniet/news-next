import axios from "axios";

export interface MagazineItem {
  magazine_id: number;
  pdf_date: string;
  magazine_name: string;
  pdf_file: string;
  status: number;
}

interface MagazineApiResponse {
  success: boolean;
  message: string;
  data: MagazineItem[];
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? " ";

export async function fetchMagazines(): Promise<MagazineItem[]> {
  try {
    const url = `${BASE}/magazine`;
    const { data } = await axios.get<MagazineApiResponse>(url, {
      timeout: 15000,
    });
    if (!data?.success || !Array.isArray(data.data)) return [];
    // Sort by date desc (latest first)
    return [...data.data].sort((a, b) =>
      a.pdf_date < b.pdf_date ? 1 : a.pdf_date > b.pdf_date ? -1 : 0
    );
  } catch (e) {
    console.error("fetchMagazines error", e);
    return [];
  }
}


