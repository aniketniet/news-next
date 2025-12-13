import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { fetchSectionList, fetchTrendingNewsList } from "@/lib/api/stories"
import { resolveSectionId } from "@/lib/taxonomy"
import { notFound } from "next/navigation"

interface Props { params: Promise<{ slug: string }>, searchParams: Promise<{ limit?: string; offset?: string }> }

export const dynamic = "force-dynamic";

export default async function SectionListingPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const limit = Number(resolvedSearchParams.limit ?? 12) || 12
  const offset = Number(resolvedSearchParams.offset ?? 0) || 0

  const normalizedSlug = slug.toLowerCase()
  const isTrending = normalizedSlug === "trending" || normalizedSlug === "trending-news"

  const sectionId = isTrending ? undefined : resolveSectionId(slug)
  if (!isTrending && !sectionId) notFound()

  const items = isTrending
    ? await fetchTrendingNewsList({ limit, offset })
    : await fetchSectionList(sectionId as number, { limit, offset })
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <h1 className="text-2xl font-bold mb-4">{slug.toUpperCase()}</h1>
          {items.length === 0 && (
            <p className="text-gray-600">No stories found.</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <li key={it.id} className="border rounded-sm  overflow-hidden bg-white hover:shadow transition-shadow">
                <Link href={`/news/${it.urlKey || it.id}`} className="block">
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image src={it.image_url_medium || "/news-image.jpg"} alt={it.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="inline-flex items-center text-[10px] rounded-sm uppercase tracking-wide font-bold bg-black text-white px-2 py-1  mb-2">{it.category || slug}</span>
                    <h3 className="font-semibold mb-1 line-clamp-2">{it.title}</h3>
                    <p className="text-xs text-gray-500">{it.author ? `By ${it.author} • ` : ''}{new Date(it.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {offset > 0 && (
              <Link
                href={`/section/${slug}?limit=${limit}&offset=${Math.max(0, offset - limit)}`}
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
                href={`/section/${slug}?limit=${limit}&offset=${offset + limit}`}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
