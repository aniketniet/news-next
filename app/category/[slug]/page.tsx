import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { fetchCategoryList } from "@/lib/api/stories"
import { resolveCategoryId } from "@/lib/taxonomy"
import { notFound } from "next/navigation"

interface Props { params: { slug: string }, searchParams: { limit?: string; offset?: string } }

export const dynamic = "force-dynamic";

export default async function CategoryListingPage({ params, searchParams }: Props) {
  const categoryId = resolveCategoryId(params.slug)
  if (!categoryId) notFound()
  const limit = Number(searchParams.limit ?? 12) || 12
  const offset = Number(searchParams.offset ?? 0) || 0

  const items = await fetchCategoryList(categoryId, { limit, offset })

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <h1 className="text-2xl font-bold mb-4">{params.slug.toUpperCase()}</h1>
          {items.length === 0 && (
            <p className="text-gray-600">No stories found.</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <li key={it.id} className="border  overflow-hidden bg-white hover:shadow transition-shadow">
                <Link href={`/news/${it.id}`} className="block">
                  <div className="relative aspect-[16/9] w-full bg-gray-100">
                    <Image src={ it.image_url_medium || "/news-thumbnail.png"} alt={it.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="inline-flex items-center text-[10px] uppercase tracking-wide font-bold bg-[#FCCD04] text-black px-2 py-1  mb-2">{it.category || params.slug}</span>
                    <h3 className="font-semibold mb-1 line-clamp-2">{it.title}</h3>
                    <p className="text-xs text-gray-500">{it.author ? `By ${it.author} • ` : ''}{new Date(it.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
