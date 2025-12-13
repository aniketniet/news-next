import type { ReactNode } from "react"

export function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="px-3 md:px-6 py-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-balance">{title}</h3>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded">
              <div className="h-full bg-black rounded" style={{ width: '20%' }} />
            </div>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}
