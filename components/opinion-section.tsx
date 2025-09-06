'use client'
import { useRef } from "react"
import { SecondaryStory } from "./secondary-story"
import { ChevronUp, ChevronDown } from "lucide-react"

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
  const listRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = (amount: number) => {
    const el = listRef.current
    if (!el) return
    el.scrollBy({ top: amount, behavior: "smooth" })
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-yellow-400 pb-1">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <button
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Scroll up"
            onClick={() => scrollByAmount(-300)}
          >
            <ChevronUp className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Scroll down"
            onClick={() => scrollByAmount(300)}
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stories list */}
      <div
        ref={listRef}
        className="p-4 space-y-4 max-h-96 overflow-y-auto scroll-smooth"
      >
        {stories.map((story) => (
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
    </div>
  )
}
