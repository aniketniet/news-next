type Item = { title: string; image: string; tag: string }
type Cols = { base: number; md: number; lg: number }

export default function Section({ title, items, columns }: { title: string; items: Item[]; columns: Cols }) {
  const grid = `grid grid-cols-${columns.base} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-6`
  return (
    <section aria-labelledby={title} className="py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 id={title} className="text-xl font-semibold">
          {title}
        </h2>
        <a href="#" className="text-sm text-blue-700 hover:underline">
          More
        </a>
      </div>
      <div className={grid}>
        {items.map((it, idx) => (
          <article key={idx} className="group">
            <a href="#" className="block overflow-hidden rounded bg-gray-100">
              <img
                src={it.image || "/placeholder.svg"}
                alt={`${it.tag} story`}
                className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
              />
            </a>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#1a59a9] px-2 py-0.5 text-[10px] font-semibold text-black">
                {it.tag}
              </span>
              <h3 className="mt-1 text-sm font-semibold leading-snug hover:underline">
                <a href="#">{it.title}</a>
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
