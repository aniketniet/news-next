export type EpaperLocation = {
  location: string;
  published_date: string;
  pdf_url: string;
};

export type EpaperLanguage = {
  language: string;
  locations: EpaperLocation[];
};

export type EpaperResponse = {
  success: boolean;
  data: EpaperLanguage[];
};

const DEFAULT_BASE = "https://shopninja.in/pioneer/public/api";

export async function fetchEpaper(): Promise<EpaperLanguage[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE;
  const url = base.endsWith("/")
    ? `${base}news/web/epaper`
    : `${base}/news/web/epaper`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    // Do not send credentials by default; server should allow public read
    credentials: "omit",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load e-paper (${res.status})`);
  }
  const json = (await res.json()) as EpaperResponse;
  if (!json?.success || !Array.isArray(json?.data)) return [];
  return json.data;
}
