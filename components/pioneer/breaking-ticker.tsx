"use client"

type Props = { items: string[] }

export default function BreakingTicker({ items }: Props) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 md:px-6">
        <span className="rounded bg-red-600 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Breaking
        </span>
        <div className="relative w-full overflow-hidden">
          <ul
            aria-live="polite"
            className="flex animate-[ticker_20s_linear_infinite] gap-8 whitespace-nowrap text-sm"
            style={{ paddingLeft: 0 }}
          >
            {items.concat(items).map((t, i) => (
              <li key={i} className="text-gray-800">
                <a href="#" className="hover:underline">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </div>
  )
}
