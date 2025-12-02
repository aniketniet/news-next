import { OpinionSection } from "./opinion-section"
import Image from "next/image"

type OpinionStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
}

type OpinionAnalysisSectionsProps = {
  opinion: OpinionStory[]
  analysis: OpinionStory[]
  entertainment: OpinionStory[]
}

export function OpinionAnalysisSections({ 
  opinion, 
  analysis,
  entertainment
}: OpinionAnalysisSectionsProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Opinion Section */}
        <div className="lg:col-span-4">
          <OpinionSection title="Opinion" stories={opinion} />
        </div>

        {/* Analysis Section */}
        <div className="lg:col-span-4">
          <OpinionSection title="Analysis" stories={analysis} />
        </div>
        <div className="lg:col-span-4">
          <OpinionSection title="Entertainment" stories={entertainment} />
        </div>

        {/* Advertisement Banner */}
        {/* <div className="lg:col-span-4">
          <div className="sticky top-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-500">
              <Image
                src="/generic-advertisement.png"
                alt="Advertisement"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
             
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/90 to-blue-500/90 flex flex-col justify-center items-center text-white p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">SMILE</h3>
                  <p className="text-lg">WITH STRENGTH</p>
                  <div className="bg-white/20 rounded-lg p-4 mt-6">
                    <p className="text-sm">STRENGTHENS WEAK ENAMEL</p>
                    <p className="text-xl font-bold mt-2">4X BETTER</p>
                    <p className="text-xs">AT REBUILDING ESSENTIAL MINERALS</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
