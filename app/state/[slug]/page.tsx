import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { NewsCard } from "@/components/news-card";
import Link from "next/link";
import { notFound } from "next/navigation";

interface StateStory {
  story_id: number;
  story_title: string;
  story_date: string;
  published_date: string;
  image_url_medium?: string;
  image_url_big?: string;
  url_key: string;
  author_name?: string;
  category_name?: string;
  section_name?: string;
}

interface StateApiResponse {
  success: boolean;
  message: string;
  data: StateStory[];
}

async function fetchStateStories(state: string, limit = 20, offset = 0): Promise<StateStory[]> {
  try {
    const url = `http://103.119.171.20/api/news/city/${state}?limit=${limit}&offset=${offset}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`State API failed: ${res.status}`);
      return [];
    }

    const json: StateApiResponse = await res.json();
    if (!json.success || !Array.isArray(json.data)) {
      return [];
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching state stories:", error);
    return [];
  }
}

export default async function StatePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const stories = await fetchStateStories(slug);

  if (!stories || stories.length === 0) {
    notFound();
  }

  // Capitalize state name for display
  const stateName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">State Edition</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{stateName}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {stateName} Edition
          </h1>
          <div className="h-1 w-20 bg-[#1a59a9] rounded"></div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <NewsCard
              key={story.story_id}
              title={story.story_title}
              category={story.section_name || story.category_name || stateName}
              image={story.image_url_medium || story.image_url_big || "/news-image.png"}
              time={new Date(story.published_date || story.story_date).toLocaleDateString(
                undefined,
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
              href={`/news/${story.story_id}`}
            />
          ))}
        </div>

        {/* No More Results Message */}
        {stories.length >= 20 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Showing {stories.length} articles</p>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const stateName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${stateName} Edition - The Pioneer`,
    description: `Latest news and updates from ${stateName}`,
  };
}
