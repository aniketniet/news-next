import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsDetailContent } from "@/components/news-detail-content";
import { NewsDetailSidebar } from "@/components/news-detail-sidebar";
import { RelatedArticles } from "@/components/related-articles";
import Image from "next/image";
import Link from "next/link";

// Mock data - in real app, this would come from API/database
const getNewsArticle = (slug: string) => {
  // Mock article data
  const article = {
    id: slug,
    title: "Opposition's V-P pick may fall Telugu test; YSRCP, TDP yet to back Dhankhar Gowda",
    subtitle: "The opposition's choice for Vice President may face a Telugu language test as regional parties YSRCP and TDP have not yet committed their support to the candidate.",
    content: `
      <p>The political landscape is witnessing significant developments as the opposition's Vice Presidential candidate faces potential challenges from regional parties in Andhra Pradesh and Telangana.</p>
      
      <p>Sources close to the matter indicate that both the YSR Congress Party (YSRCP) and Telugu Desam Party (TDP) are yet to announce their official stance on supporting the opposition's nominee for the Vice Presidential election.</p>
      
      <p>The Vice Presidential election, which requires support from members of both houses of Parliament, has become a crucial test for opposition unity. The Telugu-speaking states' representation in Parliament could play a decisive role in the outcome.</p>
      
      <p>Political analysts suggest that the regional parties' decision will depend on various factors including their relationship with the central government and their strategic political calculations for upcoming state elections.</p>
      
      <p>The YSRCP, led by Chief Minister Jagan Mohan Reddy, has maintained a cautious approach towards opposition alliances, while the TDP under Chandrababu Naidu has been more vocal in its criticism of the ruling party.</p>
      
      <p>Both parties are expected to announce their final decision in the coming days, which could significantly impact the electoral mathematics for the Vice Presidential polls.</p>
      
      <p>The opposition coalition is working to secure maximum support for their candidate, but the Telugu parties' stance remains a key variable in their calculations.</p>
    `,
    image: "/news-lead-image.png",
    category: "POLITICS",
    publishedAt: "September 02, 2025",
    author: "Political Correspondent",
    readTime: "5 min read",
    tags: ["Politics", "Vice President", "Telugu States", "YSRCP", "TDP"],
  };

  return article;
};

const getRelatedNews = () => {
  return [
    {
      id: "1",
      title: "Parliament session to discuss key economic reforms",
      image: "/parliament-building.png",
      category: "POLITICS",
      publishedAt: "2 hours ago",
    },
    {
      id: "2", 
      title: "Regional parties form new alliance ahead of polls",
      image: "/world-summit.png",
      category: "POLITICS",
      publishedAt: "4 hours ago",
    },
    {
      id: "3",
      title: "Economic indicators show positive growth trajectory",
      image: "/business-market.png",
      category: "BUSINESS",
      publishedAt: "6 hours ago",
    },
    {
      id: "4",
      title: "Technology sector announces major investments",
      image: "/interconnected-technology.png",
      category: "TECHNOLOGY",
      publishedAt: "8 hours ago",
    },
    {
      id: "5",
      title: "Sports federation prepares for international championships",
      image: "/sports-football.png",
      category: "SPORTS",
      publishedAt: "10 hours ago",
    },
    {
      id: "6",
      title: "Health ministry launches new public awareness campaign",
      image: "/news-thumbnail.png",
      category: "HEALTH",
      publishedAt: "12 hours ago",
    },
  ];
};

const getMoreNews = () => {
  return [
    {
      id: "7",
      title: "International summit addresses climate change concerns",
      image: "/world-summit.png",
      category: "WORLD",
      publishedAt: "1 day ago",
    },
    {
      id: "8",
      title: "Stock markets reach new highs amid investor optimism",
      image: "/business-market.png", 
      category: "BUSINESS",
      publishedAt: "1 day ago",
    },
    {
      id: "9",
      title: "Cricket team announces squad for upcoming series",
      image: "/vibrant-cricket-match.png",
      category: "SPORTS",
      publishedAt: "2 days ago",
    },
    {
      id: "10",
      title: "New education policy implementation begins nationwide",
      image: "/news-image.png",
      category: "EDUCATION",
      publishedAt: "2 days ago",
    },
    {
      id: "11",
      title: "Technology giants collaborate on AI research initiative",
      image: "/interconnected-technology.png",
      category: "TECHNOLOGY", 
      publishedAt: "3 days ago",
    },
    {
      id: "12",
      title: "Cultural festival celebrates national heritage",
      image: "/diverse-group-candid-photo.png",
      category: "CULTURE",
      publishedAt: "3 days ago",
    },
  ];
};

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const article = getNewsArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Daily Pioneer`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      images: [article.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle,
      images: [article.image],
    },
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = getNewsArticle(params.slug);
  const relatedNews = getRelatedNews();
  const moreNews = getMoreNews();

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <NewsDetailContent article={article} />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <NewsDetailSidebar relatedNews={relatedNews} />
            </div>
          </div>
          
          {/* Related Articles Section */}
          <div className="mt-12">
            <RelatedArticles articles={moreNews} />
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
