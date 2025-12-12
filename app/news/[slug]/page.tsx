import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsDetailContent } from "@/components/news-detail-content";
import { NewsDetailSidebar } from "@/components/news-detail-sidebar";
import { RelatedArticles } from "@/components/related-articles";
import { fetchStory } from "@/lib/api/stories";

export const dynamic = "force-dynamic";

function mapList(list?: { story_id: number; story_title: string; published_date: string; image_url_medium: string | null; url_key: string }[]) {
  // console.log(list,"list");
  return (list || []).map(i => ({
  id: String(i.story_id),
    title: i.story_title,
    image: i.image_url_medium ? `${i.image_url_medium}` : '',
    category: 'NEWS',
    publishedAt: new Date(i.published_date).toLocaleDateString(undefined,{ month:'short', day:'2-digit' }),
    urlKey: i.url_key || ''
  }))
}

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory(slug);
  if (!story) return { title: "Article Not Found" };
  return {
    title: `${story.metaTitle || story.title} | Daily Pioneer`,
    description: story.metaDescription || "",
    openGraph: {
      title: story.metaTitle || story.title,
      description: story.metaDescription || "",
      images: story.imageName
        ? [`${story.imageName}`]
        : ["/news-lead-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story.metaTitle || story.title,
      description: story.metaDescription || "",
      images: story.imageName
        ? [`${story.imageName}`]
        : [""],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const story = await fetchStory(slug);
  console.log(story,"story");
  
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

  const latestNews = mapList(story?.recent)
  console.log(latestNews,"latestNews");
  const popularNews = mapList(story?.popular)
  const relatedArticles = mapList(story?.related)
  const recentNews = mapList(story?.recent)
  

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
                <NewsDetailSidebar latestNews={latestNews} popularNews={popularNews} />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <RelatedArticles articles={relatedArticles} topNews={recentNews} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
