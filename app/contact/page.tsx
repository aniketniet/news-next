import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-6 pb-10">
        <div className="mx-auto max-w-4xl px-3 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">THE PIONEER</h2>
                <div className="text-lg text-gray-700 space-y-2">
                  <p className="font-semibold">CMYK Printech Ltd.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Office</h3>
                <div className="text-gray-700 space-y-1">
                  <p>201-205, IInd Floor, Pratap Bhawan 5,</p>
                  <p>Bahadur Shah Zafar Marg,</p>
                  <p>New Delhi-110002</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Phone</h3>
                <div className="text-gray-700 space-y-1">
                  <p><a href="tel:+911146035729" className="hover:text-blue-600 transition-colors">011-46035729</a></p>
                  <p><a href="tel:+911169342500" className="hover:text-blue-600 transition-colors">011-69342500</a></p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">To Contribute Articles</h3>
                <p className="text-gray-700">
                  <a href="mailto:editoped@dailypioneer.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    editoped@dailypioneer.com
                  </a>
                </p>
              </div>
            </div>

            {/* Optional Contact Form Section */}
            {/* <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Send Message
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
