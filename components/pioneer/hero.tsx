type Card = { title: string; image: string; tag: string }

export default function Hero({ lead, side }: { lead: Card; side: Card[] }) {
  return (
    <section aria-labelledby="top-stories">
      <h2 id="top-stories" className="sr-only">
        Top stories
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Lead story */}
        <article className="md:col-span-2">
          <a href="#" className="group block overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lead.image || "/placeholder.svg"}
              alt="Lead story image"
              className="h-72 w-full object-cover transition group-hover:scale-[1.02] md:h-[26rem]"
            />
          </a>
          <div className="mt-3">
            <span className="inline-block  bg-black px-2 py-0.5 text-xs font-medium text-black">
              {lead.tag}
            </span>
            <h3 className="mt-2 text-pretty text-2xl font-bold leading-snug hover:underline">
              <a href="#">{lead.title}</a>
            </h3>
          </div>
        </article>

        {/* Right rail stories */}
        <div className="grid grid-cols-1 gap-4">
          {side.map((s, idx) => (
            <article key={idx} className="grid grid-cols-3 gap-3">
              <a href="#" className="col-span-1 block overflow-hidden rounded bg-gray-100">
                <img
                  src={s.image || "/placeholder.svg"}
                  alt={`${s.tag} thumbnail`}
                  className="h-20 w-full object-cover md:h-24"
                />
              </a>
              <div className="col-span-2">
                <span className="inline-block rounded bg-black px-2 py-0.5 text-[10px] font-semibold text-black">
                  {s.tag}
                </span>
                <h4 className="mt-1 text-sm font-semibold leading-snug hover:underline">
                  <a href="#">{s.title}</a>
                </h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
