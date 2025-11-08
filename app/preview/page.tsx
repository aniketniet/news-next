import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsDetailContent } from "@/components/news-detail-content";
import { NewsDetailSidebar } from "@/components/news-detail-sidebar";
import { fetchStories, type StorySummary } from "@/lib/api/stories";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: {
    title?: string;
    image?: string;
    description?: string;
    author?: string;
    date?: string; // expected dd-mm-yyyy but tolerate other inputs
  };
};

const DAILYPIONEER_BASE = "https://www.dailypioneer.com/";

function normalizeImageUrl(raw?: string): string | "" {
  if (!raw) return "";
  try {
    // decode incoming value like "../uploads/..." or full URL
    const decoded = decodeURIComponent(raw);
    // If already absolute, return as-is
    if (/^https?:\/\//i.test(decoded)) {
      return decoded;
    }
    // Strip leading ../ or ./ and any leading slashes
    const cleaned = decoded.replace(/^\.\.\/?|^\.\/?/, "").replace(/^\/+/, "");
    const url = new URL(cleaned, DAILYPIONEER_BASE).toString();
    return url;
  } catch {
    return "";
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const title = searchParams?.title || "Preview";
  const description = searchParams?.description || "";
  const image = normalizeImageUrl(searchParams?.image);
  return {
    title: `${title} | Daily Pioneer`,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PreviewPage({ searchParams }: Props) {
  const title = searchParams?.title || "Preview Article";
  const description = searchParams?.description || "";
  const image = normalizeImageUrl(searchParams?.image);
  const author = (searchParams?.author || "Staff Reporter").trim();

  function formatDate(input?: string): string {
    const raw = (input || "").trim();
    if (!raw) {
      return new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    }
    // Handle dd-mm-yyyy
    const ddmmyyyy = raw.match(/^([0-3]?\d)-([0-1]?\d)-(\d{4})$/);
    if (ddmmyyyy) {
      const d = parseInt(ddmmyyyy[1], 10);
      const m = parseInt(ddmmyyyy[2], 10) - 1;
      const y = parseInt(ddmmyyyy[3], 10);
      const date = new Date(y, m, d);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
      }
    }
    // Try native Date parsing as fallback
    const parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    }
    // If all else fails, show raw string
    return raw;
  }
  const publishedAt = formatDate(searchParams?.date);

  const article = {
    id: "preview",
    title,
    subtitle: "",
    content: description ? `<p>${description}</p>` : "",
    image,
    category: "PREVIEW",
    publishedAt,
    author,
    readTime: "",
    tags: [] as string[],
  };

  // Fetch latest/top to populate sidebars similarly to the news-by-id page
  let latestNews: any[] = [];
  let popularNews: any[] = [];
  try {
    const { latest, top } = await fetchStories({ limit: 10, offset: 0 });
    const toSidebar = (items: StorySummary[] = []) =>
      items.slice(0, 6).map((it) => ({
        id: String(it.id),
        title: it.title,
        image: it.image_url_medium || (it as any).image || "/news-thumbnail.png",
        category: it.category || "NEWS",
        publishedAt: new Date(it.publishedDate).toLocaleDateString(undefined, {
          month: "short",
          day: "2-digit",
        }),
      }));
    latestNews = toSidebar(latest);
    popularNews = toSidebar(top);
  } catch {
    latestNews = [];
    popularNews = [];
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsDetailContent article={article as any} />
            </div>
            <div className="lg:col-span-1">
              <NewsDetailSidebar latestNews={latestNews as any} popularNews={popularNews as any} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
