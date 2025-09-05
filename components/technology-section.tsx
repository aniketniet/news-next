import Image from "next/image";
import Link from "next/link";

interface TechnologyStory {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

interface TechnologySectionProps {
  stories: TechnologyStory[];
}

export function TechnologySection({ stories }: TechnologySectionProps) {
  return (
    <div className="space-y-6">
      <div >
        <h2 className="text-2xl font-bold text-gray-900 pb-1">
          Technology
        </h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
        {/* <div className="flex items-center gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
          />
          <button className="px-4 py-1 bg-yellow-400 text-black text-sm font-semibold rounded hover:bg-yellow-500 transition-colors">
            SIGN UP
          </button>
        </div> */}
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <article key={story.id} className="group cursor-pointer">
            <Link href={`/technology/${story.id}`} className="block">
              <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-[#FCCD04] rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-gray-500">{story.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {story.description}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
