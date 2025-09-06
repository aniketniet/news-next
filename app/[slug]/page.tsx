
import { SiteFooter } from "@/components/footer"
import BreakingTicker from "@/components/pioneer/breaking-ticker"
import Hero from "@/components/pioneer/hero"
import Section from "@/components/pioneer/section"
import Sidebar from "@/components/pioneer/sidebar"
import { SiteHeader } from "@/components/site-header"


export default function PioneerHome() {
  // Data mocks (replace with CMS/API later)
  const heroLead = {
    title: "Monsoon arrives early; relief across the country",
    image: "/news-lead-image.png",
    tag: "Nation",
  }
  const heroSide = [
    { title: "Markets rally as inflation cools", image: "/markets.png", tag: "Business" },
    { title: "Tech policy update: What changes", image: "/interconnected-technology.png", tag: "Tech" },
    { title: "Cup final ends in thriller", image: "/diverse-group-playing-various-sports.png", tag: "Sports" },
    { title: "Global leaders meet for summit", image: "/world.png", tag: "World" },
  ]

  const latest = Array.from({ length: 8 }).map((_, i) => ({
    title: `Latest headline ${i + 1} goes here and wraps neatly`,
    image: `/placeholder.svg?height=160&width=260&query=latest%20${i + 1}`,
    tag: i % 2 ? "City" : "Nation",
  }))

  const nation = Array.from({ length: 6 }).map((_, i) => ({
    title: `Nation story ${i + 1} with brief deck`,
    image: `/placeholder.svg?height=160&width=260&query=nation%20${i + 1}`,
    tag: "Nation",
  }))

  const world = Array.from({ length: 6 }).map((_, i) => ({
    title: `World update ${i + 1} across regions`,
    image: `/placeholder.svg?height=160&width=260&query=world%20${i + 1}`,
    tag: "World",
  }))

  const opinion = Array.from({ length: 4 }).map((_, i) => ({
    title: `Opinion: Perspective ${i + 1}`,
    image: `/placeholder.svg?height=120&width=200&query=opinion%20${i + 1}`,
    tag: "Opinion",
  }))

  return (
    <main>
      <SiteHeader />
    

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Hero lead={heroLead} side={heroSide} />
          </div>
          <aside className="lg:col-span-4">
            <Sidebar />
          </aside>
        </div>

        {/* Leaderboard Ad */}
        <div className="my-6">
          <div className="mx-auto flex h-24 w-full items-center justify-center bg-yellow-300/70 text-center text-sm font-medium text-black">
            Sponsored • Leaderboard 728x90
          </div>
        </div>

        <Section title="Latest" items={latest} columns={{ base: 1, md: 2, lg: 4 }} />
        <Section title="Nation" items={nation} columns={{ base: 1, md: 2, lg: 3 }} />

        {/* Mid-page Ad */}
        <div className="my-6">
          <div className="mx-auto flex h-24 w-full items-center justify-center bg-yellow-300/70 text-center text-sm font-medium text-black">
            Advertisement • 728x90
          </div>
        </div>

        <Section title="World" items={world} columns={{ base: 1, md: 2, lg: 3 }} />

        {/* Opinion strip */}
        <section aria-labelledby="opinion" className="py-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="opinion" className="text-xl font-semibold">
              Opinion
            </h2>
            <a className="text-sm text-blue-700 hover:underline" href="#">
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {opinion.map((item, idx) => (
              <article key={idx} className="group">
                <div className="aspect-[4/3] w-full overflow-hidden rounded bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.tag} illustration`}
                    className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3">
                  <span className="inline-block rounded bg-yellow-400 px-2 py-0.5 text-xs font-medium text-black">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 text-balance text-base font-semibold leading-snug hover:underline">
                    <a href="#">{item.title}</a>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery / Videos teaser */}
        <section aria-labelledby="gallery" className="py-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="gallery" className="text-xl font-semibold">
              Photo & Video
            </h2>
            <a className="text-sm text-blue-700 hover:underline" href="#">
              Explore
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Photo Story", "Video News", "In Pictures"].map((label, i) => (
              <a key={i} href="#" className="group block">
                <div className="aspect-video w-full overflow-hidden rounded bg-gray-100">
                  <img
                    src={`/abstract-geometric-shapes.png?height=220&width=400&query=${encodeURIComponent(label)}`}
                    alt={`${label} teaser`}
                    className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-2 text-sm font-medium">{label}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
