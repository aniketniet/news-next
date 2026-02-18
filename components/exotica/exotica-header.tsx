"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { exoticaArticles } from "@/lib/exotica-data";

export function ExoticaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setSelectedMonth(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuCategories = [
    {
      label: "Destinations",
      href: "/exotica/destinations",
      subcategories: [
        { label: "National", href: "/exotica/destinations/national" },
        { label: "International", href: "/exotica/destinations/international" },
      ],
    },
    {
      label: "Hospitality",
      href: "/exotica/hospitality",
    },
    {
      label: "Lifestyle",
      href: "/exotica/lifestyle",
      subcategories: [
        { label: "Tech", href: "/exotica/lifestyle/tech" },
        { label: "Beauty", href: "/exotica/lifestyle/beauty" },
        { label: "Style", href: "/exotica/lifestyle/style" },
        { label: "Trends", href: "/exotica/lifestyle/trends" },
      ],
    },
    {
      label: "Auto",
      href: "/exotica/auto",
    },
    {
      label: "Events",
      href: "/exotica/events",
    },
    {
      label: "Gallery",
      href: "#",
      disabled: true,
    },
    {
      label: "Video",
      href: "#",
      disabled: true,
    },
  ];

  const months = Object.keys(exoticaArticles);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/exotica" className="flex items-center">
              <div className="relative w-8 h-8 md:w-32 md:h-24">
                <Image 
                  src="/logo.png" 
                  alt="Exotica Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="ml-2 text-sm md:text-sm text-gray-600 font-light tracking-wider" 
                   style={{ fontFamily: 'serif' }}>
                EXOTICA
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuCategories.map((category) => (
                <div
                  key={category.label}
                  className="relative"
                  ref={category.label === activeDropdown ? dropdownRef : null}
                  onMouseEnter={() => category.subcategories && setActiveDropdown(category.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={category.disabled ? "#" : category.href}
                    className={`px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm font-medium flex items-center ${
                      category.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {category.label}
                    {category.subcategories && (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {category.subcategories && activeDropdown === category.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Month Dropdown */}
              <div
                className="relative"
                ref={monthDropdownRef}
                onMouseEnter={() => setSelectedMonth("open")}
                onMouseLeave={() => setSelectedMonth(null)}
              >
                <button className="px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm font-medium flex items-center">
                  Issues
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {selectedMonth && (
                  <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 max-h-[600px] overflow-y-auto">
                    {months.map((month) => (
                      <div key={month} className="mb-4 last:mb-0">
                        <div className="px-4 py-2 bg-orange-50 border-b border-gray-200 sticky top-0">
                          <h3 className="font-semibold text-sm text-gray-900">{month}</h3>
                        </div>
                        <div className="px-2">
                          {exoticaArticles[month].map((article, idx) => (
                            <Link
                              key={idx}
                              href={`/exotica/article/${article.slug}`}
                              className="block px-2 py-2 hover:bg-gray-50 rounded"
                            >
                              <div className="text-xs text-gray-500 mb-1">{article.category}{article.subcategory ? ` (${article.subcategory})` : ""}</div>
                              <div className="text-sm text-gray-700">{article.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Share Your Stories Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Share your stories
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain flex flex-col space-y-2 py-4">
                {menuCategories.map((category) => (
                  <div key={category.label}>
                    <Link
                      href={category.disabled ? "#" : category.href}
                      className={`text-gray-700 hover:text-orange-600 transition-colors duration-200 text-base font-medium py-2 block ${
                        category.disabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => !category.disabled && setIsMobileMenuOpen(false)}
                    >
                      {category.label}
                    </Link>
                    {category.subcategories && (
                      <div className="pl-4 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="text-sm text-gray-600 hover:text-orange-600 transition-colors py-1 block"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Month Dropdown */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="font-medium text-gray-700 py-2">Issues</div>
                  <div className="pl-4 space-y-2 max-h-96 overflow-y-auto">
                    {months.map((month) => (
                      <div key={month} className="mb-4">
                        <div className="font-semibold text-sm text-gray-900 mb-2">{month}</div>
                        <div className="space-y-2">
                          {exoticaArticles[month].map((article, idx) => (
                            <Link
                              key={idx}
                              href={`/exotica/article/${article.slug}`}
                              className="block text-xs"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="text-gray-500 mb-1">{article.category}{article.subcategory ? ` (${article.subcategory})` : ""}</div>
                              <div className="text-sm text-gray-700">{article.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowShareModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded text-base font-medium transition-colors w-full"
                  >
                    Share your stories
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Share Story Modal */}
      {showShareModal && (
        <ShareStoryModal onClose={() => setShowShareModal(false)} />
      )}
    </>
  );
}

// Share Story Modal Component
function ShareStoryModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    images: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [submitted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const wordCount = formData.message.trim() === "" 
    ? 0 
    : formData.message.trim().split(/\s+/).filter((word) => word.length > 0).length;
  const maxWords = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          images: [],
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600">Your story has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-light text-gray-900" style={{ fontFamily: 'serif' }}>
            Share Your Stories
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Story / Message <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 font-normal ml-2">
                ({wordCount} / {maxWords} words)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={8}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                wordCount > maxWords ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Share your travel experience, destination discovery, or lifestyle story (up to 500 words)..."
            />
            {wordCount > maxWords && (
              <p className="mt-2 text-sm text-red-600">
                Please limit your story to {maxWords} words. Currently: {wordCount} words.
              </p>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || wordCount > maxWords || wordCount === 0}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
