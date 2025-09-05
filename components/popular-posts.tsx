import Link from "next/link"

const popularPosts = [
  {
    title: "Gegera Corona, Kekayaan Bos Zoom Nambah Rp 64 T Dalam 3 Bulan - CNBC Indonesia",
    category: "COVID-19"
  },
  {
    title: "The West Had A Head Start On Virus Preparations. Why Didn't It Take It?", 
    category: "STARTUP"
  },
  {
    title: "America's Social-Distancing Deniers Have Become",
    category: "COVID-19"
  },
  {
    title: "Egypt's Soap Operas Defy A Deadly Virus For Ramadan Prime Time. But At What Cost?",
    category: "STARTUP"
  }
]

export function PopularPosts() {
  return (
    <div >
      <div className="px-3 py-2">
        <h3 className="font-semibold text-lg">Popular Post</h3>
         <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#FCCD04] rounded" style={{ width: '20%' }} />
          </div>
      </div>
      <div className="p-3 space-y-4">
        {popularPosts.map((post, index) => (
          <div key={index} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <span 
                className={`inline-flex items-center text-[9px] uppercase tracking-wide font-bold px-2 py-1 rounded mb-2 ${
                  post.category === 'COVID-19' 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-yellow-400 text-black'
                }`}
              >
                {post.category}
              </span>
              <h4 className="text-sm font-semibold leading-tight text-gray-900 hover:text-blue-600">
                <Link href="#" className="hover:underline">
                  {post.title}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
