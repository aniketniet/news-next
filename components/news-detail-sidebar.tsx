import Image from "next/image";
import Link from "next/link";

interface RelatedNewsItem {
  id: string;
  title: string;
  image: string;
  category: string;
  publishedAt: string;
}

interface NewsDetailSidebarProps {
  relatedNews: RelatedNewsItem[];
}

export function NewsDetailSidebar({ relatedNews }: NewsDetailSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Related News Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Latest News</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {relatedNews.map((news) => (
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
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded">
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

      {/* Advertisement Section */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-2">Advertisement</h3>
        <p className="text-sm opacity-90 mb-4">
          Your ad could be here. Contact us for advertising opportunities.
        </p>
        <Link 
          href="/advertise" 
          className="inline-block px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition-colors"
        >
          Learn More
        </Link>
      </div>

      {/* Popular Posts Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Popular News</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {[
            {
              id: "popular-1",
              title: "Breaking: Major political development shapes national discourse",
              image: "/parliament-building.png",
              category: "POLITICS",
              publishedAt: "2 hours ago"
            },
            {
              id: "popular-2", 
              title: "Economic reforms show promising results in key sectors",
              image: "/business-market.png",
              category: "BUSINESS",
              publishedAt: "4 hours ago"
            },
            {
              id: "popular-3",
              title: "Technology breakthrough announced by leading research institute",
              image: "/interconnected-technology.png",
              category: "TECHNOLOGY",
              publishedAt: "6 hours ago"
            },
            {
              id: "popular-4",
              title: "International summit addresses global climate concerns",
              image: "/world-summit.png",
              category: "WORLD",
              publishedAt: "8 hours ago"
            },
            {
              id: "popular-5",
              title: "Sports federation announces new championship format",
              image: "/sports-football.png",
              category: "SPORTS",
              publishedAt: "10 hours ago"
            }
          ].map((news, index) => (
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
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-green-600 rounded">
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

      {/* Newsletter Signup */}
      <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest news delivered directly to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
