"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchGalleryImages, mapGalleryImagesToPhotos } from "@/lib/api/images";
import Skeleton from "react-loading-skeleton";


interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  itemsPerPage?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos: initialPhotos = defaultPhotos,
  itemsPerPage = 6,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState(initialPhotos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const items = await fetchGalleryImages({ limit: 50, offset: 0 });
        console.log('Fetched gallery images:', items);
        if (!active) return;
        const mapped = mapGalleryImagesToPhotos(items);
        setPhotos(mapped.length ? mapped : initialPhotos);
        setCurrentPage(1);
      } catch (e: any) {
        if (!active) return;
        console.error('Photo gallery fetch error', e);
        setError(e?.message || 'Failed to load');
        setPhotos(initialPhotos);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [initialPhotos]);

  const totalPages = Math.ceil(photos.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPhotos = photos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  // Smooth scroll to top of gallery on page change (helps on mobile)
  useEffect(() => {
    if (containerRef.current) {
      try {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        // no-op
      }
    }
  }, [currentPage]);

  // Build a condensed, responsive page list with ellipses for larger screens
  const getVisiblePages = (total: number, current: number): Array<number | 'ellipsis'> => {
    const pages: Array<number | 'ellipsis'> = [];
    const showWindow = 1; // number of neighbors to show around current
    const first = 1;
    const last = total;
    const start = Math.max(first + 1, current - showWindow);
    const end = Math.min(last - 1, current + showWindow);

    pages.push(first);
    if (start > first + 1) pages.push('ellipsis');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < last - 1) pages.push('ellipsis');
    if (last > first) pages.push(last);

    // Ensure current is included if it's first/last
    if (!pages.includes(current)) {
      const insertAt = pages[1] === 'ellipsis' ? 1 : 0;
      pages.splice(insertAt + 1, 0, current);
    }
    // Deduplicate and sort order as they were pushed logically
    const seen = new Set<string>();
    const normalized = pages.filter((p) => {
      const key = typeof p === 'number' ? String(p) : p;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return normalized;
  };

  const renderPaginationButton = (page: number, isActive: boolean = false) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-2 mx-1 rounded ${
        isActive 
          ? 'bg-yellow-400 text-black font-semibold' 
          : 'bg-white text-gray-600 hover:bg-gray-100'
      } transition-colors duration-200`}
    >
      {page}
    </button>
  );

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo Gallery</h2>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="rounded overflow-hidden">
              <Skeleton height={0} style={{ paddingBottom: '75%' }} />
              <div className="p-4">
                <Skeleton height={20} width="80%" />
                <div className="mt-2 flex items-center gap-2">
                  <Skeleton height={12} width={80} />
                  <Skeleton height={12} width={12} circle />
                  <Skeleton height={12} width={80} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && !loading && (
        <div className="py-4 mb-4 text-center text-xs text-red-500">{error}</div>
      )}

  {/* Photo Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {currentPhotos.map((photo) => (
          <div
            key={photo.id}
            className={`relative group overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
              photo.featured ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={`${photo.src}`}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category Tag */}
              {/* <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide">
                  {photo.category}
                </span>
              </div> */}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2 leading-tight">
                  {photo.title}
                </h3>
                <div className="flex items-center text-sm opacity-90">
                  <span>By {photo.author}</span>
                  <span className="mx-2">•</span>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <nav
          aria-label="Photo gallery pagination"
          className="flex flex-col items-center gap-3"
        >
          {/* Mobile (compact) */}
          <div className="flex w-full items-center justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border border-gray-200 text-gray-700 disabled:text-gray-300 disabled:border-gray-100"
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border border-gray-200 text-gray-700 disabled:text-gray-300 disabled:border-gray-100"
              aria-label="Next page"
            >
              Next
            </button>
          </div>

          {/* Desktop/Tablet (detailed) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 mx-1 text-gray-600 disabled:text-gray-300 hover:text-gray-800 transition-colors duration-200"
              aria-label="Previous page"
            >
              ‹
            </button>

            {getVisiblePages(totalPages, currentPage).map((p, idx) =>
              p === 'ellipsis' ? (
                <span key={`el-${idx}`} className="mx-1 text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`px-3 py-2 mx-1 rounded ${
                    p === currentPage
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 mx-1 text-gray-600 disabled:text-gray-300 hover:text-gray-800 transition-colors duration-200"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

// Default sample data
const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: '/images/woman-portrait.jpg',
    alt: 'Woman portrait',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS',
    featured: true
  },
  {
    id: 2,
    src: '/images/blurred-figure.jpg',
    alt: 'Blurred figure',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 3,
    src: '/images/man-traditional.jpg',
    alt: 'Man in traditional dress',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 4,
    src: '/images/coffee-scene.jpg',
    alt: 'Coffee and pastries',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 5,
    src: '/images/man-orange.jpg',
    alt: 'Man in orange',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 6,
    src: '/images/man-microphone.jpg',
    alt: 'Man with microphone',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  }
];

export default PhotoGallery;