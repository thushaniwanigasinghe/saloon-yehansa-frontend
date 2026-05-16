import React, { useState } from 'react';
import ourWorkPhoto from '../assets/our_work_photo.png';
import weddingPhoto from '../assets/five.jpg';
import hairstylePhoto from '../assets/six.jpg';
import dresserPhoto from '../assets/dresser_photo1.jpg';
import gradPhoto from '../assets/grad_photo.jpg';
import whiteWeddingPhoto from '../assets/white_wedding.jpg';
import redCeremonyPhoto from '../assets/red_ceremony.jpg';
import maroonWeddingPhoto from '../assets/one.jpg';
import redDressPhoto from '../assets/red_dress.jpg';
import twoPhoto from '../assets/two.jpg';
import threePhoto from '../assets/hairstyle_photo.jpg';
import fourPhoto from '../assets/four.jpg';
import fivePhoto from '../assets/dresser_photo.png';

const FacebookIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const ArrowRightIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const HeartIcon = ({ className, size = 24, filled = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const XIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});

  const images = [
    // Row 1 & 2
    { url: ourWorkPhoto, title: 'Our Work', colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', rowSpan: 'row-span-2' },
    { url: gradPhoto, title: 'Graduation Glamour', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-2' },
    { url: whiteWeddingPhoto, title: 'Bridal Elegance', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    { url: redCeremonyPhoto, title: 'Traditional Ceremonies', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    
    // Row 3 & 4
    { url: maroonWeddingPhoto, title: 'Cultural Beauty', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-2' },
    { url: redDressPhoto, title: 'Special Occasions', colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', rowSpan: 'row-span-1' },
    { url: weddingPhoto, title: 'Wedding Photos', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    { url: fourPhoto, title: 'Hairstyle', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    { url: dresserPhoto, title: 'Dressers', colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', rowSpan: 'row-span-1' },

    // Row 5 & 6
    { url: twoPhoto, title: 'Beautiful Moments', colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', rowSpan: 'row-span-2' },
    { url: threePhoto, title: 'Stunning Portraits', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    { url:  hairstylePhoto, title: 'Glamorous Makeovers', colSpan: 'col-span-1 lg:col-span-1', rowSpan: 'row-span-1' },
    { url: fivePhoto, title: 'Perfect Looks', colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', rowSpan: 'row-span-1' },
  ];

  const handleLike = (e, index) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-white selection:bg-yellow-500/30">
      {/* Hero Section */}
      <div className="relative py-20 mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-950 to-neutral-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-light text-stone-900 dark:text-white mb-6 tracking-widest uppercase relative inline-block">
            Our <span className="font-serif italic text-yellow-500 lowercase relative z-10">Gallery</span>
            {/* Decorative element */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </h1>
          <p className="text-white dark:text-gray-400 max-w-2xl mx-auto font-light text-lg md:text-xl mt-8">
            Step into our world of beauty and transformation. Experience the artistry of our professional stylists through our curated portfolio.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(img)}
              className={`relative group overflow-hidden rounded-3xl border border-stone-200 dark:border-white/5 bg-white dark:bg-neutral-900 cursor-pointer ${img.colSpan} ${img.rowSpan}`}
            >
              <img 
                src={img.url.startsWith('http') ? `${img.url}?auto=format&fit=crop&w=1200&q=80` : img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1"
              />
              
              {/* Like Button overlay (always visible but subtle, gets opaque on hover or when liked) */}
              <button 
                onClick={(e) => handleLike(e, index)}
                className={`absolute top-4 right-4 z-20 p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 ${likes[index] ? 'bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-black/30 text-white/70 hover:bg-black/50 hover:text-white dark:hover:text-yellow-500'}`}
                aria-label="Like photo"
              >
                <HeartIcon size={20} filled={likes[index]} />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                <div className="p-8 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-[2px] bg-yellow-500 mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                  <h3 className="text-2xl md:text-3xl font-light text-stone-900 dark:text-white tracking-wide drop-shadow-md">{img.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Link Banner */}
        <a 
          href="https://www.facebook.com/sa.nethuki.yehansha" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block mt-24 relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-stone-200 dark:border-white/10 group shadow-2xl cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1877F2]/10 to-transparent z-0 transition-opacity duration-500 group-hover:opacity-80"></div>
          <div className="absolute top-0 right-0 -mt-16 -mr-16 text-[#1877F2]/10 group-hover:text-[#1877F2]/20 transition-colors duration-700">
            <FacebookIcon size={300} />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-white mb-4 group-hover:text-[#1877F2] transition-colors duration-300">Want to see more of our work?</h2>
              <p className="text-stone-600 dark:text-gray-400 text-lg max-w-2xl font-light">
                Follow us on Facebook for daily updates, special offers, behind-the-scenes looks, and hundreds of beautiful client transformations.
              </p>
            </div>
            
            <div className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#1877F2] group-hover:bg-[#166FE5] text-stone-900 dark:text-white rounded-full font-medium transition-all duration-300 shadow-lg group-hover:shadow-[#1877F2]/30 group-hover:-translate-y-1">
              <FacebookIcon className="w-5 h-5" />
              <span>Visit Our Facebook Page</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>
        
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-50/90 dark:bg-black/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-300"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <XIcon size={32} />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full transform scale-100 transition-transform duration-300 ease-out flex flex-col items-center"
            onClick={e => e.stopPropagation()} // Prevent click from closing when clicking the image wrapper
          >
            <img 
              src={selectedImage.url.startsWith('http') ? `${selectedImage.url}?auto=format&fit=crop&w=1600&q=80` : selectedImage.url} 
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-3xl font-light text-white text-center drop-shadow-md">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
