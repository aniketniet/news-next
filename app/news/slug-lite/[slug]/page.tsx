import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsDetailContent } from "@/components/news-detail-content";
import { fetchStoryLite } from "@/lib/api/stories";

export const dynamic = "force-dynamic";

interface NewsLiteDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ year?: string }>;
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

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <NewsDetailContent article={article} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
