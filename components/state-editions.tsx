import Link from "next/link"

const stateEditions = [
  "DELHI",
  "BHOPAL", 
  "BHUBANESWAR",
  "RANCHI",
  "LUCKNOW",
  "CHANDIGARH",
  "DEHRADUN",
  "RAIPUR"
]

const stateNews = [
  {
    title: "Bandhwari Landfill Site Restricts Real Estate Development Along Gurugram - Faridabad Road",
    time: "December 09, 2020"
  },
  {
    title: "Convoy Of 22 SUVs Blocks Gurugram Road For Reels Shoot"
  },
  {
    title: "Rera Warns Action Against Gurugram Developer"
  },
  {
    title: "DAV Public School Hosts 8th IDAV MUN"
  },
  {
    title: "DDA Restores And Reopens Historic Roshanara Club"
  },
  {
    title: "CM Assures Rehabilitation Of Eligible Slum Dwellers"
  },
  {
    title: "HBA Foundation Launches National Campaign On World Drowning Prevention Day"
  },
  {
    title: "DU UG Admissions: 7,790 Apply Under Armed Forces Quota"
  }
]

export function StateEditions() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold">State Editions</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State Selection */}
        <div className="space-y-2">
          {stateEditions.map((state, index) => (
            <Link
              key={index}
              href="#"
              className={`block px-3 py-2 text-sm font-medium rounded transition-colors ${
                index === 0 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {state}
            </Link>
          ))}
        </div>

        {/* News Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Featured Story */}
          <article className="space-y-2">
            <h4 className="text-base font-semibold leading-tight">
              <Link href="#" className="hover:text-blue-600">
                {stateNews[0].title}
              </Link>
            </h4>
            <p className="text-xs text-gray-600">{stateNews[0].time}</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              In Telangana, from where Justice Reddy hails, the Bharat
              Rashtra Samithi (BRS) said it was yet to decide its stand, with
              its chief K Chandra Shekhar Rao saying the party chief K Chandrashekhar
              Rao would take a decision at the appropriate time.
            </p>
          </article>

          {/* Other Stories */}
          <div className="space-y-3">
            {stateNews.slice(1).map((story, index) => (
              <h5 key={index} className="text-sm font-medium leading-tight">
                <Link href="#" className="hover:text-blue-600">
                  {story.title}
                </Link>
              </h5>
            ))}
          </div>
        </div>

        {/* Advertisement */}
        {/* <div className="lg:col-span-1">
          <div className="relative w-full h-[400px] bg-teal-50 rounded overflow-hidden flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">😁</span>
              </div>
              <h6 className="font-bold text-sm mb-2">SMILE STRENGTH</h6>
              <p className="text-xs text-gray-600 mb-4">
                Get stronger teeth and gums with our advanced dental care
              </p>
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Colgate
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-1">Advertisement</p>
        </div> */}
      </div>
    </div>
  )
}
