"use client"

import * as React from "react"
import { VideoCard } from "./video-card"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"

type VideoStory = {
  id: string
  title: string
  image: string
  duration: string
  featured?: boolean
  href?: string
  poster?: string
  src?: string
  embed?: string
  sourceType?: "file" | "embed"
}

type VideosSectionProps = { videos: VideoStory[] }

export function VideosSection({ videos }: VideosSectionProps) {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)

  const syncNav = React.useCallback((s: SwiperType | null) => {
    if (!s) return
    setCanPrev(!s.isBeginning)
    setCanNext(!s.isEnd)
  }, [])

  React.useEffect(() => {
    syncNav(swiper)
  }, [swiper, syncNav])

  return (
    <section className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900 pb-2 inline-block">Videos</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              disabled={!canPrev}
              className="p-1 rounded transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
              aria-label="Previous videos"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              disabled={!canNext}
              className="p-1 rounded transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
              aria-label="Next videos"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-black rounded" style={{ width: '20%' }} />
        </div>
      </div>

      {/* Horizontal slider */}
      <div className="mt-2">
        <Swiper
          onSwiper={(s) => {
            setSwiper(s)
            syncNav(s)
          }}
          onSlideChange={(s) => syncNav(s)}
          onResize={(s) => syncNav(s)}
          watchOverflow
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1280: { slidesPerView: 5, spaceBetween: 16 },
          }}
          className="videos-swiper"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="h-full">
                <VideoCard
                  title={video.title}
                  image={video.image}
                  duration={video.duration}
                  href={video.href || "#"}
                  className="h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .videos-swiper .swiper-wrapper {
            align-items: stretch;
          }
          .videos-swiper .swiper-slide {
            height: auto;
            display: flex;
          }
          .videos-swiper .swiper-slide > div {
            width: 100%;
          }
        `}</style>
      </div>
    </section>
  );
}
