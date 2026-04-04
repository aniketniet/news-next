import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsDetailContent } from "@/components/news-detail-content";
import { NewsDetailSidebar } from "@/components/news-detail-sidebar";
import { fetchStoryLite } from "@/lib/api/stories";

export const dynamic = "force-dynamic";

interface NewsLiteDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ year?: string }>;
}

function mapList(list?: { story_id: number; story_title: string; published_date: string; image_url_medium: string | null; url_key: string }[]) {
  return (list || []).map((i) => {
    const yearFromDate = Number(String(i.published_date || "").slice(0, 4));
    const linkYear = Number.isFinite(yearFromDate) && yearFromDate >= 1900 && yearFromDate <= 2100 ? yearFromDate : null;

    return {
    id: String(i.story_id),
    title: i.story_title,
    image: i.image_url_medium ? `${i.image_url_medium}` : "/news-lead-image.png",
    category: "NEWS",
    publishedAt: new Date(i.published_date).toLocaleDateString(undefined, { month: "short", day: "2-digit" }),
    urlKey: i.url_key || "",
    href: linkYear ? `/news/slug-lite/${i.url_key || i.story_id}?year=${linkYear}` : `/news/${i.url_key || i.story_id}`,
  };
  });
}

function parseYear(value: string | undefined): number | null {
  if (!value) return null;
  const y = Number(value);
  if (!y || Number.isNaN(y)) return null;
  // keep a reasonable range guard (backend supports story tables by year)
  if (y < 1900 || y > 2100) return null;
  return y;
}

export async function generateMetadata({
  params,
  searchParams,
}: NewsLiteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const year = parseYear(sp?.year);

  if (!year) return { title: "Article Not Found" };

  const story = await fetchStoryLite(slug, year);
  if (!story) return { title: "Article Not Found" };

  return {
    title: `${story.metaTitle || story.title} | Daily Pioneer`,
    description: story.metaDescription || "",
    openGraph: {
      title: story.metaTitle || story.title,
      description: story.metaDescription || "",
      images: story.imageName ? [`${story.imageName}`] : ["/news-lead-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story.metaTitle || story.title,
      description: story.metaDescription || "",
      images: story.imageName ? [`${story.imageName}`] : [""],
    },
  };
}

export default async function NewsLiteDetailPage({
  params,
  searchParams,
}: NewsLiteDetailPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const year = parseYear(sp?.year);

  if (!year) notFound();

  const story = await fetchStoryLite(slug, year);
  if (!story) notFound();

  const article = {
    id: String(story.id),
    title: story.title,
    subtitle: story.metaDescription || "",
    content: story.contentHtml,
    image: story.imageName || "",
    category: story.metaTitle || "NEWS",
    publishedAt: new Date(story.publishedDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    author: story.authorName || "Staff Reporter",
    readTime: "",
    tags: story.tags || [],
    likeCount: story.likeCount || 0,
    dislikeCount: story.dislikeCount || 0,
    commentCount: story.commentCount || 0,
    comments: story.comments || [],
  };

  const latestNews = mapList(story?.recent || story?.trending);
  const popularNews = mapList(story?.popular);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsDetailContent article={article} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-20 self-start">
                <NewsDetailSidebar latestTitle="News Archive" latestNews={latestNews} popularNews={popularNews} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
