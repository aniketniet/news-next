import Link from "next/link"
import { StorySummary } from "@/lib/api/stories"

interface PopularPostsProps {
  top: StorySummary[]
  limit?: number
  offset?: number
}

export function PopularPosts({ top, limit = 6, offset = 0 }: PopularPostsProps) {
  const items = (top || []).slice(offset, offset + limit)

  return (
    <div>
      <div className="px-3 py-2">
        <h3 className="font-semibold text-lg">Popular Post</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
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
              <span className="inline-flex items-center text-[9px] uppercase tracking-wide font-bold px-2 py-1 rounded mb-2 bg-yellow-400 text-black">
                {story.category || 'NEWS'}
              </span>
              <h4 className="text-sm font-semibold leading-tight text-gray-900 hover:text-blue-600 line-clamp-2">
                <Link href={`/news/${story.id || story.id}`} className="hover:underline">
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
