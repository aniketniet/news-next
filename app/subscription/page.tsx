import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";

export const dynamic = "force-dynamic";

interface MagazinePlan {
  id: number;
  duration: string;
  coverPricePerMonth: number;
  magazine: string;
  specialSubscriptionOffer: string;
  discountPercent: number;
  originalPrice: number;
  discountedPrice: number;
}

interface NewspaperPlan {
  id: number;
  duration: string;
  coverPrice: number;
  newspaper: string;
  specialTrialOffer: string;
  discountPercent: number;
  originalPrice: number;
  discountedPrice: number;
}

export default function SubscriptionPage() {
  // Magazine subscription plans
  const magazinePlans: MagazinePlan[] = [
    {
      id: 1,
      duration: "6 Months",
      coverPricePerMonth: 50,
      magazine: "Book Either Exotica Magazine or Essential Magazine",
      specialSubscriptionOffer: "Pay ₹150 for 3 Months Subscription & Get 3 Months FREE",
      discountPercent: 50,
      originalPrice: 300,
      discountedPrice: 150,
    },
    {
      id: 2,
      duration: "12 Months",
      coverPricePerMonth: 50,
      magazine: "Book Either Exotica Magazine or Essential Magazine",
      specialSubscriptionOffer: "Pay ₹300 for 6 Months Subscription & Get 6 Months FREE",
      discountPercent: 50,
      originalPrice: 600,
      discountedPrice: 300,
    },
    {
      id: 3,
      duration: "24 Months",
      coverPricePerMonth: 50,
      magazine: "Book Either Exotica Magazine or Essential Magazine",
      specialSubscriptionOffer: "Pay ₹600 for 12 Months Subscription & Get 12 Months FREE",
      discountPercent: 50,
      originalPrice: 1200,
      discountedPrice: 600,
    },
  ];

  // Newspaper subscription plans
  const newspaperPlans: NewspaperPlan[] = [
    {
      id: 1,
      duration: "2 Month",
      coverPrice: 155,
      newspaper: "The Pioneer Newspaper (Print)",
      specialTrialOffer: "1 Month Trial offer & Get next 1 Month FREE",
      discountPercent: 50,
      originalPrice: 310,
      discountedPrice: 155,
    },
    {
      id: 2,
      duration: "12 Months",
      coverPrice: 1862,
      newspaper: "The Pioneer Newspaper (Print)",
      specialTrialOffer: "Pay ₹1199 for 12 Months Subscription",
      discountPercent: 35.61,
      originalPrice: 1862,
      discountedPrice: 1199,
    },
  ];



  return (
    <div className="min-h-screen bg-gray-200">
      <SiteHeader />

      {/* Subscription Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
       

        {/* Magazine Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Magazine Subscriptions</h2>
          <p className="text-center text-gray-600 mb-8">Choose Either Exotica Magazine or Essentia Magazine</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-20">
            {magazinePlans.map((plan, index) => {
                // Use vertical gradients for richer header color
                const colors = [
                  'bg-gradient-to-b from-purple-700 to-purple-500',
                  'bg-gradient-to-b from-green-700 to-green-400',
                  'bg-gradient-to-b from-orange-700 to-orange-400',
                ];
                const colorClass = colors[index % colors.length];
              
              return (
                <div key={plan.id} className="relative">
                  {/* Colored Header */}
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 ${colorClass} text-white text-center py-8 px-12 shadow-2xl z-10 min-w-[280px]`}
                    style={{ boxShadow: '0 25px 40px rgba(0,0,0,0.6)' }}
                  >
                    <h3 className="text-2xl font-extrabold mb-2 uppercase tracking-wide">{plan.duration}</h3>
                    <div className="mb-2">
                      <div className="text-lg line-through text-gray-300">₹{plan.originalPrice}</div>
                      <div className="text-5xl font-extrabold">₹{plan.discountedPrice}</div>
                    </div>
                    <div className="text-base uppercase tracking-wide font-semibold">{plan.discountPercent}% OFF</div>
                  </div>

                  {/* Main Card Body */}
                  <div className="bg-white shadow-2xl  border border-gray-200 pt-24 pb-8 px-8 mt-32">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                   
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 font-semibold">{plan.magazine}</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 font-semibold">₹{plan.coverPricePerMonth}/month Value</span>
                      </li>
                      {/* <li className="flex items-center">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-sm line-through">₹{plan.originalPrice} Regular Price</span>
                          <span className="text-gray-700 font-semibold">₹{plan.discountedPrice} Special Price</span>
                        </div>
                      </li> */}
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-600 font-semibold">{plan.specialSubscriptionOffer}</span>
                      </li>
                    </ul>

                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 uppercase tracking-wide transition-colors">
                      CHOOSE PLAN
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newspaper Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">The Pioneer Print Newspaper</h2>
          {/* <p className="text-center text-gray-600 mb-8">Digital Print Edition with Trial Offers</p> */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-20">
            {newspaperPlans.map((plan, index) => {
              const colors = [
                'bg-gradient-to-b from-blue-700 to-blue-500',
                'bg-gradient-to-b from-indigo-700 to-indigo-500',
                'bg-gradient-to-b from-red-700 to-red-500',
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <div key={plan.id} className="relative">
                  {/* Colored Header */}
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 ${colorClass} text-white text-center py-8 px-12 shadow-xl z-10 min-w-[280px]`}
                    style={{ boxShadow: '0 25px 40px rgba(0,0,0,0.6)' }}
                  >
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{plan.duration}</h3>
                    <div className="text-sm line-through text-gray-200 mb-1">₹{plan.originalPrice}</div>
                    <div className="text-5xl font-bold mb-2">₹{plan.discountedPrice}</div>
                    <div className="text-md uppercase tracking-wide font-medium">{plan.discountPercent}% OFF</div>
                  </div>

                  {/* Main Card Body */}
                  <div className="bg-white shadow-2xl border border-gray-200 pt-24 pb-8 px-8 mt-28">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-600 font-semibold">{plan.specialTrialOffer}</span>
                      </li>
                    </ul>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 uppercase tracking-wide transition-colors">
                      CHOOSE PLAN
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ad-Free Experience
              </h3>
              <p className="text-gray-600">
                Enjoy uninterrupted reading without any advertisements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v2m0 0v14a2 2 0 01-2 2H5a2 2 0 01-2-2V4m0 0h18"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exclusive Content
              </h3>
              <p className="text-gray-600">
                Access to premium articles and exclusive interviews.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Early Access
              </h3>
              <p className="text-gray-600">
                Be the first to read breaking news and important updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}