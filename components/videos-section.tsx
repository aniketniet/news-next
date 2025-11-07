"use client"

import { useMemo, useState } from "react"
import { VideoCard } from "./video-card"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

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
  const initial = useMemo(() => videos.find(v => v.featured) || videos[0], [videos])
  const [selected, setSelected] = useState<VideoStory | undefined>(initial)
  const sideVideos = useMemo(
    () => videos.filter(v => v.id !== (selected?.id || initial?.id)).slice(0, 4),
    [videos, selected, initial]
  )

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 pb-2 inline-block">Videos</h2>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-[#1a59a9] rounded" style={{ width: '20%' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-4">
          {sideVideos.slice(0, 2).map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              image={video.image}
              duration={video.duration}
              href={video.href || '#'}
              onClick={(e) => {
                e.preventDefault();
                setSelected(video);
              }}
            />
          ))}
        </div>

        {/* Center Featured Player */}
        <div className="lg:col-span-1">
          <article className="group">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-black">
              {selected?.sourceType === 'file' && selected?.src ? (
                <video
                  key={selected.src}
                  controls
                  poster={selected.poster}
                  className="w-full h-full"
                  src={selected.src}
                />
              ) : selected?.embed ? (
                <iframe
                  key={selected.embed}
                  src={selected.embed}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  title={selected.title}
                />
              ) : selected ? (
                <Link href={selected.href || '#'} className="relative block w-full h-full">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>
            <div className="mt-3">
              <h3 className="text-gray-900 font-semibold text-lg leading-tight">
                {selected?.title}
              </h3>
            </div>
          </article>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center space-y-4">
          {sideVideos.slice(2, 4).map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              image={video.image}
              duration={video.duration}
              href={video.href || '#'}
              onClick={(e) => {
                e.preventDefault();
                setSelected(video);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
