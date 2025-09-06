import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { searchNews } from "@/lib/api/search"

export const dynamic = "force-dynamic"

interface SearchPageProps {
  searchParams: { q?: string; limit?: string; offset?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams.q || "").trim()
  const limit = Number(searchParams.limit ?? 10) || 10
  const offset = Number(searchParams.offset ?? 0) || 0
  const results = q ? await searchNews(q, limit, offset) : []

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <h1 className="text-2xl font-bold mb-4">Search results for: <span className="text-gray-600">{q || ""}</span></h1>
          {!q && (
            <p className="text-gray-600">Type a query in the header search box to find news.</p>
          )}
          {!!q && results.length === 0 && (
            <p className="text-gray-600">No results found.</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <li key={`${item.id}-${item.urlKey}`} className="border rounded-lg overflow-hidden bg-white hover:shadow transition-shadow">
                <Link href={`/news/${item.id}`} className="block">
                  <div className="relative aspect-[16/9] w-full bg-gray-100">
                    <Image src={item.image || "/news-thumbnail.png"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(item.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
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
