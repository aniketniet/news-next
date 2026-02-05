"use client";

import Link from "next/link";
import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { fetchBreakingNews, mapBreakingTitles } from "@/lib/api/breakingNews";
import { ProfileDropdown } from "./ProfileDropdown";
import { useRouter, usePathname } from "next/navigation";
import { fetchEpaper, type EpaperLanguage } from "@/lib/api/epaper";
import { fetchStates, type State } from "@/lib/api/stories";
import { fetchMagazines, type MagazineItem } from "@/lib/api/magazine";
import Skeleton from "react-loading-skeleton";
import { GoogleOneTap } from "./GoogleOneTap";
import LanguageSelector from "./LanguageSelector";

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [epaperOpen, setEpaperOpen] = useState(false);
  const [mobileEpaperOpen, setMobileEpaperOpen] = useState(false);
  const [stateEditionsOpen, setStateEditionsOpen] = useState(false);
  const [mobileStateEditionsOpen, setMobileStateEditionsOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const [mobileMagazineOpen, setMobileMagazineOpen] = useState(false);
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [mobileAgendaOpen, setMobileAgendaOpen] = useState(false);
  const [epaperLoading, setEpaperLoading] = useState(false);
  const [epaperError, setEpaperError] = useState<string | null>(null);
  const [epaperData, setEpaperData] = useState<EpaperLanguage[] | null>(null);
  const [stateEditionsLoading, setStateEditionsLoading] = useState(false);
  const [statesData, setStatesData] = useState<State[]>([]);
  const [epaperDelhi, setEpaperDelhi] = useState<{
    pdfUrl: string;
    language: string;
    date: string;
  } | null>(null);
  const [magazines, setMagazines] = useState<MagazineItem[]>([]);
  const [magazineLoading, setMagazineLoading] = useState(false);
  const [magazineError, setMagazineError] = useState<string | null>(null);

  // Agenda subcategories
  const agendaSubcategories = [
    { id: 1003, name: "Cover Story" },
    { id: 1038, name: "Food" },
    { id: 1001, name: "Travel" },
    { id: 1019, name: "Spirituality" },
    { id: 1011, name: "Book Reviews" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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

  const loadStateEditions = async () => {
    try {
      setStateEditionsLoading(true);
      const states = await fetchStates();
      setStatesData(states);
    } catch (e) {
      console.error('Failed to load state editions', e);
    } finally {
      setStateEditionsLoading(false);
    }
  };

  const loadMagazines = async () => {
    try {
      setMagazineLoading(true);
      setMagazineError(null);
      const data = await fetchMagazines();
      setMagazines(data);
    } catch (e: any) {
      console.error("Failed to load magazines", e);
      setMagazineError(e?.message || "Failed to load magazines");
    } finally {
      setMagazineLoading(false);
    }
  };

  useEffect(() => {
    void ensureEpaperLoaded();
    void loadStateEditions();
    void loadMagazines();
  }, []);

  const categories = [
    { label: "HOME", href: "/" },
    { label: "INDIA", href: "/section/india" },
    { label: "WORLD", href: "/section/world" },
    { label: "BUSINESS", href: "/section/business" },
    { label: "FINANCE & INNOVATION", href: "/section/finance-and-innovation" },
    { label: "IMPACT", href: "/section/impact" },
    {label: "LAW", href: "/section/law-and-justice" },
    { label: "SPORTS", href: "/section/sport" },
    { label: "ENTERTAINMENT", href: "/section/entertainment" },
    { label: "TECH", href: "/section/tech" },
    { label: "OPINION", href: "/category/opinion" },
    { label: "ANALYSIS", href: "/category/analysis" },
    {label : "AGENDA", href: "/section/agenda" },
    // { label: "DELHI", href: "/category/delhi" },
    // { label: "POLITICS", href: "/politics" },
    // { label: "EDUCATION", href: "/education" },
    { label: "STATE EDITIONS", href: "#" },
    { label: "E-PAPER", href: "/e-paper" },
    { label: "MAGAZINE", href: "#" },
  ] as const;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
    <>
      {/* Global Google One Tap overlay for unauthenticated users */}
      <GoogleOneTap />
      <header className="sticky top-0 z-[9999] w-full bg-white">
     

      {/* Main Header */}
      <div className="border-b border-black/10">
        <div className="mx-auto max-w-[90%] px-3 sm:px-4">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Left: Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 lg:flex-1">
              <button
                className="lg:hidden text-black/70 hover:text-black p-2 -ml-2"
                onClick={() => {
                  const next = !isMenuOpen;
                  setIsMenuOpen(next);
                  if (next) setIsSearchOpen(false);
                }}
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
                <span className="hidden lg:block text-xs text-black/70">
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
                    className="hidden lg:block text-xs font-semibold text-black/70 hover:underline underline-offset-4 hover:text-black"
                  >
                    Today's Paper
                  </a>
                ) : (
                  <span className="hidden lg:block text-xs text-black/70">
                    Today's ePaper
                  </span>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="shrink-0" onClick={scrollToTop}>
              <Image
                src="/logo.png"
                alt="The Pioneer"
                width={400}
                height={120}
                className="w-[240px] sm:w-[300px] md:w-[400px] h-auto object-contain"
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
                    className="hidden lg:block text-xs sm:text-sm text-black/80 hover:text-black font-medium"
                  >
                    LOG IN
                  </Link>
                ))}

              {/* Language Translate Button */}
              <LanguageSelector />

              {/* Search Icon */}
              <button
                className="text-black/70 hover:text-black"
                onClick={() => {
                  const next = !isSearchOpen;
                  setIsSearchOpen(next);
                  if (next) setIsMenuOpen(false);
                }}
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
                className="flex items-center rounded border border-black/20 bg-white w-full sm:max-w-2xl mx-auto"
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
                  className="px-3 text-black/60 hover:text-black"
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
      <nav className="hidden lg:block bg-white border-b border-black/10">
        <div className="mx-auto max-w-7xl relative">
          <div className="relative overflow-visible" role="region" aria-label="Primary navigation">
            <ul className="flex flex-nowrap whitespace-nowrap items-center justify-center text-[12px] xl:text-[13px] text-black font-medium tracking-wider px-3">
            {categories.map((category) => {
              if (category.label === 'STATE EDITIONS') {
                const isStateActive = pathname.startsWith('/state/');
                return (
                  <li
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => {
                      setStateEditionsOpen(true);
                      setEpaperOpen(false);
                      setAgendaOpen(false);
                      setMagazineOpen(false);
                    }}
                    onMouseLeave={() => setStateEditionsOpen(false)}
                  >
                    <button
                      type="button"
                      className={`block px-3 py-3 hover:underline underline-offset-4 transition-colors ${
                        isStateActive ? 'font-semibold border-b-2 border-black' : ''
                      }`}
                    >
                      {category.label}
                    </button>
                    {stateEditionsOpen && statesData.length > 0 && (
                      <div
                        className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg min-w-[200px] z-50"
                      >
                        <div className="py-2 grid grid-cols-2 gap-1 px-2">
                          {statesData.map((state) => (
                            <Link
                              key={state.url_key}
                              href={`/state/${state.category_id}`}
                              className="px-2 py-1.5 text-xs text-gray-800 hover:bg-black/5 hover:text-black rounded transition-colors"
                              onClick={() => {
                                setStateEditionsOpen(false);
                                scrollToTop();
                              }}
                            >
                              {state.category_name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              if (category.label === 'E-PAPER') {
                const isEpaperActive = pathname === '/e-paper';
                return (
                  <li
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => {
                      setEpaperOpen(true);
                      setStateEditionsOpen(false);
                      setAgendaOpen(false);
                      setMagazineOpen(false);
                    }}
                    onMouseLeave={() => setEpaperOpen(false)}
                  >
                    <button
                      type="button"
                      className={`block px-3 py-3 hover:underline underline-offset-4 transition-colors ${
                        isEpaperActive ? 'font-semibold border-b-2 border-black' : ''
                      }`}
                    >
                      {category.label}
                    </button>
                    {epaperOpen && (
                      <div
                        className="absolute right-0 top-full bg-white shadow-lg rounded-b-lg min-w-[250px] max-w-[92vw] z-50"
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
                                      className="px-2 py-1.5 text-xs text-gray-800 hover:bg-black/5 hover:text-black rounded transition-colors"
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
              if (category.label === 'AGENDA') {
                const isAgendaActive = pathname.startsWith('/subcategory/');
                return (
                  <li
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => {
                      setAgendaOpen(true);
                      setStateEditionsOpen(false);
                      setEpaperOpen(false);
                      setMagazineOpen(false);
                    }}
                    onMouseLeave={() => setAgendaOpen(false)}
                  >
                    <button
                      type="button"
                      className={`block px-3 py-3 hover:underline underline-offset-4 transition-colors ${
                        isAgendaActive ? 'font-semibold border-b-2 border-black' : ''
                      }`}
                    >
                      {category.label}
                    </button>
                    {agendaOpen && (
                      <div
                        className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg min-w-[180px] z-50"
                      >
                        <div className="py-2">
                          {agendaSubcategories.map((subcat) => (
                            <Link
                              key={subcat.id}
                              href={`/subcategory/${subcat.id}`}
                              className="block px-4 py-2 text-xs text-gray-800 hover:bg-black/5 hover:text-black transition-colors"
                              onClick={() => {
                                setAgendaOpen(false);
                                scrollToTop();
                              }}
                            >
                              {subcat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              if (category.label === 'MAGAZINE') {
                return (
                  <li
                    key={category.label}
                    className="relative"
                    onMouseEnter={() => {
                      setMagazineOpen(true);
                      setStateEditionsOpen(false);
                      setEpaperOpen(false);
                      setAgendaOpen(false);
                    }}
                    onMouseLeave={() => setMagazineOpen(false)}
                  >
                    <button
                      type="button"
                      className="block px-3 py-3 hover:underline underline-offset-4 transition-colors"
                    >
                      {category.label}
                    </button>
                    {magazineOpen && (
                      <div
                        className="absolute right-0 top-full bg-white shadow-lg rounded-b-lg min-w-[180px] max-w-[92vw] z-50"
                      >
                        <div className="py-2">
                          {magazineLoading ? (
                            <div className="px-4 py-2 text-xs text-gray-600">
                              Loading...
                            </div>
                          ) : magazineError ? (
                            <div className="px-4 py-2 text-xs text-red-600">
                              {magazineError}
                            </div>
                          ) : magazines.length ? (
                            magazines.map((mag) => (
                              <a
                                key={mag.magazine_id}
                                href={`https://dailypioneer.com/uploads/magazine/${mag.pdf_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-xs text-gray-800 hover:bg-black/5 hover:text-black transition-colors"
                                download
                              >
                                {mag.magazine_name}
                              </a>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-xs text-gray-600">
                              No magazines available
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    target={(category as any).target}
                    className={`block px-3 py-3 hover:underline underline-offset-4 transition-colors ${
                      isActive(category.href) ? 'font-semibold border-b-2 border-black' : ''
                    }`}
                    onClick={scrollToTop}
                  >
                    {category.label}
                  </Link>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </nav>

       {/* Breaking News Ticker */}
      <div className="bg-white border-b border-black/10 text-xs text-black">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 py-2 overflow-hidden">
            <span className="bg-black text-white px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap">
              BREAKING NEWS
            </span>
            <div className="flex-1 relative overflow-hidden">
              {breakingLoading && !breakingItems.length ? (
                <div className="flex items-center gap-3">
                  <Skeleton height={10} width={160} />
                  <Skeleton height={10} width={200} />
                </div>
              ) : breakingItems.length ? (
                <ul className="flex animate-[ticker_30s_linear_infinite] gap-6 whitespace-nowrap text-black">
                  {breakingItems.concat(breakingItems).map((item, i) => (
                    <li key={`${item.id}-${i}`} className="flex items-center">
                      <Link
                        href={`/news/${item.urlKey || item.id}`}
                        className="hover:underline underline-offset-4 text-[11px] sm:text-sm"
                      >
                        {item.title}
                      </Link>
                      {i % breakingItems.length !==
                        breakingItems.length - 1 && (
                        <span className="mx-2 text-gray-500">•</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-gray-400">No breaking news</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-black/10 animate-in slide-in-from-top">
          <div className="flex max-h-[calc(100dvh-7.5rem)] flex-col">
            <div className="border-b border-black/10 px-4 py-3 shrink-0">
              {ready &&
                (user ? (
                  <div className="text-sm text-black/80">
                    Welcome, {user.name}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm text-black/80 hover:text-black font-medium"
                  >
                    LOG IN
                  </Link>
                ))}
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-2 space-y-1">
              {categories.map((category) => {
                if (category.label === 'STATE EDITIONS') {
                  return (
                    <div key={category.label}>
                      <button
                        onClick={() => {
                          setMobileStateEditionsOpen(!mobileStateEditionsOpen);
                          setMobileEpaperOpen(false);
                          setMobileMagazineOpen(false);
                          setMobileAgendaOpen(false);
                        }}
                        className="w-full flex items-center justify-between py-2 text-black font-medium border-b border-black/10"
                      >
                        <span>{category.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileStateEditionsOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileStateEditionsOpen && statesData.length > 0 && (
                        <div className="pl-4 py-2 bg-gray-50/50 rounded-md my-1">
                          <div className="grid grid-cols-2 gap-2">
                            {statesData.map((state) => (
                              <Link
                                key={state.url_key}
                                href={`/state/${state.category_id}`}
                                className="text-xs text-black/80 hover:text-black hover:underline underline-offset-4 py-1.5"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileStateEditionsOpen(false);
                                  scrollToTop();
                                }}
                              >
                                {state.category_name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                if (category.label === 'AGENDA') {
                  return (
                    <div key={category.label}>
                      <button
                        onClick={() => {
                          setMobileAgendaOpen(!mobileAgendaOpen);
                          setMobileStateEditionsOpen(false);
                          setMobileEpaperOpen(false);
                          setMobileMagazineOpen(false);
                        }}
                        className="w-full flex items-center justify-between py-2 text-black font-medium border-b border-black/10"
                      >
                        <span>{category.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileAgendaOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileAgendaOpen && (
                        <div className="pl-4 py-2 space-y-2 bg-gray-50/50 rounded-md my-1">
                          {agendaSubcategories.map((subcat) => (
                            <Link
                              key={subcat.id}
                              href={`/subcategory/${subcat.id}`}
                              className="block text-xs text-black/80 hover:text-black hover:underline underline-offset-4 py-1.5"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setMobileAgendaOpen(false);
                                scrollToTop();
                              }}
                            >
                              {subcat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                if (category.label === 'E-PAPER') {
                  return (
                    <div key={category.label}>
                      <button
                        onClick={() => {
                          setMobileEpaperOpen(!mobileEpaperOpen);
                          setMobileStateEditionsOpen(false);
                          setMobileAgendaOpen(false);
                          setMobileMagazineOpen(false);
                        }}
                        className="w-full flex items-center justify-between py-2 text-black font-medium border-b border-black/10"
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
                        <div className="pl-4 py-2 space-y-3 bg-gray-50/50 rounded-md my-1">
                          {epaperLoading ? (
                            <div className="text-sm text-gray-600">Loading...</div>
                          ) : epaperError ? (
                            <div className="text-sm text-red-600">{epaperError}</div>
                          ) : epaperData && epaperData.length > 0 ? (
                            epaperData.map((lang) => (
                              <div key={lang.language} className="mb-3 last:mb-0">
                                <div className="text-xs font-bold text-gray-900 mb-1.5">
                                  {lang.language}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {lang.locations.map((loc) => (
                                    <a
                                      key={loc.location}
                                      href={loc.pdf_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-black/80 hover:text-black hover:underline underline-offset-4 py-1"
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
                if (category.label === 'MAGAZINE') {
                  return (
                    <div key={category.label}>
                      <button
                        onClick={() => {
                          setMobileMagazineOpen(!mobileMagazineOpen);
                          setMobileStateEditionsOpen(false);
                          setMobileEpaperOpen(false);
                          setMobileAgendaOpen(false);
                        }}
                        className="w-full flex items-center justify-between py-2 text-black font-medium border-b border-black/10"
                      >
                        <span>{category.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileMagazineOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileMagazineOpen && (
                        <div className="pl-4 py-2 space-y-2 bg-gray-50/50 rounded-md my-1">
                          {magazineLoading ? (
                            <div className="text-xs text-gray-600">
                              Loading...
                            </div>
                          ) : magazineError ? (
                            <div className="text-xs text-red-600">
                              {magazineError}
                            </div>
                          ) : magazines.length ? (
                            magazines.map((mag) => (
                              <a
                                key={mag.magazine_id}
                                href={`https://dailypioneer.com/magazine/${mag.pdf_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs text-black/80 hover:text-black hover:underline underline-offset-4 py-1.5"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileMagazineOpen(false);
                                }}
                                download
                              >
                                {mag.magazine_name}
                              </a>
                            ))
                          ) : (
                            <div className="text-xs text-gray-600">
                              No magazines available
                            </div>
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
                    target={(category as any).target}
                    className="block py-2 text-black font-medium border-b border-black/10"
                    onClick={() => {
                      setIsMenuOpen(false);
                      scrollToTop();
                    }}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </nav>
          </div>
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
    </>
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
