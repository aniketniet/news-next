'use client'

import React, { useState } from 'react';
import Image from 'next/image';


interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  itemsPerPage?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos = defaultPhotos, 
  itemsPerPage = 6 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(photos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPhotos = photos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButton = (page: number, isActive: boolean = false) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-2 mx-1 rounded ${
        isActive 
          ? 'bg-yellow-400 text-black font-semibold' 
          : 'bg-white text-gray-600 hover:bg-gray-100'
      } transition-colors duration-200`}
    >
      {page}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo Gallery</h2>
        <div className="w-16 h-1 bg-yellow-400"></div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPhotos.map((photo) => (
          <div
            key={photo.id}
            className={`relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              photo.featured ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide">
                  {photo.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold mb-2 leading-tight">
                  {photo.title}
                </h3>
                <div className="flex items-center text-sm opacity-90">
                  <span>By {photo.author}</span>
                  <span className="mx-2">•</span>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 mx-1 text-gray-600 disabled:text-gray-300 hover:text-gray-800 transition-colors duration-200"
          >
            ‹
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => 
            renderPaginationButton(page, page === currentPage)
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 mx-1 text-gray-600 disabled:text-gray-300 hover:text-gray-800 transition-colors duration-200"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

// Default sample data
const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: '/images/woman-portrait.jpg',
    alt: 'Woman portrait',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS',
    featured: true
  },
  {
    id: 2,
    src: '/images/blurred-figure.jpg',
    alt: 'Blurred figure',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 3,
    src: '/images/man-traditional.jpg',
    alt: 'Man in traditional dress',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 4,
    src: '/images/coffee-scene.jpg',
    alt: 'Coffee and pastries',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 5,
    src: '/images/man-orange.jpg',
    alt: 'Man in orange',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  },
  {
    id: 6,
    src: '/images/man-microphone.jpg',
    alt: 'Man with microphone',
    title: 'Republican Senator Vital to Health Indonesia.',
    author: 'David Hall',
    date: 'December 04, 2020',
    category: 'POLITICS'
  }
];

export default PhotoGallery;