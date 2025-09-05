import Image from "next/image";
import Link from "next/link";

interface SidebarItem {
  id: string;
  title: string;
  image: string;
  category: string;
  publishedAt: string;
}

interface NewsDetailSidebarProps {
  latestNews: SidebarItem[];
  popularNews: SidebarItem[];
}

export function NewsDetailSidebar({ latestNews, popularNews }: NewsDetailSidebarProps) {
  console.log(latestNews,"latestNews in sidebar");
  return (
    <aside className="space-y-8">
      {/* Related News Section */}
      <div className="bg-white  overflow-hidden">
        <div className="bg-gray-50 px-4 pt-3 pb-2 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Latest News</h2>
          {/* Underline bar with 20% filled segment */}
          <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
        </div>
        
        <div className="">
          {latestNews.map((news) => (
            <article key={news.id} className="p-4 hover:bg-gray-50 transition-colors">
              <Link href={`/news/${news.id}`} className="block group">
                <div className="flex gap-3">
                  <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
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
      <div className="bg-white  overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Popular News</h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
        </div>
        
        <div>
          {popularNews.map((news) => (
            <article key={news.id} className="p-4 hover:bg-gray-50 transition-colors">
              <Link href={`/news/${news.id}`} className="block group">
                <div className="flex gap-3">
                  <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
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
