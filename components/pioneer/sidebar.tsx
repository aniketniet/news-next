export default function Sidebar() {
  return (
    <div className="space-y-6">
      {/* e-Paper */}
      <section aria-labelledby="epaper">
        <h2 id="epaper" className="mb-2 text-base font-semibold">
          e-Paper
        </h2>
        <a href="#" className="block overflow-hidden rounded border border-gray-200">
          <img src="/e-paper-preview.png" alt="e-Paper preview" className="h-56 w-full object-cover" />
        </a>
      </section>

      {/* Newsletter */}
      <section aria-labelledby="newsletter" className="rounded border border-gray-200 p-4">
        <h2 id="newsletter" className="text-base font-semibold">
          Newsletter
        </h2>
        <p className="mt-1 text-sm text-gray-600">Get the top headlines delivered daily.</p>
        <form className="mt-3 flex gap-2">
          <input
            type="email"
            required
            placeholder="Your email"
            className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
          <button type="submit" className="rounded bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Subscribe
          </button>
        </form>
      </section>

      {/* Ad card */}
      <section aria-label="Advertisement">
        <div className="flex h-64 w-full items-center justify-center rounded bg-yellow-300/70 text-center text-sm font-medium text-black">
          Advertisement • 300x250
        </div>
      </section>
    </div>
  )
}
