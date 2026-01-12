"use client"

import { useState } from "react"

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export default function SiteHeader() {
  const [q, setQ] = useState("")
  const nav = [
    "Home",
    "Nation",
    "World",
    "Business",
    "Sports",
    "Tech",
    "Entertainment",
    "Opinion",
    "Lifestyle",
    "Gallery",
  ]

  return (
    <header className="border-b border-gray-200">
      {/* Top utility bar */}
      <div className="bg-gray-100 text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
          <div className="text-gray-600">Monday, Sep 1, 2025</div>
          <nav className="hidden gap-4 text-gray-700 md:flex">
            <a href="#" className="hover:underline">
              e-Paper
            </a>
            <a href="#" className="hover:underline">
              Subscribe
            </a>
            <a href="#" className="hover:underline">
              Advertise
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="/pioneer" className="block" onClick={scrollToTop}>
          <h1 className="text-2xl font-bold tracking-tight text-black md:text-3xl lg:text-4xl">The Pioneer</h1>
          <span className="sr-only">Go to homepage</span>
        </a>
        <div className="flex w-64 items-center gap-2 md:w-80">
          <input
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
          <button className="rounded bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Search
          </button>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-black">
        <nav aria-label="Primary" className="mx-auto max-w-6xl px-4 md:px-6">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2 text-sm font-medium text-black">
            {nav.map((item) => (
              <li key={item}>
                <a href="#" className="inline-block rounded px-2 py-1 hover:bg-yellow-300" onClick={scrollToTop}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
