import Link from "next/link"

export function SiteFooter() {
  const cols = [
    { title: "News", items: ["Nation", "States", "World", "Business", "Sports", "Tech"] },
    { title: "Features", items: ["Opinion", "Editorials", "Lifestyle", "Entertainment", "Gallery", "Videos"] },
    { title: "About", items: ["About Us", "Careers", "Advertise", "Contact", "Privacy Policy", "Terms"] },
    { title: "Services", items: ["E-Paper", "Subscriptions", "Newsletters", "Sitemap"] },
  ]

  return (
    <footer className="mt-8 bg-black text-white">
      <div className="px-3 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title} className="space-y-3">
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={it}>
                    <Link href="#" className="text-sm text-gray-300 hover:text-white">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="px-3 md:px-6 py-4 max-w-6xl mx-auto text-xs text-gray-400 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Daily Pioneer. All rights reserved.</p>
          <p>Built for demo purposes.</p>
        </div>
      </div>
    </footer>
  )
}
