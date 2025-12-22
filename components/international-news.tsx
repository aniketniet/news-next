"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { InternationalNewsCard } from "./international-news-card"
import { cn } from "@/lib/utils"
import { ScrollToTop } from "./scroll-to-top"

type InternationalNewsStory = {
  id: string
  title: string
  urlKey?: string
  description: string
  image: string
  timeAgo: string
  source: string
  country: string
}

type InternationalNewsProps = {
  stories: InternationalNewsStory[]
  seeMoreHref?: string
}

const countries = [
  { id: "other", label: "Other", color: "bg-black" },
  { id: "1095", label: "Europe", color: "bg-black" },
  { id: "1094", label: "Australia", color: "bg-black" },
  { id: "1093", label: "Africa", color: "bg-black" },
  { id: "1092", label: "South America", color: "bg-black" },
  { id: "1091", label: "North America", color: "bg-black" },
  { id: "1090", label: "Middle East", color: "bg-black" },
  { id: "1089", label: "Asia", color: "bg-black" },
]

export function InternationalNews({ stories, seeMoreHref }: InternationalNewsProps) {
  // Default to 'Other' tab per user request
  const [activeCountry, setActiveCountry] = useState("1089")

  // console.log("International News Stories:", stories)
// 
  const knownIds = useMemo(() => countries.map(c => c.id).filter(id => id !== "1089"), [])
  const filteredStories = useMemo(() => {
    if (activeCountry === "1089") {
      return stories.filter(story => !knownIds.includes(String(story.country)))
    }
    return stories.filter(story => String(story.country) === String(activeCountry))
  }, [stories, activeCountry, knownIds])
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
            <div className="flex items-center gap-3">
              {seeMoreHref && (
                <Link
                  href={seeMoreHref}
                  className="text-sm font-semibold text-black hover:underline"
                  onClick={ScrollToTop}
                >
                  See more
                </Link>
              )}
              <div className="flex items-center gap-1">
                {countries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => setActiveCountry(country.id)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200",
                      activeCountry === country.id
                        ? country.color + " text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.slice(0, 6).map((story) => (
              <InternationalNewsCard
                id={story.id}
                title={story.title}
                urlKey={story.urlKey}
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
