"use client"

import { useEffect, useRef } from "react"

export function BreakingTicker({
  items,
}: {
  items: { title: string; href?: string }[]
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let offset = 0
    let raf = 0
    const step = () => {
      offset = (offset + 0.5) % el.scrollWidth
      el.scrollLeft = offset
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="border-y bg-red-600 text-white">
      <div className="flex items-center gap-2 px-3 md:px-6 h-10">
        <span className="bg-black text-white px-2 py-0.5 text-xs font-bold rounded">Breaking</span>
        <div ref={containerRef} className="flex-1 overflow-x-auto" role="region" aria-label="Breaking news">
          <ul className="flex items-center gap-6">
            {items.map((it, i) => (
              <li key={i} className="text-sm">
                <a href={it.href || "#"} className="hover:underline">
                  {it.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
