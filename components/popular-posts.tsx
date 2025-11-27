import Link from "next/link"
import { StorySummary } from "@/lib/api/stories"
import { ScrollToTop } from "./scroll-to-top"

interface PopularPostsProps {
  popular: StorySummary[]
  limit?: number // optional override
}

export function PopularPosts({ popular, limit }: PopularPostsProps) {
  const effectiveLimit = typeof limit === 'number' && limit > 0 ? limit : 6
  const items = (popular || []).slice(0, effectiveLimit)

  return (
    <div>
      <div className="px-3 py-2">
        <h3 className="font-semibold text-lg">Popular Post</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-[#1a59a9] rounded" style={{ width: '20%' }} />
        </div>
      </div>
      <div className="p-3 space-y-4">
        {items.length === 0 && (
          <p className="text-xs text-gray-500">No stories available.</p>
        )}
        {items.map((story, index) => (
          <div key={story.id} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center text-[9px] uppercase tracking-wide font-bold px-2 py-1 rounded mb-2 bg-[#1a59a9] text-white">
                {story.category || 'NEWS'}
              </span>
              <h4 className="text-sm font-semibold leading-tight text-gray-900 hover:text-blue-600 line-clamp-2">
                <Link href={`/news/${story.urlKey}`} onClick={ScrollToTop} className="hover:underline">
                  {story.title}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
