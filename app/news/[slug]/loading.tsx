"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NewsDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article skeleton */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton width={90} height={24} />
                <Skeleton width={120} height={16} />
              </div>
              <Skeleton height={36} count={2} />
              <Skeleton height={16} width={180} />
              <Skeleton height={360} />
              <Skeleton height={16} count={6} />
            </div>

            {/* Sidebar skeleton with AD placeholder */}
            <div className="lg:col-span-1 space-y-8">
              {/* Latest News block */}
              <div className="bg-white border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <Skeleton width={140} height={20} />
                </div>
                <div className="p-4 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton width={80} height={64} />
                      <div className="flex-1">
                        <Skeleton width={60} height={16} />
                        <Skeleton height={16} count={2} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement placeholder */}
              <div className="rounded-lg border border-gray-200 p-4 text-center">
                <div className="mb-2 text-xs text-gray-500">Advertisement</div>
                <Skeleton height={180} />
              </div>

              {/* Popular News block */}
              <div className="bg-white border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <Skeleton width={140} height={20} />
                </div>
                <div className="p-4 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton width={80} height={64} />
                      <div className="flex-1">
                        <Skeleton width={60} height={16} />
                        <Skeleton height={16} count={2} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related block skeleton */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden bg-white">
                  <Skeleton height={160} />
                  <div className="p-4">
                    <Skeleton width={60} height={18} />
                    <Skeleton height={18} count={2} />
                    <Skeleton width={100} height={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
