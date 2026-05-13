import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scissors, Bell, Clock, Mail, Menu, X } from 'lucide-react';
import axios from 'axios';
import logoImage from '../assets/logo.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem('userInfo');
  const user = userStr ? JSON.parse(userStr) : null;
  
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [lastSeen, setLastSeen] = useState(Number(localStorage.getItem('lastSeenNotifications') || 0));
  const [openedWithLastSeen, setOpenedWithLastSeen] = useState(lastSeen);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  }, [location]);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      const checkNotifications = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('http://localhost:5000/api/appointments/myappointments', config);
          const approvedApps = data.filter(app => app.status === 'approved');
          setNotifications(approvedApps.reverse()); // Show newest first
          
          const hasUnread = approvedApps.some(app => new Date(app.updatedAt).getTime() > lastSeen);
          setHasNotifications(hasUnread);
        } catch (error) {
          console.error('Error fetching notifications', error);
        }
      };
      
      checkNotifications();
      const interval = setInterval(checkNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [userStr, lastSeen]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const toggleNotifications = () => {
    if (!showDropdown) {
      setOpenedWithLastSeen(lastSeen);
      setShowDropdown(true);
      setHasNotifications(false);
    } else {
      setShowDropdown(false);
      const now = Date.now();
      localStorage.setItem('lastSeenNotifications', now);
      setLastSeen(now);
      setOpenedWithLastSeen(now);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logoImage} alt="Logo" className="h-10 w-10 object-cover rounded-full border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-light tracking-widest text-white uppercase">
                Saloon<span className="font-bold text-yellow-500">Yehansa</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">About</Link>
              <Link to="/gallery" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">Gallery</Link>
              <Link to="/services" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">Services</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">Contact</Link>
              
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all">Dashboard</Link>
                  
                  {user.role !== 'admin' && (
                    <div className="relative inline-block text-left">
                      <button 
                        onClick={toggleNotifications} 
                        className={`relative p-2 rounded-full transition-colors flex items-center ${
                          hasNotifications 
                            ? 'text-red-500 hover:bg-red-500/10 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                            : showDropdown 
                              ? 'bg-yellow-500/10 text-yellow-500' 
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        title="Notifications"
                      >
                        <Bell size={20} />
                      </button>

                      {/* Desktop Notifications Dropdown */}
                      {showDropdown && (
                        <div className="absolute right-0 mt-3 w-80 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/60 backdrop-blur-md">
                            <h3 className="text-white font-medium text-xs uppercase tracking-widest">Notifications</h3>
                            <span className="text-[10px] bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 px-2 py-0.5 rounded-full font-bold">
                              {notifications.length}
                            </span>
                          </div>
                          <div className="max-h-80 overflow-y-auto scrollbar-hide">
                            {notifications.length > 0 ? (
                              notifications.map((notif) => {
                                const isNew = new Date(notif.updatedAt).getTime() > openedWithLastSeen;
                                return (
                                  <div key={notif._id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative ${isNew ? 'bg-red-500/5' : ''}`}>
                                    {isNew && (
                                      <span className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                        New
                                      </span>
                                    )}
                                    <p className={`text-sm leading-relaxed ${isNew ? 'text-white' : 'text-gray-300'}`}>
                                      Your booking for <span className="text-yellow-500 font-medium">{notif.serviceId?.name || 'a service'}</span> on {new Date(notif.date).toLocaleDateString()} at {notif.time} has been <span className="text-green-400 font-medium">approved</span>.
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">{new Date(notif.updatedAt).toLocaleString()}</p>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="p-8 text-center text-gray-500 text-sm">
                                <Bell size={24} className="mx-auto mb-3 opacity-20" />
                                No notifications yet.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button onClick={handleLogout} className="border border-white/20 text-white hover:bg-white hover:text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ml-4">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ml-4">
                  Book Now
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-4">
            {user && user.role !== 'admin' && hasNotifications && (
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-red-500 animate-pulse relative p-2">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-neutral-900"></span>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 border-b border-white/10 bg-neutral-950 shadow-2xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-6 space-y-2 flex flex-col max-h-[80vh] overflow-y-auto">
          <Link to="/" className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">About Us</Link>
          <Link to="/gallery" className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">Gallery</Link>
          <Link to="/services" className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">Services</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">Contact</Link>
          
          <div className="h-px bg-white/10 my-4"></div>

          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-gray-300 hover:text-white hover:bg-white/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-white/10 transition-all">
                Dashboard
              </Link>
              
              {user.role !== 'admin' && (
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden my-2">
                  <button onClick={toggleNotifications} className="w-full text-left px-4 py-4 text-lg font-medium text-white flex items-center justify-between">
                    <span className="flex items-center gap-3"><Bell size={20} className={hasNotifications ? "text-red-500" : "text-gray-400"} /> Notifications</span>
                    {hasNotifications && <span className="bg-red-500 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold animate-pulse">New</span>}
                  </button>
                  
                  {showDropdown && (
                    <div className="px-2 pb-2 bg-black/40">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((notif) => {
                          const isNew = new Date(notif.updatedAt).getTime() > openedWithLastSeen;
                          return (
                            <div key={notif._id} className="p-3 mb-1 bg-white/5 rounded-lg border border-white/5 text-sm">
                              {isNew && <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest block mb-1">New</span>}
                              <p className="text-gray-300 text-xs leading-relaxed">
                                Your booking for <span className="text-yellow-500">{notif.serviceId?.name || 'service'}</span> on {new Date(notif.date).toLocaleDateString()} has been <span className="text-green-400">approved</span>.
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-xs">No notifications.</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-red-500/20 transition-all text-left mt-2">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-yellow-500 text-black hover:bg-yellow-400 block px-4 py-4 rounded-xl text-lg font-bold text-center mt-4 uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all">
              Book Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
