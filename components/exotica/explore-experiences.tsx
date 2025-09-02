import Image from "next/image";
import Link from "next/link";

export function ExploreExperiences() {
  const experiences = [
    {
      id: 1,
      title: "SUMMER IN FULL SWING: WHERE TO GO & WHAT TO CELEBRATE",
      description: "The month of August brings some of the most lively and globally renowned music festivals at various locations around the world.",
      image: "/photo-gallery.png",
      category: "Travel"
    },
    {
      id: 2,
      title: "INDIA ON FOOT: 8 MUST-DO WALKING TRAILS",
      description: "Whether you are seeking spiritual connection, natural beauty or historic charm, these immersive walks invite you to see India from the ground up.",
      image: "/vibrant-cricket-match.png",
      category: "Travel"
    },
    {
      id: 3,
      title: "8 HERITAGE PROPERTIES THAT REDEFINE INDIAN HOSPITALITY",
      description: "India's rich past is etched not only in its monuments and museums, but also in its architecture-turned-accommodation.",
      image: "/business-meeting-diversity.png",
      category: "Travel"
    },
    {
      id: 4,
      title: "CULINARY CAPITALS: A FOODIE'S GUIDE TO ASIA",
      description: "From street vendors to Michelin-starred restaurants, discover the diverse flavors that make Asian cuisine extraordinary.",
      image: "/diverse-group-candid-photo.png",
      category: "Travel"
    },
    {
      id: 5,
      title: "WELLNESS RETREATS: FINDING PEACE IN PARADISE",
      description: "Escape the chaos of modern life and reconnect with yourself in these serene destinations across Asia.",
      image: "/sports-football.png",
      category: "Travel"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Explore by Experience
          </h2>
          <p className="text-lg text-gray-600">
            Three distinctive paths to discover the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((experience) => (
            <Link key={experience.id} href={`/exotica/experiences/${experience.id}`} className="block group">
              <div className="relative h-64 md:h-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-sm font-medium rounded">
                    {experience.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-orange-300 transition-colors" style={{ fontFamily: 'serif' }}>
                    {experience.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base mb-4 leading-relaxed max-w-2xl">
                    {experience.description}
                  </p>
                  <button className="inline-flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                    Explore
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
