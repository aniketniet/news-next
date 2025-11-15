"use client";

import Link from "next/link";
import { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { fetchBreakingNews, mapBreakingTitles } from "@/lib/api/breakingNews";
import { ProfileDropdown } from "./ProfileDropdown";
import { useRouter } from "next/navigation";
import { fetchEpaper, type EpaperLanguage } from "@/lib/api/epaper";
import Skeleton from "react-loading-skeleton";

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout, ready } = useAuth();
  const router = useRouter();
  const [epaperOpen, setEpaperOpen] = useState(false);
  const [mobileEpaperOpen, setMobileEpaperOpen] = useState(false);
  const [epaperLoading, setEpaperLoading] = useState(false);
  const [epaperError, setEpaperError] = useState<string | null>(null);
  const [epaperData, setEpaperData] = useState<EpaperLanguage[] | null>(null);
  const [epaperDelhi, setEpaperDelhi] = useState<{
    pdfUrl: string;
    language: string;
    date: string;
  } | null>(null);
  

 

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const ensureEpaperLoaded = async () => {
    if (epaperData || epaperLoading) return;
    try {
      setEpaperLoading(true);
      setEpaperError(null);
      const data = await fetchEpaper();
      setEpaperData(data);
      setEpaperDelhi(pickDelhiEdition(data));
    } catch (e: any) {
      setEpaperError(e?.message || "Failed to load e-paper");
    } finally {
      setEpaperLoading(false);
    }
  };

  useEffect(() => {
    void ensureEpaperLoaded();
  }, []);

  const categories = [
    { label: "HOME", href: "/" },
    { label: "INDIA", href: "/section/india" },
    { label: "DELHI", href: "/category/delhi" },
    { label: "BUSINESS", href: "/section/business" },
    { label: "WORLD", href: "/section/world" },
    { label: "SPORTS", href: "/section/sport" },
    { label: "OPINION", href: "/category/opinion" },
    { label: "ANALYTICS", href: "/category/analysis" },
    // { label: "POLITICS", href: "/politics" },
    // { label: "EDUCATION", href: "/education" },
    { label: "E-PAPER", href: "/e-paper" },
    { label: "TECH", href: "/section/tech" },
    { label: "EXOTICA", href: "/exotica" },
  ] as const;

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
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Breaking News Ticker */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 py-2 overflow-hidden">
            <span className="bg-gray-800 text-white px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap rounded">
              BREAKING NEWS
            </span>
            <div className="flex-1 relative overflow-hidden">
              {breakingLoading && !breakingItems.length ? (
                <div className="flex items-center gap-3">
                  <Skeleton height={10} width={160} />
                  <Skeleton height={10} width={200} />
                </div>
              ) : breakingItems.length ? (
                <ul className="flex animate-[ticker_30s_linear_infinite] gap-6 whitespace-nowrap text-gray-700">
                  {breakingItems.concat(breakingItems).map((item, i) => (
                    <li key={`${item.id}-${i}`} className="flex items-center">
                      <Link
                        href={`/news/${item.id}`}
                        className="hover:underline text-[11px] sm:text-sm"
                      >
                        {item.title}
                      </Link>
                      {i % breakingItems.length !==
                        breakingItems.length - 1 && (
                        <span className="mx-2 text-gray-400">•</span>
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
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Left: Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 lg:flex-1">
              <button
                className="lg:hidden text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
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
              <div className="flex flex-col gap-2">
                {/* Date (Desktop only) */}
                <span className="hidden lg:block text-xs text-gray-600">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {epaperDelhi?.pdfUrl ? (
                  <a
                    href={epaperDelhi.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="hidden lg:block text-xs font-semibold text-gray-600 hover:underline hover:text-black"
                  >
                    Today's Paper
                  </a>
                ) : (
                  <span className="hidden lg:block text-xs text-gray-600">
                    Today's ePaper
                  </span>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="The Pioneer"
                width={320}
                height={100}
                className="w-[200px] sm:w-[250px] md:w-[320px] h-auto object-contain"
              />
            </Link>

            {/* Right: Login & Search */}
            <div className="flex items-center gap-3 lg:flex-1 justify-end">
              {ready &&
                (user ? (
                  <div className="hidden lg:block">
                    <ProfileDropdown />
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="hidden lg:block text-xs sm:text-sm text-gray-700 hover:text-black font-medium"
                  >
                    LOG IN
                  </Link>
                ))}

              {/* Search Icon */}
              <button
                className="text-gray-700 hover:text-black"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-3 animate-in fade-in slide-in-from-top duration-200">
              <form
                onSubmit={onSearchSubmit}
                className="flex items-center rounded border border-gray-300 bg-white w-full sm:max-w-2xl mx-auto"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 text-sm sm:text-base outline-none placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 text-gray-600 hover:text-black"
                >
                  <svg
                    className="h-5 w-5"
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
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-[#1a59a9]">
        <div className="mx-auto max-w-7xl">
          <ul className="flex flex-wrap items-center justify-center text-[13px] xl:text-sm text-white font-semibold">
            {categories.map((category) => {
              if (category.label === 'E-PAPER') {
                return (
                  <li key={category.label} className="relative group">
                    <button
                      className="block px-3 py-3 hover:bg-blue-900 transition-colors"
                      onMouseEnter={() => setEpaperOpen(true)}
                      onMouseLeave={() => setEpaperOpen(false)}
                    >
                      {category.label}
                    </button>
                    {epaperOpen && (
                      <div
                        className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg min-w-[250px] z-50"
                        onMouseEnter={() => setEpaperOpen(true)}
                        onMouseLeave={() => setEpaperOpen(false)}
                      >
                        {epaperLoading ? (
                          <div className="p-4 text-gray-600 text-sm">Loading...</div>
                        ) : epaperError ? (
                          <div className="p-4 text-red-600 text-sm">{epaperError}</div>
                        ) : epaperData && epaperData.length > 0 ? (
                          <div className="py-2">
                            {epaperData.map((lang) => (
                              <div key={lang.language} className="border-b border-gray-100 last:border-0">
                                <div className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-50">
                                  {lang.language}
                                </div>
                                <div className="grid grid-cols-2 gap-1 px-2 py-1">
                                  {lang.locations.map((loc) => (
                                    <a
                                      key={loc.location}
                                      href={loc.pdf_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors"
                                    >
                                      {loc.location}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-gray-600 text-sm">No e-paper available</div>
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
                    className="block px-3 py-3 hover:bg-blue-900 transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top">
          <div className="border-b border-gray-200 px-4 py-3">
            {ready &&
              (user ? (
                <div className="text-sm text-gray-700">
                  Welcome, {user.name}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-black font-medium"
                >
                  LOG IN
                </Link>
              ))}
          </div>
          <nav className="px-4 py-2 space-y-1">
            {categories.map((category) => {
              if (category.label === 'E-PAPER') {
                return (
                  <div key={category.label}>
                    <button
                      onClick={() => setMobileEpaperOpen(!mobileEpaperOpen)}
                      className="w-full flex items-center justify-between py-2 text-gray-800 font-medium border-b border-gray-100"
                    >
                      <span>{category.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileEpaperOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileEpaperOpen && (
                      <div className="pl-4 py-2 space-y-2">
                        {epaperLoading ? (
                          <div className="text-sm text-gray-600">Loading...</div>
                        ) : epaperError ? (
                          <div className="text-sm text-red-600">{epaperError}</div>
                        ) : epaperData && epaperData.length > 0 ? (
                          epaperData.map((lang) => (
                            <div key={lang.language} className="mb-3">
                              <div className="text-xs font-semibold text-gray-800 mb-1">
                                {lang.language}
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {lang.locations.map((loc) => (
                                  <a
                                    key={loc.location}
                                    href={loc.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {loc.location}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-600">No e-paper available</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={category.label}
                  href={category.href}
                  className="block py-2 text-gray-800 font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

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
      {/* Helper for Delhi edition selection */}
    </header>
  );
}

function pickDelhiEdition(
  data: EpaperLanguage[] | null
): { pdfUrl: string; language: string; date: string } | null {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const normEq = (a: string, b: string) =>
    a.trim().toLowerCase() === b.trim().toLowerCase();
  const english = data.find((d) => normEq(d.language, "English Edition"));
  const englishDelhi = english?.locations.find((l) =>
    normEq(l.location, "Delhi")
  );
  if (englishDelhi) {
    return {
      pdfUrl: englishDelhi.pdf_url,
      language: "English",
      date: englishDelhi.published_date,
    };
  }
  for (const lang of data) {
    const match = lang.locations.find((l) => normEq(l.location, "Delhi"));
    if (match)
      return {
        pdfUrl: match.pdf_url,
        language: lang.language,
        date: match.published_date,
      };
  }
  return null;
}
