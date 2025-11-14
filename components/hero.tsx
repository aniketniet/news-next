"use client"

import Image from "next/image"
import Link from "next/link"
import { fetchStories, type StorySummary } from "@/lib/api/stories"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Hero now client-fetches top stories and shows skeletons while loading
export function Hero() {
  const [top, setTop] = useState<StorySummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const { top } = await fetchStories({ limit: 12, offset: 0 })
        if (!alive) return
        setTop(top)
      } catch (e) {
        if (!alive) return
        setTop([])
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const [mainStory, ...rest] = top
  const topStories = rest.slice(0, 2)
  const bottomStories = rest.slice(2, 6)
  const featuredSlides = [mainStory, ...topStories].filter(Boolean)

  const getEmbedUrl = (story: StorySummary): string | undefined => {
    const raw = story.video_embed || story.external_url || ""
    if (!raw) return undefined
    const match = raw.match(/https?:\/\/[^\s"']+/)
    return match ? match[0] : undefined
  }

  const getFileUrl = (story: StorySummary): string | undefined => {
    if (!story.video_name) return undefined
    // Note: If backend provides a video base URL, prefer that. Using known uploads path for now.
    return `https://www.dailypioneer.com/uploads/2025/story/video/${story.video_name}`
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top Stories Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#1a59a9] rounded" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-6">
            {/* Large Featured */}
            <div className="lg:col-span-2">
              <Skeleton height={0} style={{ paddingBottom: '62.5%' }} />
            </div>
            {/* Side Stories */}
            <div className="grid grid-rows-2 gap-6">
              <Skeleton height={0} style={{ paddingBottom: '62.5%' }} />
              <Skeleton height={0} style={{ paddingBottom: '62.5%' }} />
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        {!loading && mainStory && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
            {/* Large Featured Article */}
            <article className="lg:col-span-2 relative ">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="relative w-full"
              >
                {featuredSlides.map((story) => {
                  const fileSrc = getFileUrl(story)
                  const embedUrl = getEmbedUrl(story)
                  console.log({ fileSrc, embedUrl }, "fileSrc, embedUrl")
                  const poster = story.image || "/lead-story.png"
                  return (
                    <SwiperSlide key={`feature-${story.id}`}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-l-sm z-10">
                        {fileSrc ? (
                          <video
                            className="h-full w-full object-cover"
                            src={fileSrc}
                            poster={poster || undefined}
                            controls
                            playsInline
                            autoPlay
                          />
                        ) : embedUrl ? (
                          <iframe
                            className="h-full w-full"
                            src={embedUrl}
                            title={story.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            
                          />
                        ) : (
                          <Image
                            src={poster}
                            alt={story.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        )}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> */}
                        <div className="absolute top-4 left-4 pointer-events-none">
                          <span className="bg-[#1a59a9] text-white px-3 rounded py-1 text-xs font-semibold uppercase tracking-wide">
                            {story.category || 'NEWS'}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                          <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2 pointer-events-auto">
                            <Link href={`/news/${story.id}`} className="hover:underline hover:text-white transition-colors pointer-events-auto">
                              {story.title}
                            </Link>
                          </h3>
                          <div className="flex items-center text-sm text-white/80 pointer-events-none">
                            {story.author && <span className="pointer-events-auto">{story.author}</span>}
                            {story.author && <span className="mx-2 pointer-events-none">•</span>}
                            <time className="pointer-events-none">{new Date(story.publishedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</time>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </article>

            {/* Side Stories */}
            <aside className="grid grid-rows-2">
              {topStories.map((story) => (
                <article key={story.id} className="relative group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-r-sm">
                    <Image
                      src={story.image || "/news-image.png"}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#1a59a9] text-white px-2 py-1 text-xs font-semibold rounded uppercase tracking-wide">
                        {story.category || 'NEWS'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
                        <Link href={`/news/${story.id || story.id}`} className="hover:underline hover:text-white transition-colors">
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
        {!loading && bottomStories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bottomStories.map((story) => (
              <article key={story.id} className="group flex flex-col overflow-hidden bg-white transition">
                <div className="relative aspect-[16/10] rounded-sm w-full overflow-hidden">
                  <Image
                    src={story.image_url_medium || story.image || "/news-image.png"}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-2 inline-block w-fit rounded bg-[#1a59a9] text-white px-2 py-1 text-[10px] font-semibold tracking-wide">
                    {story.category || 'NEWS'}
                  </span>
                  <h4 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900">
                    <Link href={`/news/${story.id || story.id}`} className="transition-colors hover:text-[#1a59a9]">
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
