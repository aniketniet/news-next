import { SecondaryStory } from "./secondary-story"
import { ChevronLeft, ChevronRight } from "lucide-react"

type SportsStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
}

type SportsSectionProps = {
  title: string
  stories: SportsStory[]
}

export function SportsSection({ title, stories }: SportsSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between px-4 py-2 ">
        <h3 className="text-lg font-bold text-gray-900 ">
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
         <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>

      {/* Stories list */}
      <div className="p-4 space-y-4">
        {stories.map((story) => (
          <SecondaryStory
            id={story.id}
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
