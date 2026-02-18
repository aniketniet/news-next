import { ExoticaHeader } from "@/components/exotica/exotica-header";
import { ExoticaFooter } from "@/components/exotica/exotica-footer";
import { getArticlesByCategory, getMonthsForCategory } from "@/lib/exotica-data";
import Link from "next/link";

export default function EventsPage() {
  const articles = getArticlesByCategory("Events");
  const months = getMonthsForCategory("Events");

  // Group articles by year and month
  const articlesByYearMonth: Record<string, Record<string, typeof articles>> = {};
  articles.forEach(article => {
    if (!articlesByYearMonth[article.year]) {
      articlesByYearMonth[article.year] = {};
    }
    if (!articlesByYearMonth[article.year][article.month]) {
      articlesByYearMonth[article.year][article.month] = [];
    }
    articlesByYearMonth[article.year][article.month].push(article);
  });

  const years = Object.keys(articlesByYearMonth).sort().reverse();

  return (
    <div className="min-h-screen bg-white">
      <ExoticaHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/exotica" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Events</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
              Events
            </h1>
            <p className="text-gray-600">Festivals, celebrations, and cultural events</p>
          </div>

          {years.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found in this category.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {years.map((year) => (
                <div key={year}>
                  <h2 className="text-3xl font-light text-gray-900 mb-6 pb-2 border-b border-gray-200" style={{ fontFamily: 'serif' }}>
                    {year}
                  </h2>
                  {Object.keys(articlesByYearMonth[year])
                    .sort((a, b) => {
                      const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
                    })
                    .reverse()
                    .map((month) => (
                      <div key={month} className="mb-8">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">{month} {year}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {articlesByYearMonth[year][month].map((article) => (
                            <Link
                              key={article.slug}
                              href={`/exotica/article/${article.slug}`}
                              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                              <div className="p-6">
                                <div className="text-xs text-orange-600 uppercase tracking-wide mb-2">
                                  {article.category}
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
                                  {article.title}
                                </h4>
                                <div className="text-sm text-gray-500">
                                  {article.month} {article.year}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <ExoticaFooter />
    </div>
  );
}

