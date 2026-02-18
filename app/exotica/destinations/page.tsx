import { ExoticaHeader } from "@/components/exotica/exotica-header";
import { ExoticaFooter } from "@/components/exotica/exotica-footer";
import Link from "next/link";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ExoticaHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/exotica" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Destinations</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
              Destinations
            </h1>
            <p className="text-gray-600">Explore travel destinations around the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <Link
              href="/exotica/destinations/national"
              className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'serif' }}>
                National
              </h2>
              <p className="text-gray-600 mb-4">Discover beautiful destinations within India</p>
              <div className="text-orange-600 font-medium group-hover:underline">
                Explore →
              </div>
            </Link>

            <Link
              href="/exotica/destinations/international"
              className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'serif' }}>
                International
              </h2>
              <p className="text-gray-600 mb-4">Explore destinations around the globe</p>
              <div className="text-orange-600 font-medium group-hover:underline">
                Explore →
              </div>
            </Link>
          </div>
        </div>
      </main>
      <ExoticaFooter />
    </div>
  );
}

