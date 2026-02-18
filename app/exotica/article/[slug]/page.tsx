import { ExoticaHeader } from "@/components/exotica/exotica-header";
import { ExoticaFooter } from "@/components/exotica/exotica-footer";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/exotica-data";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles from the same category
  const relatedArticles = getArticlesByCategory(
    article.category,
    article.subcategory
  ).filter(a => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <ExoticaHeader />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/exotica" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            {article.subcategory ? (
              <>
                <Link href={`/exotica/${article.category.toLowerCase()}`} className="hover:text-orange-600">
                  {article.category}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{article.subcategory}</span>
              </>
            ) : (
              <Link href={`/exotica/${article.category.toLowerCase()}`} className="hover:text-orange-600">
                {article.category}
              </Link>
            )}
            <span className="mx-2">/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <div className="text-sm text-orange-600 uppercase tracking-wide mb-4">
              {article.category}
              {article.subcategory && ` • ${article.subcategory}`}
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
              {article.title}
            </h1>
            <div className="text-gray-500 text-sm">
              {article.month} {article.year}
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            {article.content ? (
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-gray-600 italic py-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-lg">Content for this article will be available soon.</p>
                <p className="text-sm mt-2">Please check back later or contact us for more information.</p>
              </div>
            )}
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-light text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/exotica/article/${related.slug}`}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <div className="text-xs text-orange-600 uppercase tracking-wide mb-2">
                        {related.category}
                      </div>
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {related.month} {related.year}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <ExoticaFooter />
    </div>
  );
}

