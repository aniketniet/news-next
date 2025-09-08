"use client";

import Link from "next/link";
import { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { fetchBreakingNews, mapBreakingTitles } from "@/lib/api/breakingNews";
import { ProfileDropdown } from "./ProfileDropdown";
import { useRouter } from "next/navigation";
import { fetchEpaper, type EpaperLanguage } from "@/lib/api/epaper";

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, ready } = useAuth();
  const router = useRouter();
  const [epaperOpen, setEpaperOpen] = useState(false);
  const [mobileEpaperOpen, setMobileEpaperOpen] = useState(false);
  const [epaperLoading, setEpaperLoading] = useState(false);
  const [epaperError, setEpaperError] = useState<string | null>(null);
  const [epaperData, setEpaperData] = useState<EpaperLanguage[] | null>(null);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setIsMenuOpen(false);
    }
  };

  const ensureEpaperLoaded = async () => {
    if (epaperData || epaperLoading) return;
    try {
      setEpaperLoading(true);
      setEpaperError(null);
      const data = await fetchEpaper();
      setEpaperData(data);
    } catch (e: any) {
      setEpaperError(e?.message || "Failed to load e-paper");
    } finally {
      setEpaperLoading(false);
    }
  };

  const categories = [
    { label: "HOME", href: "/" },
    { label: "INDIA", href: "/section/india" },
    { label: "DELHI", href: "/category/delhi" },
    { label: "BUSINESS", href: "/section/business" },
    { label: "WORLD", href: "/section/world" },
    { label: "SPORTS", href: "/section/sport" },
    { label: "OPINION", href: "/category/opinion" },
    { label: "ANALYTICS", href: "/category/analysis" },
    { label: "POLITICS", href: "/politics" },
    { label: "EDUCATION", href: "/education" },
    { label: "E-PAPER", href: "/e-paper" },
    { label: "TECH", href: "/section/tech" },
    { label: "STATE EDITIONS", href: "/state-editions" },
  ] as const;

  const trending = [
    "LATEST CRICKET NEWS",
    "NARENDRA MODI",
    "RAHUL GANDHI",
    "CP RADHAKRISHNAN",
    "VIRAT KOHLI",
    "LIVE CRICKET SCORE",
    "MUMBAI RAINS",
    "REKHA GUPTA",
    "ROBOT OLYMPICS",
  ];

  const [breakingItems, setBreakingItems] = useState<
    { id: number; title: string; urlKey: string }[]
  >([]);
  const [breakingLoading, setBreakingLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setBreakingLoading(true);
      const data = await fetchBreakingNews(10, 0);
      if (!cancelled) {
        const titles = mapBreakingTitles(data);
        if (titles.length) setBreakingItems(titles);
        else setBreakingItems([]);
        setBreakingLoading(false);
      }
    }
    load();
    // refresh every 5 minutes
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Black Bar - Desktop Only */}
      <div className="hidden lg:block bg-black text-white text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-9">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            {ready &&
              (user ? (
                <ProfileDropdown />
              ) : (
                <Link href="/login" className="hover:underline">
                  Login / Register
                </Link>
              ))}
            <div className="flex items-center gap-2 text-white/80">
              {/* Social Icons */}
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" aria-label="X" className="hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 1200 1227"
                  fill="currentColor"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <form
              onSubmit={onSearchSubmit}
              role="search"
              className="hidden md:flex items-center overflow-hidden rounded-full bg-white text-black"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search something here!"
                className="w-40 xl:w-48 bg-transparent px-3 py-1 text-xs outline-none placeholder:text-gray-400"
                aria-label="Search"
              />
              <button type="submit" className="bg-gray-100 px-3 py-1 text-xs font-medium text-black hover:bg-gray-200">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-gray-100 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 py-2 overflow-hidden">
            <span className="bg-gray-800 text-white px-2 py-1 text-xs font-bold tracking-wide whitespace-nowrap">
              BREAKING NEWS
            </span>
            <div className="flex-1 relative overflow-hidden">
              {breakingLoading && !breakingItems.length ? (
                <div className="text-xs text-gray-500 animate-pulse">
                  Loading breaking news...
                </div>
              ) : breakingItems.length ? (
                <ul className="flex animate-[ticker_30s_linear_infinite] gap-8 whitespace-nowrap text-sm text-gray-700">
                  {breakingItems.concat(breakingItems).map((item, i) => (
                    <li key={`${item.id}-${i}`} className="flex items-center">
                      <Link
                        href={`/news/${item.id}`}
                        className="hover:underline"
                      >
                        {item.title}
                      </Link>
                      {i % breakingItems.length !==
                        breakingItems.length - 1 && (
                        <span className="mx-4">•</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-gray-500">No breaking news</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex flex-col items-start">
                <Image
                  src="/logo.png"
                  alt="The Pioneer"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            {/* States Dropdown */}
            <div className="flex items-center">
              <form
                onSubmit={onSearchSubmit}
                role="search"
                className="hidden sm:flex items-center overflow-hidden rounded-full border border-gray-300 bg-white text-black w-48 sm:w-64 lg:w-80"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search news, topics..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                  aria-label="Search news"
                />
                <button
                  type="submit"
                  className="bg-gray-100 px-3 py-2 text-sm font-medium text-black hover:bg-gray-200"
                  aria-label="Search"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="hidden lg:block bg-[#FCCD04]">
        <div className="mx-auto max-w-7xl">
          <ul className="flex items-center px-4 text-sm font-bold text-black">
            {categories.map((category) => {
              if (category.label === "E-PAPER") {
                return (
                  <li
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => {
                      setEpaperOpen(true);
                      void ensureEpaperLoaded();
                    }}
                    onMouseLeave={() => setEpaperOpen(false)}
                  >
                    <button
                      type="button"
                      className="block px-4 py-3 hover:bg-yellow-300 transition-colors whitespace-nowrap"
                      aria-haspopup="menu"
                      aria-expanded={epaperOpen}
                    >
                      {category.label}
                    </button>

                    {epaperOpen && (
                      <div className="absolute left-0 top-full mt-0.5 w-[min(92vw,480px)] max-h-[70vh] overflow-auto bg-white border shadow-lg rounded-md p-4 z-50">
                        {epaperLoading && (
                          <div className="text-sm text-gray-500 px-2 py-4">Loading editions…</div>
                        )}
                        {epaperError && !epaperLoading && (
                          <div className="text-xs text-red-500 px-2 py-2">{epaperError}</div>
                        )}
                        {epaperData && epaperData.length > 0 && (
          <div className="space-y-4">
                            {epaperData.map((lang) => (
                              <div key={lang.language}>
                                <div className="text-gray-800 font-semibold mb-2">{lang.language}</div>
            <div className="flex flex-col gap-1">
                                  {lang.locations.map((loc) => (
                                    <a
                                      key={`${lang.language}-${loc.location}-${loc.published_date}`}
                                      href={loc.pdf_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
              className="flex items-center gap-3 rounded border border-gray-100 hover:border-gray-200 hover:bg-gray-50 px-3 py-2 text-sm"
                                    >
              <span className="text-gray-700">{loc.location}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {!epaperLoading && (!epaperData || epaperData.length === 0) && !epaperError && (
                          <div className="text-sm text-gray-500 px-2 py-4">No editions available</div>
                        )}
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="block px-4 py-3 hover:bg-yellow-300 transition-colors whitespace-nowrap"
                  >
                    {category.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Trending Topics Bar */}
      <div className="hidden lg:block bg-white border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6 py-2 text-xs overflow-x-auto">
            <span className="font-bold text-gray-800 whitespace-nowrap">
              TRENDING
            </span>
            {trending.map((topic, index) => (
              <Link
                key={topic}
                href="#"
                className="text-gray-600 hover:text-black transition-colors whitespace-nowrap"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t">
          {/* Mobile Search */}
          <div className="p-4 border-b">
            <form onSubmit={onSearchSubmit} className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news, topics..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                aria-label="Search"
              />
              <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300">
                Search
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              {categories.map((category) => {
                if (category.label === "E-PAPER") {
                  return (
                    <li key={category.label} className="border-b border-gray-100">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between py-3 text-gray-800 font-medium"
                        onClick={async () => {
                          const open = !mobileEpaperOpen;
                          setMobileEpaperOpen(open);
                          if (open) await ensureEpaperLoaded();
                        }}
                        aria-expanded={mobileEpaperOpen}
                        aria-controls="mobile-epaper-panel"
                      >
                        <span>{category.label}</span>
                        <span className="text-gray-500">{mobileEpaperOpen ? "−" : "+"}</span>
                      </button>
          {mobileEpaperOpen && (
                        <div id="mobile-epaper-panel" className="pb-3">
                          {epaperLoading && (
                            <div className="text-sm text-gray-500 py-2">Loading editions…</div>
                          )}
                          {epaperError && !epaperLoading && (
                            <div className="text-xs text-red-500 py-2">{epaperError}</div>
                          )}
                          {epaperData && epaperData.length > 0 && (
            <div className="space-y-3">
                              {epaperData.map((lang) => (
                                <div key={`m-${lang.language}`} className="">
                                  <div className="text-gray-800 font-semibold mb-1">{lang.language}</div>
              <div className="flex flex-col gap-1">
                                    {lang.locations.map((loc) => (
                                      <a
                                        key={`m-${lang.language}-${loc.location}-${loc.published_date}`}
                                        href={loc.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                className="flex items-center gap-3 rounded border border-gray-100 hover:border-gray-200 px-3 py-2 text-sm"
                                      >
                <span className="text-gray-700">{loc.location}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {!epaperLoading && (!epaperData || epaperData.length === 0) && !epaperError && (
                            <div className="text-sm text-gray-500 py-2">No editions available</div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={category.label}>
                    <Link
                      href={category.href}
                      className="block py-3 text-gray-800 font-medium border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Trending */}
          <div className="bg-gray-50 p-4">
            <h3 className="font-bold text-sm text-gray-800 mb-3">
              TRENDING TOPICS
            </h3>
            <div className="flex flex-wrap gap-2">
              {trending.map((topic) => (
                <span
                  key={topic}
                  className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-600"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Social & Login */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              {ready &&
                (user ? (
                  <div className="text-sm text-gray-700">
                    Welcome, {user.name}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm text-blue-600 font-medium"
                  >
                    Login / Register
                  </Link>
                ))}
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="text-gray-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="X" className="text-gray-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 1200 1227"
                    fill="currentColor"
                  >
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticker Animation Styles */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
}
