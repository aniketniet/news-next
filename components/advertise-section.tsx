import Link from "next/link";

export function AdvertiseSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#1a59a9] pb-1">
          Advertise
        </h2>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg overflow-hidden">
        <Link href="/advertise" className="block group">
          <div className="relative p-6 text-white text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-block p-2 bg-white/10 rounded-full mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 group-hover:scale-105 transition-transform duration-200">
                CYBER SALE
              </h3>
              <p className="text-lg font-semibold mb-1">
                MASSIVE SAVINGS
              </p>
              <p className="text-sm mb-3">
                THIS WEEKEND ONLY
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-white text-red-600 font-bold rounded-full group-hover:bg-[#1a59a9] group-hover:text-red-700 transition-colors duration-200 text-sm">
                Shop Now
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
