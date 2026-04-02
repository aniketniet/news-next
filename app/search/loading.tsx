"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-gray-700" aria-live="polite">
                Searching…
              </p>
            </div>
            <span className="sr-only" aria-live="polite">
              Loading search results
            </span>
          </div>

          {/* Heading */}
          <div className="mb-4 flex items-baseline gap-3">
            <Skeleton width={180} height={28} />
            <Skeleton width={120} height={20} />
          </div>

          {/* Results grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-white">
                <Skeleton height={180} />
                <div className="p-4">
                  <Skeleton count={2} height={18} />
                  <Skeleton width={100} height={12} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
