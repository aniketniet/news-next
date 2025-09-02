import Image from "next/image";
import Link from "next/link";

export function FeaturedArticles() {
  const featuredArticles = [
    {
      id: 1,
      title: "Sacred Temples of Bagan",
      description: "Discover ancient spirituality in Myanmar's temple-dotted landscape",
      image: "/photo-gallery.png",
      category: "Travel",
      author: "Sarah Martinez",
      date: "March 15, 2024",
      readTime: "6 min read",
    },
    {
      id: 2,
      title: "Desert Adventures in Rajasthan",
      description: "Experience the magic of India's golden desert and royal heritage",
      image: "/business-meeting-diversity.png",
      category: "Travel",
      author: "Arjun Patel",
      date: "March 12, 2024",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Mindful Living in Ubud",
      description: "Find your inner peace in Bali's cultural heart",
      image: "/diverse-group-candid-photo.png",
      category: "Lifestyle",
      author: "Maya Chen",
      date: "March 10, 2024",
      readTime: "5 min read",
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Travel: "bg-blue-600",
      Lifestyle: "bg-purple-600",
      Culture: "bg-green-600",
      Food: "bg-yellow-600",
    };
    return colors[category] || "bg-gray-600";
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Featured Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated tales from our community of explorers and storytellers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`/exotica/article/${article.id}`} className="block group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${getCategoryColor(article.category)} text-white text-xs font-semibold rounded-full`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {article.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
