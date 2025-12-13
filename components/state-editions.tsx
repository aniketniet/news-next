"use client"
import Link from "next/link"
import { StorySummary } from "@/lib/api/stories"
import { useState } from "react"
import { ScrollToTop } from "./scroll-to-top"

interface StateEditionsProps {
  stateEditions?: Record<string, StorySummary[] | undefined>
}

export function StateEditions({ stateEditions }: StateEditionsProps) {
  const safe = stateEditions && typeof stateEditions === 'object' ? stateEditions : {}
  const stateNames = Object.keys(safe)
  const [active, setActive] = useState(stateNames[0] || '')
  const activeStories = (safe[active] as StorySummary[] | undefined) || []

  return (
    <div className="lg:col-span-2 space-y-8 h-full flex flex-col">
      <div>
        <h3 className="text-lg md:text-xl font-semibold">State Editions</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-black rounded" style={{ width: '20%' }} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="space-y-2">
          {stateNames.length === 0 && (
            <p className="text-xs text-gray-500">No state editions available.</p>
          )}
          {stateNames.map((state) => (
            <button
              type="button"
              key={state}
              onClick={() => setActive(state)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                active === state ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 space-y-4">
          {activeStories.length > 0 ? (
            <>
              <article className="space-y-2">
                <h4 className="text-base font-semibold leading-tight">
                  {activeStories[0] && (
                    <Link href={`/news/${activeStories[0].urlKey || activeStories[0].id}`} onClick={ScrollToTop} className="hover:text-blue-600">
                      {activeStories[0].title}
                    </Link>
                  )}
                </h4>
                <p className="text-xs text-gray-600">
                  {activeStories[0]?.publishedDate ? new Date(activeStories[0].publishedDate).toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric'}) : ''}
                </p>
              </article>
              <div className="space-y-3">
                {activeStories.slice(1).map(s => (
                  <h5 key={s.id} className="text-sm font-medium leading-tight">
                    <Link href={`/news/${s.urlKey || s.id}`} onClick={ScrollToTop} className="hover:text-blue-600">
                      {s.title}
                    </Link>
                  </h5>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500">{stateNames.length ? 'No stories for this state.' : ''}</p>
          )}
        </div>
      </div>
    </div>
  )
}
