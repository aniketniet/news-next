// Exotica article data structure
export interface ExoticaArticle {
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  month: string;
  year: string;
  content?: string; // Will be added when content is provided
}

export interface MonthData {
  month: string;
  articles: ExoticaArticle[];
}

// Article data organized by month
export const exoticaArticles: Record<string, ExoticaArticle[]> = {
  "September 2025": [
    { title: "Time for Autumn celebrations: Where To Go & What To Do", slug: "time-for-autumn-celebrations", category: "Events", month: "September", year: "2025" },
    { title: "Peru Beyond Machu Picchu", slug: "peru-beyond-machu-picchu", category: "Destinations", subcategory: "International", month: "September", year: "2025" },
    { title: "8 Heritage Properties that Redefine Indian Hospitality", slug: "8-heritage-properties", category: "Hospitality", month: "September", year: "2025" },
    { title: "India on Foot: 7 Must Do Walking Trails", slug: "india-on-foot", category: "Destinations", subcategory: "National", month: "September", year: "2025" },
    { title: "Kanpai Nights", slug: "kanpai-nights", category: "Destinations", subcategory: "International", month: "September", year: "2025" },
    { title: "Discovering Karak Tea in Ras Al Khaimah", slug: "discovering-karak-tea", category: "Destinations", subcategory: "International", month: "September", year: "2025" },
    { title: "The Travelling Mind", slug: "the-travelling-mind", category: "Destinations", subcategory: "National", month: "September", year: "2025" },
    { title: "A Commemorative Coastal Drive", slug: "commemorative-coastal-drive", category: "Auto", month: "September", year: "2025" },
    { title: "The Baithak Revival", slug: "baithak-revival", category: "Lifestyle", subcategory: "Trends", month: "September", year: "2025" },
    { title: "Lost No More", slug: "lost-no-more", category: "Lifestyle", subcategory: "Tech", month: "September", year: "2025" },
    { title: "Pharmacie Chic: Slay Like a Parisian", slug: "pharmacie-chic", category: "Lifestyle", subcategory: "Beauty", month: "September", year: "2025" },
  ],
  "October 2025": [
    { title: "Celebrations to brighten your fall season", slug: "celebrations-fall-season", category: "Events", month: "October", year: "2025" },
    { title: "Buenos over heels for Argentina", slug: "buenos-argentina", category: "Destinations", subcategory: "International", month: "October", year: "2025" },
    { title: "Architectural marvels", slug: "architectural-marvels", category: "Hospitality", month: "October", year: "2025" },
    { title: "The Ramayana trail", slug: "ramayana-trail", category: "Destinations", subcategory: "International", month: "October", year: "2025" },
    { title: "Feasts of faith, festivals of India", slug: "feasts-faith-festivals", category: "Destinations", subcategory: "National", month: "October", year: "2025" },
    { title: "Magic called Maldives", slug: "magic-maldives", category: "Destinations", subcategory: "International", month: "October", year: "2025" },
    { title: "An Austrian alpine adventure", slug: "austrian-alpine-adventure", category: "Auto", month: "October", year: "2025" },
    { title: "Is your skin travel ready?", slug: "skin-travel-ready", category: "Lifestyle", subcategory: "Beauty", month: "October", year: "2025" },
    { title: "Travel smart", slug: "travel-smart", category: "Lifestyle", subcategory: "Tech", month: "October", year: "2025" },
  ],
  "November 2025": [
    { title: "Grecian secrets", slug: "grecian-secrets", category: "Destinations", subcategory: "International", month: "November", year: "2025" },
    { title: "Book a trip, gain an adventure", slug: "book-trip-adventure", category: "Events", month: "November", year: "2025" },
    { title: "Small country with big heart", slug: "small-country-big-heart", category: "Destinations", subcategory: "International", month: "November", year: "2025" },
    { title: "Travel to reset", slug: "travel-to-reset", category: "Hospitality", month: "November", year: "2025" },
    { title: "Where the river meets the sea", slug: "river-meets-sea", category: "Destinations", subcategory: "International", month: "November", year: "2025" },
    { title: "A montage of memories", slug: "montage-memories", category: "Destinations", subcategory: "National", month: "November", year: "2025" },
    { title: "Luxury in the wild", slug: "luxury-in-wild", category: "Destinations", subcategory: "National", month: "November", year: "2025" },
    { title: "Go, take a walk", slug: "go-take-walk", category: "Destinations", subcategory: "National", month: "November", year: "2025" },
    { title: "The living art of stone", slug: "living-art-stone", category: "Destinations", subcategory: "National", month: "November", year: "2025" },
    { title: "Drifting on ice", slug: "drifting-on-ice", category: "Auto", month: "November", year: "2025" },
    { title: "Stay connected", slug: "stay-connected", category: "Lifestyle", subcategory: "Tech", month: "November", year: "2025" },
  ],
  "December 2025": [
    { title: "Walking into the New Year with a bang", slug: "new-year-bang", category: "Events", month: "December", year: "2025" },
    { title: "When in Morocco", slug: "when-in-morocco", category: "Destinations", subcategory: "International", month: "December", year: "2025" },
    { title: "Year end holiday hotlist", slug: "year-end-holiday-hotlist", category: "Hospitality", month: "December", year: "2025" },
    { title: "Winter wonderland", slug: "winter-wonderland", category: "Destinations", subcategory: "International", month: "December", year: "2025" },
    { title: "Kolkata's hidden wonderland", slug: "kolkata-hidden-wonderland", category: "Destinations", subcategory: "National", month: "December", year: "2025" },
    { title: "Whispers by a wood-fire", slug: "whispers-wood-fire", category: "Destinations", subcategory: "National", month: "December", year: "2025" },
    { title: "Into the Doon valley", slug: "doon-valley", category: "Destinations", subcategory: "National", month: "December", year: "2025" },
    { title: "Sikkim's hidden escape", slug: "sikkim-hidden-escape", category: "Destinations", subcategory: "National", month: "December", year: "2025" },
    { title: "The world calls India", slug: "world-calls-india", category: "Lifestyle", subcategory: "Trends", month: "December", year: "2025" },
    { title: "Vignettes from the automotive future", slug: "automotive-future", category: "Auto", month: "December", year: "2025" },
    { title: "Layer up and step out", slug: "layer-up-step-out", category: "Lifestyle", subcategory: "Style", month: "December", year: "2025" },
  ],
  "January 2026": [
    { title: "Mark your calendar", slug: "mark-your-calendar", category: "Events", month: "January", year: "2026" },
    { title: "Willkommen in Deutschland", slug: "willkommen-deutschland", category: "Destinations", subcategory: "International", month: "January", year: "2026" },
    { title: "Healing compass of India", slug: "healing-compass-india", category: "Hospitality", month: "January", year: "2026" },
    { title: "Your vibe, your trip", slug: "your-vibe-your-trip", category: "Destinations", subcategory: "International", month: "January", year: "2026" },
    { title: "Odisha: India's best kept secret", slug: "odisha-secret", category: "Destinations", subcategory: "National", month: "January", year: "2026" },
    { title: "Chandannagar: Bengal's French colonial town", slug: "chandannagar-french-town", category: "Destinations", subcategory: "National", month: "January", year: "2026" },
    { title: "Electric England", slug: "electric-england", category: "Auto", month: "January", year: "2026" },
    { title: "The world, interpreted in art", slug: "world-interpreted-art", category: "Destinations", subcategory: "International", month: "January", year: "2026" },
    { title: "No more socket surprises", slug: "no-socket-surprises", category: "Lifestyle", subcategory: "Tech", month: "January", year: "2026" },
  ],
  "February 2026": [
    { title: "Your must visit festivals", slug: "must-visit-festivals", category: "Events", month: "February", year: "2026" },
    { title: "Paraguay off the map", slug: "paraguay-off-map", category: "Destinations", subcategory: "International", month: "February", year: "2026" },
    { title: "Love art? Check out world's top 7 museums", slug: "world-top-museums", category: "Destinations", subcategory: "International", month: "February", year: "2026" },
    { title: "San Diego, unrushed", slug: "san-diego-unrushed", category: "Destinations", subcategory: "International", month: "February", year: "2026" },
    { title: "Calm within the chaos", slug: "calm-within-chaos", category: "Destinations", subcategory: "National", month: "February", year: "2026" },
    { title: "A gentle Holi in Tagore's land", slug: "gentle-holi-tagore", category: "Destinations", subcategory: "National", month: "February", year: "2026" },
    { title: "Rann of magic", slug: "rann-of-magic", category: "Destinations", subcategory: "National", month: "February", year: "2026" },
    { title: "Tayron's desert run", slug: "tayron-desert-run", category: "Auto", month: "February", year: "2026" },
    { title: "Clock the world on your wrist", slug: "clock-world-wrist", category: "Lifestyle", subcategory: "Tech", month: "February", year: "2026" },
  ],
};

// Helper functions
export function getArticlesByCategory(category: string, subcategory?: string): ExoticaArticle[] {
  const allArticles: ExoticaArticle[] = [];
  Object.values(exoticaArticles).forEach(articles => {
    allArticles.push(...articles);
  });
  
  return allArticles.filter(article => {
    if (subcategory) {
      return article.category === category && article.subcategory === subcategory;
    }
    return article.category === category;
  });
}

export function getArticlesByMonth(month: string): ExoticaArticle[] {
  return exoticaArticles[month] || [];
}

export function getArticleBySlug(slug: string): ExoticaArticle | undefined {
  const allArticles: ExoticaArticle[] = [];
  Object.values(exoticaArticles).forEach(articles => {
    allArticles.push(...articles);
  });
  return allArticles.find(article => article.slug === slug);
}

export function getMonthsForCategory(category: string, subcategory?: string): string[] {
  const months = new Set<string>();
  const articles = getArticlesByCategory(category, subcategory);
  articles.forEach(article => {
    months.add(`${article.month} ${article.year}`);
  });
  return Array.from(months).sort();
}

