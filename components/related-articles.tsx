import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  publishedAt: string;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  // Split articles into related news (left) and top news (right)
  const relatedNews = articles.slice(0, 6); // First 6 for related news grid
  const topNews = [
    {
      id: "top-1",
      title: "Government announces major infrastructure development plan",
      image: "/parliament-building.png",
      category: "POLITICS",
      publishedAt: "1 hour ago"
    },
    {
      id: "top-2",
      title: "Stock market reaches new heights amid economic optimism",
      image: "/business-market.png",
      category: "BUSINESS",
      publishedAt: "2 hours ago"
    },
    {
      id: "top-3",
      title: "Revolutionary AI technology unveiled by tech giants",
      image: "/interconnected-technology.png",
      category: "TECHNOLOGY",
      publishedAt: "3 hours ago"
    },
    {
      id: "top-4",
      title: "International climate summit reaches historic agreement",
      image: "/world-summit.png",
      category: "WORLD",
      publishedAt: "4 hours ago"
    },
    {
      id: "top-5",
      title: "National cricket team wins championship series",
      image: "/vibrant-cricket-match.png",
      category: "SPORTS",
      publishedAt: "5 hours ago"
    },
    {
      id: "top-6",
      title: "Health ministry launches nationwide vaccination drive",
      image: "/news-thumbnail.png",
      category: "HEALTH",
      publishedAt: "6 hours ago"
    }
  ];

  return (
    <section className="space-y-6">
      <div className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Related News - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related News</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((article) => (
                <article key={article.id} className="group">
                  <Link href={`/news/${article.id}`} className="block">
                    <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500">{article.publishedAt}</p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Top News - Right Side (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Top News</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {topNews.map((news) => (
                  <article key={news.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <Link href={`/news/${news.id}`} className="block group">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-orange-600 rounded">
                              {news.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {news.title}
                          </h3>
                          <p className="text-xs text-gray-500">{news.publishedAt}</p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pt-6">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Load More Articles
        </button>
      </div>
    </section>
  );
}
