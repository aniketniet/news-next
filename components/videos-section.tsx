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
}

type VideosSectionProps = {
  videos: VideoStory[]
}

export function VideosSection({ videos }: VideosSectionProps) {
  const featuredVideo = videos.find(video => video.featured) || videos[0]
  const sideVideos = videos.filter(video => !video.featured).slice(0, 4)

  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 pb-2 inline-block">
          Videos
        </h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#1a59a9] rounded" style={{ width: '20%' }} />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Column - Side Videos (vertically centered) */}
        <div className="flex flex-col justify-center space-y-4">
          {sideVideos.slice(0, 2).map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              image={video.image}
              duration={video.duration}
            />
          ))}
        </div>

        {/* Center Column - Featured Video */}
        <div className="lg:col-span-1">
          <article className="group">
            <Link href="#" className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={featuredVideo.image}
                alt={featuredVideo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              
              {/* Video overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="mb-2">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 w-fit">
                    <div className="w-2 h-2 bg-[#1a59a9] rounded-full"></div>
                    {featuredVideo.duration}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-yellow-300 transition-colors">
                  {featuredVideo.title}
                </h3>
              </div>
            </Link>
          </article>
        </div>

  {/* Right Column - Side Videos (vertically centered) */}
  <div className="flex flex-col justify-center space-y-4">
          {sideVideos.slice(2, 4).map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              image={video.image}
              duration={video.duration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
