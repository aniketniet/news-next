"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SectionLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          {/* Title skeleton */}
          <div className="mb-4">
            <Skeleton width={180} height={28} />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-white">
                <Skeleton height={180} />
                <div className="p-4">
                  <Skeleton width={80} height={18} className="mb-2" />
                  <Skeleton count={2} height={18} />
                  <Skeleton width={120} height={12} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
