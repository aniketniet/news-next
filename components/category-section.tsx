import Image from "next/image"
import { SecondaryStory } from "./secondary-story"
import { ScrollToTopLink } from "./scroll-to-top-link"

type CategoryStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  featured?: boolean
  urlKey?: string
}

type CategorySectionProps = {
  title: string
  stories: CategoryStory[]
  accentColor?: string
  seeMoreHref?: string
  seeMorePlacement?: "left" | "right"
}

export function CategorySection({ 
  title, 
  stories, 
  accentColor = "bg-black",
  seeMoreHref,
  seeMorePlacement = "right",
}: CategorySectionProps) {
  if (!stories || stories.length === 0) return null
  const featuredStory = stories.find(story => story.featured) || stories[0]
  const secondaryStories = stories
    .filter(story => story.id !== featuredStory.id)
    .slice(0, 4)

  return (
    <section className="w-full">
      <div className="mb-4">
        {seeMorePlacement === "left" ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 inline-block">{title}</h2>
              {seeMoreHref && (
                <ScrollToTopLink
                  href={seeMoreHref}
                  className="text-sm font-semibold text-black hover:underline"
                >
                  See more
                </ScrollToTopLink>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 inline-block">{title}</h2>
            {seeMoreHref && (
              <ScrollToTopLink
                href={seeMoreHref}
                className="text-sm font-semibold text-black hover:underline"
              >
                See more
              </ScrollToTopLink>
            )}
          </div>
        )}
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-black rounded" style={{ width: '20%' }} />
          </div>
      </div>

      {/* Featured Story */}
      <div className="mb-6">
        <article className="group">
          <ScrollToTopLink
            href={`/news/${featuredStory.urlKey || featuredStory.id}`}
            className="block"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-3">
              <Image
                src={featuredStory.image}
                alt={featuredStory.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </ScrollToTopLink>

          <div className="pt-1">
            <h3 className="text-xl font-bold leading-tight text-gray-900">
              <ScrollToTopLink
                href={`/news/${featuredStory.urlKey || featuredStory.id}`}
                className="hover:underline hover:text-gray-900 transition-colors"
              >
                {featuredStory.title}
              </ScrollToTopLink>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{featuredStory.time}</p>
          </div>
        </article>
      </div>

      {/* Secondary Stories Grid */}
      <div className="space-y-4">
        {secondaryStories.map((story) => (
          <SecondaryStory
            key={story.id}
            id={story.id}
            urlKey={story.urlKey}
            title={story.title}
            category={story.category}
            image={story.image}
            byline={story.byline}
            time={story.time}
          />
        ))}
      </div>
    </section>
  )
}
