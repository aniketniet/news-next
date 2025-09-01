import Image from "next/image"
import Link from "next/link"

export function Hero() {
  const mainStory = {
    title: "meeting room is empty because of the covid-19 virus",
    category: "COVID-19",
    image: "/lead-story.png",
    author: "David Hall",
    date: "December 09, 2020",
    excerpt: "The pandemic has dramatically changed how businesses operate, with many meeting rooms sitting empty as organizations adapt to remote work policies and social distancing measures."
  }

  const topStories = [
    {
      title: "Barack Obama and Family Visit borobudur temple enjoy holiday indonesia.",
      category: "POLITICS",
      image: "/news-image.png",
      author: "David Hall",
      date: "December 09, 2020",
    },
    {
      title: "A classic and sturdy building with history.",
      category: "POLITICS", 
      image: "/parliament-building.png",
      author: "David Hall",
      date: "December 09, 2020",
    }
  ]

  const bottomStories = [
    {
      title: "Demonstration we already have the best deal",
      category: "POLITICS",
      image: "/news-thumbnail.png", 
      author: "David Hall",
      date: "December 09, 2020",
    },
    {
      title: "formula one have best deal winner sponsor power drink",
      category: "SPORTS",
      image: "/sports-football.png",
      author: "David Hall", 
      date: "December 09, 2020",
    },
    {
      title: "Buy Amazon products in Diwali Big Billion Days",
      category: "BUSINESS",
      image: "/business-market.png",
      author: "David Hall",
      date: "December 09, 2020", 
    },
    {
      title: "Proin eu nisl et arcu iaculis placerat sollicitudin ut est.",
      category: "WORLD",
      image: "/world-summit.png",
      author: "David Hall",
      date: "December 09, 2020",
    }
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top Stories Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
          <div className="mt-2 h-1 w-20 bg-yellow-400"></div>
        </div>

        {/* Main Content Grid - No gaps between items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
          {/* Large Featured Article */}
          <article className="lg:col-span-2 relative">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={mainStory.image || "/placeholder.svg"}
                alt={mainStory.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {mainStory.category}
                </span>
              </div>
              
              {/* Text Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    {mainStory.title}
                  </Link>
                </h3>
                <div className="flex items-center text-sm text-white/80">
                  <span>By {mainStory.author}</span>
                  <span className="mx-2">•</span>
                  <time>{mainStory.date}</time>
                </div>
              </div>
            </div>
          </article>

          {/* Side Stories */}
          <aside className="grid grid-rows-2">
            {topStories.map((story, index) => (
              <article key={index} className="relative group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-semibold uppercase tracking-wide">
                      {story.category}
                    </span>
                  </div>
                  
                  {/* Text Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
                      <Link href="#" className="hover:text-yellow-400 transition-colors">
                        {story.title}
                      </Link>
                    </h4>
                    <div className="flex items-center text-xs text-white/80">
                      <span>By {story.author}</span>
                      <span className="mx-1">•</span>
                      <time>{story.date}</time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </aside>
        </div>

        {/* Bottom Stories Grid - No gaps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bottomStories.map((story, index) => (
            <article
              key={index}
              className="group flex flex-col overflow-hidden   bg-white  transition"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
              </div>

              <div className="flex flex-1 flex-col p-4">
          <span
            className={`mb-2 inline-block w-fit rounded px-2 py-1 text-[10px] font-semibold tracking-wide ${
              story.category === "POLITICS"
                ? "bg-yellow-400 text-black"
                : story.category === "SPORTS"
                ? "bg-blue-600 text-white"
                : story.category === "BUSINESS"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {story.category}
          </span>

          <h4 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900">
            <Link
              href="#"
              className="transition-colors hover:text-yellow-500"
            >
              {story.title}
            </Link>
          </h4>

          <div className="mt-auto flex items-center text-xs text-gray-500">
            <span>By {story.author}</span>
            <span className="mx-1">•</span>
            <time>{story.date}</time>
          </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
