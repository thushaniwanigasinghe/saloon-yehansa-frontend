import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-stone-50 dark:bg-neutral-950 min-h-screen text-stone-900 dark:text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide text-stone-900 dark:text-white leading-tight">
            Elevate Your <br />
            <span className="font-serif italic text-yellow-500">Beauty</span> Experience
          </h1>
          <p className="text-base md:text-lg text-stone-950 dark:text-gray-300 mb-8 font-light tracking-wide">
            Discover a sanctuary of style and sophistication. Where expert stylists bring your vision to life.
          </p>

          {/* Top Section Opening Hours */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-sm font-light tracking-widest text-stone-600 dark:text-gray-300 uppercase bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none backdrop-blur-md py-4 px-8 rounded-full border border-stone-200 dark:border-white/10 inline-flex mx-auto">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-yellow-500" />
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-yellow-500" />
              <span className="text-red-400">Sunday: Closed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="bg-yellow-500 text-black hover:bg-black hover:text-white dark:hover:bg-yellow-500 dark:hover:text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]">
              View Services
            </Link>
            <Link to="/login" className="bg-transparent border border-stone-400 dark:border-white/30 text-stone-500 dark:text-white hover:bg-black hover:text-white hover:border-black dark:hover:bg-yellow-500 dark:hover:text-black dark:hover:border-yellow-500 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white dark:bg-neutral-900 border-t border-stone-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-serif italic text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300">Expert Stylists</h3>
              <p className="text-stone-600 dark:text-gray-400 font-light">Our team of master stylists brings years of experience and passion to every appointment.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-serif italic text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300">Premium Products</h3>
              <p className="text-stone-600 dark:text-gray-400 font-light">We exclusively use high-end, luxury hair care products to ensure the best results.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-serif italic text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300">Relaxing Atmosphere</h3>
              <p className="text-stone-600 dark:text-gray-400 font-light">Unwind in our modern, serene salon designed for your ultimate comfort and relaxation.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
