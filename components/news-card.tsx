import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NewsCardProps = {
  title: string;
  category?: string;
  image?: string;
  byline?: string;
  time?: string;
  compact?: boolean;
  className?: string;
  id?: string;
  href?: string;
};

export function NewsCard({
  title,
  category,
  image,
  byline,
  time,
  compact,
  className,
  id,
  href,
}: NewsCardProps) {
  // Use href if provided, otherwise fall back to id
  const linkUrl = href || `/news/${id}`;

  

  return (
    <article className={cn("flex flex-col", className)}>
      <Link
        href={linkUrl}
        className="relative block aspect-[16/9] w-full overflow-hidden rounded"
      >
        <Image
          src={image || "/news-image.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className={cn("pt-2", compact ? "space-y-1" : "space-y-2")}>
        {category ? (
          <span className="inline-flex items-center text-[10px] uppercase tracking-wide font-bold bg-[#1a59a9] text-white px-1.5 py-0.5 rounded">
            {category}
          </span>
        ) : null}
        <h3
          className={cn(
            "font-semibold leading-snug text-pretty",
            compact ? "text-sm" : "text-base"
          )}
        >
          <Link href={linkUrl} className="hover:underline">
            {title}
          </Link>
        </h3>
        {(byline || time) && (
          <p className="text-xs text-gray-600">
            {byline ? <span>{byline}</span> : null}
            {byline && time ? <span>{" • "}</span> : null}
            {time ? <time>{time}</time> : null}
          </p>
        )}
      </div>
    </article>
  );
}
