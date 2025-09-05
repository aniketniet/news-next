import Image from "next/image"
import Link from "next/link"
import { fetchStories } from "@/lib/api/stories"

// Hero now self-fetches top stories (first used for main + side + bottom)
export async function Hero() {
  const { top } = await fetchStories({ limit: 12, offset: 0 })
  const [mainStory, ...rest] = top
  const topStories = rest.slice(0, 2)
  const bottomStories = rest.slice(2, 6)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top Stories Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Main Content Grid */}
        {mainStory && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
            {/* Large Featured Article */}
            <article className="lg:col-span-2 relative">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={mainStory.image || "/lead-story.png" || "/placeholder.svg"}
                  alt={mainStory.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {mainStory.category || 'NEWS'}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                    <Link href={`/news/${mainStory.id || mainStory.id}`} className="hover:text-yellow-400 transition-colors">
                      {mainStory.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm text-white/80">
                    {mainStory.author && <span>{mainStory.author}</span>}
                    {mainStory.author && <span className="mx-2">•</span>}
                    <time>{new Date(mainStory.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</time>
                  </div>
                </div>
              </div>
            </article>

            {/* Side Stories */}
            <aside className="grid grid-rows-2">
              {topStories.map((story) => (
                <article key={story.id} className="relative group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={story.image || "/news-image.png"}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-semibold uppercase tracking-wide">
                        {story.category || 'NEWS'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
                        <Link href={`/news/${story.id || story.id}`} className="hover:text-yellow-400 transition-colors">
                          {story.title}
                        </Link>
                      </h4>
                      <div className="flex items-center text-xs text-white/80">
                        {story.author && <span>{story.author}</span>}
                        {story.author && <span className="mx-1">•</span>}
                        <time>{new Date(story.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </aside>
          </div>
        )}

        {/* Bottom Stories Grid */}
        {bottomStories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bottomStories.map((story) => (
              <article key={story.id} className="group flex flex-col overflow-hidden bg-white transition">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={story.image_url_medium || story.image || "/news-image.png"}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-2 inline-block w-fit rounded bg-yellow-400 text-black px-2 py-1 text-[10px] font-semibold tracking-wide">
                    {story.category || 'NEWS'}
                  </span>
                  <h4 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900">
                    <Link href={`/news/${story.id || story.id}`} className="transition-colors hover:text-yellow-500">
                      {story.title}
                    </Link>
                  </h4>
                  <div className="mt-auto flex items-center text-xs text-gray-500">
                    {story.author && <span>{story.author}</span>}
                    {story.author && <span className="mx-1">•</span>}
                    <time>{new Date(story.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
