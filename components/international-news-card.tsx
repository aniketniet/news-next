import Image from "next/image"
import { cn } from "@/lib/utils"
import { ScrollToTopLink } from "./scroll-to-top-link"

type InternationalNewsCardProps = {
  id: string
  title: string
  description: string
  image: string
  timeAgo: string
  source: string
  className?: string
  urlKey?: string
}

export function InternationalNewsCard({
  id,
  title,
  description,
  image,
  urlKey,
  timeAgo,
  source,
  className,
}: InternationalNewsCardProps) {

  return (
    <article className={cn("group", className)}>
      <ScrollToTopLink href={`/news/${urlKey }`} className="block">
        <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden  mb-3">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <time>{timeAgo}</time>
            <span>|</span>
            <span className="uppercase font-medium">{source}</span>
          </div>
        </div>
      </ScrollToTopLink>
    </article>
  )
}
