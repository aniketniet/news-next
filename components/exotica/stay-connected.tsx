import Image from "next/image";
import Link from "next/link";

export function StayConnected() {
  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@ExoticaPioneer",
      followers: "125K",
      description: "Daily travel inspiration and stunning photography",
      icon: "📸",
      color: "from-purple-600 to-pink-600",
      link: "https://instagram.com/exoticapioneer"
    },
    {
      name: "YouTube",
      handle: "Exotica Pioneer",
      followers: "89K",
      description: "Travel vlogs and destination guides",
      icon: "📹",
      color: "from-red-600 to-red-700",
      link: "https://youtube.com/exoticapioneer"
    },
    {
      name: "Twitter",
      handle: "@ExoticaTravel",
      followers: "67K",
      description: "Breaking travel news and quick tips",
      icon: "🐦",
      color: "from-blue-400 to-blue-600",
      link: "https://twitter.com/exoticatravel"
    },
    {
      name: "Facebook",
      handle: "Exotica Pioneer",
      followers: "156K",
      description: "Community discussions and travel groups",
      icon: "👥",
      color: "from-blue-600 to-blue-800",
      link: "https://facebook.com/exoticapioneer"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      platform: "Instagram",
      content: "Golden hour at Angkor Wat never gets old ✨",
      image: "/abstract-feature.png",
      likes: "2.3K",
      timeAgo: "2h"
    },
    {
      id: 2,
      platform: "YouTube",
      content: "New video: 'Hidden Gems of Kyoto' is live!",
      image: "/feature-photo.png",
      likes: "892",
      timeAgo: "1d"
    },
    {
      id: 3,
      platform: "Twitter",
      content: "Pro tip: Book flights on Tuesday for better deals",
      image: null,
      likes: "456",
      timeAgo: "3h"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of passionate travelers and never miss an adventure. Follow us for daily inspiration, travel tips, and exclusive content.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Social Media Platforms */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {socialPlatforms.map((platform, index) => (
                <Link key={index} href={platform.link} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-orange-200">
                    <div className={`h-20 bg-gradient-to-r ${platform.color} relative`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="text-3xl">{platform.icon}</div>
                        <div className="text-white text-right">
                          <div className="font-bold text-lg">{platform.followers}</div>
                          <div className="text-sm opacity-90">followers</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{platform.handle}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {platform.description}
                      </p>
                      <div className="mt-4 flex items-center text-orange-600 group-hover:text-orange-700 transition-colors">
                        <span className="text-sm font-medium">Follow us</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Social Posts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Latest from Social</h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-3">
                      {post.image && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image}
                            alt="Social media post"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                            {post.platform}
                          </span>
                          <span className="text-xs text-gray-500">{post.timeAgo}</span>
                        </div>
                        <p className="text-sm text-gray-800 mb-2 leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          {post.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white mt-6">
              <h3 className="text-xl font-bold mb-3">Weekly Newsletter</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Get our best travel stories, photography tips, and destination guides delivered weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 text-sm"
                />
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors text-sm">
                  Subscribe to Newsletter
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Join 25,000+ travel enthusiasts. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
