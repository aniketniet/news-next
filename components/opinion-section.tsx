import { SecondaryStory } from "./secondary-story"
import { ChevronLeft, ChevronRight } from "lucide-react"

type OpinionStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
}

type OpinionSectionProps = {
  title: string
  stories: OpinionStory[]
}

export function OpinionSection({ title, stories }: OpinionSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-yellow-400 pb-1">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stories list */}
      <div className="p-4 space-y-4">
        {stories.map((story) => (
          <SecondaryStory
            key={story.id}
            title={story.title}
            category={story.category}
            image={story.image}
            byline={story.byline}
            time={story.time}
          />
        ))}
      </div>
    </div>
  )
}
