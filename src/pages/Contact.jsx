import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20 bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-yellow-500/5 blur-[150px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20 relative">
          <div className="flex justify-center mb-4 text-yellow-500 opacity-80"><Sparkles size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 dark:text-white mb-6 tracking-widest uppercase">
            Let's <span className="font-serif italic text-yellow-500 lowercase">Connect</span>
          </h1>
          <div className="w-24 h-[1px] bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-stone-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-base md:text-lg">
            Whether you have a question about our services, want to book a special event, or simply want to say hello, we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Contact Info (Left Side - 5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-xl md:text-2xl font-light mb-8 text-stone-900 dark:text-white tracking-wide uppercase">Get In <span className="text-yellow-500 font-serif italic lowercase">Touch</span></h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 p-4 rounded-2xl text-yellow-500 group-hover:bg-yellow-500/10 group-hover:scale-110 transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Location</h4>
                    <p className="text-stone-600 dark:text-gray-300 font-light text-base md:text-lg">Tangalle Road<br/>Withrandeniya</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 p-4 rounded-2xl text-yellow-500 group-hover:bg-yellow-500/10 group-hover:scale-110 transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Direct Line</h4>
                    <p className="text-stone-600 dark:text-gray-300 font-light text-base md:text-lg">0765547927</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 p-4 rounded-2xl text-yellow-500 group-hover:bg-yellow-500/10 group-hover:scale-110 transition-all duration-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Opening Hours</h4>
                    <p className="text-stone-600 dark:text-gray-300 font-light text-base md:text-lg">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-red-400 font-light text-sm mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-stone-200 dark:border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Connect With Us</h4>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://www.facebook.com/sa.nethuki.yehansha" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-3 bg-[#1877F2] text-stone-900 dark:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#1877F2]/90 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all duration-300 w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  View Photos on Facebook
                </a>
                
                <div className="flex items-center gap-4 mt-2">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex-1 bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 p-4 rounded-xl text-center text-stone-900 dark:text-white hover:text-black dark:hover:text-yellow-500 hover:border-black dark:hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="mailto:hello@saloonyehansa.com" className="flex-1 bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 p-4 rounded-xl text-center text-stone-900 dark:text-white hover:text-black dark:hover:text-yellow-500 hover:border-black dark:hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 hover:-translate-y-1">
                    <Mail size={24} className="mx-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side - 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] -z-10 rounded-full"></div>
              
              <h3 className="text-xl md:text-2xl font-light mb-8 text-stone-900 dark:text-white">Send us a <span className="font-serif italic text-yellow-500">Message</span></h3>
              
              {status && (
                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-center text-sm font-medium tracking-wide">
                  {status}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-600 dark:text-gray-400 uppercase tracking-widest ml-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 rounded-2xl text-stone-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors font-light"
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-600 dark:text-gray-400 uppercase tracking-widest ml-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 rounded-2xl text-stone-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors font-light"
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-600 dark:text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-5 py-4 bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 rounded-2xl text-stone-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors font-light"
                    placeholder="Enter Your Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-600 dark:text-gray-400 uppercase tracking-widest ml-2">Message</label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-4 bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none border border-stone-200 dark:border-white/10 rounded-2xl text-stone-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors font-light resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-black hover:text-white dark:hover:bg-yellow-500 dark:hover:text-black hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] mt-4 flex items-center justify-center gap-3"
                >
                  Submit Inquiry <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
