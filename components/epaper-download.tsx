import Image from "next/image"
import Link from "next/link"

export function EPaperDownload() {
  return (
    <div className="border rounded">
      <div className="px-3 py-2 border-b bg-gray-50">
        <h3 className="font-semibold text-lg">Daily Pioneer E-Paper</h3>
      </div>
      <div className="p-3 space-y-3">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded">
          <Image
            src="/e-paper.png"
            alt="Daily Pioneer E-paper front page"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
        <Link
          href="#"
          className="inline-flex items-center justify-center w-full bg-yellow-400 text-black font-medium py-2 rounded hover:bg-yellow-300 transition-colors"
        >
          Pdf Download
        </Link>
      </div>
    </div>
  )
}
