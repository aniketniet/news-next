import { NewsCard } from "@/components/news-card"
import { StateEditions } from "@/components/state-editions"
import Image from "next/image"

type MainContentProps = {
  nation: Array<{
    title: string
    category: string
    image: string
    time: string
  }>
  world: Array<{
    title: string
    category: string
    image: string
    time: string
  }>
  opinion: Array<{
    title: string
    category: string
    image: string
    time: string
  }>
}

export function MainContent({ nation, world, opinion }: MainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* State Editions */}
      <StateEditions />
    </div>
  )
}
