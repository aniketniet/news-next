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

      {/* Nation */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold">Nation</h3>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            More
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {nation.map((n, i) => (
            <NewsCard key={i} {...n} />
          ))}
        </div>
      </div> */}

      {/* World */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold">World</h3>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            More
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {world.map((w, i) => (
            <NewsCard key={i} {...w} />
          ))}
        </div>
      </div> */}

      {/* Ad Banner */}
      {/* <div className="w-full">
        <div className="relative w-full aspect-[24/5] rounded border overflow-hidden">
          <Image
            src="/leaderboard-728x90.png"
            alt="Advertisement banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-1">Advertisement</p>
      </div> */}

      {/* Opinion Strip */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold">
            Opinion & Editorials
          </h3>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            More
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {opinion.map((o, i) => (
            <NewsCard key={i} {...o} compact />
          ))}
        </div>
      </div> */}
    </div>
  )
}
