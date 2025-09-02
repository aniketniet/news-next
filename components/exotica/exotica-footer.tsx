import Link from "next/link";
import Image from "next/image";

export function ExoticaFooter() {
  const quickLinks = {
    explore: [
      { name: "Destinations", href: "/exotica/destinations" },
      { name: "Experiences", href: "/exotica/experiences" },
      { name: "Gallery", href: "/exotica/gallery" },
      { name: "Stories", href: "/exotica/stories" },
    ],
    community: [
      { name: "Contributors", href: "/exotica/contributors" },
      { name: "Photography", href: "/exotica/photography" },
      { name: "Events", href: "/exotica/events" },
      { name: "Newsletter", href: "/exotica/newsletter" },
    ],
    about: [
      { name: "Our Story", href: "/exotica/about" },
      { name: "Contact", href: "/exotica/contact" },
      { name: "Print Edition", href: "/exotica/print" },
      { name: "Careers", href: "/exotica/careers" },
    ]
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/exoticapioneer",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com/exoticapioneer",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      href: "https://twitter.com/exoticatravel",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com/exoticapioneer",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-amber-50" style={{ backgroundColor: '#C4A484' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="text-center py-16 border-b border-amber-900/20">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Stay Connected</h2>
          <p className="text-amber-800 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive curated travel stories, exclusive photography, and 
            insider tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/70 border border-amber-300 rounded-lg text-amber-900 placeholder-amber-700 focus:outline-none focus:border-amber-600 focus:bg-white"
            />
            <button className="px-8 py-3 bg-amber-900 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/exotica" className="inline-block mb-6">
                <div className="text-3xl font-bold text-amber-900">EXOTICA</div>
              </Link>
              <p className="text-amber-800 mb-6 leading-relaxed">
                Crafting extraordinary travel narratives that inspire wanderlust and 
                connect cultures across the globe.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-amber-900/10 hover:bg-amber-900 text-amber-900 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-amber-900">Explore</h3>
                <ul className="space-y-3">
                  {quickLinks.explore.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-amber-800 hover:text-amber-900 transition-colors duration-200 text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-amber-900">Community</h3>
                <ul className="space-y-3">
                  {quickLinks.community.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-amber-800 hover:text-amber-900 transition-colors duration-200 text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-amber-900">About</h3>
                <ul className="space-y-3">
                  {quickLinks.about.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-amber-800 hover:text-amber-900 transition-colors duration-200 text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-amber-900/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-amber-800">
              © 2024 EXOTICA. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/exotica/privacy" className="text-amber-800 hover:text-amber-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/exotica/terms" className="text-amber-800 hover:text-amber-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="/exotica/cookies" className="text-amber-800 hover:text-amber-900 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}