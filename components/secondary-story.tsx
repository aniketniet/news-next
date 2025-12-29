import Image from "next/image"
import { ScrollToTopLink } from "./scroll-to-top-link"

type SecondaryStoryProps = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  urlKey?: string
}

export function SecondaryStory({
  title,
  category,
  image,
  id,
  byline,
  time,
  urlKey,
}: SecondaryStoryProps) {
  return (
    <article className="flex gap-4 group">
      <ScrollToTopLink href={`/news/${urlKey }`} className="relative block w-24 h-16 flex-shrink-0 overflow-hidden rounded-sm ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="96px"
        />
      </ScrollToTopLink>
      <div className="flex-1 min-w-0">
        {/* <span className="inline-flex items-center text-[9px] uppercase tracking-wide font-bold bg-black text-white px-1.5 py-0.5 rounded mb-1">
          {category}
        </span> */}
        <h4 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">
          <ScrollToTopLink href={`/news/${urlKey}`} className="hover:underline">
            {title}
          </ScrollToTopLink>
        </h4>
        <p className="text-xs text-gray-600">
          By {byline} • {time}
        </p>
      </div>
    </article>
  )
}
