"use client"

import * as React from "react"
import { BusinessCard } from "./business-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollToTopLink } from "./scroll-to-top-link"

type BusinessStory = {
  id: string
  title: string
  category: string
  image: string
  date: string
  urlKey: string
}

type BusinessSliderProps = {
  stories: BusinessStory[]
  title?: string
  seeMoreHref?: string
}

export function BusinessSlider({ stories, title, seeMoreHref }: BusinessSliderProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    setCount(api.scrollSnapList().length)
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  const progress = count > 1 ? ((current + 1) / count) * 100 : 100

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 pb-2">{title}</h2>
        <div className="flex items-center gap-3">
          {seeMoreHref && (
            <ScrollToTopLink
              href={seeMoreHref}
              className="text-sm font-semibold text-black hover:underline"
            >
              See more
            </ScrollToTopLink>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              className="p-1 rounded transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              className="p-1 rounded transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 h-1 w-full bg-gray-200 rounded mb-6 overflow-hidden">
        <div
          className="h-full bg-black rounded transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {stories.map((story) => (
            <CarouselItem
              key={story.id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <BusinessCard
                id ={story.id}
                urlKey={story.urlKey}
                title={story.title}
                category={story.category}
                image={story.image}
                date={story.date}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
