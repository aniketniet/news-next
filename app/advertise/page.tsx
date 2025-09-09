import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";

export const dynamic = "force-dynamic";

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-4xl px-3 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Advertise with Us</h1>
          
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-lg text-gray-700 mb-6">
                For any advertising and sales related queries please contact at:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scheduling Department */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Scheduling Department</h2>
                  <div className="text-gray-700">
                    <p className="font-medium">Direct Line:</p>
                    <p>
                      <a href="tel:+911146035729" className="text-blue-600 hover:text-blue-800 transition-colors">
                        011-46035729
                      </a>
                    </p>
                  </div>
                </div>

                {/* Delhi Team */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Delhi Team</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Devender Adhikari</h3>
                      <p className="text-sm text-gray-600 mb-2">General Manager - Marketing</p>
                      <p className="text-gray-700">
                        Mobile: <a href="tel:+919867575933" className="text-blue-600 hover:text-blue-800 transition-colors">9867575933</a>
                      </p>
                      <p className="text-gray-700">
                        Email: <a href="mailto:gmmarketing@dailypioneer.com" className="text-blue-600 hover:text-blue-800 transition-colors">gmmarketing@dailypioneer.com</a>
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900">Barun Kumar Choudhary</h3>
                      <p className="text-gray-700">
                        Mobile: <a href="tel:+919999005862" className="text-blue-600 hover:text-blue-800 transition-colors">9999005862</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Online Advertising */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Online Advertising</h2>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rajiv Sharma</h3>
                    <p className="text-gray-700">
                      Mobile: <a href="tel:+919711302712" className="text-blue-600 hover:text-blue-800 transition-colors">9711302712</a>
                    </p>
                  </div>
                </div>

                {/* Circulation */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Circulation</h2>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mohan Singh Rawat</h3>
                    <p className="text-gray-700">
                      Mobile: <a href="tel:+919811705889" className="text-blue-600 hover:text-blue-800 transition-colors">+91-9811705889</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Advertise with The Pioneer?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Print Editions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>8 English editions across India</li>
                    <li>4 Hindi editions</li>
                    <li>Wide reach in Tier II cities</li>
                    <li>Established readership base</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Digital Presence</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Growing online readership</li>
                    <li>Mobile-optimized website</li>
                    <li>Social media presence</li>
                    <li>Real-time news updates</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form for Advertising Inquiry */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Advertising Inquiry Form</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="contact-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="ad-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Advertising Type
                  </label>
                  <select
                    id="ad-type"
                    name="ad-type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select advertising type</option>
                    <option value="print">Print Advertisement</option>
                    <option value="online">Online Advertisement</option>
                    <option value="both">Both Print & Online</option>
                    <option value="sponsored">Sponsored Content</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Please describe your advertising requirements, budget, and timeline..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
