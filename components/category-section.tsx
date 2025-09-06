import Image from "next/image"
import Link from "next/link"
import { SecondaryStory } from "./secondary-story"

type CategoryStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  featured?: boolean
}

type CategorySectionProps = {
  title: string
  stories: CategoryStory[]
  accentColor?: string
}

export function CategorySection({ 
  title, 
  stories, 
  accentColor = "bg-[#FCCD04]" 
}: CategorySectionProps) {
  const featuredStory = stories.find(story => story.featured) || stories[0]
  const secondaryStories = stories.filter(story => !story.featured).slice(0, 4)

  return (
    <section className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 inline-block">
          {title}
        </h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
      </div>

      {/* Featured Story */}
      <div className="mb-6">
        <article className="relative group">
          <Link href="#" className="block">
            <div className="relative aspect-[16/9] w-full overflow-hidden  mb-3">
              <Image
                src={featuredStory.image}
                alt={featuredStory.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className={`inline-flex items-center text-xs uppercase tracking-wide font-bold ${accentColor} text-black px-2 py-1 rounded mb-2`}>
                  {featuredStory.category}
                </span>
                <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#FCCD04] transition-colors">
                  {featuredStory.title}
                </h3>
                <p className="text-sm opacity-90">
                  By {featuredStory.byline} • {featuredStory.time}
                </p>
              </div>
            </div>
          </Link>
        </article>
      </div>

      {/* Secondary Stories Grid */}
      <div className="space-y-4">
        {secondaryStories.map((story) => (
          <SecondaryStory
            key={story.id}
            id={story.id}
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
