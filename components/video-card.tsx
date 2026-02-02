import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type VideoCardProps = {
  title: string
  image: string
  duration: string
  className?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
}

export function VideoCard({
  title,
  image,
  duration,
  className,
  href = "#",
  onClick,
}: VideoCardProps) {
  const hasDuration = Boolean(duration && duration.trim().length > 0)
  return (
  <article className={cn("flex flex-col group h-full rounded-md", className)} onClick={onClick}>
      <Link href={href} className="relative block aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Video overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-colors duration-300">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
        
        {/* Duration badge */}
        {hasDuration && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full" aria-hidden="true" />
              {duration}
            </span>
          </div>
        )}
      </Link>
      
      <div className="pt-3 flex-1">
        <h3 className="font-medium leading-snug text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-11">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
      </div>
    </article>
  )
}
