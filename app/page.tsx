import { SiteHeader } from "@/components/site-header";
import { BreakingTicker } from "@/components/ticker";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { NewsCard } from "@/components/news-card";
import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/footer";
import { SecondaryStory } from "@/components/secondary-story";
import { MainContent } from "@/components/main-content";
import { BusinessSlider } from "@/components/business-slider";
import { InternationalNews } from "@/components/international-news";
import { CategorySections } from "@/components/category-sections";
import { SportsSections } from "@/components/sports-sections";
import { OpinionAnalysisSections } from "@/components/opinion-analysis-sections";
import { VideosSection } from "@/components/videos-section";
import { PodcastSection } from "@/components/podcast-section";
import { HoroscopeSection } from "@/components/horoscope-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { AdvertiseSection } from "@/components/advertise-section";
import { TechnologySection } from "@/components/technology-section";
import { TarotSection } from "@/components/tarot-section";
import Image from "next/image";
import Link from "next/link";
import { PopularPosts } from "@/components/popular-posts";
import { StateEditions } from "@/components/state-editions";

import PhotoGallery from "@/components/PhotoGallery";
import { fetchStories } from "@/lib/api/stories";
import { getCategoriesNormalized } from "@/lib/api/categories";

// (Deprecated) static businessStories removed – now populated from API


const entertainmentStories = [
  {
    id: "ent-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "ENTERTAINMENT",
    image: "/feature-story.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "ent-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "ENTERTAINMENT",
    image: "/photo-feature.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/feature-photo.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/photo-gallery.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/video-news.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const travelStories = [
  {
    id: "travel-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "TRAVEL",
    image: "/world.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "travel-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "TRAVEL",
    image: "/world-summit.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/abstract-feature.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/abstract-geometric-shapes.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/diverse-group-candid-photo.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const foodWellnessStories = [
  {
    id: "food-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "FOOD & WELLNESS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "food-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "FOOD & WELLNESS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

// Static sports placeholders removed – dynamic mapping from API





const videoStories = [
  {
    id: "video-1",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/parliament-building.png",
    duration: "12:09",
  },
  {
    id: "video-2",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world-summit.png",
    duration: "12:09",
  },
  {
    id: "video-3",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide its stand",
    image: "/video-news.png",
    duration: "12:09",
    featured: true,
  },
  {
    id: "video-4",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/business-meeting-diversity.png",
    duration: "12:09",
  },
  {
    id: "video-5",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world.png",
    duration: "12:09",
  },
];



const podcastStories = [
  {
    id: "podcast-1",
    title: "Fashion Scoop",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/placeholder.svg?height=200&width=200&query=fashion%20scoop",
    category: "LIFESTYLE",
    host: "Fashion Expert",
    duration: "45:30",
  },
  {
    id: "podcast-2",
    title: "Right Swipe",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/placeholder.svg?height=200&width=200&query=right%20swipe",
    category: "RELATIONSHIPS",
    host: "Dating Coach",
    duration: "32:15",
  },
  {
    id: "podcast-3",
    title: "Nothing But the Truth",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/placeholder.svg?height=200&width=200&query=truth%20podcast",
    category: "NEWS",
    host: "Raj Chengappa",
    duration: "28:45",
  },
  {
    id: "podcast-4",
    title: "In Our Defence",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/placeholder.svg?height=200&width=200&query=defence%20podcast",
    category: "POLITICS",
    host: "Defense Analyst",
    duration: "41:20",
  },
];

const horoscopeData = {
  title:
    "Weekly Horoscope, 18-August To 24-August-2025: Explore Our Weekly Horoscope And Navigate The Week Ahead With Confidence",
  description:
    "Weekly Horoscope, 18-August To 24-August-2025. Stay ahead with our weekly horoscope from our astrology experts. This week brings unique planetary alignments that will discover how the stars have aligned for you this week.",
  date: "December 09, 2020",
  signs: [
    { name: "Aries", icon: "♈" },
    { name: "Taurus", icon: "♉" },
    { name: "Gemini", icon: "♊" },
    { name: "Cancer", icon: "♋" },
    { name: "Leo", icon: "♌" },
    { name: "Virgo", icon: "♍" },
    { name: "Libra", icon: "♎" },
    { name: "Scorpio", icon: "♏" },
    { name: "Sagittarius", icon: "♐" },
    { name: "Capricorn", icon: "♑" },
    { name: "Aquarius", icon: "♒" },
    { name: "Pisces", icon: "♓" },
  ],
};

// Static technology placeholder removed – dynamic mapping from API

const tarotData = {
  signs: [
    { name: "Aries", icon: "♈" },
    { name: "Taurus", icon: "♉" },
    { name: "Gemini", icon: "♊" },
    { name: "Cancer", icon: "♋" },
    { name: "Leo", icon: "♌" },
    { name: "Virgo", icon: "♍" },
    { name: "Libra", icon: "♎" },
    { name: "Scorpio", icon: "♏" },
    { name: "Sagittarius", icon: "♐" },
    { name: "Capricorn", icon: "♑" },
    { name: "Aquarius", icon: "♒" },
    { name: "Pisces", icon: "♓" },
  ],
  promoImage: "/placeholder.svg?height=300&width=400&query=tarot%20smile",
  promoTitle: "SMILE WITH STRENGTH",
  promoSubtitle: "Discover your inner power with our tarot readings",
};

export default async function HomePage() {
  // Fetch grouped stories (top + latest) and category news in parallel
  // NOTE: Increased limit & disabled cache for category news so that
  // sections like Technology & Impact (which may have older dates and
  // were previously missing due to cached / truncated responses) appear
  // consistently with what you see in Postman.
  const [{ latest, top, stateEditions }, categories] = await Promise.all([
    fetchStories({ limit: 20, offset: 0 }),
    getCategoriesNormalized({ limit: 12, offset: 0, noCache: true })
  ]);

  console.log("Fetched Categories:", categories);

  const trendingNews = latest; // repurpose latest as "Trending News" section per request

  // Map Business category stories -> BusinessSlider shape
  const businessStoriesMapped = categories.business.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || s.category_name || "Business",
    image: s.image_url_medium || s.image_url_big || "/leaderboard-ad.png",
    date: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  }));

  // Sports mapping (split into three buckets for existing layout)
  const sportsStoriesAll = categories.sports.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || "Sports",
    image: s.image_url_medium || s.image_url_big || "/diverse-group-playing-various-sports.png",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  }));
  const sportsThird = Math.ceil(sportsStoriesAll.length / 3) || 1;
  const cricketStories = sportsStoriesAll.slice(0, sportsThird);
  const footballStories = sportsStoriesAll.slice(sportsThird, sportsThird * 2);
  const otherSportsStories = sportsStoriesAll.slice(sportsThird * 2);

  // Technology mapping
  const technologyStories = categories.technology.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    description: "", // no description in payload
    image: s.image_url_medium || s.image_url_big || "/interconnected-technology.png",
    category: s.section_name || "TECHNOLOGY",
    date: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  }));

  // Impact mapping -> reuse BusinessSlider component as a horizontal carousel
  const impactStoriesMapped = categories.impact.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || "Impact",
    image: s.image_url_medium || s.image_url_big || "/abstract-feature.png",
    date: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  }));

  // Map World category stories -> InternationalNews shape (single country: World)
  const internationalWorldStories = categories.world.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    description: "", // API does not supply short description
    image: s.image_url_medium || s.image_url_big || "/world.png",
    timeAgo: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }),
    source: s.author_name || "",
    country: "USA" // re-using existing tab system; could be adapted to 'World'
  }));

  // Split Opinion stories into Opinion (first half) & Analysis (second half) for existing component contract
  const opinionStoriesAll = categories.opinion.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    category: "OPINION",
    image: s.image_url_medium || s.image_url_big || "",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  }));
  // Use dedicated Analysis array if provided; fallback to split
  const analysisStoriesAll = categories.analysis.length ? categories.analysis.map(s => ({
    id: String(s.story_id),
    title: s.story_title,
    category: "ANALYSIS",
    image: s.image_url_medium || s.image_url_big || "",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
  })) : [];
  const mid = Math.ceil(opinionStoriesAll.length / 2);
  const dynamicOpinion = opinionStoriesAll;
  const dynamicAnalysis = analysisStoriesAll.length ? analysisStoriesAll : opinionStoriesAll.slice(mid);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-yellow-400 text-black px-2 py-1 rounded"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="pb-10">
        <Hero />

        {/* Trending News */}
        <Section title="Trending News">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Featured + Secondary stories */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured (top) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(0, 2).map((story, i) => (
                  <article key={i} className="relative group">
                    <Link
                      href={`/news/${story.id || story.id}`}
                      className="relative block aspect-[4/3] w-full overflow-hidden"
                    >
                      <Image
                        src={
                          story.image_url_medium ||
                          (story as any).image ||
                          "/news-lead-image.png"
                        }
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-flex items-center text-[10px] uppercase tracking-wide font-bold bg-yellow-400 text-black px-2 py-1 rounded mb-2">
                          {story.category || "NEWS"}
                        </span>
                        <h3 className="text-lg font-bold leading-tight mb-2">
                          {story.title}
                        </h3>
                        <p className="text-xs opacity-90">
                          {story.author ? `By ${story.author} • ` : ""}
                          {new Date(story.publishedDate).toLocaleDateString(
                            undefined,
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              {/* Secondary (below) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(2, 10).map((story, i) => (
                  <SecondaryStory
                    id={story.id}
                    title={story.title}
                    category={story.category || "NEWS"}
                    image={story.image_url_medium || (story as any).image || ""}
                    byline={story.author || ""}
                    time={new Date(story.publishedDate).toLocaleDateString(
                      undefined,
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  />
                ))}
              </div>
            </div>
            {/* Right: Sidebar */}
            <PopularPosts top={top} offset={8} />
          </div>
        </Section>

        {/* Main grid with Sidebar */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* <MainContent nation={nation} world={world} opinion={opinion} /> */}
              <StateEditions stateEditions={stateEditions || {}} />
              {/* Right: Sidebar */}
              <PopularPosts top={top} />
            </div>
          </div>
        </section>

        {/* Business & Money Slider */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <BusinessSlider
              stories={businessStoriesMapped}
              title="Business & Money"
            />
          </div>
        </section>

        {/* International News */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <InternationalNews stories={internationalWorldStories} />
          </div>
        </section>

        {/* Impact Slider (repurposed carousel) */}
        {impactStoriesMapped.length > 0 && (
          <section className="px-3 md:px-6 py-6">
            <div className="mx-auto w-full max-w-6xl">
              <BusinessSlider stories={impactStoriesMapped} title="Impact" />
            </div>
          </section>
        )}

        {/* Category Sections: Entertainment, Travel, Food & Wellness */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <CategorySections
              entertainment={entertainmentStories}
              travel={travelStories}
              foodWellness={foodWellnessStories}
            />
          </div>
        </section>

  {/* Sports Sections: Cricket, Football, Other Sports (dynamic) */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <SportsSections
              cricket={cricketStories}
              football={footballStories}
              otherSports={otherSportsStories}
            />
          </div>
        </section>

        {/* Opinion & Analysis Sections with Advertisement */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <OpinionAnalysisSections
              opinion={dynamicOpinion}
              analysis={dynamicAnalysis}
            />
          </div>
        </section>

        {/* Videos Section */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <VideosSection videos={videoStories} />
          </div>
        </section>

        {/* Podcast and Horoscope Sections */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PodcastSection stories={podcastStories} />
              <HoroscopeSection data={horoscopeData} />
            </div>
          </div>
        </section>

        {/* Technology and Tarot Sections */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TechnologySection stories={technologyStories} />
              <TarotSection data={tarotData} />
            </div>
          </div>
        </section>
      </main>

      <PhotoGallery />

      <SiteFooter />
    </div>
  );
}
