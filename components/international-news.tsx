"use client"

import { useState } from "react"
import { InternationalNewsCard } from "./international-news-card"
import { cn } from "@/lib/utils"

type InternationalNewsStory = {
  id: string
  title: string
  description: string
  image: string
  timeAgo: string
  source: string
  country: string
}

type InternationalNewsProps = {
  stories: InternationalNewsStory[]
}

const countries = [
  { id: "USA", label: "USA", color: "bg-yellow-400" },
  { id: "China", label: "China", color: "bg-gray-200" },
  { id: "UK", label: "UK", color: "bg-gray-200" },
  { id: "Europe", label: "Europe", color: "bg-gray-200" },
]

export function InternationalNews({ stories }: InternationalNewsProps) {
  const [activeCountry, setActiveCountry] = useState("USA")

  // console.log("International News Stories:", stories)
// 
  const filteredStories = stories.filter(story => story.country === activeCountry)
  // console.log("Filtered Stories for country", activeCountry, ":", filteredStories)

  return (
    <section className="w-full">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header with title and country filters */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              International News
            </h2>
            <div className="flex items-center gap-1">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setActiveCountry(country.id)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200",
                    activeCountry === country.id
                      ? country.color + " text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {country.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 bg-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.slice(0, 6).map((story) => (
              <InternationalNewsCard
                id={story.id}
                title={story.title}
                description={story.description}
                image={story.image}
                timeAgo={story.timeAgo}
                source={story.source}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
