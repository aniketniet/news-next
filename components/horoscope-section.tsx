// import Image from "next/image";
// import Link from "next/link";
import { AdvertiseSection } from "./advertise-section";
import { NewsletterSection } from "./newsletter-section";

interface ZodiacSign {
  name: string;
  icon: string;
}

interface HoroscopeData {
  title: string;
  description: string;
  date: string;
  signs: ZodiacSign[];
}

interface HoroscopeSectionProps {
  data: HoroscopeData;
}

export function HoroscopeSection({ data }: HoroscopeSectionProps) {
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-bold text-gray-900  pb-1">
          Horoscope
        </h2>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-black rounded" style={{ width: '20%' }} />
          </div>
      </div> */}

      {/* Main horoscope card */}
      {/* <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200">
      
        <div className="bg-gradient-to-r from-neutral-50 to-white p-4">
          <div className="grid grid-cols-4 gap-3">
            {data.signs.map((sign, index) => (
              <Link
                key={index}
                href={`/horoscope/${sign.name.toLowerCase()}`}
                className="group flex flex-col items-center p-2 rounded-lg bg-white hover:bg-black/5 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <div className="text-xl mb-1 group-hover:scale-110 transition-transform duration-200">
                  {sign.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {sign.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

     
        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-black bg-black/5 rounded-full mb-3">
            {data.date}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
            {data.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {data.description}
          </p>
          <Link
            href="/horoscope"
            className="inline-flex items-center text-sm font-semibold text-black hover:underline underline-offset-4 transition-colors"
          >
            Read Full Horoscope
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </article> */}
      <AdvertiseSection src="/exceed.jpg" />
      <NewsletterSection />
    </div>
  );
}
