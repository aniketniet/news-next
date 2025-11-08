import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ScrollToTop } from "./scroll-to-top"

type BusinessCardProps = {
  id: string
  title: string
  category: string
  image: string
  date: string
  className?: string
}

export function BusinessCard({
  id,
  title,
  category,
  image,
  date,
  className,
}: BusinessCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/news/${id}`} onClick={ScrollToTop} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden mb-3">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="uppercase font-medium">{category}</span>
            <span>•</span>
            <time>{date}</time>
          </div>
          
          <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
