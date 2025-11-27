import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsCard } from "@/components/news-card";
import { fetchCategoryList } from "@/lib/api/stories";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props { 
  params: { slug: string };
  searchParams: { limit?: string; offset?: string };
}

export const dynamic = "force-dynamic";

export default async function StatePage({ params, searchParams }: Props) {
  // slug is now the category ID
  const categoryId = parseInt(params.slug, 10);
  if (isNaN(categoryId)) notFound();

  const limit = Number(searchParams.limit ?? 12) || 12;
  const offset = Number(searchParams.offset ?? 0) || 0;

  const items = await fetchCategoryList(categoryId, { limit, offset });

  if (!items || items.length === 0) {
    notFound();
  }

  const stateName = items.length > 0 ? (items[0].category || params.slug) : params.slug;
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">State Edition</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{stateName}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {stateName} Edition
          </h1>
          <div className="h-1 w-20 bg-[#1a59a9] rounded"></div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              category={item.category || stateName}
              image={item.image_url_medium || item.image || "/news-image.jpg"}
              time={new Date(item.publishedDate).toLocaleDateString(
                undefined,
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
              href={`/news/${item.urlKey || item.id}`}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {offset > 0 && (
            <Link
              href={`/state/${categoryId}?limit=${limit}&offset=${Math.max(0, offset - limit)}`}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              ← Previous
            </Link>
          )}
          
          <span className="px-4 py-2 text-gray-700 font-medium">
            Page {currentPage}
          </span>
          
          {items.length === limit && (
            <Link
              href={`/state/${categoryId}?limit=${limit}&offset=${offset + limit}`}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categoryId = parseInt(params.slug, 10);
  if (isNaN(categoryId)) return { title: "State Edition - The Pioneer" };

  const items = await fetchCategoryList(categoryId, { limit: 1, offset: 0 });
  const stateName = items.length > 0 ? (items[0].category || params.slug) : params.slug;
  
  return {
    title: `${stateName} Edition - The Pioneer`,
    description: `Latest news and updates from ${stateName}`,
  };
}
