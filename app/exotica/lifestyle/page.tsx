import { ExoticaHeader } from "@/components/exotica/exotica-header";
import { ExoticaFooter } from "@/components/exotica/exotica-footer";
import Link from "next/link";

export default function LifestylePage() {
  const subcategories = [
    { slug: "tech", name: "Tech", description: "Technology and travel innovations" },
    { slug: "beauty", name: "Beauty", description: "Beauty tips and travel essentials" },
    { slug: "style", name: "Style", description: "Fashion and style inspiration" },
    { slug: "trends", name: "Trends", description: "Latest lifestyle trends" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ExoticaHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/exotica" className="hover:text-orange-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Lifestyle</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
              Lifestyle
            </h1>
            <p className="text-gray-600">Explore lifestyle articles and trends</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/exotica/lifestyle/${sub.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-light text-gray-900 mb-3 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'serif' }}>
                  {sub.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{sub.description}</p>
                <div className="text-orange-600 font-medium text-sm group-hover:underline">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <ExoticaFooter />
    </div>
  );
}

