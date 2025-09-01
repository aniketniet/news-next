export default function SiteFooter() {
  const cols = [
    { title: "News", links: ["Nation", "World", "Business", "Sports"] },
    { title: "Sections", links: ["Opinion", "Lifestyle", "Technology", "Entertainment"] },
    { title: "Services", links: ["e-Paper", "Subscribe", "Advertise", "Contact"] },
    { title: "About", links: ["About Us", "Careers", "Privacy Policy", "Terms"] },
  ]
  return (
    <footer className="mt-10 bg-black text-gray-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold text-white">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-gray-400 md:px-6">
          <p>&copy; {new Date().getFullYear()} The Pioneer. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              Facebook
            </a>
            <a href="#" aria-label="X" className="hover:text-white">
              X
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
