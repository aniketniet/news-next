import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { fetchBystanders, mapBystandersToGallery } from "@/lib/api/bystanders";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BystandersPage() {
  let bystanders = [];
  try {
    const data = await fetchBystanders({ limit: 100, offset: 0 });
    bystanders = mapBystandersToGallery(data);
  } catch (error) {
    console.error("Failed to fetch bystanders:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      <main className="pb-10 pt-6">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bystanders</h1>
            <p className="text-gray-600">A collection of photos captured by our readers</p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded">
              <div className="h-full bg-black rounded" style={{ width: '20%' }} />
            </div>
          </div>

          {/* Gallery Grid */}
          {bystanders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bystanders.map((item) => (
                <Link
                  key={item.id}
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-sm bg-gray-100 flex items-center justify-center"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bystander photos available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

