import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import Skeleton from "react-loading-skeleton";

export default function StateLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Page Header Skeleton */}
        <div className="mb-6">
          <div className="mb-4">
            <Skeleton width={200} height={14} />
          </div>
          <Skeleton width={300} height={36} className="mb-2" />
          <Skeleton width={80} height={4} />
        </div>

        {/* Stories Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Skeleton height={200} />
              <div className="p-4">
                <Skeleton width={80} height={20} className="mb-2" />
                <Skeleton count={2} height={16} className="mb-2" />
                <Skeleton width={120} height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
