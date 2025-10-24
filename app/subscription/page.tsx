"use client";

import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { BookOpen, Check, Clock, IndianRupee } from "lucide-react";
import { useState } from "react";

interface Offer {
  id: string;
  duration: string;
  name: string;
  magazine?: string;
  newspaper?: string;
  coverPrice: number;
  offerPrice: number;
  discount: number;
  description: string;
  totalMonths: number;
  type: "magazine" | "newspaper";
  popular?: boolean;
}

export default function SubscriptionOffers() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const magazineOffers: Offer[] = [
    {
      id: "mag-3m",
      duration: "3 Months",
      name: "Magazine Subscription",
      magazine: "Exotica or Essentia Magazine",
      coverPrice: 150,
      offerPrice: 150,
      discount: 50,
      description: "Pay ₹150 for 3 Months & Get 3 Months FREE",
      totalMonths: 6,
      type: "magazine"
    },
    {
      id: "mag-6m",
      duration: "6 Months",
      name: "Magazine Subscription",
      magazine: "Exotica or Essentia Magazine",
      coverPrice: 300,
      offerPrice: 300,
      discount: 50,
      description: "Pay ₹300 for 6 Months & Get 6 Months FREE",
      totalMonths: 12,
      type: "magazine",
      popular: true
    },
    {
      id: "mag-12m",
      duration: "12 Months",
      name: "Magazine Subscription",
      magazine: "Exotica or Essentia Magazine",
      coverPrice: 600,
      offerPrice: 600,
      discount: 50,
      description: "Pay ₹600 for 12 Months & Get 12 Months FREE",
      totalMonths: 24,
      type: "magazine"
    }
  ];

  const newspaperOffers: Offer[] = [
    {
      id: "news-1m",
      duration: "1 Month",
      name: "The Pioneer (E) Print",
      newspaper: "The Pioneer (E) Print Newspaper",
      coverPrice: 306,
      offerPrice: 153,
      discount: 50,
      description: "1 Month Trial + Get Next 1 Month FREE",
      totalMonths: 2,
      type: "newspaper"
    },
    {
      id: "news-4m",
      duration: "4 Months",
      name: "The Pioneer (E) Print",
      newspaper: "The Pioneer (E) Print Newspaper",
      coverPrice: 918,
      offerPrice: 612,
      discount: 33.33,
      description: "4 Month Trial + Get Next 2 Months FREE",
      totalMonths: 6,
      type: "newspaper",
      popular: true
    },
    {
      id: "news-6m",
      duration: "6 Months",
      name: "The Pioneer (E) Print",
      newspaper: "The Pioneer (E) Print Newspaper",
      coverPrice: 1377,
      offerPrice: 918,
      discount: 33.33,
      description: "6 Month Trial + Get Next 3 Months FREE",
      totalMonths: 9,
      type: "newspaper"
    }
  ];

  const allOffers = [...magazineOffers, ...newspaperOffers];
  
  const filteredOffers = selectedCategory === "all" 
    ? allOffers 
    : allOffers.filter(offer => offer.type === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-gray-50">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Special Subscription Offers
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Subscribe now and get up to <span className="text-yellow-600 font-bold">50% OFF</span> with bonus months absolutely FREE!
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-[#FCCD04] text-black shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All Offers
          </button>
          <button
            onClick={() => setSelectedCategory("magazine")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === "magazine"
                ? "bg-[#FCCD04] text-black shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            📚 Magazines
          </button>
          <button
            onClick={() => setSelectedCategory("newspaper")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === "newspaper"
                ? "bg-[#FCCD04] text-black shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            📰 Newspaper
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl ${
                offer.popular ? "ring-4 ring-[#FCCD04]" : ""
              }`}
            >
              {/* Popular Badge */}
              {offer.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-[#FCCD04] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    🔥 POPULAR
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  {offer.discount}% OFF
                </div>
              </div>

              {/* Card Header */}
              <div className={`pt-16 pb-8 px-6 text-center ${
                offer.type === "magazine" 
                  ? "bg-gradient-to-br from-purple-600 to-purple-700" 
                  : "bg-gradient-to-br from-blue-700 to-blue-800"
              }`}>
                <div className="text-6xl mb-4">
                  {offer.type === "magazine" ? "📚" : "📰"}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {offer.duration}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  {offer.name}
                </p>
                {(offer.magazine || offer.newspaper) && (
                  <p className="text-white/80 text-xs mt-2">
                    {offer.magazine || offer.newspaper}
                  </p>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{offer.coverPrice}
                    </span>
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{offer.offerPrice}
                    </span>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                    Get {offer.totalMonths} Months Total
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-[#FCCD04] p-4 rounded-lg mb-6">
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700 text-sm">Premium content access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700 text-sm">Ad-free reading experience</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700 text-sm">Cancel anytime</span>
                  </div>
                  {offer.type === "newspaper" && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 text-sm">Daily E-Paper delivery</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-[#FCCD04] hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Subscribe to The Pioneer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FCCD04] rounded-full flex items-center justify-center mx-auto mb-4">
               <IndianRupee className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Value</h3>
              <p className="text-gray-600 text-sm">Get bonus months free with every subscription</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trusted Source</h3>
              <p className="text-gray-600 text-sm">Reliable journalism since decades</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Diverse Content</h3>
              <p className="text-gray-600 text-sm">News, magazines, and exclusive stories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-gray-600 text-sm">Start reading immediately after subscribing</p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}